<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import HomeTable from "../components/HomeTable.vue";
import Heading from "../components/Heading.vue";
import GraphsTemplate from "../components/GraphsTemplate.vue";
import TradeTable from "../components/TradeTable.vue";
</script>

<template>
  <!-- <Header />

  <div class="main">
    <HomeTable />
    <GraphsTemplate :data="[1, 2, 3, 4]" :labels="['jan', 'feb', 'march', 'april']" />
  </div>
  <Footer /> -->
  <Header />
  <Heading />
  <div class="container">
    <div class="chart_container">
      <canvas id="stock_compare" ref="stock_compare"></canvas>
    </div>
  </div>
</template>

<script>
import { ApiClient, DefaultApi } from "finnhub";
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      labels: [],
      prices: [],
      test: [1, 2, 3],
      clinet: null,
      data: {
        AAPL: 0,
        MSFT: 0,
        TSLA: 0,
        AMZN: 0,
        GOOGL: 0,
        GOOG: 0,
        UNH: 0,
        JNJ: 0,
        XOM: 0,
      },
    };
  },
  methods: {
    connectAPI() {
      const api_key = ApiClient.instance.authentications["api_key"];
      api_key.apiKey = "ccssiviad3ia79l0s8mgccssiviad3ia79l0s8n0";
      const finnhubClient = new DefaultApi();
      this.client = finnhubClient;
    },

    async getData() {
      let cool = {}
       //for (const [ticker, price] of Object.entries(this.data)) {
        // const response = await axios.get(
        //   `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=ccssiviad3ia79l0s8mgccssiviad3ia79l0s8n0`
        //);
        //const data = await response.data;
         //cool[ticker] = data["c"];
       //}

      return cool
    },
  },
  async mounted() {
    this.connectAPI();
    let damn = await this.getData();
    this.data = damn;

    for (const key in this.data) {
      this.labels.push(key);
      this.prices.push(this.data[key]);
    }

    const ctx = this.$refs.stock_compare;
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.$data.labels,
        datasets: [
          {
            label: "Price in Dollars",
            data: this.$data.prices,
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
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&family=Poppins&display=swap");
body,
html {
  margin: 0;
  padding: 0;
  background-color: #f0ecec;
  font-family: "Poppins";
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.container {
  width: 75vw;
  height: 75vh;
  position: relative;
  top: 50%;
  left: 50%;
  background-color: whitesmoke;
  transform: translate(-50%, -10%);
  border-color: rgb(255 255 255/10%);
  box-shadow: 0 0 0.625rem 0 rgb(0 0 0 / 10%);
}

.chart_container {
  width: 70vw;
  height: 60vh;
}

.chart_container canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
