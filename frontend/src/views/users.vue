/* eslint-disable no-console */

<template>
   <div>
      <md-snackbar :md-active.sync="showLoading"> {{loadingMessage}} </md-snackbar>
      <md-card class="md-elevation-5">
         <md-card-header>
            <!--group title bar-->
            <md-toolbar class="md-primary">
               <div class="md-title">Group Users</div>
            </md-toolbar>
         </md-card-header>
         <md-card-content>
            <div v-show="listUserView">
               <!--table actions-->
               <md-button @click="selectionToggle" 
                  class="md-raised md-dense md-primary">{{selectState}}</md-button>
               <md-button v-if="selectable" @click="selectAllRows" 
                  class="md-raised md-dense md-primary">select all</md-button>
               <md-button v-if="selectable" @click="deselectAllRows" 
                  class="md-raised md-dense md-primary">deselect all</md-button>
               <md-button v-if="selectable" @click="deleteSelectedRows" class="md-raised md-dense md-primary">
                  delete ({{userTable? userTable.getSelectedData().length: "0"}})</md-button>
               <md-button v-if="selectable" class="md-dense">
                  selected ({{userTable? userTable.getSelectedData().length: "0"}})</md-button>
               <!--table layout container-->
               <div id="user-table" class="" style=""></div>
            </div>
         </md-card-content>
         <md-card-actions>
            <md-button
               class="md-raised md-accent"
               :to="'/users/group/'+ group_id +'/add_user'"
            >Add User</md-button>
         </md-card-actions>
      </md-card>
   </div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";
const tabulator = () => import(/* webpackChunkName: "tabulator" */"tabulator-tables")
//import Tabulator from "tabulator-tables";

export default {
   data(){
      return {
         pageData: {
            pageTitle: 'Users',
            showAppDrawer: false,
         },
         Tabulator: null,
         myUsers: null,
         userTable: null,
         listUserView: false,
         selectable: false,
         selectState: 'select',
            
      };
   },
   props: ['group_id'],
   methods: {
      getMyGroupUser () {
         this.$http({url: 'testapi/1/mygroup/' + this.group_id + '/user/', method: 'GET' })
         .then(resp => {
            //console.log(resp)
            this.myUsers = resp.data
            this.setupTabulator()
            this.listUserView = true
         })
         .catch(err => {
            //console.log(err.response.data);
            this.loadingMessage = "No group user found"
            this.showLoading = true
         })
      },
      removeGroupUser (row) {
         const data = row.getData()
         this.loadingMessage = "Removing group user..."
         this.showLoading = true
         this.$http({url: "testapi/1/mygroup/"+ this.group_id +"/user/" + data.id + "/", method: 'DELETE' })
         .then(resp => {
            //console.log(resp)
            row.delete()
            this.loadingMessage = "Group user removed"
            this.showLoading = true
         })
         .catch(err => {
            //console.log(err);
            this.loadingMessage = "Failed to remove group"
            this.showLoading = true
         })
      },
      selectionToggle: function () {
         if(!this.selectable) {
            this.selectable = true
            this.userTable.showColumn("rowSelection")
            this.selectState = "cancel"
         } else {
            this.selectable = false
            this.userTable.deselectRow()
            this.userTable.hideColumn("rowSelection")
            this.selectState = "select"
         }
         
      },
      selectAllRows: function () {
         this.userTable.selectRow()
      },
      deselectAllRows: function () {
         this.userTable.deselectRow()
      },
      deleteSelectedRows: function () {
         let rows = this.userTable.getSelectedRows()
         if(rows)
            for(let x = 0; x < rows.length; x++)
               this.removeGroupUser(rows[x])
      },
      setupTabulator: function () {
         if(this.Tabulator && this.userTable === null) {
            this.userTable = new this.Tabulator("#user-table", {
               data: this.myUsers,
               reactiveData: true,
               layout: 'fitColumns',
               selectableRollingSelection: false,
               selectablePersistence: false,
               addRowPos: "bottom",
               pagination:"local",
               paginationSize:10,
               paginationSizeSelector:[10, 20, 50, 100],
               paginationAddRow: "table",
               rowClick: function (e, row) {
                  row.toggleSelect()
               }.bind(this),
               selectableCheck: function () {
                  return this.selectable 
               }.bind(this),
               columns: [
                  //('id', '',)
                  //("user", "date_of_birth", "gender", "phone_number", "profile_pic"
                  {field: "rowSelection", formatter:"rowSelection", visible: false,
                        titleFormatter:"rowSelection", hozAlign:"center", headerSort:false},
                  {field: "SNo.", formatter:"rownum", title:"SNo."},
                  {title: "Username", field: "username"},
                  {title: "First name", field: "first_name"},
                  {title: "Last name", field: "last_name"},
                  {title: "Gender", field: "profile_user.gender"},
                  {title: "Email", field: "email"},
               ],
            });
         }
      }
   },
   computed: { 
      ...mapGetters(["getPageTitle"]),
      ...mapGetters(["userDetail"]),
      ...mapGetters(["pageTitle"]),
   },
   mounted: function() {
      tabulator()
      .then(({default: Tabulator})=>{
         this.Tabulator = Tabulator
         this.getMyGroupUser()
      })
      this.$store.commit('setPageData', this.pageData)
      
   },
};
</script>