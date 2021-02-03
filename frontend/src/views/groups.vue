/* eslint-disable no-console */

<template>
   <div>
      <md-tabs class="" 
            @md-changed="changeTab">
            <md-tab md-label="My groups" id="mygroup_tab" class="">
               <div v-if="myGroupLoaded" class="md-alignment-top-center md-layout md-size-100">                    
                  <md-card 
                        v-for="(group, index) in myGroups" :key="index"
                        class="md-elevation-5 md-layout-item md-xsmall-size-100 md-size-38" md-with-hover>
                        <md-card-header>
                           <router-link :to="'/dashboard/test/group/' + group.id" class="group-link">
                              <md-card-header-text>
                                    <div class="md-title">{{group.name}}</div>
                                    <div class="md-subhead">By: {{group.author}}</div>
                                    <div class="md-subhead">Tests: {{group.total_tests}}</div>
                                    <div class="md-subhead">Users: {{group.total_tests}}</div>
                              </md-card-header-text>
                           </router-link>
                        </md-card-header>
                        <!--
                        <md-card-content>
                        </md-card-content>
                        -->
                        <md-card-actions>
                           <md-button v-if="group.is_author" :to="'/users/group/' + group.id" class="md-dense">User</md-button>
                           <md-button  :to="'/dashboard/test/group/' + group.id" class="md-dense">Test</md-button>
                           <md-button  :to="'/dashboard/results/group/' + group.id" class="md-dense">Result</md-button>
                           <md-menu v-if="group.is_author">
                              <md-button class="md-icon-button" md-menu-trigger>
                                 <iconify-icon 
                                 class="iconify vsm--icon" 
                                 icon="dots-vertical"
                                 width="25" height="25">
                                 </iconify-icon>
                              </md-button>
                              <md-menu-content>
                                 <md-menu-item ><a class="cursor" @click="showRenamePrompt(group)">Rename</a></md-menu-item>
                                 <md-menu-item ><a class="cursor" @click="showDeletePrompt(group)">Delete</a></md-menu-item>
                              </md-menu-content>
                           </md-menu>
                        </md-card-actions>
                  </md-card>
               </div>
            </md-tab>
            <md-tab md-label="all groups" id="allgroup_tab" class="">
               <div v-if="allGroupLoaded" class="md-layout md-size-100">
                  <md-card 
                     v-for="(group, index) in allGroups" :key="index" 
                     class="md-elevation-5 md-layout-item md-size-28 md-small-size-38 md-xsmall-size-100" md-with-hover
                  >
                     <md-card-header>
                        <router-link :to="'/dashboard/test/group/' + group.id" class="group-link">
                           <md-card-header-text>
                              <div class="md-title">{{group.name}}</div>
                              <div class="md-subhead">By: {{group.author}}</div>
                              <div class="md-subhead">Tests: {{group.total_tests}}</div>
                              <div class="md-subhead">Users: {{group.total_tests}}</div>
                           </md-card-header-text>
                        </router-link>
                     </md-card-header>
                     <!--
                     <md-card-content>
                     </md-card-content>
                     -->
                  </md-card>
               </div>
            </md-tab>
      </md-tabs>
      <md-card 
         v-if="allGroupLoaded && userDetail.is_author" 
         class="md-elevation-5  md-size-100"
      >
         <md-card-header>
            <div class="md-title">Add new group</div>
            <div if="createMessage">{{createMessage}}</div>
            <md-field>
               <label>Group name</label>
               <md-input 
                     v-model="createGroup.name" 
                     @input="validateName()"
               />
            </md-field>
            <md-field class="md-size-50">
               <label for="select-group">Select Access</label>
               <md-select v-model.lazy.trim="createGroup.access">
                     <md-option value="General">All Users</md-option>
                     <md-option value="Members">Members Only</md-option>
               </md-select>
            </md-field>
            <md-button class="md-list-action md-raised md-primary md-dense" 
            @click="createNewGroup()"
            :disabled="disableCreate">Create</md-button>
         </md-card-header>
      </md-card>
      <md-card class="md-elevation-5  md-size-100">
         <md-card-header>
            <div class="md-title">Join group</div>
            <div if="joinMessage">{{joinMessage}}</div>
            <label for="select_group">Select Group</label>
            <select
               style="width: 100%; padding:1em"
               name="select_group" id="select_group_id" v-model.lazy="joinGroup.group" @change="checkAccess()">
               <option v-for="(group, index) in allGroups" :key="index" :value="group.id">{{group.name}}</option>
            </select>
            <div v-if="groupAccess && groupAccess.requires_access_key">
               <div class="md-subheading">Enter {{groupAccess.name}} access Key</div>
               <md-field>
                  <label for="access key">access key</label>
                  <md-input autocomplete="new-password" v-model="joinGroup.access_key" md-dense :disabled="disableJoin" type="password"></md-input>
               </md-field>
            </div>
            <md-button class="md-raised md-primary md-dense" 
               @click="joinNewGroup()"
               :disabled="disableJoin">Join</md-button>
         </md-card-header>
      </md-card>  
   </div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";
