/* eslint-disable no-console */

<template>
   <div> 
      <vue-form :state="formstate" class="md-layout" @submit.prevent="onSubmit">
         <md-card class="">
            <md-card-header>
               <div class="md-display-1">Profile</div>
            </md-card-header>

            <md-card-content>
               <div v-if="error.non_field_errors" class="md-body-1" style="color: red">{{error.non_field_errors.join(', ')}}</div>
               <div class="md-layout md-gutter">
               <div class="md-layout md-layout-item md-size-50 md-small-size-100">
                  <div class="md-layout-item md-size-90 md-alignment-center-center" style="height: 80%">
                     <img :src="form.profile_pic" id="preview-image">
                     <md-field>
                        <label>Only images</label>
                        <md-file v-model="single" @change="onFileChange" accept="image/*" />
                     </md-field>
                  </div>
               </div>
               <div class="md-layout-item md-size-50 md-small-size-100">
                  <div v-if="error.username" class="md-body-1" style="color: red">{{error.username.join(', ')}}</div>
                  <validate tag="md-field" :class="fieldClassName(formstate.username)">
                     <label for="first-name">User Name  </label>
                     <md-input class="" name="user-name" id="user-name" autocomplete="off" 
                     v-model="form.username" :disabled="true" />
                     <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                        <div slot="required">The user nanme is required</div>
                        <div slot="maxlength">Invalid user name</div>
                     </field-messages>
                  </validate>
                  <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                     <div v-if="error.first_name" class="md-body-1" style="color: red">{{error.first_name.join(', ')}}</div>
                     <validate tag="md-field" :class="fieldClassName(formstate.first_name)"
                        :custom="{maxInputLength, minInputLength}">
                        <label for="first-name">First Name  </label>
                        <md-input class="" name="first-name" id="first_name" 
                              autocomplete="off" v-model="form.first_name" 
                              :disabled="sending" required />
                        <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                              <div slot="required">The first name is required</div>
                              <div slot="maxlength">Invalid first name</div>
                              <div slot="maxInputLength">Invalid first name, maximum length reached</div>
                              <div slot="minInputLength">Invalid first name, minimum of at least 3 character</div>
                        </field-messages>
                     </validate>
                  </div>
                  <div class="md-layout-item md-small-size-100">
                     <div v-if="error.last_name" class="md-body-1" style="color: red">{{error.last_name.join(', ')}}</div>
                     <validate tag="md-field" :class="fieldClassName(formstate.last_name)"
                        :custom="{maxInputLength, minInputLength}">
                        <label for="last-name">Last Name  </label>
                        <md-input class="" name="last-name" id="last_name" 
                              autocomplete="off" v-model="form.last_name" 
                              :disabled="sending" required />
                        <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                              <div slot="required">The first name is required</div>
                              <div slot="maxInputLength">Invalid last name, maximum length reached</div>
                              <div slot="minInputLength">Invalid last name, minimum of at least 3 character</div>
                        </field-messages>
                     </validate>
                  </div>
                  </div>
                  <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                     <div v-if="error.email" class="md-body-1" style="color: red">{{error.email.join(', ')}}</div>
                     <validate tag="md-field" :class="fieldClassName(formstate.email)">
                        <label for="email">Email</label>
                        <md-input class="" type="email" name="email" id="email" autocomplete="off" v-model="form.email" :disabled="true" />
                        <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                              <div slot="required">The email is required</div>
                              <div slot="email">Invalid email address</div>
                        </field-messages>
                     </validate>
                  </div>
                  <div class="md-layout-item md-small-size-100">
                     <div v-if="error.phone_number" class="md-body-1" style="color: red">{{error.phone_number.join(', ')}}</div>
                     <validate tag="md-field" :class="fieldClassName(formstate.phone_number)"
                        :custom="{validatephoneNo}">
                        <label for="phone-number">Phone Number</label>
                        <md-input class="" type="text" name="phone_number" id="phone-number"
                              autocomplete="off" v-model="form.phone_number" 
                              :disabled="sending"
                              />
                        <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                              <div slot="validatephoneNo">Invalid phone number</div>
                        </field-messages>
                     </validate>
                  </div>
                  </div>
                  <div v-if="error.date_of_birth" class="md-body-1" style="color: red">{{error.date_of_birth.join(', ')}}</div>
                  <validate tag="md-field" :class="fieldClassName(formstate.date_of_birth)">
                     <md-datepicker name="birth" id="birth" v-model="form.date_of_birth">
                        <label for="select-birth-date">Date of birth</label>
                     </md-datepicker>
                     <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                     </field-messages>
                  </validate>
                  <div v-if="error.gender" class="md-body-1" style="color: red">{{error.gender.join(', ')}}</div>
                  <validate tag="md-field" :class="fieldClassName(formstate.gender)">
                     <label for="gender">Gender</label>
                     <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
                        <md-option></md-option>
                        <md-option value="M">Male</md-option>
                        <md-option value="F">Female</md-option>
                     </md-select>
                     <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                     </field-messages>
                  </validate>
               </div>
            </div>         
            </md-card-content>

            <md-progress-bar md-mode="indeterminate" v-if="sending" />

            <md-card-actions>
               <md-button @click="openChangePassword" class="md-accent md-raised md-dense">Change password</md-button>
               <md-button type="submit" class="md-accent md-raised md-dense" :disabled="sending">Save</md-button>
               
            </md-card-actions>
         </md-card>

         <md-snackbar :md-active.sync="userSaved">saved with success!</md-snackbar>
      </vue-form>
   </div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";
