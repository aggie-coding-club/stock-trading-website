<!-- Table on the Home page: Marco -->

<script>
import { ApiClient, DefaultApi } from "finnhub";

export default {
  data() {
    return {
      prices: {
        AAPL: 0,
        MSFT: 0,
        TSLA: 0,
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
  },

  mounted() {
    this.connectAPI();
    for (const [ticker, price] of Object.entries(this.prices)) {
      //   this.client.quote(ticker, (error, data, response) => {
      //     this.prices[ticker] = data["c"];
      //   });
    }
  },
};
</script>

<template>
  <div class="Table_Container">
    <Table>
      <thead>
        <tr>
          <th class="Table_Heading">Ticker</th>
          <th class="Table_Heading">Current Price</th>
        </tr>
      </thead>

      <tr v-for="(price, ticker, index) in prices">
        <td class="Table_Ticker">{{ ticker }}</td>
        <td class="Table_Price">${{ price }}</td>
      </tr>
    </Table>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600&display=swap");
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
</style>
