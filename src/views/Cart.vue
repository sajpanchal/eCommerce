<template>
    <div class="cart">
          <!--<Navigation />-->    
      <Cart />
    </div>    
</template>
<script>
import Cart from "@/components/Cart.vue";
export default {
  components: {
    Cart
  }
};
/*
export default {
  props: {
    'cartData': String
  },
};
/*

import myCart from "@/components/Cart";
export default {
  components: {
    Navigation,
  },
  name: 'Product',
  props: {
    'cartData': Object
  },
  data: () => {
    return {
      productId: "0",
      quantity: 1,
    }; 
  },
  methods: {
  async toCart() {
       this.productId = this.product._id;
       this.quantity = 1;
       //this.$router.push({ name: 'Cart' });
    },
   },
};*/
</script>