import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDFcXiGK1LQJDj1bkJN10bjKAflKNN3n3I",
  authDomain: "vue-stuff-a1a86.firebaseapp.com",
  databaseURL: "https://vue-stuff-a1a86-default-rtdb.firebaseio.com",
  projectId: "vue-stuff-a1a86",
  storageBucket: "vue-stuff-a1a86.appspot.com",
  messagingSenderId: "200012668110",
  appId: "1:200012668110:web:18c8c5d167d14eb46dc49f",
  measurementId: "G-31C594NLNQ",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
