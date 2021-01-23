<template>
    <div class="vue-template inner-block">
        <Navigation />
        <form @submit.prevent="changePassword">
            <h3>Update Your Account Password</h3>
                <input type="password" class="form-control form-control-lg mb-3" placeholder="Current Password" v-model="user.currentPassword" required/>
                <input type="password" class="form-control form-control-lg mb-3" placeholder="New Password" v-model="user.newPassword" required/>

            <button type="submit" class="btn btn-primary btn-lg btn-block">Update Password</button>

            <p class="text-center">Let's see some Products? <router-link to="/products">Shop now!</router-link></p>
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
      user: {
        currentPassword: "",
        newPassword: "",
        sessionId: localStorage.getItem('userId')
      }
    };
  },
  methods: {
    async changePassword() {
        let response
        try {
            response = await this.$http.put("/user/update-password",
                {
                    currentpassword: this.user.currentPassword,
                    newpassword: this.user.newPassword,
                    sessionId: this.user.sessionId
                },
            );
        
            let responseMessage = response.data.message;
        
            if (responseMessage === "Password successfully updated") {
                localStorage.removeItem("userId");
                swal({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Account Password Updated!',
                    text: 'You will be redirected to Login page now',
                    button: false,
                    timer: 3000
                })
                this.$router.push("/login");
            }
            else if (responseMessage === "Current password is not correct") {
                swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Password Update Failed',
                    text: 'Current password is incorrect',
                    button: true,
                })
            }
            else{
                swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Password Update Failed',
                    text: 'try again!',
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
  }
};
</script>

<style>

</style>