<template>
  <button @click="logout" class="logout-btn">Logout</button>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("userCredentials");
      this.$router.push("/login");
    },
  },
};
</script>