<template>
  <div>
    <NavBar />
    <div class="container inner-block">
      <ProductDetail :product="product" />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/Navigation.vue';
import ProductDetail from '@/components/ProductDetail.vue';

export default {
  name: 'Product',
  components: { NavBar, ProductDetail },
  data() {
    return {
      product: {},
    };
  },
  async mounted() {
    try {
        const res = await this.$http.get(`/product/${this.$route.params.id}`);
        const json = await res.data;
        this.product = json;
    } catch (e) {
      console.log(e);
    }
  },
};
</script>