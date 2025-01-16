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
    };
  },

  mounted() {
    //On récupère le game grace à l'id de la route
    const id = this.$route.params.id;
    getGame(id)
        .then((response) => {
          this.game = response;
        })
        .catch((error) => {
          this.error = error;
        });
  }
}
</script>

<template>

  <div v-if="game">
    <NomsJoueurs :game="game"/>
    <TourJoueur :game="game"/>
    <PlateauJeu :game="game"/>
  </div>


  <div v-else>
    <p>Chargement...</p>
  </div>
</template>

<style scoped>

</style>