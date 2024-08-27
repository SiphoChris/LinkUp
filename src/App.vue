<template>
  <div id="app-view">
    <HomeView />
    <router-view />
    <FooterComp />
  </div>
</template>
<script>
import FooterComp from "./components/FooterComp.vue";

export default {
  name: "App",
  components: {
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
