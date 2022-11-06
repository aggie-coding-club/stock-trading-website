<template>
    <div class="lineChart">
      <div class="chartAndButtonsContainer">
        <form action="" id="stockSymbolSearchForm" @submit.prevent="createStockPriceHistoryChartInSpecifiedDateHistoryRange(10000000000000000000000000)">
          <input type="text" name="stockSymbolSearch" placeholder="Enter the symbol of the stock you want to search" id="stockSymbolSearchBar" v-model="stockSymbol">
          <button type="submit" class="submit">Search</button>
        </form>
        <br>
        <p>Active Stock Symbol: {{ stockSymbol }}</p>
        <br>
        <div class="dateRangeButtons">
          <button @click="createStockPriceHistoryChartInSpecifiedDateHistoryRange(86400)">1 day</button>
          <button @click="createStockPriceHistoryChartInSpecifiedDateHistoryRange(604800)">1 week</button>
          <button @click="createStockPriceHistoryChartInSpecifiedDateHistoryRange(2630000)">1 month</button>
          <button @click="createStockPriceHistoryChartInSpecifiedDateHistoryRange(31536000)">1 year</button>
          <button @click="createStockPriceHistoryChartInSpecifiedDateHistoryRange(157680000)">5 years</button>
          <button @click="createStockPriceHistoryChartInSpecifiedDateHistoryRange(10000000000000000)">MAX</button>
        </div>
        <div id="chartContainer">
          <canvas id="myChart" width="400px" height="400px"></canvas>
        </div>
      </div>
    </div>
</template>
    
<script>
    import { ref, computed } from 'vue';
    import Chart from 'chart.js/auto';
    import axios from 'axios';
    let stockMarketHistory = [];
    let stockMarketHistoryDates = [];
    let stockMarketHistoryEpochDates = [];
    let stockMarketHistoryPrices = [];
    let myChart;
    myChart;
    export default {
      name: 'LineChart',
      mounted() {
        this.createStockPriceHistoryChartInSpecifiedDateHistoryRange(23423423423423423423423423234)
        this.updateStockPriceHistoryChart();
      },
      setup() {
        let updateStockPriceHistoryChart = () => {
          const ctx = document.getElementById('myChart');
          const labels = stockMarketHistoryDates;
          const data = {
            labels: labels,
            datasets: [{
              label: 'Stock Market Price',
              data: stockMarketHistoryPrices,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0,
              options: {
                responsive: true,
                maintainAspectRatio: false,
              }
            }]
          }
          const chartWithKey = Chart.getChart('myChart');
          if (chartWithKey != undefined) {
            chartWithKey.destroy();
          }
          myChart = new Chart(ctx, {
            type: 'line',
            data: data,
          })
        }
        let stockSymbol = ref('IBM');
        let AlphaVantageAPI_URL_LINK = computed(() => {
          return 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + stockSymbol.value + '&apikey=6S3XWKYVUZIUJZEF'
        }); 
        console.log(AlphaVantageAPI_URL_LINK.value);
        let createStockPriceHistoryChartInSpecifiedDateHistoryRange = (dateRange) => {
          
          // empty array if something already in there
          if (stockMarketHistoryDates.length > 0) {
            stockMarketHistoryDates = [];
            stockMarketHistoryEpochDates = [];
            stockMarketHistoryPrices = [];
          }
          axios.get(AlphaVantageAPI_URL_LINK.value)
            .then(response => {
              stockMarketHistory = response;
              dateRange
              console.log(stockMarketHistory.data["Monthly Adjusted Time Series"]);
              for (const property in stockMarketHistory.data["Monthly Adjusted Time Series"]) {
                let closingPrice = stockMarketHistory.data["Monthly Adjusted Time Series"][property]["4. close"];
                let closingDateMonth = property.split('-')[1];
                let closingDateYear = property.split('-')[0];
                let closingDateDay = property.split('-')[2];
                let closingDateProperlyFormatted = `${closingDateMonth}/${closingDateDay}/${closingDateYear}`;
                let closingDateEpochTime = Date.parse(closingDateProperlyFormatted)/1000;
                // console.log(closingDateEpochTime)
                stockMarketHistoryDates.unshift(closingDateProperlyFormatted);
                stockMarketHistoryEpochDates.unshift(closingDateEpochTime);
                stockMarketHistoryPrices.unshift(closingPrice);
              }
            })
            .then(() => {
              let now = Date.now()/1000;
              let dateRangeDate = now - dateRange;
              const isLaterDateThanDateRangeDate = (date) => {
                return date > dateRangeDate;
              }
              let arrayIndexWhereDateIsLargerThanDateRangeDate = stockMarketHistoryEpochDates.findIndex(isLaterDateThanDateRangeDate);
              stockMarketHistoryDates.splice(0, arrayIndexWhereDateIsLargerThanDateRangeDate);
              stockMarketHistoryPrices.splice(0, arrayIndexWhereDateIsLargerThanDateRangeDate);
              updateStockPriceHistoryChart();
            });
        }
        return {
          stockSymbol, 
          updateStockPriceHistoryChart,
          createStockPriceHistoryChartInSpecifiedDateHistoryRange,
        }
      }
    }
</script>
    
    <style scoped>
    #chartContainer {
      width: 1000px;
      height: 300px;
      margin: 0 auto;
    }
    #stockSymbolSearchBar {
      padding: 10px;
    }
    #stockSymbolSearchForm .submit {
      padding: 10px 20px;
    }
    .dateRangeButtons button {
      padding: 10px 20px;
      margin: 2px;
    }
    </style>