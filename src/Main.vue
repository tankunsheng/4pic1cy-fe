<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="#">4Pic1Cy</a>
  </nav>
  <router-view></router-view>
</template>

<script>
import userUsers from "./state/users.js";
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
