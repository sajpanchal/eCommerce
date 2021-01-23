<template>
    <div class="row">
        <div class="col-12 col-sm-12 col-md-2 text-center">
            <img class="img-responsive" :src="require('../assets'+cartItem.productId.image)" alt="prewiew" width="100" height="80">
        </div>
        <div class="col-10 text-sm-center col-sm-10 text-md-left col-md-6">
            <h4 class="product-name"><strong>{{cartItem.productId.name}}</strong></h4>
            <h4><small>{{cartItem.productId.description}}</small> </h4>                                                     
        </div>
        <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
            <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
                <h6><strong>${{cartItem.productId.price}} <span class="text-muted">x</span></strong></h6>                    
            </div>
            <div class="col-1col-sm-4 col-md-4">
                <div class="quantity">
                    <input v-model="cartItem.quantity" value="1" min="1" type ="number" title="Qty" class="qty" size="1">                            
                </div>
            </div>                
            <div class="col-2 col-sm-2 col-md-2 text-right">
                <button v-on:click="deleteItem" type="button" class="btn btn-outline-danger btn-xs">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>                    
        </div>                
    </div>

</template>
<script>
import Navigation from "@/components/Navigation";
//import swal from "sweetalert";
//import Cart from '@/components/Cart.vue';
export default {
  name: 'CartItem',
  props: {
    cartItem: Object,
  },
   components: {
   Navigation,
  },
  data:() => {
    return {
       image: 'http://placehold.it/120x80',  
      }
  },
  async created()
  {
    //let response = await this.$http.get("/product/"+this.cartItem.productId);
    
  },
  methods:
  {
    async deleteItem()
    {
        let userId = localStorage.getItem("userId");
        try
        {
            let response = await this.$http.delete("cart/"+userId+"/"+this.cartItem._id);
            console.log(this.cartItem.productId.image);
             this.quantity= this.cartItem.quantity;
             console.log("delete api:"+response.data.message);
            if(response.data.message=="Delete successful.")
            {
                this.$router.go();
            }
        }
        catch(err)
        {
            console.log(err.message);
        }      
    }
  },
  };
</script>


<style scoped>
    input[type=number]
    {
        width: 50px;
    }
</style>