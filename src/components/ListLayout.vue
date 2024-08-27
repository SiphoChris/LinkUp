<template>
  <div class="list container-fluid">
    <div class="row flex-row">
      <slot name="list-wrapper"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListLayout",
};
</script>

<style scoped>
.list {
  padding: 1rem;
}
</style>
