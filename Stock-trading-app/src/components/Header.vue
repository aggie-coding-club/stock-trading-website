<!-- Header for all pages: Will, Keeney -->

<script>
export default {};
</script>

<template>
  <div class="Navbar">
    <ul>
      <li style="float: left"><a href="/">StockSim</a></li>
      <li style="float: right" :class="this.$route.name == 'user' ? 'active' : ''">
        <a id="login" href="\user">Log In</a>
      </li>
      <li style="float: right" :class="this.$route.name == 'trade' ? 'active' : ''">
        <a id="trading" href="\trade">Trading</a>
      </li>
      <li style="float: right" :class="this.$route.name == 'portfolio' ? 'active' : ''">
        <a id="portfolio" href="\portfolio">Portfolio</a>
      </li>
      <li style="float: right" :class="this.$route.name == 'home' ? 'active' : ''">
        <a id="home" href="\">Home</a>
      </li>
    </ul>
  </div>
</template>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}

.active {
  background-color: #800020;
}
</style>
