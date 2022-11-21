<!-- Table on the Home page: Marco -->

<script>
import { ApiClient, DefaultApi } from "finnhub";
import { ref } from "vue";
import axios from "axios";
import Heading from "./Heading.vue";
import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, onSnapshot, setDoc, getDocFromCache, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      numberStocks: 1,
      selected_ticker: "",
      input: "",
      prices: {
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
    async Bob(e) {
      var selected = e.target.parentElement.parentElement.getElementsByClassName("selected");
      for (var i = 0; i < selected.length; i++) {
        selected[i].classList.remove("selected");
      }
      e.target.parentElement.classList.add("selected");
      this.$store.state.selected_ticker = e.target.innerHTML;
      await this.update();
    },
    filtered(prices, input) {
      var result = {};
      for (var key in prices) {
        if (key.toLowerCase().includes(input.toLowerCase())) {
          result[key] = prices[key];
        }
      }
      return result;
    },
    async update() {
      let URI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.$store.state.selected_ticker}&apikey=6S3XWKYVUZIUJZEF`;
      let response = await axios.get(URI);
      let data = await response.data;
      let stock_data = data["Time Series (Daily)"];
      this.$store.state.graph_data = [];
      for (const date in stock_data) {
        let info = {
          x: date,
          y: [
            parseFloat(stock_data[date]["1. open"]),
            parseFloat(stock_data[date]["2. high"]),
            parseFloat(stock_data[date]["3. low"]),
            parseFloat(stock_data[date]["4. close"]),
          ],
        };
        this.$store.state.graph_data.push(info);
      }

      this.$store.state.price_chart.updateSeries([
        {
          data: this.$store.state.graph_data,
        },
      ]);
    },
    async buystocks(e) {
      if (this.$store.state.login) {
        let current_balance = this.$store.state.userData["balance"];
        let total_price = parseFloat(this.prices[this.$store.state.selected_ticker]) * parseInt(this.numberStocks);
        if (this.$store.state.userData["stocks"][this.$store.state.selected_ticker]) {
          if (current_balance - total_price < 0) {
            alert("Insufficient funds");
          } else {
            let new_balance = current_balance - total_price;
            this.$store.state.userData["balance"] = new_balance;
            this.$store.state.userData["stocks"][this.$store.state.selected_ticker] += parseInt(this.numberStocks);
          }

          await this.updateUser();
        } else {
          let current_balance = this.$store.state.userData["balance"];
          let total_price = parseFloat(this.prices[this.$store.state.selected_ticker]) * parseInt(this.numberStocks);
          if (current_balance - total_price < 0) {
            alert("Insufficient funds");
          } else {
            let new_balance = current_balance - total_price;
            this.$store.state.userData["balance"] = new_balance;
            this.$store.state.userData["stocks"][this.$store.state.selected_ticker] = parseInt(this.numberStocks);
          }

          await this.updateUser();
        }
        console.log(this.$store.state.userData);
      } else {
        console.log("Log in");
        console.log(this.$store.state.selected_ticker);
      }
    },

    async sellStocks(e) {
      if (this.$store.state.login) {
        let current_balance = this.$store.state.userData["balance"];
        let total_price = parseFloat(this.prices[this.$store.state.selected_ticker]) * parseInt(this.numberStocks);
        if (this.$store.state.userData["stocks"][this.$store.state.selected_ticker]) {
          if (parseInt(this.numberStocks) > this.$store.state.userData["stocks"][this.$store.state.selected_ticker]) {
            alert("Insufficient funds");
          } else {
            let new_balance = current_balance + total_price;
            this.$store.state.userData["balance"] = new_balance;
            this.$store.state.userData["stocks"][this.$store.state.selected_ticker] -= parseInt(this.numberStocks);
          }
          await this.updateUser();
        } else {
          alert("No stocks for this ticker");
        }
        console.log(this.$store.state.userData);
      } else {
        console.log("Log in");
        console.log(this.$store.state.selected_ticker);
      }
    },

    async getData() {
      let cool = {};
      for (const [ticker, price] of Object.entries(this.prices)) {
        const response = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=ccssiviad3ia79l0s8mgccssiviad3ia79l0s8n0`
        );
        const data = await response.data;
        cool[ticker] = data["c"];
      }

      return cool;
    },

    async connectDB() {
      const firebaseConfig = this.$store.state.firebaseConfig;

      const app = initializeApp(firebaseConfig);

      const db = getFirestore(app);
      this.database = db;
    },

    async updateUser() {
      const docRef = doc(this.database, "users", this.$store.state.userID);

      await setDoc(doc(this.database, "users", this.$store.state.userID), this.$store.state.userData);
    },
  },

  async mounted() {
    this.connectAPI();
    await this.connectDB();
    //let damn = await this.getData();
    //this.prices = damn;
  },
};
</script>

