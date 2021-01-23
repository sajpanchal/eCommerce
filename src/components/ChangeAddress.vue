<template>
    <div class="vue-template">
        <Navigation />
        <div class="container">
          <div class="row position-relative">
            <div class="col-sm-6 inner-block">
              <form v-if="!this.hasCurrentAddress" @submit.prevent="addAddress">
                <h3>Add a new Address</h3>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="House Number" v-model="address.houseNumber" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="Street Name" v-model="address.streetName" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="City" v-model="address.city" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="Province" v-model="address.province" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="Country" v-model="address.country" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="Zipcode" v-model="address.zipcode" required/>
                <button type="submit" class="btn btn-primary btn-lg btn-block">Save Address</button>
              </form>
              <form v-if="this.hasCurrentAddress"  @submit.prevent="changeAddress">
                <h3>Update Your Address</h3>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="House Number" v-model="newAddress.newHouseNumber" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="Street Name" v-model="newAddress.newStreetName" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="City" v-model="newAddress.newCity" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="Province" v-model="newAddress.newProvince" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="Country" v-model="newAddress.newCountry" required/>
                <input type="text" class="form-control form-control-lg mb-3" placeholder="Zipcode" v-model="newAddress.newZipcode" required/>
                <button type="submit" class="btn btn-primary btn-lg btn-block">Update Address</button>
              </form>
            </div>
            <div class="col-sm-4 float-right">
              <div v-if="this.hasCurrentAddress" class="card">
                <div class="card-body">
                  <h5 class="card-title text-center">Current Address</h5>
                  <p class="card-subtitle text-center text-muted">Name: {{ this.address.name }}</p>
                  <p class="card-text text-center">House: {{ this.address.houseNumber}}</p>
                  <p class="card-text text-center">Street: {{ this.address.streetName}}</p>
                  <p class="card-text text-center">City: {{ this.address.city}}</p>
                  <p class="card-text text-center">Province: {{ this.address.province}}</p>
                  <p class="card-text text-center">Country: {{ this.address.country}}</p>
                  <p class="card-text text-center">Zipcode: {{ this.address.zipcode}}</p>
                  <button v-on:click="deleteAddress" class="card-link float-right">Delete</button>
                </div>
              </div>
              <div v-if="!this.hasCurrentAddress" class="card">
                <div class="card-body">
                  <h5 class="card-title text-center">No Address Found</h5>
                  <p class="card-subtitle text-center text-muted">Add your address now!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      hasCurrentAddress: false,
      sessionId: localStorage.getItem('userId'),
      address: {
        name: "",
        houseNumber: "",
        streetName: "",
        city: "",
        province: "",
        country: "",
        zipcode: "",
      },
      newAddress: {
        name: "",
        newHouseNumber: "",
        newStreetName: "",
        newCity: "",
        newProvince: "",
        newCountry: "",
        newZipcode: "",
      }
    };
  },
  async mounted() {
    let userId = localStorage.getItem("userId");
    let response = await this.$http.get(`/address/get-address/${userId}`);
    if(response.data.message === "No address exists for this user")
    {
      console.log("No address found");
      this.hasCurrentAddress = false;
    }
    else {
      this.address.name = response.data.name;
      this.address.houseNumber = response.data.houseNumber;
      this.address.streetName = response.data.street;
      this.address.city = response.data.city;
      this.address.province = response.data.province;
      this.address.country = response.data.country;
      this.address.zipcode = response.data.zipcode;
      this.hasCurrentAddress = true;
    }
  },
  methods: {
    async changeAddress() {
        let response
        try {
            response = await this.$http.put("/address/update-address",
                {
                  houseNumber: this.newAddress.newHouseNumber, 
                  street: this.newAddress.newStreetName,
                  city: this.newAddress.newCity,
                  province: this.newAddress.newProvince,
                  country: this.newAddress.newCountry,
                  zipcode: this.newAddress.newZipcode,
                  userId: this.sessionId 
                   
                },
            );
        
            let responseMessage = response.data.message;
        
            if (responseMessage === "Address successfully updated") {
                swal({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Address Updated Successfully!',
                    text: 'You will be redirected to Address page now',
                    button: false,
                    timer: 3000
                })
                this.$router.go("/changeAddress");
            }
            else if (responseMessage === "Cannot update address, user does not exist or no address available to update") {
                swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Address Update Failed',
                    text: 'no address available to update',
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
    },
    async addAddress() {
        let response
        try {
            response = await this.$http.post("/address/add-address",
                {
                    houseNumber: this.address.houseNumber, 
                    street: this.address.streetName,
                    city: this.address.city,
                    province: this.address.province,
                    country: this.address.country,
                    zipcode: this.address.zipcode,
                    userId: this.sessionId
                },
            );
        
            let responseMessage = response.data.message;
        
            if (responseMessage === "Address successfully added") {
                swal({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Address Added',
                    text: 'Address has been added to your account',
                    button: false,
                    timer: 3000
                })
                this.$router.go("/changeAddress");
            }
            else if (responseMessage === "Cannot add address, user does not exist or address already exists for this user") {
                swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Cannot Add Address',
                    text: 'Address already exists for this user',
                    button: false,
                    timer: 3000
                })
            }
            else{
                swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Saving Address Failed',
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
    },
    async deleteAddress() {
        let response
        this.hasCurrentAddress = false;
        try {
            response = await this.$http.delete(`/address/delete-address/${this.sessionId}`,
            );

            console.log("This is the response");
            console.log(response);

            let responseMessage = response.data.message;
        
            if (responseMessage === "Address successfully deleted") {
                this.hasCurrentAddress = false;
                swal({
                    // position: 'top-end',
                    icon: 'success',
                    title: 'Account Password Updated!',
                    text: 'You will be redirected to Login page now',
                    button: false,
                    timer: 3000
                })
                this.$router.go("/changePassword");
            }
            else if (responseMessage === "Email and password combination does not match") {
                swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Address Deletion Failed',
                    text: 'Current password is incorrect',
                    button: true,
                })
            }
            else{
                swal({
                    // position: 'top-end',
                    icon: 'error',
                    title: 'Address Deletion Failed',
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