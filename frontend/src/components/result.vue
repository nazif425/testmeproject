<template>
  <div>
    <md-modal-dialog v-slot="{result, test}" :md-click-outside-to-close="false" :md-fullscreen="false">
      <md-toolbar class="md-accent">
          <span class="md-title">Result for {{test.name}}</span>
      </md-toolbar>
      <md-dialog-content>
         <div v-if="result">
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
            <md-divider></md-divider>
         </div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="$modal.cancel()" class="md-accent md-raised md-dense">Back</md-button>  
      </md-dialog-actions>
    </md-modal-dialog>
  </div>
</template>

<script>
//
  export default {
    name: 'resultDialog',
    data () {
      return {
        showLoading: false,
        status: 'loading ...',
      }
    },
    methods: {
      
    }
  }
</script>