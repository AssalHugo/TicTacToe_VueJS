import {getUser} from "@/services/httpClient.js";
export {fetchPlayerNames};

const fetchPlayerNames = async (game, gamePlayersNames) => {
    if (game.player1) {
        const user1 = await getUser(game.player1);
        if (user1) {
            gamePlayersNames[game.id].player1Name = user1.username;
        }
    }

    if (game.player2) {
        const user2 = await getUser(game.player2);
        if (user2) {
            gamePlayersNames[game.id].player2Name = user2.username;
        }
    }

    localStorage.setItem('gamePlayersNames', JSON.stringify(gamePlayersNames));
}