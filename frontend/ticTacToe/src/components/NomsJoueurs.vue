<script>
import {fetchPlayerNames} from "@/services/GameService.js";

export default {
  name: "NomsJoueurs",
  props: {
    game: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      gamePlayersNames: JSON.parse(localStorage.getItem('gamePlayersNames')) || {}
    };
  },

  mounted() {
    //Si les noms des joueurs ne sont pas déjà enregistrés, on les récupère
    if (!this.gamePlayersNames[this.game.id] || !this.gamePlayersNames[this.game.id].player1Name || !this.gamePlayersNames[this.game.id].player2Name) {
      this.gamePlayersNames[this.game.id] = {};
      fetchPlayerNames(this.game, this.gamePlayersNames);
    }
  }
}
</script>

<template>
  <div class="p-4 bg-gray-100 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">Joueurs</h1>
    <p v-if="gamePlayersNames[game.id] && gamePlayersNames[game.id].player1Name && gamePlayersNames[game.id].player2Name"
       class="text-lg">
      <span class="font-semibold">{{ gamePlayersNames[game.id].player1Name }}</span>
      <span class="text-gray-500"> vs </span>
      <span class="font-semibold">{{ gamePlayersNames[game.id].player2Name }}</span>
    </p>
    <p v-else-if="gamePlayersNames[game.id] && gamePlayersNames[game.id].player1Name" class="text-lg">
      <span class="font-semibold">{{ gamePlayersNames[game.id].player1Name }} est en attente d'un adversaire</span>
    </p>
    <p v-else-if="!gamePlayersNames[game.id]" class="text-lg">Chargement...</p>
  </div>
</template>

<style scoped>

</style>