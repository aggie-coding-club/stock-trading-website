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

import { ApiClient, DefaultApi } from "finnhub";

export default {
  // state
  data() {
    return {
      db: null,
      client: null,
      testPrice: 0,
      options: {
        chart: {
          type: "candlestick",
        },
        series: [
          {
            name: "sales",
            data: [
              {
                x: new Date(),
                y: [217.68, 221.03, 6623.04, 6633.33],
              },
              {
                x: new Date() + 1,
                y: [221.03, 6643.59, 6620, 6630.11],
              },
              {
                x: new Date() + 2,
                y: [219.89, 6643.59, 6620, 6630.11],
              },
            ],
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
    let chart = new ApexCharts(document.querySelector("#stock_compare"), this.options);
    chart.render();
    console.log("rendered");

    // this.client.quote("MSFT", (error, data, response) => {
    //   this.testPrice = data["c"];
    // });

    //await this.getData();
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
  height: 100%;
}
</style>
