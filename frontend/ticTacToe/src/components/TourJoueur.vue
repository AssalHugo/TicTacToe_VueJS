<script>
export default {
  name: "TourJoueur",
  props: {
    currentPlayer: {
      required: true
    },
    players: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="p-4 bg-gray-100 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">Tour du joueur</h1>
    <p class="text-lg" v-if="currentPlayer && players.player1 && players.player2">
      <span class="font-semibold">{{ currentPlayer === players.player1.id ? players.player1.username : players.player2.username }}</span>
    </p>
  </div>
</template>

<style scoped>
</style>