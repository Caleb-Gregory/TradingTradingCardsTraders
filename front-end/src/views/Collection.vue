<template>
<div class="dashboard">
  <MyCards v-if="user" />
  <Login v-else />
</div>
</template>

<script>
import MyCards from '@/components/MyCards.vue';
import Login from '@/components/Login.vue';
import axios from 'axios';
export default {
  name: 'collection',
  components: {
    MyCards,
    Login,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding-top: 10px;
}
</style>
