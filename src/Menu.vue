<template>
  <h1>{{number}}</h1>
  {{ test ? "true" : "false" }}
  {{users}}
  <button @click="onClick">CLICK ME TO CHANGE NUMBER OMG</button>
  <div id="menu">
    <img id= "logo" src="https://res.cloudinary.com/dk2ghb1pg/image/upload/v1535301733/bxoyfrkj4zwtbsewcryf.png" class="rounded mx-auto d-block" alt="...ds" />
    <p>Some looooooooooooonnngggggggggg instructions...</p>
    <button type="button" class="btn menu-btn btn-lg">Start</button>
    <br />
    <button type="button" class="btn menu-btn btn-lg">Highscores</button>
    <br />
  </div>
</template>

<script>
import userUsers from "./state/users.js";

export default {
  data() {
    const { users } = userUsers();
    return {
      number: Math.random(),
      test: true,
      users
    };
  },
  methods: {
    onChui: () => {
      console.log(this);
      this.number = Math.random();
    },
    onClick: function() {
      this.test = false;
    }
  }
};
</script>

<style>
#menu #logo{
  max-height: 20em;
  max-width: 20em;
}
#menu {
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
</style>