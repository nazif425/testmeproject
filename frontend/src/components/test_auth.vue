<template>
  <md-modal-dialog v-slot="{test}" :md-click-outside-to-close="false" :md-fullscreen="false">
    <md-toolbar class="md-accent">
      <span class="md-title">Login to {{test.name}}</span>
    </md-toolbar>
    <md-dialog-content>
      <div class="md-body-1">{{status}}</div>
      <md-field>
          <label>Enter password</label>
          <md-input v-model="password" type="password" autocomplete="new-password"></md-input>
      </md-field>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button @click="validatePassword(test)">Login</md-button>
      <md-button @click="$modal.cancel()">Cancel</md-button>  
    </md-dialog-actions>
  </md-modal-dialog>
</template>

<script>
  export default {
    name: 'testAuthDialog',
    data () {
      return {
        password: '',
        status: ''
      }
    },
    methods: {
      validatePassword (test) {
         this.status = ""
         let data = {"password": this.password, "testId": test.id}
         this.$http({url: 'testapi/1/validatepassword/', method: 'POST', data})
         .then((resp) => {
               //console.log(resp)
               if (resp.data.password_is_valid)
                this.$modal.submit({test, password: this.password, start_test: true})
         })
         .catch((err) => {
               //console.log(err);
               //console.log(err.response.data)
               this.status = err.response.data.error
         })
      },
    }
  }
</script>