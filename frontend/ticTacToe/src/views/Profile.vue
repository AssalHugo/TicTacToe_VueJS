<script>
import {getUser} from "@/services/httpClient.js";
import {updateUser} from "@/services/httpClient.js";
import {getUserIdentity, setToken} from "@/services/AuthProvider.js";

export default {
  data() {
    return {
      user: null,
      password: '',
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
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div v-if="user">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Modifier profil</h1>
        <form @submit.prevent="handleUpdateUser(user.username, password)" class="space-y-4">
          <div>
            <label for="username" class="block text-gray-700 font-bold mb-1">Nom d'utilisateur</label>
            <input type="text" id="username" v-model="user.username" required
                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label for="password" class="block text-gray-700 font-bold mb-1">Nouveau mot de passe</label>
            <input type="password" id="password" v-model="password" required
                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <button type="submit"
                  class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Mettre à jour
          </button>
          <div v-if="error" class="text-red-500 text-center mt-2">{{ error }}</div>
          <div v-if="message" class="text-green-500 text-center mt-2">{{ message }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>