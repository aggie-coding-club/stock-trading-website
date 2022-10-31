<!-- Table on the Home page: Marco -->

<script>
import { ApiClient, DefaultApi } from "finnhub";
import { ref } from "vue";

export default {
  data() {
    return {
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
    Bob(e) {
      var selected = e.target.parentElement.parentElement.getElementsByClassName("selected");
      for (var i = 0; i < selected.length; i++) {
        selected[i].classList.remove("selected");
      }
      e.target.parentElement.classList.add("selected");
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
  },

  mounted() {
    this.connectAPI();
    // for (const [ticker, price] of Object.entries(this.prices)) {
    //   this.client.quote(ticker, (error, data, response) => {
    //     this.prices[ticker] = data["c"];
    //   });
    // }
  },
};
</script>

<template>
  <div class="Table_Container">
    <div class="flexbox">
      <div class="search">
        <div>
          <input v-model="input" type="text" placeholder="Search . . ." />
        </div>
      </div>
    </div>

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
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap");
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
  width: 25%;
  position: relative;
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
  text-align: left;
  color: maroon;
}

.Table_Ticker {
  font-family: "source_sans_prosemibold", Helvetica, Arial, sans-serif;
  letter-spacing: 1.5px;
  line-height: 1;
  text-align: left;
}

.Table_Price {
  font-family: "source_sans_prosemibold", Helvetica, Arial, sans-serif;
  letter-spacing: 1.5px;
  line-height: 1;
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
  position: relative;
  filter: drop-shadow(0 1px #0091c2);
}

.search > div:after {
  content: "";
  background: white;
  width: 4px;
  height: 20px;
  position: absolute;
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
