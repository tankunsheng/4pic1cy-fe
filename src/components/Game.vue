<template>
  <div id="game-container" class="container-fluid">
    <div class="row">
      <img class="question-pic offset-md-4 col-md-2 shadow p-3" v-bind:src="pictures.first" />
      <img class="question-pic col-md-2 shadow p-3" v-bind:src="pictures.second" />
    </div>
    <div class="row">
      <img class="question-pic offset-md-4 col-md-2 shadow p-3" v-bind:src="pictures.third" />
      <img class="question-pic col-md-2 shadow p-3" v-bind:src="pictures.fourth" />
    </div>
    <div class="row">
      <form class="question-pic offset-md-4 col-md-4">
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
        <button class="qns-extras">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-patch-question"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"
            />
            <path
              fill-rule="evenodd"
              d="M10.273 2.513l-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"
            />
          </svg>
        </button>
        <!-- <button class="qns-extras btn btn-primary" type="button" @click="submitAnswer"><i class="pi pi-check" style="fontSize: 1rem"></i></button> -->
        <!-- <button class="qns-extras btn btn-primary" type="button" @click="submitAnswer">2</button> -->
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
      answerGuide: "_ _ _ _"
    };
  },
  methods: {
    handleMsg: function(severity, msg) {
      this.show = true;
      this.severity = severity;
      this.msg = msg;
    },
    getQns: async function(token) {
      const res = await API.post("4Pic1Cy", "/questions/player", {
        body: token
      });
      const singleQuestion = JSON.parse(res.body);
      this.pictures.first = s3.bucket + singleQuestion.image1;
      this.pictures.second = s3.bucket + singleQuestion.image2;
      this.pictures.third = s3.bucket + singleQuestion.image3;
      this.pictures.fourth = s3.bucket + singleQuestion.image4;
      this.pictures.qId = singleQuestion.qId;
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
</style>

