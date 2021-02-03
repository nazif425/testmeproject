/* eslint-disable no-console */

<template>
   <div>
      <md-snackbar :md-active.sync="showLoading"> {{loadingMessage}} </md-snackbar>
      <md-card class="md-elevation-5">
            <md-card-content v-show="!result">
               <div  id="group-table" class="" style=""></div>
            </md-card-content>
      </md-card>
      <md-card class="md-elevation-5" v-if="result">
            <md-card-header>
               <md-toolbar class="md-dense">
                  <div class="md-title">{{result.test}}</div>
               </md-toolbar>
            </md-card-header>
            <md-card-content v-if="!markingBoard">
               <md-table>
                  <md-table-row>
                        <md-table-head>name: </md-table-head>
                        <md-table-cell>{{result.name}}</md-table-cell>
                  </md-table-row>
                        <md-table-row>
                        <md-table-head>Username</md-table-head>
                        <md-table-cell>{{result.username}}</md-table-cell>
                  </md-table-row>
                        <md-table-row>
                        <md-table-head>Test Title</md-table-head>
                        <md-table-cell>{{result.test}}</md-table-cell>
                  </md-table-row>
                        <md-table-row>
                        <md-table-head>Group</md-table-head>
                        <md-table-cell>{{result.group}}</md-table-cell>
                  </md-table-row>
                        <md-table-row>
                        <md-table-head>Time Finished: </md-table-head>
                        <md-table-cell>{{result.time_elapsed}}</md-table-cell>
                  </md-table-row>
                        <md-table-row>
                        <md-table-head>Started</md-table-head>
                        <md-table-cell>{{result.started}}</md-table-cell>
                  </md-table-row>
                        <md-table-row>
                        <md-table-head>Submitted</md-table-head>
                        <md-table-cell>{{result.submitted}}</md-table-cell>
                  </md-table-row>
                        <md-table-row>
                        <md-table-head>Status</md-table-head>
                        <md-table-cell>{{result.status}}</md-table-cell>
                  </md-table-row>
                        <md-table-row>
                        <md-table-head>Correct Answers</md-table-head>
                        <md-table-cell>{{result.correct}}</md-table-cell>
                  </md-table-row>
                        <md-table-row>
                        <md-table-head>Incorrect Answers</md-table-head>
                        <md-table-cell>{{result.incorrect}}</md-table-cell>
                  </md-table-row>
                        <md-table-row>
                        <md-table-head>Score</md-table-head>
                        <md-table-cell>{{result.score}}</md-table-cell>
                  </md-table-row>
                  <md-table-row>
                     <md-table-head>Grade</md-table-head>
                     <md-table-cell>{{result.grade}}</md-table-cell>
                  </md-table-row>
               </md-table>
            </md-card-content>
            <md-card-content v-if="markingBoard && pendding">
               <div class="md-layout md-size-100">
                  
                  <div 
                     @click="prevPendding()"
                     class="cursor md-layout-item md-size-10 md-layout md-alignment-center-center">
                     <iconify-icon
                        class="iconify" icon="arrow-left-thick"
                        width="26" align="right" height="26" />
                  </div>
                  <div class="md-layout-item md-size-75">
                     <div class="md-caption">{{penddingIndex + 1}}/{{pendding.length}}</div>
                     <div class="md-subheading" style="margin-top: 2em;">
                        {{penddingIndex + 1}}. {{pendding[penddingIndex].question}}
                     </div>
                     <md-field v-if="pendding[penddingIndex].answer_type == 'FILL'">
                        <label>Answer</label>
                        <md-textarea 
                           v-model="pendding[penddingIndex].answer.answer" 
                           md-autogrow disabled></md-textarea>
                     </md-field>
                     <md-field v-if="pendding[penddingIndex].mark_scheme">
                        <label>Mark scheme</label>
                        <md-textarea 
                           v-model="pendding[penddingIndex].mark_scheme" 
                           md-autogrow disabled></md-textarea>
                     </md-field>
                     <div v-if="pendding[penddingIndex].answer_type == 'FILE'">
                        <div v-if="pendding[penddingIndex].file_type == 'IMAGE'">
                           <img :src="pendding[penddingIndex].answer.file" style="width: 100%; margin: 0 auto 0 auto;">
                        </div>
                        <span style="text-align: center">
                           <a :href="pendding[penddingIndex].answer.file">
                                 Download {{pendding[penddingIndex].answer.name}}
                           </a>
                        </span>
                     </div>
                     <div class="md-layout md-alignment-center-center">
                        <md-button
                           @click="(pendding[penddingIndex].score = pendding[penddingIndex].total_points)" 
                           class="md-raised md-dense md-accent">Correct</md-button>
                        <md-button
                           @click="(pendding[penddingIndex].score = 0)" 
                           class="md-raised md-dense md-accent">Incorrect</md-button>
                        <md-field class="md-layout-item md-size-20">
                           <label for="mark-score">Mark score</label>
                           <md-select v-model="pendding[penddingIndex].score" md-dense>
                              <md-option 
                                 v-for="(score, index) in questionScores(pendding[penddingIndex])" 
                                 :value="score" :key="index" 
                              >{{score}}</md-option>
                           </md-select>
                        </md-field>
                     </div>
                  </div>
                  <div 
                        @click="nextPendding()"
                        class="cursor md-layout-item md-size-10 md-layout md-alignment-center-center">
                        <iconify-icon    
                           class="iconify" icon="arrow-right-thick"
                           width="26" align="right" height="26" />
                  </div>
               </div>
            </md-card-content>
            <md-card-actions>
               <md-button 
                  @click="markTest()"
                  class="md-raised md-accent"
                  v-if="markingBoard && result.status == 'Pending'" 
                  :disabled="disableSubmit">Submit</md-button>
               <md-button 
                  class="md-raised md-accent"
                  v-if="!markingBoard && result.status == 'Pending'" 
                  @click="getPendding()">Mark answers</md-button>
                  <md-button 
                  class="md-raised md-accent" 
                  v-if="markingBoard"
                  @click="markingBoard = false">Back</md-button>
               <md-button 
                  v-if="!markingBoard"
                  class="md-raised md-accent" 
                  @click="closeResult()">Back</md-button>
            </md-card-actions>
      </md-card>
   </div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";
