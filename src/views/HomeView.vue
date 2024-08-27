<template>
  <div id="home" class="container">
    <RecentPostsContainer />
    <ListLayout>
      <template v-slot:list-wrapper>
        <PostCard />
      </template>
    </ListLayout>
  </div>
</template>

<script>
import RecentPostsContainer from "../components/RecentPostComp.vue";
import ListLayout from "@/components/ListLayout.vue";
import PostCard from "@/components/PostCardComp.vue";
export default {
  name: "HomeView",
  components: {
    RecentPostsContainer,
    ListLayout,
    PostCard,
  },
};
</script>
<style scoped></style>
