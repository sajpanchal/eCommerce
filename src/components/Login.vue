<template>
    <div class="vue-template inner-block ">
        <Navigation />
        <form @submit.prevent="loginUser">
            <h3>Lets get started!</h3>
            <input id="email" type="text" class="form-control form-control-lg mb-3" placeholder="Email" v-model="login.email" required/>
            <input id="password" type="password" class="form-control form-control-lg mb-3" placeholder="Password" v-model="login.password" required/>
            <button type="submit" class="btn btn-primary btn-lg btn-block">Log In</button>
            <p class="text-center">
                New User? 
                <router-link to="/register"> Register now!</router-link>
            </p>
        </form>
    </div>
</template>

<script>
import swal from "sweetalert";
import Navigation from "@/components/Navigation";
export default {
  components: {
    Navigation
  },
  data() {
    return {
      isLoggedin: false,
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
        let response
        try {
            response = await this.$http.post("/user/login",
                {
                    email: this.login.email,
                    password: this.login.password
                }
            );
        
            let token = response.data.id;
        
            if (token) {
                localStorage.setItem("userId", token);
                localStorage.setItem("firstname",response.data.firstname);
                this.isLoggedin = true;
                this.$session.start();
                this.$session.set('userId', token)
                swal({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Login successful!',
                    text: 'Your session has been created',
                    button: false,
                    timer: 3000
                })
                this.$router.push("/product");
            }
            else{
                swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Login failed',
                    text: 'try again!',
                    button: false,
                    timer: 3000
                })
        }
      } catch (err) {
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
  }
};
</script>

<style>

</style>
