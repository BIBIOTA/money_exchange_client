<template>
  <div id="#rate">
    <h1 class="title">
      外幣匯率
    </h1>
    <div class="flex justify-center" v-if="data?.currencies && data?.currencies?.length > 0">
      <p class="text-center">目前選擇匯率:</p>
      <select name="rate_from" id="rate_from" v-model="selectedCurrency">
        <option
          v-for="(currency, i) in data.currencies"
          :key="`currency_${i}`"
          :value="currency.currency_uuid">{{currency.name}}</option>
      </select>
    </div>
    <table class="table-auto mx-auto my-10" style="min-width: 300px">
      <thead>
        <tr>
          <th class="border-2">幣別</th>
          <th class="border-2">買入</th>
          <th class="border-2">賣出</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rate, index) in rates" :key="`rate_${index}`">
          <td class="border-2">{{rate.name}}</td>
          <td class="border-2">{{rate.buy}}</td>
          <td class="border-2">{{rate.sell}}</td>
        </tr>
      </tbody>
    </table>
    <p class="text-center">
      資料更新時間: 2021-01-01 12:23:23
    </p>
  </div>
</template>

<script>
import { useQuery } from '@urql/vue';

export default {
  name: 'Home',
  setup() {
    const result = useQuery({
      query: `
        query {
          currencies
          {
            currency_uuid,
            name,
          }
        }
      `,
    });

    return {
      fetching: result.fetching,
      data: result.data,
      error: result.error,
    };
  },
  data() {
      return {
        selectedCurrency: null,
        rates: [
          {
            name: '美金',
            buy: 10.1,
            sell: 10.2,
          }
        ],
      }
  },
  watch: {
    data(data) {
      /* 設定初始化匯率資料為第一筆 */
      if (!this.selectedCurrency) {
        if (data?.currencies && data.currencies.length > 0) {
          this.selectedCurrency = data.currencies[0].currency_uuid;
        }
      }
    }
  },
}
</script>

<style lang="scss">
  #rate {
    
  }
</style>
