<script>
import NomsJoueurs from "@/components/NomsJoueurs.vue";
import { getGame } from "@/services/httpClient.js";
import TourJoueur from "@/components/TourJoueur.vue";
import PlateauJeu from "@/components/PlateauJeu.vue";

export default {
  name: "Game",
  components: { PlateauJeu, TourJoueur, NomsJoueurs },
  data() {
    return {
      game: null,
      currentPlayer: null,
      players: {
        player1: null,
        player2: null
      }
    };
  },

  mounted() {
    // On récupère le game grâce à l'id de la route
    const id = this.$route.params.id;
    getGame(id)
        .then((response) => {
          this.game = response;
        })
        .catch((error) => {
          this.error = error;
        });
  },

  methods: {
    updateGameInfo(info) {
      this.currentPlayer = info.currentPlayer;
      this.players = info.players;
    }
  }
};
</script>

<template>
  <div v-if="game" class="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto space-y-6">
    <div class="flex justify-between items-center">
      <NomsJoueurs :game="game" class="flex-1 text-gray-800"/>
      <TourJoueur :currentPlayer="currentPlayer" :players="players" class="flex-1 text-right text-gray-800"/>
    </div>
    <PlateauJeu :game="game" @update-game-info="updateGameInfo" class="border border-gray-300 rounded-lg p-4"/>
  </div>

  <div v-else class="flex items-center justify-center min-h-screen">
    <p class="text-gray-500 text-lg">Chargement...</p>
  </div>
</template>

<style scoped>
.flex-1 {
  flex: 1;
}

.text-right {
  text-align: right;
}
</style>
