Card<template>
<div class="main">
  <div class="menu">
    <h2><a @click="toggleUpload">Upload Card</a></h2>
    <h2>{{user.firstName}} {{user.lastName}} - <a @click="logout">Logout</a></h2>
    <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div>
  <img alt="TTCT Forrest" src="../assets/forrest.png" />
  <card-gallery :cards="cards" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import CardGallery from '@/components/CardGallery.vue';
export default {
  name: 'Mycards',
  components: {
    Uploader,
    CardGallery
  },
  data() {
    return {
      show: false,
      cards: [],
      error: '',
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  created() {
    this.getCards();
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getCards() {
      try {
        this.response = await axios.get("/api/cards");
        this.cards = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getCards();
    },
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
}

.menu h2 {
  font-size: 14px;
}
</style>
