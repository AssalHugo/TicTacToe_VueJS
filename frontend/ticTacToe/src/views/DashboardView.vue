<script>
import {getUserIdentity} from "@/services/AuthProvider.js";
import {createGame, deleteGame, getGames, getUser, joinGame} from "@/services/httpClient.js";

export default {
  data() {
    return {
      user: null,
      games: [],
      gamePlayersNames: {}
    };
  },
  methods: {
    createGame() {
      createGame()
          .then(() => {
            this.$router.go();
          })
          .catch((error) => {
            this.error = error;
          });
    },
    deleteGame(id) {
      deleteGame(id)
          .then(() => {
            this.$router.go();
          })
          .catch((error) => {
            this.error = error;
          });
    },
    joinGame(game) {
      if (game.status === "in_progress") {
        this.$router.push("/game/" + game.id);
        return;
      }
      joinGame(game.id)
          .then(() => {
            this.$router.push("/game/" + game.id);
          })
          .catch((error) => {
            this.error = error;
          });
    },
  },
  async mounted() {
    this.user = getUserIdentity();
    this.games = await getGames();

    for (const game of this.games) {
      this.gamePlayersNames[game.id] = {};

      if (game.player1) {
        const user1 = await getUser(game.player1);
        if (user1) {
          this.gamePlayersNames[game.id].player1Name = user1.username;
        }
      }

      if (game.player2) {
        const user2 = await getUser(game.player2);
        if (user2) {
          this.gamePlayersNames[game.id].player2Name = user2.username;
        }
      }
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
      <div v-if="user">
        <h1 class="text-2xl font-bold mb-6 text-center">Tableau de bord de
          <router-link to="/profile" class="text-blue-500 hover:underline">{{ user.username }}</router-link>
        </h1>
        <div class="mb-4">
          <h2 class="text-lg font-bold mb-2">Parties en cours</h2>
          <button @click="createGame"
                  class="w-40 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Créer une partie
          </button>
          <ul class="mt-4">
            <li v-for="game in games" :key="game.id">
              <div class="bg-gray-100 p-2 rounded-lg">
                <div class="flex justify-between">
                  <div>
                    <b>Partie {{ game.id }}</b>
                    <p>Statut: {{ game.status }}</p>
                    <p v-if="gamePlayersNames[game.id]?.player1Name">
                      Joueur 1: {{ gamePlayersNames[game.id].player1Name }}
                    </p>
                    <p v-if="gamePlayersNames[game.id]?.player2Name">
                      Joueur 2: {{ gamePlayersNames[game.id].player2Name }}
                    </p>
                  </div>
                  <button @click="joinGame(game)"
                          class="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 size-30">
                    Rejoindre
                  </button>
                  <button v-if="game.creator === user.id" @click="deleteGame(game.id)"
                          class="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 size-30">
                    Supprimer
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>