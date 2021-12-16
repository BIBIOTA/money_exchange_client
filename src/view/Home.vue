<template>
  <div id="#rate">
    <h1 class="title">
      外幣匯率
    </h1>
    <div class="flex justify-center" v-if="currencies && currencies.length > 0">
      <p class="text-center">目前選擇匯率:</p>
      <select name="rate_from" id="rate_from" v-model="selectedCurrency" @input="changeCurrency($event)">
        <option
          v-for="(currency, i) in currencies"
          :key="`currency_${i}`"
          :value="currency.currency_uuid">{{currency.name}}</option>
      </select>
    </div>
    <table class="table-auto mx-auto my-10" style="min-width: 300px">
      <thead>
        <tr>
          <th class="border-2">幣別</th>
          <th class="border-2">1元{{computedSelectedCurrencyName}}匯率</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="rates && rates?.length > 0">
          <tr v-for="(rate, index) in rates" :key="`rate_${index}`">
            <td class="border-2">{{rate.name}}</td>
            <td class="border-2">{{rate.rate}}</td>
          </tr>
        </template>
      </tbody>
    </table>
    <p class="text-center">
      資料更新時間: 2021-01-01 12:23:23
    </p>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const curreniesGql = gql`query currencyList {
  currencies {
    currency_uuid,
    name
  }
}`;

const ratesGql = gql`query rateList($currency_uuid: ID) {
  rates(
    filters: {
      currency_uuid: $currency_uuid
    }
  ) {
    rate_uuid,
    rate,
    name
  }
}`;

export default {
  name: 'Home',
  apollo: {
    currencies: curreniesGql,
  },
  data() {
      return {
        selectedCurrency: null,
        rates: null,
      }
  },
  methods: {
    changeCurrency(e) {
      this.$apollo.addSmartQuery('rates', {
        query: ratesGql,
        variables: {
          currency_uuid: e.target.value
        },
        result ({ data, loading, networkStatus }) {
          console.log({ data, loading, networkStatus })
          if (data?.rates.length > 0) {
            this.rates = data.rates;
          }
        },
      })
    }
  },
  watch: {
    currencies(data) {
      console.log(data);
      if (!this.selectedCurrency) {
        this.selectedCurrency = data[0].currency_uuid;
      }
    },
  },
  computed: {
    computedSelectedCurrencyName() {
      let name = '';
      if (this.currencies && this.currencies.length > 0) {
        this.currencies.forEach((item) => {
          if (item.currency_uuid === this.selectedCurrency) {
            name = item.name;
          }
        });
      }
      return name;
    }
  }
}
</script>

<style lang="scss">
  #rate {
    
  }
</style>
