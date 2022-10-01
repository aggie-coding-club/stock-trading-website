<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
</style>

<script>
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyDFcXiGK1LQJDj1bkJN10bjKAflKNN3n3I",
    authDomain: "vue-stuff-a1a86.firebaseapp.com",
    databaseURL: "https://vue-stuff-a1a86-default-rtdb.firebaseio.com",
    projectId: "vue-stuff-a1a86",
    storageBucket: "vue-stuff-a1a86.appspot.com",
    messagingSenderId: "200012668110",
    appId: "1:200012668110:web:18c8c5d167d14eb46dc49f",
    measurementId: "G-31C594NLNQ"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

</script>
