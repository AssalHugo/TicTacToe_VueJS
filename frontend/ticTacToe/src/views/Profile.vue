<script>
import {getUser} from "@/services/httpClient.js";
import {updateUser} from "@/services/httpClient.js";
import {getUserIdentity, setToken} from "@/services/AuthProvider.js";

export default {
  data() {
    return {
      user: null,
      error: null,
      message: null,
    };
  },
  methods: {
    handleUpdateUser(username, password) {
      updateUser(username, password)
          .then((response) => {
            setToken(response.user.token);
            this.user = response.user;
            this.message = "Profil mis à jour";
          })
          .catch((error) => {
            this.error = error;
          });
    },
  },
  mounted() {
    const userID = getUserIdentity().id;
    getUser(userID)
        .then((response) => {
          this.user = response;
        })
        .catch((error) => {
          this.error = error;
        });
  },
}
</script>

<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <div v-if="user">
      <h1 class="text-2xl font-bold mb-6 text-center">Modifier profil</h1>
      <form @submit.prevent="handleUpdateUser(user.username, user.password)">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-bold mb-2">Nom d'utilisateur</label>
          <input type="text" id="username" v-model="user.username" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-bold mb-2">Nouveau mot de passe</label>
          <input type="password" id="password" required
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div class="mb-4">
          <button type="submit"
                  class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Mettre à jour
          </button>
        </div>
        <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
        <div v-if="message" class="text-green-500 text-center">{{ message }}</div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>