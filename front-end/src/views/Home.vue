<template>
<div class="home">
  <img alt="TTCT logo" src="../assets/forrest.png" />
  <card-gallery :cards="cards" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import CardGallery from '@/components/CardGallery.vue';
export default {
  name: 'Home',
  data() {
    return {
      cards: [],
      error: '',
    }
  },
  components: {
    CardGallery,
  },
  created() {
    this.getCards();
  },
  methods: {
    async getCards() {
      try {
        let response = await axios.get("/api/cards/all");
        this.cards = response.data;
        response = await axios.get("/api/cards/");
        this.$root.$data.cards = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
img {
  padding: 10px;
}
</style>
