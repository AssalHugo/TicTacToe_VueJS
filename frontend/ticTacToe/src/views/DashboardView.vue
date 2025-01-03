<script>
import {getUserIdentity} from "@/services/AuthProvider.js";
import {removeToken} from "@/services/AuthProvider.js";

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logout() {
      removeToken();
      this.$router.push("/login");
    },
  },
  mounted() {
    this.user = getUserIdentity();
  },
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div v-if="user">
        <h1 class="text-2xl font-bold mb-6 text-center">Tableau de bord de <router-link to="/profile" class="text-blue-500 hover:underline">{{ user.username }}</router-link></h1>
        <button @click="logout"
                class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
          Se déconnecter
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>