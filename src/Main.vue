<template >
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="#">4Pic1Cy</a>
    <small>Welcome,</small>
    &nbsp;
    {{Object.keys(user).length === 0 && user.constructor === Object?
    "": user.getBasicProfile().getName()}}
  </nav>
  <div id="page-container">
    <div id="content-wrap">
      <router-view></router-view>
    </div>

    <footer id="footer" class="py-4 bg-dark text-white-50">
      <div class="container text-center">
        <small>Copyright TheDevDiaries</small>
      </div>
    </footer>
  </div>
</template>

<script>
import userUsers from "./state/users.js";
export default {
  data() {
    const { user } = userUsers();
    return {
      user
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-brand,
.navbar-brand:hover {
  font-size: xx-large;
  color: white;
}
#page-container {
  position: relative;
  min-height: 100vh;
}
.navbar-brand:focus {
  color: white;
}
.navbar,
footer {
  background-color: #250069 !important;
  color: white !important;
}
#content-wrap {
  padding-bottom: 8rem; /* Footer height */
}
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5rem;
}
.navbar a {
  color: white;
  font-weight: bolder;
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
.collapse {
  color: white;
}
</style>
