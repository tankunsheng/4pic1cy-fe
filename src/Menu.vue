<template>
  <!-- {{users}} -->
  <div id="menu-container">
    <div class="menu-sections">
      <img
        id="logo"
        src="https://res.cloudinary.com/dk2ghb1pg/image/upload/v1535301733/bxoyfrkj4zwtbsewcryf.png"
        class="rounded mx-auto d-block"
        alt="...ds"
      />
      <p>4Pic1Cy, also known as 4 Pictures 1 Cheng Yu, is a pictorial word guessing game much like the famous 4Pic1Word games.</p>
      <button type="button" class="btn menu-btn btn-lg">Start</button>
      <br />
      <button type="button" class="btn menu-btn btn-lg">Highscores</button>
      <br />
      <div id="google-signin-btn"></div>
    </div>
    <hr />
    <div class="menu-sections">
      <h1>TODOs</h1>
      <p>
        Google Login
        <b>(doing)</b>
      </p>
      <p>
        Setup and deploy basic backend
        <b>(done)</b>
      </p>
      <p>Fetch questions from backend</p>
      <p>Start game and display 1 question</p>
      <p>Store progress in Cookie (without sign in)</p>
      <p>Submit highscore (after google login)</p>
      <p>Cycle questions</p>
    </div>
  </div>
</template>

<script>
import userUsers from "./state/users.js";
import { API } from "aws-amplify";
function register(token) {
  return API.put("4Pic1Cy", "/players", {
    body: token
  });
}
async function testget(token) {
  let test = await API.post("4Pic1Cy", "/questions/player", {
    body: token
  });
  console.log(test);
}
export default {
  data() {
    const { users } = userUsers();
    return {
      users
    };
  },
  methods: {
    onChui: () => {
      console.log(this);
      this.number = Math.random();
    },
    onSignIn: googleUser => {
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

      //https://developers.google.com/identity/sign-in/web/backend-auth
      //https://stackoverflow.com/questions/53622075/what-prevents-another-app-from-stealing-my-google-oauth-client-id
      // The ID token you need to pass to your backend:
      var token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + token);

      register({ token });
      testget({ token });
    }
  },
  mounted() {
    const scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      document.body.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
      script.async = true;
      script.src = "https://apis.google.com/js/platform.js";
    });
    scriptPromise.then(() => {
      gapi.signin2.render("google-signin-btn", {
        // this is the button "id"
        onsuccess: this.onSignIn
      });
    });
  }
};
</script>

<style>
#google-signin-btn {
  margin: 0 auto;
  width: 9em;
}
.abcRioButton {
  min-width: 9em;
}
#menu-container #logo {
  max-height: 20em;
  max-width: 20em;
}
#menu-container {
  text-align: center;
}
.menu-btn {
  background-color: #401f7c;
  color: white;
  margin-bottom: 1em;
  min-width: 7em;
}
.menu-btn:hover {
  background-color: #e5d7ff;
  color: black;
  font-weight: bold;
}
.menu-sections {
  margin-top: 3em;
  margin-bottom: 3em;
}
</style>