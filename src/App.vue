<template>
  <div id="app-view">
    <nav>
      <Nav />
      <TaskBar />
    </nav>
    <router-view />
    <FooterComp />
  </div>
</template>
<script>
import Nav from "./components/NavBannerComp.vue";
import TaskBar from "./components/TaskBarComp.vue";
import FooterComp from "./components/FooterComp.vue";

export default {
  name: "App",
  components: {
    Nav,
    TaskBar,
    FooterComp,
  },
};
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
