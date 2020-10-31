<template>
  <div id="game-container" class="container-fluid">
    <div class="row">
      <img class="question-pic offset-md-4 col-md-2" v-bind:src="pictures.first" />
      <img class="question-pic col-md-2" v-bind:src="pictures.second" />
    </div>
    <div class="row">
      <img class="question-pic offset-md-4 col-md-2" v-bind:src="pictures.third" />
      <img class="question-pic col-md-2" v-bind:src="pictures.fourth" />
    </div>
    <div class="row">
      <form class="question-pic offset-md-4 col-md-4">
        <div class="form-group">
          <input
            style="font-size: 26px; text-align:center"
            type="text"
            class="form-control"
            maxlength="4"
            placeholder="_ _ _ _"
            v-model="answer"
          />

          <small>{{answer}}This is simple. Make a guess come'on</small>
        </div>

        <button type="button" class="btn btn-primary" @click="submitAnswer">SUBMIT</button>
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
    const answer = "";
    return {
      user,
      authInfo,
      pictures,
      answer
    };
  },
  methods: {
    getQns: async function(token) {
      const res = await API.post("4Pic1Cy", "/questions/player", {
        body: token
      });
      const singleQuestion = JSON.parse(res.body);
      this.pictures.first = s3.bucket + singleQuestion.image1;
      console.log(singleQuestion);
      this.pictures.second = s3.bucket + singleQuestion.image2;
      this.pictures.third = s3.bucket + singleQuestion.image3;
      this.pictures.fourth = s3.bucket + singleQuestion.image4;
      this.pictures.qId = singleQuestion.qId;
    },
    submitAnswer: async function() {
      console.log(this.answer);
      const payload = {
        token: this.authInfo.id_token,
        qId: this.pictures.qId,
        answer: this.answer
      };
      console.log(payload);
      const resp = await API.post("4Pic1Cy", "/questions", {
        body: payload
      });
      console.log(resp);
      if (resp.result) {
        this.getQns({ token: this.authInfo.id_token });
      }
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
.question-pic {
  object-fit: cover;
  width: 100%;
  height: 270px;
  margin-top: 1.5em;
}
</style>

