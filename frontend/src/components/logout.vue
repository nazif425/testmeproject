<template>
  <div>
    <md-modal-dialog v-slot="{userDetail, dispatch}" :md-click-outside-to-close="false" :md-fullscreen="false">
      <md-toolbar class="md-accent">
         <span class="md-title">Logout</span>
      </md-toolbar>
      <md-dialog-content>
         <div class="md-layout md-alignment-center-left"> 
            <div class="md-layout-item md-size-30">
               <md-avatar class="md-large">
                  <img v-if="userDetail" :src="userDetail.profile_pic">
                  <iconify-icon v-else class="iconify" icon="account"></iconify-icon>
               </md-avatar>
            </div>
            <div class="md-layout-item md-size-70">
               <span v-if="userDetail" class="md-title">{{userDetail.username}}</span>
            </div>
         </div>
         <div class="md-layout">
            <div class="md-layout md-title">Are you sure you want to logout?</div>
         </div>
      </md-dialog-content>
      <md-snackbar :md-active.sync="logoutSuccess">{{snackMessage}}</md-snackbar>
      <md-dialog-actions>
        <md-button class="md-primary" @click="logMeOut(dispatch)" :disabled="disableLogout">Logout</md-button>
        <md-button class="md-primary" @click="onCancel">Back</md-button>
      </md-dialog-actions>
    </md-modal-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";

export default {
   name: 'LogoutDialog',
   data: () => {
      return {
         logoutSuccess: false,
         snackMessage: "",
         disableLogout: false
      }
   },
   methods: {
      onCancel () {
         this.$modal.cancel()
      },
      logMeOut (dispatch) {
         this.disableLogout = true
         dispatch('logout').then(() => {
            this.snackMessage = "logout successful"
            this.logoutSuccess = true
            this.$modal.submit()
         })
         .catch((error)=> {
            this.disableLogout = false
            this.snackMessage = "logout failed"
            this.logoutSuccess = true
            //console.log(error);
         })
      },
   },
   computed: {
      ...mapGetters(["userDetail"]),
      ...mapGetters(["getprofilePicUrl"]),
   },
}
</script>

<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
  }
</style>