<template>
  <div class="navigation vue-template">
     <!-- Navigation -->
    <nav class="navbar bg-white rounded  fixed-top">
      <div class="container">
        <a v-if="!this.loggedIn" class="navbar-brand float-left" href="/products">
           eCommerce Shopping Website
        </a>
        <div v-if="this.loggedIn" class="username">
            <router-link class="nav-link pr-2 float-left" to="/products"><b>Hi, {{ this.firstname }}</b></router-link>
          </div>
        <form v-if="this.loggedIn" class="form-inline my-2 my-lg-0">
          <input ref="keyword" class="form-control my-0 mr-sm-1" type="search" placeholder="Search" aria-label="Search">
          <router-link to="/search"> <button @click="onSearch" class="btn btn-primary my-2 my-sm-0" type="submit">Search</button></router-link>
        </form>
        <ul v-if="!this.loggedIn" class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-2" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/register">Sign up</router-link>
          </li>
        </ul>
        <ul v-if="this.loggedIn" class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-2" to="/changePassword">Change Password</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-2" to="/changeAddress">Change Address</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-2" to="/cart">View Cart</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-2" to="/purchaseHistory">Order History</router-link>
          </li>
          <li style="color:white;">User</li>
          <li class="nav-item">
            <router-link to="/logout"> <button @click="onDeleteAccount" class="btn btn-danger my-2 my-sm-0" type="submit">Delete Account</button></router-link>
          </li>
          <li style="color:white;">User</li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/logout">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
    name: 'Navigation',
    data() {
    return {
      firstname : localStorage.getItem('firstname')
    };
  },
    methods: {
        onSearch() {
            localStorage.setItem("keyword", this.$refs.keyword.value);
            this.$router.push('/404');
        },
        async onDeleteAccount() {
        let response
        try {
            response = await this.$http.delete(`/user/delete/${localStorage.getItem('userId')}`,
            );

            let responseMessage = response.data.message;
        
            if (responseMessage === "User successfully deleted") {
                swal({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Account successfully Deleted!',
                    text: 'You will be redirected to Signup page now',
                    button: true,
                    timer: 3000
                })
                this.$router.go("/logout");
            }
            else {
                swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Account Deletion Failed',
                    text: 'Current user session is invalid',
                    button: false,
                    timer: 3000
                })
          }
      } catch (err) {
            console.log("exception happened");
            swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Something went wrong',
                    text: 'try again!',
                    button: false,
                    timer: 3000
                })
        console.log(err.response);
      }
    }
    },
    computed: {
      loggedIn () {
        let loggedIn = localStorage.getItem("userId");
        return loggedIn;
      }
    }
  }
</script>