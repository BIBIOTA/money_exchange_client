<template>
  <div id="#rate">
    <h1 class="title">
      外幣匯率
    </h1>
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
  data() {
      return {
        rates: [
          {
            name: '美金',
            buy: 10.1,
            sell: 10.2,
          }
        ],
      }
  },
  created() {

    const result = useQuery({
      query: `
        query ($filters: ListCurrencyInput) {
          currencies
          (filters: $filters)
          {
            currency_uuid,
            name,
          }
        }
      `,
      variables: {
        // filters: {
          // name: 'DFSSDccccFDFDF',
          // currency_uuid: 'ae353410-9db5-439d-bcf6-1743a2a99896',
        // }
      }
    });

    console.log(result);

    // return {
    //   fetching: result.fetching,
    //   data: result.data,
    //   error: result.error,
    // };
  },
}
</script>

<style lang="scss">
  #rate {
    
  }
</style>
