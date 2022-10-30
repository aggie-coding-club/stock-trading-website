<template>
  <table>
    <tr v-for="(price, ticker, index) in this.symbols">
      <td>{{ ticker }}</td>
      <td>{{ price }}</td>
    </tr>

    <button @click="sort">Sort</button>
  </table>
</template>

<style>
table {
  color: black;
}
</style>

<script>
export default {
  data() {
    return {
      symbols: {
        AAPL: 220,
        MSFT: 100,
      },
    };
  },
  methods: {
    sort() {
      const sortable = Object.fromEntries(Object.entries(this.symbols).sort(([, a], [, b]) => a - b));
      this.symbols = sortable;
    },
  },
};
</script>
