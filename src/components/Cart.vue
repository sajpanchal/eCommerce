<template>
    <div class="vue-template">
        <Navigation />
        <div class="container"> 
            <div class="card shopping-cart">
                <div class="card-header bg-dark text-light">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    Shipping cart
                    <div class="clearfix"></div>
                </div>
                <div class="card-body">
                    <!-- PRODUCT -->
                    <CartItem v-for="cartItem in cartItems" v-bind:cartItem="cartItem" v-bind:key="cartItem.productId._id" class="w-full p-3 md:w-1/2 lg:w-1/4" style="width: 100%; height: 5%;"> </CartItem>
                    <!-- END PRODUCT -->              
                    <div class="pull-right">
                        <button class="btn btn-outline-secondary pull-right" v-on:click="updateCart">Update shopping cart</button>
                    </div>
                </div>
                <form></form>
                <div class="form-group">
                    <label for="shippingAddress">Shipping Address:</label>
                    <input v-model="address" type="address" class="form-control" id="shippingAddress" placeholder="Enter shipping address" required>  
                </div>
                <div class="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                    <div class="row"></div>
                </div>
                <div class="pull-right" style="margin: 10px">
                    <button class="btn btn-success pull-right" v-on:click="purchaseItems">  Checkout</button>
                    <div class="pull-right" style="margin:5px">
                        Total price: <b>${{total}}  </b>
                    </div>
                </div>
                <div class="card-footer"></div>
            </div>
        </div>
    </div>
</template>
    
<script>

import swal from "sweetalert";
import Navigation from "@/components/Navigation";
import CartItem from '../components/CartItem.vue';
export default {
 
  components: {
   Navigation,
   CartItem 
  },
  data:() => {
    return {
       cartItems: [], 
       total: 0,
       address: " 124 Walter St. Waterloo, Ontario",
       userId : localStorage.getItem("userId"),
       purchased: false,
       quantity: 0,
      }
  },
     
  async created()
    {  
        try
        {
            let userId = localStorage.getItem("userId");
            if(this.purchased == false)
            {
                let response = await this.$http.get("cart/all/" + userId);
                this.cartItems = response.data.cartItems;
                let length = this.cartItems.length;
                this.total = 0;
                while(length >0)
                {
                    length -=1;
                    this.total += (this.cartItems[length].productId.price)*(this.cartItems[length].quantity);                    
                }
            }                       
        }
        catch (err) 
        {
          console.log(err.response); 
        }
    },
  methods: 
  {
   async updateCart()
   {
        var length = this.cartItems.length; 
       // var length = 0;
        this.total = 0;
          while(length >0)
          {
              length -= 1;
              this.total += (this.cartItems[length].productId.price)*(this.cartItems[length].quantity);
              this.quantity = parseInt(this.cartItems[length].quantity);
               let response = await this.$http.post("cart/save",{ "quantity": this.quantity,"productId": this.cartItems[length].productId._id,"UserId":this.userId});
             // this.total = numeral(this.total).format("0,0");
            // this.address =  this.quantity;
              console.log(typeof(this.cartItems[length].productId.price));
          }
   },
   async purchaseItems()
   {
    
    this.purchased = false;
    if(this.address.length == 0)
    {
        swal({
             // position: 'top-end',
                    icon: 'error',
                    title: 'Address field is empty!',
                    text:   "Please provide the address to puchase items.",
                    button: false,
                    timer: 3000  
                })               
    }         
    else
    {                                        
       try
        {
            let response = await this.$http.post("purchase",{address:this.address,UserId:this.userId});
            this.address = response.data.message;
                      
            if(response.data.message=="Purchase successful.")
            {
                this.address = response.data.message;
                this.purchased = true;
                swal({
                  // position: 'top-end',
                    icon: 'success',
                    title: 'purchase successful!',
                    text: 'purchase successful!',
                    button: false,
                    timer: 3000  
                })        
                this.$router.push({ name: 'PurchaseHistory' });
            }
            else
            {
                this.$router.go();
            } 
        }
        catch(err)
        {
            console.log(err.message);
        
           swal({
                  // position: 'top-end',
                    icon: 'something went wrong',
                    title: 'purchase unsuccessful!',
                    text:   err.message,
                    button: false,
                    timer: 3000  
                })
              // await this.$router.go();
        }
    }   
    
        
       //  
     /*  
     console.log("purchase API user: "+this.userId);
    
    // console.log("purchase API: "+ response.data.message);
     //console.log("purchase API user: "+this.userId);  
            this.address = "response.data.message";
            swal({
                  // position: 'top-end',
                    icon: 'success',
                    title: 'purchase successful!',
                    text: 'purchase successful!',
                    button: false,
                    timer: 3000  
                })
          //    this.$router.push("/product");            
    // if(response.data.message=="Purchase successful.")
     //   {
            
      //  }   
      */      
   }
}
}; 

</script>

<style scoped>

.quantity {
    float: left;
    margin-right: 15px;
    background-color: #eee;
    position: relative;
    width: 80px;
    overflow: hidden
}

.quantity input {
    margin: 0;
    text-align: center;
    width: 15px;
    height: 15px;
    padding: 0;
    float: right;
    color: #000;
    font-size: 20px;
    border: 0;
    outline: 0;
    background-color: #F6F6F6
}

.quantity input.qty {
    position: relative;
    border: 0;
    width: 100%;
    height: 40px;
    padding: 10px 25px 10px 10px;
    text-align: center;
    font-weight: 400;
    font-size: 15px;
    border-radius: 0;
    background-clip: padding-box
}

.quantity .minus, .quantity .plus {
    line-height: 0;
    background-clip: padding-box;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
   /*-webkit-background-size: 6px 30px;
   // -moz-background-size: 6px 30px;*/
    color: #bbb;
    font-size: 20px;
    position: absolute;
    height: 50%;
    border: 0;
    right: 0;
    padding: 0;
    width: 25px;
    z-index: 3
}

.quantity .minus:hover, .quantity .plus:hover {
    background-color: #dad8da
}

.quantity .minus {
    bottom: 0
}
.shopping-cart {
    margin-top: 20px;
}

</style>
