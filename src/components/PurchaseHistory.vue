<template>
    <div class="vue-template">
        <Navigation />
        <div class="container" style="margin-top:100px;">
            <h3 style="text-align:center; margin-top:10px; padding:10px; color:white">Order History</h3>
                <div class="card-body">                  
                     <Purchase v-for="purchase in purchaseHistory" v-bind:purchase="purchase" v-bind:key="purchase._id" class="w-70% p-3" style="width: 100%; height: 5%;"> </Purchase>                        
                </div>
        </div>
    </div> 
</template>

<script>
import Purchase from '@/components/Purchase.vue';
import Navigation from "@/components/Navigation";
import swal from "sweetalert";
export default {
    components: {
    Purchase,
    Navigation,
  },
    data() {
        return {
            purchaseHistory: [],
            message: "user purchase history Catalog",
            userId : localStorage.getItem("userId"),
        }
    },
    async created()
    {
        let res = await this.$http.get("Purchase/"+this.userId);
        this.purchaseHistory= res.data.purchases;
        console.log(res.data);
    }
};
</script>

<style>
.container
{
    overflow: auto;
}
</style>