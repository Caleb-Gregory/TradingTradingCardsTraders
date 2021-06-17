<template>
<div>
  <section class="card-gallery">
    <div class="card" v-for="card in cards" v-bind:key="card._id">
      <img :src="card.path" />
      <div class="cardInfo">
        <h1 class="cardName">{{card.cardName}}</h1>
        <p class="cardCost">Card Mana Cost: {{card.cardCost}}</p>
        <p class="cardRarity">Card Rarity: {{card.cardRarity}}</p>
        <p class="cardText">{{card.cardText}}</p>
        <p class="cardText">Owner: {{card.user.firstName}} {{card.user.lastName}}</p>


        <h1 class="cardName">Select Trade Option</h1>

        <div class="cardInfo" v-for="userCard in userCards" v-bind:key="userCard._id" @click="selectItem(userCard, card)">
          <div class="suggestion">
            <p class="cardList">{{userCard.cardName}}</p>
          </div>
        </div>
        <button @click="makeTrade()">Make Trade</button>
        <button @click="deleteItem()">Delete Selected Card</button>
      </div>
      <p class="cardDate">{{formatDate(card.created)}}</p>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
export default {
  name: 'CardGallery',
  data() {
    return {
      userCards: [],
      findCard: null,
      tradeCard: null,
    }
  },
  props: {
    cards: Array
  },
  created() {
    this.getCards();
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async getCards() {
      try {
        this.response = await axios.get("/api/cards");
        this.userCards = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    selectItem(card, notUsersCard) {
      this.findCard = card;
      this.tradeCard = notUsersCard;
    },
    async deleteItem() {
      try {
        await axios.delete("/api/cards/" + this.findCard._id);
        this.findCard = null;
        this.getItems();
        return true;
      } catch (error) {
        void(0);
      }
    },
    async deleteTradeItem() {
      try {
        await axios.delete("/api/cards/" + this.tradeCard._id);
        this.tradeCard = null;
        this.getItems();
        return true;
      } catch (error) {
        void(0);
      }
    },
    async makeTrade() {
      alert("Trade Successful and cards removed from listing!");
      this.deleteItem();
      this.deleteTradeItem();
    },
  }
}
</script>

<style scoped>
.suggestions {
  width: 100px;
  border: 1px solid #ccc;
}

.form {
  width: 100%;
}

.suggestion {
  padding: 0px;
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.cardInfo {
  text-align: left;
  justify-content: space-between;
  font-size: 0.8em;
  background-color: #FFFDD0;

}

.cardName {
  padding-left: 0px
}

.cardInfo p {
  margin: 0px;
}

.cardDate {
  font-size: 0.7em;
  font-weight: normal;
}

h1 {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 5px;
}

p {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.card-gallery {
  column-gap: 1em;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

.card {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 30%;
}

.card img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .card-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .card-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .card-gallery {
    column-count: 2;
  }
}
</style>
