<template>

    <div class="orderId" style="background-color:#fff; margin-bottom:2px; width:600px  border: 2px solid;border-radius:20px"><span><strong>Order ID: {{purchase._id}}</strong></span><hr>
<div class="row" v-for="history in purchase.histories" v-bind:history="history" v-bind:key="history.productName"  style="background-color:#fff;">
        <div class="col-10 text-sm-center col-sm-12 text-md-left col-md-8">
            <h4 class="product-name"><strong>{{history.productName}}</strong></h4>
            <h4><small>Quantity: {{history.quantity}}</small> </h4>                                                     
        </div>
        <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
            <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
                <h6><strong>price: ${{history.price}}</strong></h6>                    
            </div>
            <div class="col-1col-sm-4 col-md-6">
                <div class="quantity">
                  <button v-on:click="toProductDetail" type="button" class="btn btn-success pull-right">View Product</button>
                </div>
            </div>                                           
        </div>                
    </div>
    </div>
</template>

<script>
import Navigation from "@/components/Navigation";
//import swal from "sweetalert";
export default {
  name: 'Purchase',
  props: {
    purchase: Object,
  },
  methods: {
      async toProductDetail()
      {
        let keyword = "perfume";
        let response = await this.$http.get(`/product/search?q=${keyword}`);
        this.$router.push(`/product/${response.data.results[0].productCode}`);
    },
  },
};
</script>

<style scoped>                                
</style>
