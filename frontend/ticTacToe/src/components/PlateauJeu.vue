<script>
import {getGame, getUser, playGame} from "@/services/httpClient.js";
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
      this.polling = setInterval(this.fetchGameState, 5000);
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

        let player1 = null;
        let player2 = null;
        if (response.player1) {
          player1 = await getUser(response.player1);
          this.playerNames.player1 = player1.username;
        }
        if (response.player2) {
          player2 = await getUser(response.player2);
          this.playerNames.player2 = player2.username;
        }
        this.$emit('update-game-info', {
          currentPlayer: this.currentPlayer,
          players: {
            player1: player1,
            player2: player2,
          }
        });
        if (this.winner || this.gameState === 'draw') {
          this.stopPolling();
        }
      } catch (error) {
        this.error = error;
      }
    },

    async play(rowIndex, cellIndex) {
      //On vérifie si la case est vide
      if (this.board[rowIndex][cellIndex] !== null) {
        return;
      }

      //On vérifie si c'est au tour du joueur
      if (this.currentPlayer !== this.userId) {
        return;
      }

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
    <div v-if="winner || gameState === 'draw'"
         :class="{'victory-message': winner === userId, 'defeat-message': winner !== userId && winner !== null, 'draw-message': gameState === 'draw'}">
      <h2>{{ gameState === 'draw' ? 'Match nul' : winner === userId ? 'Vous avez gagné' : 'Vous avez perdu' }}</h2>
    </div>

    <table class="table-auto mx-auto w-64 h-64">
      <tr v-for="(row, rowIndex) in board" :key="rowIndex">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="border p-4 text-center w-16 h-16">
          <div @click="play(rowIndex, cellIndex)" class="flex items-center justify-center h-16">
            <span v-if="cell === userId" class="text-4xl text-red-500">❌</span>
            <span v-else-if="cell !== null" class="text-4xl text-blue-500">⭕</span>
          </div>
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

td {
  border: 4px solid #000; /* Increase the border width to 4px */
  padding: 4px;
  text-align: center;
  width: 64px;
  height: 64px;
}

button {
  width: 100%;
  height: 100%;
}

.victory-message {
  text-align: center;
  font-size: 2rem;
  color: #4caf50;
  animation: victory-animation 2s ease-in-out infinite;
}

.defeat-message {
  text-align: center;
  font-size: 2rem;
  color: #f44336;
  animation: defeat-animation 2s ease-in-out infinite;
}

.draw-message {
  text-align: center;
  font-size: 2rem;
  color: #ff9800;
  animation: draw-animation 2s ease-in-out infinite;
}

@keyframes victory-animation {
  0%, 100% {
    transform: scale(1);
    color: #4caf50;
  }
  50% {
    transform: scale(1.2);
    color: #ffeb3b;
  }
}

@keyframes defeat-animation {
  0%, 100% {
    transform: scale(1);
    color: #f44336;
  }
  50% {
    transform: scale(1.2);
    color: #ff5722;
  }
}

@keyframes draw-animation {
  0%, 100% {
    transform: scale(1);
    color: #ff9800;
  }
  50% {
    transform: scale(1.2);
    color: #ffc107;
  }
}
</style>