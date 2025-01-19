<script>
import NomsJoueurs from "@/components/NomsJoueurs.vue";
import {getGame} from "@/services/httpClient.js";
import TourJoueur from "@/components/TourJoueur.vue";
import PlateauJeu from "@/components/PlateauJeu.vue";

export default {
  name: "Game",
  components: {PlateauJeu, TourJoueur, NomsJoueurs},
  data() {
    return {
      game: null,
      currentPlayer: null,
      players: {
        player1: null,
        player2: null,
      },
    };
  },

  mounted() {
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
}
</script>

<template>
  <div v-if="game" class="space-y-4">
    <div class="flex justify-between items-center">
      <NomsJoueurs :player1="players.player1" :player2="players.player2" class="flex-1"/>
      <TourJoueur :currentPlayer="currentPlayer" :players="players" class="flex-1 text-right"/>
    </div>
    <PlateauJeu :game="game" @update-game-info="updateGameInfo"/>
  </div>

  <div v-else>
    <p>Chargement...</p>
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