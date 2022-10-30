<script setup>

import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import HomeTable from "../components/HomeTable.vue";
import Heading from "../components/Heading.vue";
import HomeGraph from '../components/HomeGraph.vue'

</script>

<template>
  <Header />
  <Heading />
  <HomeTable />
  <HomeGraph />
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  background-color: #f0ecec;
}
</style>
