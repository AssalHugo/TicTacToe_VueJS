<script>
import {register} from "@/services/httpClient.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: null,
    };
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.error = "Les mots de passe ne correspondent pas";
        return;
      }
      register(this.email, this.password)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Page d'inscription</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" id="email" v-model="email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold mb-2">Mot de passe</label>
          <input type="password" id="password" v-model="password" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-700 font-bold mb-2">Confirmer le mot de passe</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div class="mb-4">
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">S'inscrire</button>
        </div>
        <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>