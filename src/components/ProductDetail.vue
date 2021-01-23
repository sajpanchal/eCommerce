<template>
  <div class="vue-template">
      <div class="card">
        <img class="card-img small" v-bind:alt="'@/assets'+product.image" :src="require('@/assets'+product.image)" />
          <div class="card-body">
            <h1 class="card-title text-center">{{ product.name }}</h1>
            <p class="card-subtitle text-center text-muted">Category: {{ product.category }}</p>
            <p class="card-text"><div><h5>Description</h5></div><br>{{message}} <br> {{ product.description}} </p>
            <button v-on:click="toCart" class="card-link float-left">Add to cart</button>
          </div>
      </div>   
           <div class="container">
            <div class="row position-relative ">
              <div class="card col-sm-4 float-left">
              <div class="card-body">
                <form @submit.prevent="submitComment">
                  <h3>Add a comment</h3>
                  <textarea v-model="comment" class="form-control" rows="5" id="comment" placeholder="Add your comment" required></textarea>
                  <br>
                  <button type="submit" class="btn btn-primary float-right">Post</button>
                </form>
              </div> 
            </div>
            <div class="card col-sm-8 float-right">
              <div class="card-body">
                <ul><h3><u>Comments</u></h3>
                  <p v-if="postComment" class='comment'><b>{{this.firstname}} commented :</b> {{this.newComment}}</p>
                </ul>
              </div>
            </div>
            </div>
           </div>

            
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: ['product'],
  data() {
    return {
      firstname: localStorage.getItem('firstname'),
      postComment: false,
      comment: "",
      newComment: "",
      message: "Here are a few lines about this product. Hope you will like it"
    };
  },
  methods: {
      async toCart() {
        let userId = localStorage.getItem("userId");
        let response = await this.$http.post("cart/save",{ "quantity": 1,"productId": this.product._id,"UserId":userId});
        this.$router.push({ name: 'Cart' });
    },
    submitComment() {
      this.postComment = true;
      this.newComment = this.comment;
      this.comment = "";
    }
  },
};
</script>