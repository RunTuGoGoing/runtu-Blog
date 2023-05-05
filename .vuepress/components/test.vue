<template>
  <button @click="handleReset">重置</button>
</template>

<script>
export default {
  data() {
    return {
      queryParams: {
        name: "",
        age: "",
        work: "",
      },
    };
  },
  methods: {
    handleReset() {
      this.queryParams = this.$options.data().queryParams;
    },
  },
};
</script>

<style scoped></style>
