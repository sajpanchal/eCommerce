<template>
    <div class="vue-template vertical-center">
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
import swal from "sweetalert";
export default {
    components: {
    Product
  },
    data() {
        return {
            products: [],
            message: "Product Catalog"
        }
    },
    async mounted() {
        try {
            let keyword = localStorage.getItem("keyword");
            let response = await this.$http.get(`/product/search?q=${keyword}`);
            this.products = response.data['results'];

            let no_data_message= "No results Found! Try with another keyword eg. 'Pen'"

            if (this.products.length == 0) {
                swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: `You searched for ${keyword}`,
                    text: no_data_message,
                    button: true
                })
                localStorage.removeItem("keyword");
                this.$router.push("/product");
            }

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
         this.$router.push("/");   
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