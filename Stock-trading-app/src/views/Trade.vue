<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import TradeTable from "../components/TradeTable.vue";
import Heading from "../components/Heading.vue";
</script>

<template>
  <Header />
  <div class="content_container">
    <TradeTable />
    <div class="chart_container">
      <div id="stock_compare" ref="stock_compare"></div>
    </div>
  </div>
</template>

<style></style>

<script>
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, getDoc } from "firebase/firestore";
import ApexCharts from "apexcharts";
import axios from "axios";

import { ApiClient, DefaultApi } from "finnhub";

export default {
  // state
  data() {
    return {
      db: null,
      client: null,
      ticker: "AAPL",
      testPrice: 0,
      graph_data: [],
      options: {
        chart: {
          type: "candlestick",
        },
        title: {
          text: "CandleStick Chart",
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: false,
            show: false,
          },
        },
        series: [
          {
            name: "sales",
            data: this.$store.state.graph_data,
          },
        ],
      },
    };
  },
  // actions
  methods: {
    async connectDB() {
      const firebaseConfig = {
        apiKey: "AIzaSyDFcXiGK1LQJDj1bkJN10bjKAflKNN3n3I",
        authDomain: "vue-stuff-a1a86.firebaseapp.com",
        databaseURL: "https://vue-stuff-a1a86-default-rtdb.firebaseio.com",
        projectId: "vue-stuff-a1a86",
        storageBucket: "vue-stuff-a1a86.appspot.com",
        messagingSenderId: "200012668110",
        appId: "1:200012668110:web:18c8c5d167d14eb46dc49f",
        measurementId: "G-31C594NLNQ",
      };

      const app = initializeApp(firebaseConfig);

      const db = getFirestore(app);
      this.db = db;
      // this.collection = collection(db, "users");
    },

    connectAPI() {
      const api_key = ApiClient.instance.authentications["api_key"];
      api_key.apiKey = "ccssiviad3ia79l0s8mgccssiviad3ia79l0s8n0";
      const finnhubClient = new DefaultApi();
      this.client = finnhubClient;
    },

    // async getData() {
    //   if (this.$store.state.userID != "" || this.$store.state.userID != null) {
    //     const docRef = doc(this.$data.db, "users", this.$store.state.userID);
    //     const docSnap = await getDoc(docRef);

    //     console.log(docSnap.data());
    //   } else {
    //     console.log("not logged in!");
    //   }
    // },
  },

  async mounted() {
    //await this.connectDB();
    console.log("database connected");
    this.connectAPI();
    console.log(this.$store.state.userID);

    // this.client.quote("MSFT", (error, data, response) => {
    //   this.testPrice = data["c"];
    // });

    //await this.getData();
    // let URI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.$store.state.selected_ticker}&apikey=6S3XWKYVUZIUJZEF`;
    // let response = await axios.get(URI);
    // let data = await response.data;
    // let stock_data = data["Time Series (Daily)"];
    // for (const date in stock_data) {
    //   let info = {
    //     x: date,
    //     y: [
    //       parseFloat(stock_data[date]["1. open"]),
    //       parseFloat(stock_data[date]["2. high"]),
    //       parseFloat(stock_data[date]["3. low"]),
    //       parseFloat(stock_data[date]["4. close"]),
    //     ],
    //   };
    //   this.graph_data.push(info);
    // }

    // this.options.series[0].data = this.graph_data.reverse();

    let chart = new ApexCharts(document.querySelector("#stock_compare"), this.options);
    this.$store.state.price_chart = chart;
    chart.render();
  },
};
</script>

<style scoped>
.content_container {
  width: 100%;
  height: 85vh;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.chart_container {
  width: 40vw;
  height: 85vh;
}

#stock_compare {
  height: 85vh;
}
</style>