const tabulator = () => import(/* webpackChunkName: "tabulator" */"tabulator-tables")

export default {
   data(){
      return {
         pageData: {
            pageTitle: 'Test Results',
            showAppDrawer: false,
         },
         resultTable: null,
         results: [],
         result: null,
         row: null,
         questions: [],
         markingBoard: false,
         pendding: null,
         penddingIndex: 0,
         loadingMessage: "Loading ...",
         showLoading: false,
         disableSubmit: false,
         Tabulator: null,
      };
   },
   props: ['group_id', 'test_id'],
   methods: {
      closeResult () {
            this.row.update(this.result)
            this.result = null
            //this.resultTable.redraw() //this.setupTabulator()
      },
      questionScores (question) {
            let pointList = []
            for(let i = 0; i <= question.total_points; i++) {
               pointList.push(i)
            }
            return pointList
      },
      prevPendding() {
            if(this.penddingIndex - 1 >= 0)
               this.penddingIndex -= 1
      },
      nextPendding() {
            if(this.penddingIndex + 1 < this.pendding.length)
               this.penddingIndex += 1
      },
      getResults () {
            this.$http({url: 'testapi/1/result/', method: 'GET' })
            .then(resp => {
               //console.log(resp)
               this.results = resp.data
               if (this.test_id) 
                  this.results = this.results.filter(
                        (result) => result.test_id == this.test_id
                  )
               //console.log(this.results)
               this.setupTabulator()
            })
            .catch(err => {
               //console.log(err);
               this.loadingMessage = "No Result found"
               this.showLoading = true
               //this.offlineTestResults()
            })
      },
      getGroupResults () {
            this.$http({url: 'testapi/1/result/group/' + this.group_id + '/', method: 'GET' })
            .then(resp => {
               //console.log(resp)
               this.results = resp.data
               //console.log(this.results)
               this.setupTabulator()
            })
            .catch(err => {
               //console.log(err);
               this.loadingMessage = "No group result found"
               this.showLoading = true
               //this.offlineTestResults()
            })
      },
      offlineTestPendding () {
            this.pendding = [
               {
                  id: 5, 
                  question: 'what is your name', 
                  score: 0, 
                  total_points: 7, 
                  mark_scheme:'are you okey', 
                  file_type: 'IMAGE', 
                  answer_type: 'FILL', 
                  answer: {
                        answer: 'hello how are you doing',
                        name: 'ball.jpg', 
                        file: 'assets/img/card-image-3.jpg'
                  }
               },
               {
                  id: 5, 
                  question: 'not gfh is your name', 
                  score: 0, 
                  total_points: 7, 
                  mark_scheme:'hfiv hyare you okey', 
                  file_type: 'IMAGE', 
                  answer_type: 'FILL', 
                  answer: {
                        answer: 'hfhfhg you doing',
                        name: 'ball.jpg', 
                        file: 'assets/img/card-image-3.jpg'
                  }
               }
            ]
            this.markingBoard = true
      },
      getPendding () {
            //console.log(this.result)
            let data = {resultId: this.result.id}
            this.$http({url: 'testapi/1/penddingtest/', data, method: 'POST' })
            .then(resp => {
               //console.log(resp)
               this.pendding = resp.data
               //console.log(this.pendding)
               this.markingBoard = true
            })
            .catch(err => {
               //console.log(err);
               this.loadingMessage = "No pendding test found"
               this.showLoading = true
               //this.offlineTestPendding()
            })
      },
      markTest () {
            this.disableSubmit = true
            //console.log(this.result)
            let data = {
               resultId: this.result.id,
               answers: {}
            }
            this.pendding.forEach((question)=>{
               data.answers[question.id] = question.score
            })
            this.$http({url: 'testapi/1/marktest/', data, method: 'POST' })
            .then(resp => {
               //console.log(resp)
               this.disableSubmit = false
               this.result = resp.data
               this.loadingMessage = "Saved."
               if (this.result.status != "Pendding")
                  this.loadingMessage = "Assessment completed and Saved"
               this.showLoading = true    
               //console.log(this.pendding)
            })
            .catch(error => {
               //console.log(error);
               this.disableSubmit = false
               // display fields errors
               let storeError
               for(let key in error.response.data) {
                  storeError += key + ': ' + error.response.data[key].join('\n')
               }
               this.loadingMessage = storeError
            })
      },
      offlineTestResults () {
         let results2 = {
            id: 33,
            test: "csc 210 test - introduction to data structure",
            group: "csc 210",
            username: "u17/fnc/csc/1077",
            name: "absulnazif abdulkadir",
            time_elapsed: "1:58",
            started: "2020-12-16 - 12:00",
            submitted: "2020-12-16 - 13:58",
            status: "Pending",
            correct: 0,
            incorrect: 1,
            score: "---",
            grade: "---",
         }
         for(let i = 0; i < 10; i++) {
            this.results.push(results2)
         }
         this.setupTabulator()
      },
      openResult (row) {
         this.row = row
         this.result = row.getData()
      },
      setupTabulator () {
         if(this.Tabulator && this.resultTable === null) {
            let columns = [
               {field: "rowSelection", formatter:"rowSelection", visible: false,
                  titleFormatter:"rowSelection", hozAlign:"center", headerSort:false},
               {field: "SNo.", formatter:"rownum", title:"SNo."},
               {title: "Name", field: "name"},
               {title: "Username", field: "username"},
               {title: "Test Title", field: "test", width: 200},
               {title: "Group", field: "group"},
               {title: "Finish time", field: "time_elapsed"},
               {title: "Submitted", field: "submitted"},
               {title: "Status", field: "status"},
               {title: "Score", field: "score"},
               {title: "Grade", field: "grade"},
            ]

            this.resultTable = new this.Tabulator("#group-table", {
               data: this.results,
               layout:"fitDataFill",
               //responsiveLayout: "collapse",
               reactiveData: true,
               //layout: 'fitColumns',
               columns,
               //autoColumns:true,
               selectableRollingSelection: false,
               selectablePersistence: false,
               addRowPos: "bottom",
               pagination:"local",
               paginationSize:10,
               paginationSizeSelector:[10, 50, 100],
               paginationAddRow: "table",
               rowClick: function (e, row) {
                  row.toggleSelect()    
                  if (1 || (this.userDetail && this.userDetail.is_author))
                     this.openResult(row)                  
               }.bind(this),
               rowMouseEnter: function (e) {
                  e.target.style.cursor = 'pointer'
               }.bind(this),
               selectableCheck: function () {
                  return this.selectable 
               }.bind(this),
               cellEdited: function (cell) {
                  this.updateGroup(cell)
               }.bind(this),
               tooltips: function (cell) {
                  if(cell.getColumn().getField() == "test")
                     return cell.getValue()
               },
            });
         }
      },
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
         if (this.group_id) this.getGroupResults()
         else this.getResults()
      })
      this.$store.commit('setPageData', this.pageData)
   },
};
</script>