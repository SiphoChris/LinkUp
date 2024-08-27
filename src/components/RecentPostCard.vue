<template>
  <div class="card">
    <div class="post">
      <span class="text"><slot name="post-body"></slot></span>
    </div>
    <span class="title"><slot name="post-title"></slot></span>
    <span class="profile">
      <slot name="view-more"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "RecentPostCard",
};
</script>

<style scoped>
.card {
  width: 12rem;
  height: 16rem;
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: .5rem;
  padding-bottom: 3.4rem;
  transition: all 120ms;
}

.card::after {
  content: "View More";
  padding-top: .5rem;
  border-radius: 0 0 0.40rem 0.40rem;
  text-align: center;
  position: absolute;
  bottom: -60px;
  background: #00ac7c;
  color: #fff;
  height: 2.5em;
  width: 100%;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0;
  transition: all 80ms;
}

.card .title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  position: absolute;
  left: 0.625em;
  bottom: 1.875em;
  font-weight: 400;
  color: #000;
}

.card .profile {
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 0.9em;
  position: absolute;
  left: 0.625em;
  bottom: 0.625em;
  color: #000;
}

.card:hover::after {
  bottom: 0;
  opacity: 1;
}

.card:active {
  transform: scale(0.98);
}

.text {
  max-width: 55px;
}

.post {
  background: rgb(241, 241, 241);
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
</style>
