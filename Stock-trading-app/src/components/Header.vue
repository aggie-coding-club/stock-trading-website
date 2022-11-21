<!-- Header for all pages: Will, Keeney -->

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, onSnapshot, setDoc, getDocFromCache, getDoc } from "firebase/firestore";
firebaseConfig;
const provider = new GoogleAuthProvider();
const auth = getAuth();
export default {
  methods: {
    googleSignIn() {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const uid = result.user.uid;
          this.$store.state.userID = uid;
          this.$store.state.user_name = result.user;
          this.$store.state.login = true;
          await this.createUser();
        })
        .catch((e) => {
          console.log("Error buddy");
          console.log(e);
        });
    },

    async connectDB() {
      const firebaseConfig = this.$store.state.firebaseConfig;

      const app = initializeApp(firebaseConfig);

      const db = getFirestore(app);
      this.database = db;
    },

    async createUser() {
      const docRef = doc(this.database, "users", this.$store.state.userID);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.getData();
      } else {
        await setDoc(doc(this.database, "users", this.$store.state.userID), {
          balance: 1000,
          stocks: {},
        });
        this.getData();
      }
    },

    getData() {
      onSnapshot(collection(this.database, "users"), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id == this.$store.state.userID) {
            this.$store.state.userData = doc.data();
          }
        });
      });
    },
  },

  async mounted() {
    await this.connectDB();
  },
};
</script>

<template>
  <div class="Navbar">
    <ul>
      <li style="float: left"><router-link to="/">StockSim</router-link></li>
      <li style="float: right" :class="this.$route.name == 'user' ? 'active' : ''">
        <a v-if="!this.$store.state.userID" id="login" @click="googleSignIn">Log In</a>
        <a v-else id="logout" @click="googleSigOut">Signed Out</a>
      </li>
      <li style="float: right" :class="this.$route.name == 'trade' ? 'active' : ''">
        <router-link to="/trade">Trading</router-link>
      </li>
      <li style="float: right" :class="this.$route.name == 'portfolio' ? 'active' : ''">
        <router-link to="/portfolio">Portfolio</router-link>
      </li>
      <li style="float: right" :class="this.$route.name == 'home' ? 'active' : ''">
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="this.$store.state.userID != ''" style="float: right" class="balance">
        <router-link to="/">${{ this.$store.state.userData.balance }}</router-link>
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

.balance {
}
</style>
