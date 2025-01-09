<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {getUserIdentity} from "@/services/AuthProvider.js";
import {removeToken} from "@/services/AuthProvider.js";

const user = getUserIdentity();
</script>

<template>
  <header class="bg-blue-500 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">

    </div>

    <div v-if="user !== undefined" class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold">Tic Tac Toe</RouterLink>
      <RouterLink to="/" class="text-xl font-bold">Dashboard</RouterLink>
      <RouterLink to="/profile" class="text-xl font-bold">Profile</RouterLink>
      <RouterLink to="/profile">
        <button @click="removeToken"
                class="w-40 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
          Se déconnecter
        </button>
      </RouterLink>
    </div>
    <div v-if="user === undefined" class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold">Tic Tac Toe</RouterLink>
      <RouterLink to="/login" class="text-xl font-bold">Login</RouterLink>
      <RouterLink to="/register" class="text-xl font-bold">Register</RouterLink>
    </div>
  </header>


  <RouterView/>
</template>

<style>
</style>
