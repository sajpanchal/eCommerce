<template>
    <div class="vue-template inner-block">
        <Navigation />
        <form @submit.prevent="registerUser">
            <h3>Create Account</h3>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="First Name" v-model="register.firstname" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="Last Name" v-model="register.lastname" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="Username" v-model="register.username" required/>
                <input type="email" class="form-control form-control-lg mb-3" placeholder="Email address" v-model="register.email" required/>
                <input type="password" class="form-control form-control-lg mb-3" placeholder="Password" v-model="register.password" required/>

            <button type="submit" class="btn btn-primary btn-lg btn-block">Sign Up</button>

            <p class="forgot-password text-center">
                Already registered?
                <router-link to="/login">Login now!</router-link>
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
      register: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async registerUser() {
        let response
        try {
            response = await this.$http.post("/user/register",
                {
                    firstname: this.register.firstname,
                    lastname: this.register.lastname,
                    username: this.register.username,
                    email: this.register.email,
                    password: this.register.password
                }
            );
        
            let token = response.data.id;
        
            if (token) {
                localStorage.setItem("userId", token);
                localStorage.setItem("firstname",response.data.firstname);
                swal({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Account Created!',
                    text: 'You will be redirected to products page now',
                    button: false,
                    timer: 3000
                })
                this.$router.push("/product");
            }
            else{
                swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Account creation failed',
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