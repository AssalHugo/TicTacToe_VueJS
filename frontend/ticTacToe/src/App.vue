<script setup>
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header class="bg-blue-500 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold">Tic Tac Toe</RouterLink>
      <nav>
        <RouterLink to="/login" class="mr-4">Connexion</RouterLink>
        <RouterLink to="/register">Inscription</RouterLink>
      </nav>
    </div>
  </header>


  <RouterView/>
</template>

<style>
</style>
