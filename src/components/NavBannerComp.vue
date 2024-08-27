<template>
  <div class="nav-banner container-fluid py-3 px-5 shadow-sm">
    <div class="row">
      <div class="img-container d-flex justify-content-start">
        <img src="../assets/logo.svg" alt="logo" id="logo" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBannerComp",
};
</script>

<style scoped>
#logo {
  width: 60px;
  aspect-ratio: 1;
}

@media screen and (max-width: 330px) {
  #logo {
    width: 40px;
    aspect-ratio: 1;
  }
  .nav-banner {
    padding: 1rem !important;
  }
}
</style>
