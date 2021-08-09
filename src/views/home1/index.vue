<template>
  <div>
    <HelloWorld></HelloWorld>
    <a-button type="primary"> antd测试 </a-button>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    click() {
      this.$http.post("/wlh").then(res => {
        console.log(res);
      });
    }
  },
  mounted() {}
};
</script>

<style></style>
