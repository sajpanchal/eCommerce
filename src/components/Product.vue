<template>
  <div class="vue-template">
    <Navigation/>
          <div class="card">
          <img class="card-img" v-bind:alt="'/assets'+product.image" :src="require('../assets'+product.image)" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-subtitle text-muted">Category: {{ product.category }}</p>
            <p class="card-text">{{ product.description}} </p>
            <button v-on:click="toCart" class="card-link float-right">Add to cart</button>
            <a v-bind:href="'/product/'+ product.productCode" class="card-link float-left">View Details</a>
          </div>
        </div>
        </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Cart from '@/components/Cart.vue';
export default {
  components: {
    Navigation,
    Cart,
  },
  name: 'Product',
  props: {
    product: Object,
  },
  methods: {
      async toCart()
      {
        let userId = localStorage.getItem("userId");
        let response = await this.$http.post("cart/save",{ "quantity": 1,"productId": this.product._id,"UserId":userId});
        this.$router.push({ name: 'Cart' });
    },
  },
};
</script>
