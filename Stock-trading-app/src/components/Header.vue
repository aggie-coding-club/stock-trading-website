<!-- Header for all pages: Will, Keeney -->

<script>

    export default {
        // props: ['page'],
        // created() {
        //     // props are exposed on `this`
        //     console.log(this.page);
        //     // if (true) {
        //     //     console.log(this.$ref.home1); 
        //     // }
        // },

        // mounted: function() {
        //     console.log(this.$ref.home); //deleted reference
        // }
    }

</script>

<template>
    <div class="Navbar">

        <ul>
            <li style="float:right"><a id="home" href="\">Home</a></li>
            <li style="float:right"><a id="portfolio" href="\portfolio">Portfolio</a></li>
            <li style="float:right"><a id="trading" href="\trade">Trading</a></li>
            <li style="float:right"><a id="login" href="\user">Log In</a></li>
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