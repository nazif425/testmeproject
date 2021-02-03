/* eslint-disable no-console */

<template>
   <div>   
      <vue-form :state="formstate" class="md-layout" @submit.prevent="onSubmit">
            <md-card class="md-layout-item md-size-50 md-small-size-100">
            <md-card-header>
               <div class="md-display-1">Login</div>
            </md-card-header>
            <md-card-content>
               <div v-if="error.non_field_errors" class="md-body-1" style="color: red">{{error.non_field_errors.join(', ')}}</div>
               <validate tag="md-field" :class="fieldClassName(formstate.username)">
                  <label for="first-name">User Name  </label>
                  <md-input class="" name="user-name" id="user-name" autocomplete="given-name" 
                  v-model="form.username" :disabled="sending" required />
                  <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                        <div slot="required">The user nanme is required</div>
                        <div slot="maxlength">Invalid user name</div>
                  </field-messages>
               </validate>
               
               <validate tag="md-field" :class="fieldClassName(formstate.password)"
                  :custom="{validatePassword}">
                  <label for="enter-password">Password</label>
                  <md-input class="" type="password" name="password" id="password" 
                        autocomplete="new-password" v-model="form.password" 
                        :disabled="sending" required />
                  <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                        <div slot="required">The password is required</div>
                        <div slot="validatePassword">Password should be aleast 8 characters</div>
                  </field-messages>
               </validate>
               
            </md-card-content>
            

            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-actions>
               <md-button type="submit" alignment="left" class="md-accent md-raised" :disabled="sending">Login</md-button>
            </md-card-actions>
            </md-card>

            <md-snackbar :md-active.sync="loginSuccess">Login successful!</md-snackbar>
      </vue-form>
   </div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";
   
   
export default {
   data: () => ({
      pageData: {
         pageTitle: 'Login'
      },
      formstate: {},
      form: {
         username: '',
         password: ''
      },
      error: {},
      loginMessage: "",
      loginSuccess: false,
      sending: false,
      maxInputLen: 100,
      minInputLen: 3,
      passLen: 6,
   }),
   methods: {
      clearForm () {
         this.form.username = ''
         this.form.password = '' 
      },
      maxInputLength (value) {
         return value.length <= this.maxInputLen
      },
      minInputLength (value) {
         return value.length >= this.minInputLen
      }, 
      validatePassword (value) {
         return value.length >= this.passLen
      },

      login () {
         this.error = {}
         let username = this.form.username
         let password = this.form.password 
         //console.log(username + password)
         this.$store.dispatch('login', { username, password })
         .then(() => {            
            this.clearForm()
            this.formstate._reset();
            this.sending = false
            this.loginSuccess = true
            this.$router.replace('/dashboard')
         })
         .catch(error => {
            //console.log(error)
            // display fields errors
            this.error = error.response.data
            //this.loginMessage = error.response.data.non_field_errors.join(' ')
            this.sending = false
         })
      },
      onSubmit () {
         

         if (this.formstate.$invalid) {
            return;
         } else {
            this.sending = true
            this.login()
         }
      },
      fieldClassName: function (field) {
         if(!field) {
         return '';
         }
         if((field.$touched || field.$submitted) && field.$valid) {
         return 'has-success';
         }
         if((field.$touched || field.$submitted) && field.$invalid) {
         return 'has-danger';
         }
      }
   },
   computed: { 
      ...mapGetters(["getPageTitle"]),
   },
   mounted: function() {
      this.$store.commit('setPageData', this.pageData)
   },
};
</script>