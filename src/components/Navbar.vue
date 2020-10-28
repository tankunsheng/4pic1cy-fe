<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="#">4Pic1Cy</a>
    <!-- <button
      @click="load"
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button> -->

    <!-- <button
      @click="load"
    >
     test
    </button>-->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">
            Home
            <!-- {{users}} -->
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import userUsers from "../state/users.js";
export default {
  data() {
    const { users, load } = userUsers();
    return {
      users,
      load
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  background-color: #401f7c;
}
.navbar a {
  
  color:white;
  font-weight:bolder
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
