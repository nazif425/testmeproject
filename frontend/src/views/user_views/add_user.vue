/* eslint-disable no-console */ 

<template>
   <div>
      <md-card class="md-layout-item md-size-50 md-small-size-100">
         <md-card-header>
            <div class="md-display-1">Add user to group By:</div>
         </md-card-header>
         <md-card-content>
            <div class="md-inset"><router-link :to="'/signup/'+ group_id">Group signup form</router-link></div>
            <div class="">
               <md-checkbox v-model="groupAccess.can_admit" @change="updateGroupAccess('can_admit')">
                  <a class="cursor">Join group via access key (for existing user)</a>
               </md-checkbox>
            </div>
            <div v-if="groupAccess.can_admit">
               <div><b>{{accessMessage}}</b></div>
               <md-field>
                  <label class="">New access Key:</label>
                  <md-input class=" " v-model="groupAccess.access_key" type="password" autocomplete="new-password"></md-input>
               </md-field>
               <md-button class=" md-raised md-dense md-accent" @click="updateGroupAccess('access_key')">submit</md-button>
            </div>         
            <!--
               <div class="md-body-1"><router-link href :to="'/dashboard/users/group/'+ group_id +'/add_user'">Select user from database</router-link></div>
               <div class="md-body-1"><router-link href :to="'/dashboard/users/group/'+ group_id +'/add_user'">Select user in database via CSV file (not available)</router-link></div>
               <div class="md-body-1"><router-link href :to="'/dashboard/users/group/'+ group_id +'/add_user'">Add new user via CSV FILE (not available)</router-link></div>
            -->
         </md-card-content>
         <md-progress-bar md-mode="indeterminate" v-if="sending" />

         <md-card-actions>
         </md-card-actions>
      </md-card>
      
   </div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";
   

export default {
   data: () => ({
      pageData: {
         pageTitle: 'Add user options'
      },
      group: null,
      groupAccess: {can_admit: false, access_key: ''},
      accessMessage: '',
   }),
   props: ['group_id'],
   methods: {
      checkAccess () {
         this.accessMessage = ''
         this.$http({url: 'testapi/1/group_access/' + this.group_id + '/', method: 'GET' })
         .then(resp => {
            //console.log(resp)
            this.group = resp.data
            this.groupAccess.can_admit = this.group.can_admit
         })
         .catch(err => {
            //console.log(err.response.data);
            this.accessMessage = err.response.data.error
         })
      },
      updateGroupAccess (field) {
         this.accessMessage = ''
         let data = {}
         data[field] = this.groupAccess[field]
         this.$http({url: 'testapi/1/group_access/' + this.group_id + '/', data, method: 'POST' })
         .then(resp => {
            //console.log(resp)
            this.accessMessage = 'Done!'
            setTimeout(() => {this.accessMessage = ''}, 1500)
         })
         .catch(err => {
            //console.log(err.response.data);
            this.accessMessage = err.response.data.error
         })
      },
   },
   computed: {
      ...mapGetters(["userDetail"]),
      ...mapGetters(["getprofilePicUrl"])
   },
   mounted: function() {
      this.$store.commit('setPageData', this.pageData)
      this.checkAccess()
   }, 
};
</script>