<template>
  <h1>{{ selected_ticker }}</h1>
  <div class="search_container">
    <div class="flexbox_container">
      <input type="text" v-model="input" @input="filtered(this.prices, input)" />
      <button>Search</button>
      <input type="text" name="stocks" placeholder="#stocks" v-model="numberStocks" />
      <button @click="buystocks">Buy</button>
      <button @click="sellStocks">Sell</button>
    </div>
    <div>
      <div class="Table_Container">
        <Table>
          <thead>
            <tr>
              <th class="Table_Heading">Ticker</th>
              <th class="Table_Heading">Current Price</th>
            </tr>
          </thead>
          <tr v-for="(price, ticker, index) in filtered(prices, input)">
            <td class="Table_Ticker" @click="Bob" :class="ticker">{{ ticker }}</td>
            <td class="Table_Price">${{ price }}</td>
          </tr>
        </Table>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap");
.header {
  width: 100%;
  height: 40vh;
}
.search_container {
  height: 80vh;
  border: 1px solid white;
  background: white;
  width: 40%;
  padding: 10px;
}

.flexbox_container {
  margin: 10px;
}
.selected {
  background-color: rgb(80, 0, 0);
  color: white;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  height: 100%;
}

th,
td {
  padding: 0.625rem 0.625rem 0.625rem 0;
  font-size: 0.75rem;
  vertical-align: middle;
  border-top: 0.0625rem solid maroon;
  min-width: 5rem;
  height: 2vh;
}
caption {
  display: table-caption;
  margin-bottom: 1.875rem;
  text-align: left;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-family: "source_sans_proregular", Helvetica, Arial, sans-serif;
  letter-spacing: 0.5px;
  font-size: 0.75rem;
  line-height: 1;
}
.Table_Container {
  color: black;
  width: 90%;
  height: 65vh;
  margin: auto;
  padding: 1.25rem 0.9375rem;
  border-color: rgb(255 255 255/10%);
  box-shadow: 0 0 0.625rem 0 rgb(0 0 0 / 10%);
}
.Table_Heading {
  font-family: "source_sans_prosemibold", Helvetica, Arial, sans-serif;
  letter-spacing: 1.5px;
  padding: 0 0.625rem 0.625rem 0;
  font-size: 0.5625rem;
  line-height: 1.4;
  text-transform: uppercase;
  text-align: center;
  color: maroon;
}

.Table_Ticker {
  font-family: "source_sans_prosemibold", Helvetica, Arial, sans-serif;
  letter-spacing: 1.5px;
  line-height: 1;
  text-align: center;
}

.Table_Price {
  font-family: "source_sans_prosemibold", Helvetica, Arial, sans-serif;
  letter-spacing: 1.5px;
  line-height: 1;
  text-align: center;
}

.flexbox {
  background: linear-gradient(155deg, #55c7ed, #2bb3e0, #3bc1ed);
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search {
  margin: 10px;
}

.search > h3 {
  font-weight: normal;
}

.search > h1,
.search > h3 {
  color: white;
  margin-bottom: 15px;
  text-shadow: 0 1px #0091c2;
}

.search > div {
  display: inline-block;
  filter: drop-shadow(0 1px #0091c2);
}

.search > div:after {
  content: "";
  background: white;
  width: 4px;
  height: 20px;
  top: 40px;
  right: 2px;
  transform: rotate(135deg);
}

.search > div > input {
  color: white;
  font-size: 16px;
  background: transparent;
  width: 25px;
  height: 25px;
  padding: 10px;
  border: solid 3px white;
  outline: none;
  border-radius: 35px;
  transition: width 0.5s;
}

.search > div > input::placeholder {
  color: #efefef;
  opacity: 0;
  transition: opacity 150ms ease-out;
}

.search > div > input:focus::placeholder {
  opacity: 1;
}

.search > div > input:focus,
.search > div > input:not(:placeholder-shown) {
  width: 250px;
}
</style>
