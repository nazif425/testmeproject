<template>
<div>
   <md-snackbar :md-active.sync="showLoading"> {{status}} </md-snackbar>
   <md-modal-dialog :md-click-outside-to-close="false" :md-fullscreen="false">
      <vue-form :state="formstate" 
         @submit.prevent="()=>{if (formstate.$invalid) change_password()}">
         <md-toolbar class="md-accent">
         <span class="md-title">Change password</span>
         </md-toolbar>
         <md-dialog-content>
            <div class="md-title">{{message}}</div>
            <div class="md-layout md-gutter">
               <div class="md-layout-item md-small-size-100">
                  <validate tag="md-field" :class="fieldClassName(formstate.new_password1)"
                     :custom="{validatePassword}">
                     <label for="enter-password">Password</label>
                     <md-input class="" type="password" name="new_password1" id="new_password1" 
                        autocomplete="new-password" v-model="password.new_password1" 
                        :disabled="sending" required />
                     <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                        <div slot="required">The password is required</div>
                        <div slot="validatePassword">Password should be aleast 8 characters</div>
                     </field-messages>
                  </validate>
               </div>
               <div class="md-layout-item md-small-size-100">
                  <validate tag="md-field" :class="fieldClassName(formstate.new_password2)"
                     :custom="{matchPassword}">
                     <label for="re-enter-password">Re-enter Password</label>
                     <md-input class="" type="password" name="new_password2" id="new_password2" 
                        autocomplete="new-password" v-model="password.new_password2" 
                        :disabled="sending" required />
                     <field-messages show="$touched || $submitted" class="md-error" style="opacity: 1.0;">
                        <div slot="required">please re-enter password</div>
                        <div slot="matchPassword">password does not match</div>
                     </field-messages>
                  </validate>
               </div>
            </div>
         </md-dialog-content>
         <md-dialog-actions>
         <md-button type="submit" class="md-accent md-raised md-dense" :disabled="sending">Ok</md-button>
         <md-button @click="$modal.cancel()" class="md-accent md-raised md-dense">Cancel</md-button>  
         </md-dialog-actions>
      </vue-form>
   </md-modal-dialog>
</div>
</template>

<script>
//
export default {
   name: 'uploadDialog',
   data () {
      return {
      showLoading: false,
      status: 'loading ...',
      message: '',
      password: {new_password1: '', new_password2: ''},
      formstate: {},
      passLen: 8,
      }
   },
   methods: {
      validatePassword (value) {
         return value.length >= this.passLen
      },
      matchPassword (value) {
         return value === this.password.new_password1
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
      change_password () {
         this.status = ""
         this.message = ""
         this.sending = true
         let data = this.password
         this.$http({url: '/rest-auth/password/change/ ', method: 'POST', data})
         .then((resp) => {
            //console.log(resp.data)
            this.message = "Password changed successfully"
            this.status = "Password changed successfully"
            setTimeout(()=>this.$modal.submit(resp.data), 1500)
         })
         .catch((err) => {
            this.sending = false
            //console.log(err);
            this.showLoading = true
            //console.log(err.response.data)
            this.message = err.response.data.details.join(', ')
            this.status = err.response.data.details.join(', ')
         })
      },
   }
}
</script>