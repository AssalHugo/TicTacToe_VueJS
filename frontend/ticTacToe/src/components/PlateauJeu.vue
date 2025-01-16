<script>
import {getGame, playGame} from "@/services/httpClient.js";
import {getUserIdentity} from "@/services/AuthProvider.js";

export default {
  name: "PlateauJeu",

  data() {
    return {
      gameId: null,
      gameState: null,
      board: Array(3)
          .fill(null)
          .map(() => Array(3).fill(null)), // 3x3 board for display
      currentPlayer: null,
      winner: null,
      error: null,
      userId: null,
      polling: null,
      playerNames: {
        player1: null,
        player2: null,
      },
    };
  },

  mounted() {
    this.userId = getUserIdentity().id;
  },

  async created() {
    await this.fetchGameState();
    this.startPolling();
  },

  beforeUnmount() {
    this.stopPolling();
  },

  methods: {
    startPolling() {
      if (this.polling) return;
      this.polling = setInterval(this.fetchGameState, 10000);
    },
    stopPolling() {
      if (this.polling) {
        clearInterval(this.polling);
        this.polling = null;
      }
    },
    formatBoard(flatBoard) {
      // Convert 1D array to 2D array (3x3) for display
      return [
        [flatBoard[0], flatBoard[1], flatBoard[2]],
        [flatBoard[3], flatBoard[4], flatBoard[5]],
        [flatBoard[6], flatBoard[7], flatBoard[8]],
      ];
    },
    async fetchGameState() {
      try {
        const response = await getGame(this.$route.params.id);
        this.gameId = response.id;
        this.gameState = response.status;
        this.board = this.formatBoard(response.board);
        this.currentPlayer = response.currentPlayer;
        this.winner = response.winner;
        this.playerNames.player1 = response.player1Name;
        this.playerNames.player2 = response.player2Name;
        if (this.winner) {
          this.stopPolling();
        }
      } catch (error) {
        this.error = error;
      }
    },

    async play(rowIndex, cellIndex) {
      console.log("play", rowIndex, cellIndex);
      try {
        await playGame(this.gameId, rowIndex, cellIndex);
        await this.fetchGameState();
      } catch (error) {
        this.error = error;
      }
    },

  }
}
</script>

<template>

  <div v-if="gameState">
    {{ currentPlayer }} dzs
    {{ userId }}
    <div v-if="winner">
      <h2>{{ winner === "draw" ? "Match nul" : winner === userId ? "Vous avez gagné" : "Vous avez perdu" }}</h2>
    </div>

    <div v-else>
      <h2>{{ currentPlayer === userId ? "À vous de jouer" : "À l'adversaire de jouer" }}</h2>
    </div>
    <table class="w-full border-collapse border border-gray-300 bg-blue-200">
      <tr v-for="(row, rowIndex) in board" :key="rowIndex">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="border p-4 text-center">
          <button @click="play(rowIndex, cellIndex)" :disabled="cell !== null || winner || currentPlayer !== userId"
                  class="w-full h-full">
            <span v-if="cell === 1" class="text-4xl text-red-500">❌</span>
            <span v-else-if="cell === 2" class="text-4xl text-blue-500">⭕</span>
            cell {{ cell }}
          </button>
        </td>
      </tr>
    </table>
  </div>

  <div v-else>
    <p>Chargement...</p>
  </div>
</template>

<style scoped>
table {
  table-layout: fixed;
}

button {
  width: 100%;
  height: 100%;
}
</style>