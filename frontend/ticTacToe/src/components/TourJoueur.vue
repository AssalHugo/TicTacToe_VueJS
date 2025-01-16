<script>
import {fetchPlayerTour} from "@/services/GameService.js";

export default {
  name: "TourJoueur",
  props: {
    game: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      gamePlayerTour: JSON.parse(localStorage.getItem('gamePlayerTour')) || {}
    };
  },

  mounted() {
    //Si le tour du joueur n'est pas déjà enregistré, on le récupère
    if (!this.gamePlayerTour[this.game.id] || !this.gamePlayerTour[this.game.id].playerTour) {
      this.gamePlayerTour[this.game.id] = {};
      fetchPlayerTour(this.game, this.gamePlayerTour);
    }
  }
}
</script>

<template>
  <div class="p-4 bg-gray-100 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">Tour du joueur</h1>
    <p v-if="gamePlayerTour[game.id] && gamePlayerTour[game.id].playerTour" class="text-lg">
      <span class="font-semibold">{{ gamePlayerTour[game.id].playerTour }}</span>
    </p>
    <p v-else-if="!gamePlayerTour[game.id]" class="text-lg">Chargement...</p>
  </div>
</template>

<style scoped>

</style>