import deleteDialog from "../components/delete_prompt";
import renameDialog from "../components/rename_prompt";   

export default {
   data(){
      return {
            pageData: {
               pageTitle: 'Groups'
            },
            groupId: '',
            createGroup: {name: '', access: 'Members'},
            createMessage: '',
            allGroupLoaded: false,
            myGroupLoaded: false,
            disableCreate: false,
            disableJoin: false,
            joinMessage: '',
            joinGroup: {group: '', access_key: ''},
            myGroups: [],
            allGroups: [],
            groupAccess: null,
      };
   },
   methods: {
      showDeletePrompt(group) {
         this.$modal.show(deleteDialog, {prompt: "Are you sure you want to delete group?"})
         .then(()=>{
            this.$modal.cancel()
            this.deleteGroup(group)
         })
         .catch(()=>{})
      },
      showRenamePrompt(group) {
         this.$modal.show(renameDialog, {group: group})
         .then((group)=>{
            this.$modal.cancel()
            this.renameGroup(group)
         })
         .catch(()=>{})
      },
      deleteGroup(group){
         this.$http({url: 'testapi/1/mygroup/' + group.id + '/', method: 'DELETE' })
         .then(resp => {
            //console.log(resp)
            this.loadingMessage = "Group deleted successfully"
            this.showLoading = true
            this.loadGroups()
         })
         .catch((resp)=>{
            //console.log(resp)
            this.loadingMessage = "Failed to delete group"
            this.showLoading = true
         })
      },
      renameGroup(group){
         this.$http({url: 'testapi/1/mygroup/' + group.id + '/', data: group, method: 'PUT' })
         .then(resp => {
            //console.log(resp)
            this.loadingMessage = "Group renamed successfully"
            this.showLoading = true
            this.loadGroups()
         })
         .catch((resp)=>{
            //console.log(resp)
            this.loadingMessage = "Failed to rename group"
            this.showLoading = true
         })
      },
      checkAccess () {
         this.joinMessage = ''
         this.$http({url: 'testapi/1/group_access/' + this.joinGroup.group + '/', method: 'GET' })
         .then(resp => {
            //console.log(resp)
            this.groupAccess = resp.data
         })
         .catch(err => {
            //console.log(err.response.data);
            this.joinMessage = err.response.data.error
         })
      },
      joinNewGroup () {
         this.joinMessage = ''
         this.disableJoin = true
         this.$http({url: 'testapi/1/group_admission/' + this.joinGroup.group + '/', data: this.joinGroup, method: 'POST' })
         .then(resp => {
            //console.log(resp)
            this.loadGroups()
            this.disableJoin = false
         })
         .catch(err => {
            //console.log(err.response.data);
            this.joinMessage = err.response.data.error
            this.disableJoin = false
         })
      },
      getMyGroup () {
         this.$http({url: 'testapi/1/mygroup/', method: 'GET' })
         .then(resp => {
            //console.log(resp)
            this.myGroups = resp.data
            this.myGroupLoaded = true
         })
         .catch(err => {
            //console.log(err.response.data);
         })
      },
      loadGroups() {
         this.getMyGroup()
         this.getAllGroup()
      },
      createNewGroup () {
         let data = this.createGroup
         this.$http({url: 'testapi/1/mygroup/', data, method: 'POST' })
         .then(resp => {
            //console.log(resp)
            this.groupId = resp.data.id
            this.loadGroups()
         })
         .catch(err => {
            //console.log(err.response.data);
         })
      },
      getAllGroup () {
            this.$http({url: 'testapi/1/allgroup/', method: 'GET' })
            .then(resp => {
               //console.log(resp)
               this.allGroups = resp.data
               this.allGroupLoaded = true
            })
            .catch(err => {
               //console.log(err.response.data);
            })
      },
      validateName () {
            this.createMessage = ''
            this.disableCreate = !this.createGroup.name
            this.allGroups.forEach((group)=>{
               if (group.name == this.createGroup.name){
                  this.disableCreate = true
                  this.createMessage = "group name '" + this.createGroup.name + "' already exists. Please use another name."
               }      
            })
      },
   },
   computed: { 
      ...mapGetters(["getPageTitle"]),
      ...mapGetters(["userDetail"]),
      ...mapGetters(["pageTitle"]),
   },
   mounted: function() {
      this.$store.commit('setPageData', this.pageData)
      this.loadGroups()
   },
};
</script>