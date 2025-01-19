<script>
export default {
  name: "NomsJoueurs",
  props: {
    player1: {
      type: Object,
      required: true
    },
    player2: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="p-4 bg-gray-100 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">Joueurs</h1>
    <p v-if="player1 && player2" class="text-lg">
      <span class="font-semibold">{{ player1.username }}</span>
      <span class="text-gray-500"> vs </span>
      <span class="font-semibold">{{ player2.username }}</span>
    </p>
    <p v-else-if="player1" class="text-lg">
      <span class="font-semibold">{{ player1.username }} est en attente d'un adversaire</span>
    </p>
    <p v-else class="text-lg">Chargement...</p>
  </div>
</template>

<style scoped>
</style>