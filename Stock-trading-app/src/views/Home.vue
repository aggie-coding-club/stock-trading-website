<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import HomeTable from "../components/HomeTable.vue";
import Heading from "../components/Heading.vue";

</script>

<template>
  <Header />
  <Heading />
  <HomeTable />
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
</style>
