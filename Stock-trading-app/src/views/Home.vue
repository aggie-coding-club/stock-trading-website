<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import HomeTable from "../components/HomeTable.vue";
import Heading from "../components/Heading.vue";
import GraphsTemplate from "../components/GraphsTemplate.vue";
</script>

<template>
  <Header />
  <Heading />
  <div class="main">
    <HomeTable />
    <GraphsTemplate :data="[1, 2, 3, 4]" :labels="['jan', 'feb', 'march', 'april']" />
  </div>
  <Footer />
</template>

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
</style>
