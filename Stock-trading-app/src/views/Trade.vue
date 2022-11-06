<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import TradeTable from "../components/TradeTable.vue";
import Heading from "../components/Heading.vue";
import LineChart from "../components/LineChart.vue";
</script>

<template>
  <Header />
 <div class="content_container">
 <!-- <TradeTable /> -->
  <LineChart />
 </div>
</template>

<style></style>

<script>
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { ApiClient, DefaultApi } from "finnhub";

export default {
  // state
  data() {
    return {
      db: null,
      client: null,
      testPrice: 0,
    };
  },
  // actions
  methods: {
    connectDB() {
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
    },

    connectAPI() {
      const api_key = ApiClient.instance.authentications["api_key"];
      api_key.apiKey = "ccssiviad3ia79l0s8mgccssiviad3ia79l0s8n0";
      const finnhubClient = new DefaultApi();
      this.client = finnhubClient;
    },
  },

  mounted() {
    this.connectDB();
    this.connectAPI();
    console.log(this.$store.state.userID);

    this.client.quote("MSFT", (error, data, response) => {
      this.testPrice = data["c"];
    });

    console.log(this.testPrice);
  },
};
</script>

<style scoped>
.content_container{
width:100%;
height: 85vh;
margin:auto;
    display:flex;
    justify-content: space-evenly;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
}
.chart_container{
    background-color:black;
    width: 40%;
    height: 100%;
}
</style>
