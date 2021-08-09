<template>
  <div class="home">
    <h1>demo</h1>
    <a-button type="primary" @click="gotoLogin">跳转登录页</a-button>
  </div>
</template>
<script>
export default {
  name: "sub01Home",
  components: {},
  methods: {
    gotoLogin() {
      history.pushState(null, "", "/login");
    }
  }
};
</script>
