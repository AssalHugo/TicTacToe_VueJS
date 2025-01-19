<script>
import { getUserIdentity } from "@/services/AuthProvider.js";
import { createGame, deleteGame, getGames, getUser, joinGame } from "@/services/httpClient.js";

export default {
  data() {
    return {
      user: null,
      games: [],
      gamePlayersNames: JSON.parse(localStorage.getItem("gamePlayersNames")) || {}
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
      if (
          game.status === "in_progress" ||
          game.player1 === this.user.id ||
          game.player2 === this.user.id
      ) {
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
    }
  },
  async mounted() {
    this.user = getUserIdentity();
    this.games = await getGames();

    for (const game of this.games) {
      if (!this.gamePlayersNames[game.id]) {
        this.gamePlayersNames[game.id] = {};
      }
      if (game.player1 && !this.gamePlayersNames[game.id].player1Name) {
        await getUser(game.player1)
            .then((response) => {
              this.gamePlayersNames[game.id].player1Name = response.username;
            })
            .catch((error) => {
              this.error = error;
            });
      }
      if (game.player2 && !this.gamePlayersNames[game.id].player2Name) {
        await getUser(game.player2)
            .then((response) => {
              this.gamePlayersNames[game.id].player2Name = response.username;
            })
            .catch((error) => {
              this.error = error;
            });
      }

      if (game.creator && !this.gamePlayersNames[game.id].creatorName) {
        await getUser(game.creator)
            .then((response) => {
              this.gamePlayersNames[game.id].creatorName = response.username;
            })
            .catch((error) => {
              this.error = error;
            });
      }
    }
  }
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div v-if="user">
      <h1 class="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Tableau de bord de
        <router-link to="/profile" class="text-blue-600 hover:underline">
          {{ user.username }}
        </router-link>
      </h1>
      <div class="mb-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-700">Parties en cours</h2>
          <button
              @click="createGame"
              class="w-40 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Créer une partie
          </button>
        </div>
        <ul class="space-y-4">
          <li
              v-for="game in games"
              :key="game.id"
              class="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <div class="flex justify-between items-center">
              <div>
                <b class="block text-lg text-gray-800">Partie de {{ gamePlayersNames[game.id]?.creatorName }}</b>
                <p class="text-sm text-gray-600">Statut: {{ game.status }}</p>
                <p
                    v-if="gamePlayersNames[game.id]?.player1Name"
                    class="text-sm text-gray-700">
                  Joueur 1: {{ gamePlayersNames[game.id].player1Name }}
                </p>
                <p
                    v-if="gamePlayersNames[game.id]?.player2Name"
                    class="text-sm text-gray-700">
                  Joueur 2: {{ gamePlayersNames[game.id].player2Name }}
                </p>
              </div>
              <div class="flex space-x-2">
                <button
                    v-if="
                    game.status === 'waiting' ||
                    (game.status === 'in_progress' &&
                      (game.player1 === user.id || game.player2 === user.id))
                  "
                    @click="joinGame(game)"
                    class="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Rejoindre
                </button>
                <button
                    v-if="game.creator === user.id"
                    @click="deleteGame(game.id)"
                    class="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                  Supprimer
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
