<template>
  <div id="rate">
    <h1 class="title">
      外幣匯率
    </h1>
    <div class="flex justify-center" v-if="currencies && currencies.length > 0">
      <p class="text-center">目前選擇匯率:</p>
      <select name="rate_from" id="rate_from" v-model="selectedCurrency" @input="changeCurrency($event.target.value)">
        <option
          v-for="(currency, i) in currencies"
          :key="`currency_${i}`"
          :value="currency.currency_uuid">{{currency.name}} ({{currency.code}})</option>
      </select>
    </div>
    <table class="table-auto mx-auto my-10" style="min-width: 300px">
      <thead>
        <tr>
          <th class="border-2">幣別</th>
          <th class="border-2">1元{{computedSelectedCurrency.name}}匯率</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="rates && rates?.length > 0">
          <tr v-for="(rate, index) in rates" :key="`rate_${index}`">
            <td class="border-2 text-center">{{rate.name}} ({{rate.code}})</td>
            <td class="border-2 text-center">{{NumberEPSILON(rate.rate)}}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td class="border-2 text-center" colspan="2">無資料</td>
          </tr>
        </template>
      </tbody>
    </table>
    <p class="text-center">
      資料更新時間: {{computedSelectedCurrency.updatedAt}}
      <br />
      資料來源: <a href="https://rate.bot.com.tw/xrt?Lang=zh-TW" class="text-primary">台灣銀行外幣匯率</a>
    </p>
    <h2 class="sub_title">
      匯率換算
    </h2>
    <div class="flex justify-center" v-if="computedSelectedCurrency.name">
      <input
        @input="changeExchangeRate(exchangeInput)"
        type="number"
        class="input_hidden_arrows"
        v-model="exchangeInput.amount" />
      <p class="text-center">元{{computedSelectedCurrency.name}} ({{computedSelectedCurrency.code}})</p>
      <p class="text-center"> = {{NumberEPSILON(exchangeResult)}}元</p>
      <select
        @change="changeExchangeRate(exchangeInput)"
        name="rate_from" id="rate_from"
        v-model="exchangeInput.rate_uuid">
        <option
          v-for="(rate, i) in rates"
          :key="`currency_${i}`"
          :value="rate.rate_uuid">{{rate.name}} ({{rate.code}})</option>
      </select>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import gql from 'graphql-tag';
import dayjs from 'dayjs';
import { checkIsIntegerGreaterThanZero, NumberEPSILON } from '../validator/validator.js';

const curreniesGql = gql`query currencyList {
  currencies (
    filters: {
      code: "TWD"
    }
  ) {
    currency_uuid,
    name
    code
    updated_at
  }
}`;

const ratesGql = gql`query rateList($currency_uuid: ID) {
  rates(
    filters: {
      currency_uuid: $currency_uuid
    }
  ) {
    rate_uuid
    rate
    code
    name
  }
}`;

const exchangeGql = gql`query exchangeRate($currency_uuid: ID!, $rate_uuid: ID!, $amount: Float!) {
  exchange(
    exchangeInput: {
      currency_uuid: $currency_uuid,
      rate_uuid: $rate_uuid,
      amount: $amount,
    }
  ) {
    from
    to
    result
  }
}`;

export default {
  name: 'Home',
  apollo: {
    currencies: curreniesGql,
  },
  data() {
      return {
        selectedCurrency: ref(null),
        rates: ref(null),
        exchange: ref(null),
        exchangeInput: ref({
          amount: 1,
          currency_uuid: null,
          rate_uuid: null,
        }),
        exchangeResult: ref(0),
      }
  },
  methods: {
    NumberEPSILON,
    changeCurrency(value) {
      this.$apollo.addSmartQuery('rates', {
        query: ratesGql,
        variables: {
          currency_uuid: value
        },
        result ({ data, loading, networkStatus }) {
          console.log({ data, loading, networkStatus })
          if (data?.rates.length > 0) {
            this.rates = data.rates;
          }
        },
      })
    },
    changeExchangeRate(payload) {
      const { currency_uuid, rate_uuid, amount } = payload;
      if (amount && this.detectIsNumber(amount)) {
        this.$apollo.addSmartQuery('exchange', {
          query: exchangeGql,
          variables: {
            currency_uuid,
            rate_uuid,
            amount,
          },
          result ({ data, loading, networkStatus }) {
            console.log({ data, loading, networkStatus })
            if (data?.exchange) {
              this.exchange = data.exchange;
              this.exchangeResult = data.exchange.result;
            }
          },
        })
      } else {
        this.exchangeInput.amount = 1;
      }
    },
    async detectIsNumber(value) {
      return await checkIsIntegerGreaterThanZero(value);
    }
  },
  watch: {
    currencies(data) {
      if (!this.selectedCurrency) {
        this.selectedCurrency = data[0].currency_uuid;
        this.exchangeInput.currency_uuid = data[0].currency_uuid;
        this.changeCurrency(this.selectedCurrency);
      }
    },
    rates(data) {
      if (data?.length > 0 && !this.exchangeInput.rate_uuid) {
        this.exchangeInput.rate_uuid = data[0].rate_uuid;
        this.changeExchangeRate(this.exchangeInput);
      }
    },
  },
  computed: {
    computedSelectedCurrency() {
      let name = '';
      let code = '';
      let updatedAt = null;
      if (this.currencies && this.currencies.length > 0) {
        this.currencies.forEach((item) => {
          if (item.currency_uuid === this.selectedCurrency) {
            name = item.name;
            code = item.code;
            updatedAt = dayjs(item.updated_at).locale('zh-tw').format('YYYY-MM-DD HH:mm:ss');
          }
        });
      }
      return { name, code, updatedAt };
    },
  }
}
</script>

<style lang="scss">
  #rate {
    .input_hidden_arrows {
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
  
      /* Firefox */
      &input[type=number] {
        -moz-appearance: textfield;
      }
    }
  }
</style>
