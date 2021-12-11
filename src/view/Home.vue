<template>
  <div id="#rate">
    <h1 class="title">
      外幣匯率
    </h1>
    <table class="table-auto m-auto">
      <thead>
        <tr>
          <th>幣別</th>
          <th>買入</th>
          <th>賣出</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rate, index) in rates" :key="`rate_${index}`">
          <td>{{rate.name}}</td>
          <td>{{rate.buy}}</td>
          <td>{{rate.sell}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

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
}
</script>

<style lang="scss">
  #rate {
    
  }
</style>