import changePasswordDialog from "../components/change_password.vue";
            
export default {
   data: () => ({
      pageData: {
            pageTitle: 'Profile'
      },
      formstate: {},
      form: {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            date_of_birth: '',
            gender: '',
            profile_pic: ''
      },
      error: {},
      userSaved: false,
      fileObject: "",
      sending: false,
      lastUser: null,
      maxInputLen: 100,
      minInputLen: 3,
      passLen: 8,
      profileMessage: '',
   }),
   methods: {
      clearForm () {
         this.form.username = ''
         this.form.first_name = ''
         this.form.last_name = ''
         this.form.email = ''
         this.form.phone_number = ''
         this.form.gender = ''
         this.form.date_of_birth = ''            
      },
      populateForm () {
         if (this.userDetail) {
            this.form.profile_pic = this.getprofilePicUrl
            if (this.userDetail.profile_pic)
               this.form.profile_pic = this.userDetail.profile_pic || this.getprofilePicUrl
            this.form.username = this.userDetail.username || ""
            this.form.first_name = this.userDetail.first_name || ""
            this.form.last_name = this.userDetail.last_name || ""
            this.form.email = this.userDetail.email || ""
            this.form.phone_number = this.userDetail.phone_number || ""
            this.form.gender = this.userDetail.gender || ""
            this.form.date_of_birth = this.userDetail.date_of_birth || ""
         }
      },
      onFileChange(e){
         this.fileObject = e.target.files[0];
         let reader = new FileReader()
         reader.onload = function(e) {
            document.getElementById('preview-image').src = e.target.result
         }
         reader.readAsDataURL(this.fileObject)
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
      matchPassword (value) {
         return value === this.form.password1
      },
      validatephoneNo (value) {
         return value.length == 0 || ((value.length === 11) && (typeof Number(value) === "number"))
      },
      saveUser () {
         this.error = {}
         this.sending = true
         let formData= new FormData()
         Object.keys(this.form).forEach((key)=>{
            if(key == "profile_pic")
               formData.append(key, this.fileObject)
            else
               formData.append(key, this.form[key])
         })
         this.$store.dispatch('updateUserData', formData)
         .then((resp) => {
            //console.log(resp)
            this.sending = false
            this.userSaved = true
         })
         .catch(error => {
            // display fields errors
            let storeError = '<div>'
            if (error.response.data instanceof Object)
               for(let key in error.response.data) 
                  storeError += key + ': ' + error.response.data[key].join('</div><div>')
            storeError += '</div>'
            this.error = error.response.data
            this.profileMessage = storeError
            this.sending = false
            //console.log(error.response.data);
            this.sending = false
         });
      },
      onSubmit () {
         if (this.formstate.$invalid) {
            return;
         } else {
            this.saveUser()
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
      },
      openChangePassword () {
         this.$modal.show(changePasswordDialog)
         .then(()=>{})
         .catch(()=>{})
      },
   },
   computed: {
      ...mapGetters(["getPageTitle"]),
      ...mapGetters(["getprofilePicUrl"]),
      ...mapGetters(["userDetail"])
   },
   mounted: function() {
      //insert user data in form
      this.populateForm() 
      //set page title
      this.$store.commit('setPageData', this.pageData)
   },
};
</script>