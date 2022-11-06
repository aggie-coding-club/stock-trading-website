<template>
  <div class="chart_container">
    <canvas id="stock_compare" ref="stock_compare"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  props: {
    labels: Array,
    data: Array,
  },
  data() {
    return {};
  },

  mounted() {
    const ctx = this.$refs.stock_compare;
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.$props.labels,
        datasets: [
          {
            label: "Price in Dollars",
            data: this.$props.data,
            borderWidth: 1,
          },
        ],
      },
    });

    myChart;
  },
};
</script>

<style>
.chart_container canvas {
  height: 300px;
}
</style>
