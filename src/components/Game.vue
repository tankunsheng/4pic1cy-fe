
<template>
  <div id="game-container" class="container-fluid">
    <div class="row">
      <img
        class="question-pic offset-md-4 offset-1 col-md-2 col-5 shadow p-3"
        v-show="imageloading"
        :src="imageloadingImg"
      />
      <img
        v-show="!imageloading"
        class="question-pic offset-md-4 offset-1 col-md-2 col-5 shadow p-3"
        v-bind:src="pictures.first"
      />
      <img
        class="question-pic col-5 shadow p-3"
        v-show="imageloading"
        :src="imageloadingImg"
      />
      <img
        v-show="!imageloading"
        class="question-pic col-md-2 col-5 shadow p-3"
        v-bind:src="pictures.second"
      />
    </div>
    <div class="row">
      <img
        v-show="imageloading"
        :src="imageloadingImg"
        class="question-pic offset-md-4 offset-1 col-md-2 col-5  shadow p-3"
      />
      <img
        v-show="imageloading"
        :src="imageloadingImg"
        class="question-pic col-md-2 col-5  shadow p-3"
      />
      <img
        v-show="!imageloading"
        class="question-pic offset-md-4 offset-1 col-md-2 col-5  shadow p-3"
        v-bind:src="pictures.third"
      />
      <img
        v-show="!imageloading"
        class="question-pic col-md-2 col-5  shadow p-3"
        v-bind:src="pictures.fourth"
      />
    </div>
    <div class="row">
      <form v-on:submit.prevent="formSubmit" class="question-pic offset-md-4 col-md-4">
        <span show="true" style="font-size:xx-large">{{answerGuide}}</span>
        <br />
        <div class="form-group">
          <input
            style="font-size: 26px; text-align:center"
            type="text"
            class="form-control"
            maxlength="4"
            placeholder="_ _ _ _"
            v-model="answer"
          />

          <small>This is simple. Make a guess come'on</small>
        </div>

        <button id="submitBtn" type="button" class="btn btn-primary" @click="submitAnswer">SUBMIT</button>
        <Button
          icon="pi pi-bell"
          class="qns-extras p-button-rounded p-button-help"
          type="button"
          :disabled="hintRevealed"
          @click="getHint(true)"
          v-tooltip="'Click to receive a hint!'"
        />

        <br />
        <Message :severity="severity" v-show="show" :closable="false">{{msg}}</Message>
      </form>
    </div>
  </div>
</template>

<script>
import userUsers from "../state/users.js";
import { API } from "aws-amplify";
import { s3 } from "../config.js";

export default {
  data() {
    const { user, authInfo } = userUsers();
    const pictures = {
      first: "",
      second: "",
      third: "",
      fourth: "",
      qId: ""
    };
    const show = false;
    const answer = "";
    return {
      user,
      authInfo,
      pictures,
      answer,
      show,
      severity: "warn",
      msg: "",
      answerGuide: "_ _ _ _",
      hintRevealed: false,
      imageloading: true,
      imageloadingImg: "https://prod-4pic1cy-images.s3-ap-southeast-1.amazonaws.com/4pic1cy-loading.gif"
    };
  },
  methods: {
    formSubmit: function() {
      this.submitAnswer();
    },
    getHint: async function(createHintIfNotExist) {
      const hint = await API.get(
        "4Pic1Cy",
        `/players/${this.authInfo.id_token}/${this.pictures.qId}/${createHintIfNotExist}`
      );
      this.hintRevealed = hint.success;
      this.showHint(hint);
    },
    showHint: function(hint) {
      const answerGuideArr = ["_", "_", "_", "_"];
      answerGuideArr[hint.pos] = hint.hint;
      this.answerGuide = answerGuideArr.join(" ");
    },
    handleMsg: function(severity, msg) {
      this.show = true;
      this.severity = severity;
      this.msg = msg;
    },
    getQns: async function(token) {
      try {
        const res = await API.post("4Pic1Cy", "/questions/player", {
          body: token
        });
        setTimeout(() => {
          this.imageloading = false;
          const singleQuestion = JSON.parse(res.body);
          this.pictures.first = s3.bucket + singleQuestion.image1;
          this.pictures.second = s3.bucket + singleQuestion.image2;
          this.pictures.third = s3.bucket + singleQuestion.image3;
          this.pictures.fourth = s3.bucket + singleQuestion.image4;
          this.pictures.qId = singleQuestion.qId;
          this.getHint(false);
        }, 1100);
      } catch (e) {
        console.log(e);
        window.location.replace("#?refresh=true");
      }
    },
    submitAnswer: async function() {
      const payload = {
        token: this.authInfo.id_token,
        qId: this.pictures.qId,
        answer: this.answer
      };
      const resp = await API.post("4Pic1Cy", "/questions", {
        body: payload
      });
      if (resp.result) {
        this.getQns({ token: this.authInfo.id_token });
        this.answer = "";
        this.handleMsg("success", "CORRECT ANSWER!");
         this.imageloading = true;
      } else {
        this.handleMsg("warn", "WRONG ANSWER!");
      }
      let intervalReference = setInterval(() => {
        this.show = false;
        clearInterval(intervalReference);
      }, 1500);
    }
  },
  mounted() {
    this.getQns({ token: this.authInfo.id_token });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#game-container {
  text-align: center;
}
#submitBtn {
  min-width: 10em;
  background-color: #250069 !important;
}
.qns-extras {
  float: right;
  /* background-color: #250069 !important; */
}
.question-pic {
  object-fit: cover;
  width: 100%;
  height: 250px;
  margin-top: 1em;
  margin-right: 1em;
}

img:before {
  content: " ";
  display: block;
  position: absolute;
  height: 50px;
  width: 50px;
  background-image: url(https://i.redd.it/w3kr4m2fi3111.png);
}
</style>

