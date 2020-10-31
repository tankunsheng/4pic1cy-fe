
<template>
  <div id="menu-container">
    <div id="main-menu" class="menu-sections">
      <img id="logo" src="https://prod-4pic1cy-images.s3-ap-southeast-1.amazonaws.com/4pic1cy.png" />
      <p>
        4Pic1Cy (pronounced as "4Pixie"), also known as 4 Pictures 1 Cheng Yu (成语),
        is a pictorial word guessing game much like the famous 4Pic1Word games.
      </p>
      <p>The game keeps track of your progress, sign in to start playing!</p>
      <button
        type="button"
        class="btn menu-btn btn-lg"
        @click="startGame"
        :disabled="startDisabled"
      >Start</button>
      <br />
      <button type="button" class="btn menu-btn btn-lg" @click="scrollto">Highscores</button>
      <br />
      <div id="google-signin-btn"></div>
    </div>
    <hr />
    <div id="highscores" class="menu-sections">
      <img id="logo" src="../assets/trophy.png" />
      <h1>Highscores</h1>

      <div class="offset-md-4 col-md-4">
        <DataTable
          :value="highscores"
          class="p-datatable-sm p-datatable-gridlines"
          rowIndexVar="index"
        >
          <Column field="username" header="Player" headerStyle="width: 70%">
            <template #body="slotProps">
              <span v-html="renderTop3Icons(slotProps.index)" style="margin-right:15px"></span>
              <b>{{slotProps.data.username}}</b>
            </template>
          </Column>
          <Column field="score" header="Score" headerStyle="width: 30%"></Column>
        </DataTable>
      </div>
    </div>
    <hr />
    <div class="menu-sections">
      <h1>TODOs</h1>
      <p>
        Google Login
        <b>(done)</b>
      </p>
      <p>
        Setup and deploy basic backend
        <b>(done)</b>
      </p>
      <p>
        Fetch 1 question from backend
        <b>(done)</b>
      </p>
      <p>
        Start game and display 1 question
        <b>(done)</b>
      </p>
      <p>
        Submit answer and check in backend
        <b>(done)</b>
      </p>
      <p>
        Cycle questions
        <b>(done)</b>
      </p>
      <p>
        Deploy frontend with Netlify
        <b>(done)</b>
      </p>

      <p>
        Show highscore
        <b>(done)</b>
      </p>
      <p>
        Design logo and placement in Menu
        <b>(done)</b>
      </p>
      <p>
        Improve UI, display username, footer, image borders
        <b>(done)</b>
      </p>
      <p>
        Input 10 questions for game
        <b>(done)</b>
      </p>
      <p>
        Sign in before being able to start game (consider alternatives)
        <b>(done)</b>
      </p>
      <p>
        Cheng Yu explanation
        <b></b>
      </p>
      <p>
        wrong/correct answer feedback
        <b>(done)</b>
      </p>
      <p>
        highscores sorting and top 3 styling
        <b>(done)</b>
      </p>
      <p>
        Encode or encrypt image names
        <b>(done)</b>
      </p>
      <p>
        Clues and Hints feature, reveal one character
        <b>(doing)</b>
      </p>
      <p>
        Share on social media
        <b></b>
      </p>
      <p>Handle token timeout and refresh</p>
    </div>
  </div>
</template>

<script>
/* eslint no-use-before-define: 0 */

import userUsers from "../state/users.js";
import { API } from "aws-amplify";
function register(token) {
  return API.put("4Pic1Cy", "/players", {
    body: token
  });
}
function getPlayer(token) {
  return API.get("4Pic1Cy", `/players/${token}`);
}
function getPlayerHighscores() {
  return API.get("4Pic1Cy", `/players`);
}
export default {
  data() {
    const { user, setUser } = userUsers();
    const highscores = [];
    const startDisabled = true;
    return {
      user,
      setUser,
      highscores,
      startDisabled,
      messages: [],
    };
  },
  methods: {
    renderTop3Icons: function(pos) {
      let icon = "gold";
      if (pos === 1) {
        icon = "silver";
      } else if (pos === 2) {
        icon = "brown";
      }
      return `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trophy-fill" fill="${icon}" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/></svg>`;
    },
    startGame: function() {
      if (!this.startDisabled) {
        this.$router.push("/game");
      }
    },
    scrollto: function() {
      // get the element on the page related to the button
      // var scrollToId = document.getElementById("highscores").getAttribute("data-scroll");
      var e = document.getElementById("highscores");
      // make the page scroll down to where you want
      if (!!e && e.scrollIntoView) {
        e.scrollIntoView();
      }
      // ...
    },
    loadHighscores: async function() {
      const highscores = await getPlayerHighscores();
      // console.log(highscores);
      this.highscores = highscores;
      console.log(this.highscores);
    },
    onSignIn: async function(googleUser) {
      this.startDisabled = false;
      // var profile = googleUser.getBasicProfile();
      // console.log("Name: " + profile.getName());

      //https://developers.google.com/identity/sign-in/web/backend-auth
      //https://stackoverflow.com/questions/53622075/what-prevents-another-app-from-stealing-my-google-oauth-client-id
      // The ID token you need to pass to your backend:
      const token = googleUser.getAuthResponse().id_token;
      // console.log(googleUser.getAuthResponse().expires_in);
      // console.log(token);

      //check user exists before call
      const player = await getPlayer(token);
      if (!player) {
        register({ token });
      }

      // testget({ token });
      // googleUser.reloadAuthResponse().then(test => {
      //   console.log(test.id_token);
      //   console.log(test.expires_in);
      // });
      // console.log(this.user);
      this.setUser(googleUser, googleUser.getAuthResponse());
    }
  },
  mounted() {
    this.loadHighscores();
    document
      .getElementById("main-menu")
      .setAttribute("style", `min-height:${window.screen.height - 100}px`);
    document
      .getElementById("highscores")
      .setAttribute("style", `min-height:${window.screen.height - 100}px`);
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
        onsuccess: this.onSignIn
      });
    });
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Source+Sans+Pro:wght@200&display=swap");
html {
  scroll-behavior: smooth;
}
h1,
button,
.navbar {
  font-family: "Cinzel Decorative", cursive;
  font-weight: bolder;
}
footer {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.5em;
  font-weight: 1000;
}
#main-menu > p {
  font-family: "Source Sans Pro", sans-serif;
  font-size: 1.5em;
  font-weight: 1000;
  margin-bottom: 2em;
}
th {
  background-color: #673db5 !important;
  font-family: "Cinzel Decorative", cursive;
  color: white !important;
}
#google-signin-btn {
  margin: 0 auto;
  width: 9em;
}
.abcRioButton {
  min-width: 9em;
}
#menu-container #logo {
  max-height: 23em;
  max-width: 23em;
}
#menu-container {
  text-align: center;
}
.menu-btn {
  background-color: #401f7c;
  color: white;
  margin-bottom: 1em;
  min-width: 9em;
}
.menu-btn:hover {
  background-color: #e5d7ff;
  color: black;
  font-weight: bold;
}
.menu-sections {
}
</style>