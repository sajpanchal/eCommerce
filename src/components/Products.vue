<template>
    <div class="vue-template vertical-center">
        <Navigation />
        <h3 v-if="products.length != 0">{{ message }}</h3>
        <div>
            <div class="container">
            <div class="row position-relative">
                <Product v-for="product in products" v-bind:product="product" v-bind:key="product.productCode" class="w-full p-3 md:w-1/2 lg:w-1/4" style="width: 30%; height: 5%;"> </Product>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import Product from '../components/Product.vue';
import Navigation from '@/components/Navigation.vue';

import swal from "sweetalert";
export default {
    components: {
    Product,
    Navigation
  },
    data() {
        return {
            products: [],
            message: "Product Catalog"
        }
    },
    async mounted() {
        try {
            let response = await this.$http.get("/product/all");
            this.products = response.data;

        } 
        catch (err) {
            swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Something went wrong',
                    text: 'try again!',
                    button: false,
                    timer: 3000
                })
         this.$router.push("/product");   
        console.log(err.response);
      }
    }
};
</script>

<style>
.vertical-center {
    display: block;
    text-align: left;
    justify-content: center;
    flex-direction: row !important;    
  }
</style>