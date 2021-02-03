/* eslint-disable no-console */

<template>
   <div>
      <md-snackbar :md-active.sync="showLoading"> {{loadingMessage}} </md-snackbar>
      <md-tabs class="" @md-changed="changeTab">
         <md-tab v-if="myTestloaded" md-label="My test" id="mytest_tab" class="">
            <div class="md-title" v-if="group">{{group.name}}</div>
            <div v-for="(test, index) in myTests" :key="index">
               <md-card class="md-elevation-5" md-with-hover>
                  <md-card-header>
                     <md-card-header-text>
                        <md-table>
                           <md-table-row>
                              <md-table-head>Title:</md-table-head>
                              <md-table-cell>{{test.name}}</md-table-cell>
                           </md-table-row>
                           <md-table-row>
                              <md-table-head>status:</md-table-head>
                              <md-table-cell>{{test.status}}</md-table-cell>
                           </md-table-row>
                           <md-table-row>
                              <md-table-head>Total questions:</md-table-head>
                              <md-table-cell>{{test.valid_questions}}</md-table-cell>
                           </md-table-row>
                           <md-table-row>
                              <md-table-head>duration:</md-table-head>
                              <md-table-cell>{{test.duration}} Mins</md-table-cell>
                           </md-table-row>
                        </md-table>
                     </md-card-header-text>
                     <md-card-media md-big>
                           <img :src="test.cover_image || 'assets/img/testme_quiz.png'" alt="test image">
                     </md-card-media>
                     
                  </md-card-header>
                  <!--
                  <md-card-content>
                  </md-card-content>
                  -->
                  <md-card-actions>
                     <md-button v-if="test.start_test" :to="'/write_test/' + test.id" class=" md-dense">Start Test</md-button>
                     <md-button v-if="test.result_available" :to="'/dashboard/results/test/' + test.id" class=" md-dense">Result</md-button>
                     <md-button v-if="test.is_author" :to="'/dashboard/testbuilder/' + test.id" class=" md-dense">Test Builder</md-button>
                     <md-menu v-if="userDetail.is_author">
                        <md-button class="md-icon-button" md-menu-trigger>
                           <iconify-icon 
                           class="iconify vsm--icon" 
                           icon="dots-vertical"
                           width="25" height="25">
                           </iconify-icon>
                        </md-button>
                        <md-menu-content>
                           <md-menu-item ><a class="cursor" @click="showDeletePrompt(test)">Delete</a></md-menu-item>
                           <md-menu-item ><a class="cursor" @click="showTestConfigDialog(test)">Settings</a></md-menu-item>
                        </md-menu-content>
                     </md-menu>
                  </md-card-actions>
               </md-card>
            </div>
         </md-tab>
         <md-tab v-if="allTestloaded" md-label="All test" id="alltest_tab" class="">
            <div v-for="(test, index) in allTests" :key="index">
               <md-card class="md-elevation-5" md-with-hover>
                  <md-card-header>
                     <md-card-header-text>
                        <md-table>
                           <md-table-row>
                                 <md-table-head>Title:</md-table-head>
                                 <md-table-cell>{{test.name}}</md-table-cell>
                           </md-table-row>
                           <md-table-row>
                                 <md-table-head>status:</md-table-head>
                                 <md-table-cell>{{test.status}}</md-table-cell>
                           </md-table-row>
                           <md-table-row>
                                 <md-table-head>Total questions:</md-table-head>
                                 <md-table-cell>{{test.valid_questions}}</md-table-cell>
                           </md-table-row>
                           <md-table-row>
                                 <md-table-head>duration:</md-table-head>
                                 <md-table-cell>{{test.duration}} Mins</md-table-cell>
                           </md-table-row>
                        </md-table>
                     </md-card-header-text>
                     <md-card-media md-big>
                        <img :src="test.cover_image || 'assets/img/card-image-3.jpg'" alt="test image">
                     </md-card-media>
                     
                  </md-card-header>
                  <!--
                  <md-card-content>
                  </md-card-content>
                  -->
                  <md-card-actions>
                     <md-button v-if="test.start_test" :to="'/write_test/' + test.id" class=" md-dense">Start Test</md-button>
                     <md-button v-if="test.result_available" :to="'/dashboard/results/test/' + test.id" class=" md-dense">Result</md-button>
                  </md-card-actions>
               </md-card>
            </div>
         
         </md-tab>
      </md-tabs>
      <!---->
      <md-card 
         v-if="myGroupLoaded && userDetail.is_author" 
         class="md-elevation-5 md-size-100" 
         md-with-hover
      >
         <md-card-header>
         <div class="md-title">Add new test</div>
            <md-field>
               <label>Test Title</label>
               <md-input v-model="createTest.name" @input="validateName()"></md-input>
            </md-field>
            <md-field class="md-size-50">
               <label for="select-group">Select Group</label>
               <md-select
                     v-model.lazy="createTest.group" md-dense>
                     <div v-for="(group, index) in myGroups" :key="index">
                        <md-option :value="group.id">{{group.name}}</md-option>
                     </div>
               </md-select>
            </md-field>
            <md-button class="md-list-action md-raised md-primary md-dense" 
               @click="addTest()"
               :disabled="disableCreate">Create</md-button>
         </md-card-header>
      </md-card>
            
   </div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";
import testConfigDialog from "../components/test_config";
import deleteDialog from "../components/delete_prompt";

