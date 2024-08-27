<template>
  <div class="recent-posts container shadow-sm">
    <div class="horizontal-scroll py-3">
      <RecentPostCard v-for="index in 10" :key="index" />
    </div>
  </div>
</template>

<script>
import RecentPostCard from './RecentPostCard.vue';
export default {
name : "RecentPostComp",
components : {
  RecentPostCard
}
}
</script>

<style scoped>
.recent-posts {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-padding: 1 rem;
  -webkit-overflow-scrolling: touch; 
}

.horizontal-scroll {
  display: flex;
  gap: 1rem;
  padding: .4rem;
  width: max-content;
}
.horizontal-scroll > * {
  scroll-snap-align: center;
}
.recent-posts::-webkit-scrollbar {
  display: none;
}
.recent-posts {
  scrollbar-width: none;
}
</style>