export default {
   data(){
      return {
            pageData: {
               pageTitle: 'Tests'
            },
            testId: '',
            group: null,
            groups: [],
            createTest: {name: '', group: ''},
            disableCreate: false,
            myTestloaded: false,
            allTestloaded: false,
            myGroups: [],
            myGroupLoaded: false,
            myTests: [],
            allTests: [],
            questions: [],
            loadingMessage: "Loading...",
            showLoading: false,
      };
   },
   props: ['group_id'],
   methods: {
      showDeletePrompt(test) {
         this.$modal.show(deleteDialog, {prompt: "Are you sure you want to delete test?"})
         .then(()=>{
            this.$modal.cancel()
            this.deleteTest(test)
         })
         .catch(()=>{})
      },
      deleteTest(test){
         this.$http({url: 'testapi/1/test/' + test.id + '/', method: 'DELETE' })
         .then(resp => {
            //console.log(resp)
            this.loadingMessage = "Test deleted successfully"
            this.showLoading = true
            this.loadTest() 
         })
         .catch((resp)=>{
            //console.log(resp)
            this.loadingMessage = "Failed to delete test"
            this.showLoading = true
         })
      },
      showTestConfigDialog (test) {
         this.$http({url: 'testapi/1/test/' + test.id + '/', method: 'GET' })
         .then(resp => {
            //console.log(resp)
            this.test = resp.data
            this.formatDate()
            this.$modal.show(testConfigDialog, {test: this.test})
            .then((formData)=>{
               this.$modal.cancel()
               if (formData) {
                  this.updateTestData(formData)
               }
            })
            .catch(()=>{})
         })
         .catch(err => {
            //console.log(err.response.data);
            this.loadingMessage = "Failed retrieve new test data"
            this.showLoading = true
         })
      },
      formatDate () {
         if (this.test.start_date) this.test.start_date =  this.test.start_date.slice(0, 16)
         if (this.test.end_date) this.test.end_date = this.test.end_date.slice(0, 16)
         if (this.test.created) this.test.created = this.test.created.slice(0, 16)
      },
      updateTestData(data) {
         this.$http({url: 'testapi/1/test/'+ this.test.id + '/', data, method: 'PUT' })
         .then(resp => {
            //console.log(resp)
            this.$modal.cancel()
            this.loadingMessage = "Test update successful"
            this.showLoading = true
            this.loadTest() 
         })
         .catch(err => {
            //console.log(err);
            this.$modal.cancel()
            this.loadingMessage = "Test update failed"
            this.showLoading = true
            this.loadTest() 
         })
      },
      loadTest() {
         if (this.group_id) 
            this.getMyGroupTest()
         else 
            this.getMyTest()
         this.getAllTest()
         this.getMyGroup()
      },
      getMyTest () {
         this.$http({url: 'testapi/1/mytest/', method: 'GET' })
         .then(resp => {
            //console.log(resp)
            this.myTests = resp.data
            this.myTestloaded = true
         })
         .catch(err => {
            //console.log(err.response.data);
            this.loadingMessage = "No test list found"
            this.showLoading = true
         })
      },
      getMyGroupTest () {
         this.$http({url: 'testapi/1/mytest/group/' + this.group_id + '/', method: 'GET' })
         .then(resp => {
            //console.log(resp)
            this.myTests = resp.data
            this.myTestloaded = true
         })
         .catch(err => {
            //console.log(err.response.data);
            this.loadingMessage = "No group test found"
            this.showLoading = true
         })
      },
      getAllTest() {
         this.$http({url: 'testapi/1/alltest/', method: 'GET' })
         .then(resp => {
            //console.log(resp)
            this.allTests = resp.data
            this.allTestloaded = true
         })
         .catch(err => {
            //console.log(err.response.data);
            this.loadingMessage = "No test list found"
            this.showLoading = true
         })
      },
      getMyGroup () {
         this.$http({url: 'testapi/1/mygroup/', method: 'GET' })
         .then(resp => {
            //console.log(resp)
            this.myGroups = resp.data
            for(let group of this.myGroups){
               if (group.id == this.group_id){
                  this.group = group
                  break;
               }
            }
            this.myGroupLoaded = true
         })
         .catch(err => {
            //console.log(err.response.data);
            this.loadingMessage = "No test group found"
            this.showLoading = true
         })
      },
      addTest () {
         let formData= new FormData()
         Object.keys(this.createTest).forEach((key)=>{
            //null to empty string
            if (!this.createTest[key])
               this.createTest[key] = '' 
            else formData.append(key, this.createTest[key])
         })
         this.$http({url: 'testapi/1/test/', data: formData, method: 'POST' })
         .then(resp => {
            //console.log(resp)
            this.testId = resp.data.id
            this.loadTest() 
         })
         .catch(err => {
            //console.log(err.response.data);
            this.loadingMessage = "Failed to add test"
            this.showLoading = true
         })
      },
      validateName () {
            this.disableCreate = !this.createTest.name.trim()
      },
      /*
      removeTest (index) {
         const data = this.tests[index]
         if (!data.localData) {
            this.showLoading = true
            this.$http({url: "testapi/1/test/"+ index +"/", method: 'DELETE' })
            .then(resp => {
               //console.log(resp)
               this.tests.splice(index, 1)
               this.loadingMessage = "Test removed"
               this.showLoading = true
            })
            .catch(err => {
               //console.log(err);
               this.loadingMessage = "Failed to remove test"
               this.showLoading = true
            })
         } else {
            this.tests.splice(index, 1)
            this.loadingMessage = "test removed"
            this.showLoading = true
         }
      },
      */
   },
   computed: { 
      ...mapGetters(["getPageTitle"]),
      ...mapGetters(["userDetail"]),
      ...mapGetters(["pageTitle"]),
   },
   mounted: function() {

      this.$store.commit('setPageData', this.pageData)
      this.loadTest()
      //this.$modal.show(testConfigDialog, {test: {name: "test happy"}})
   },
};
</script>