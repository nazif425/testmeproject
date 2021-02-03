<template>
<div>
   <md-snackbar :md-active.sync="showLoading"> {{status}} </md-snackbar>
   <md-modal-dialog v-slot="{startData}" :md-click-outside-to-close="false" :md-fullscreen="false">
      <md-toolbar class="md-accent">
      <span class="md-title">Confirm to attempt {{startData.test.name}}</span>
      </md-toolbar>
      <md-dialog-content>
      <md-table>
         <md-table-row>
            <md-table-head>Title:</md-table-head>
            <md-table-cell>{{startData.test.name}}</md-table-cell>
         </md-table-row>
         <md-table-row>
            <md-table-head>status:</md-table-head>
            <md-table-cell>{{startData.test.status}}</md-table-cell>
         </md-table-row>
         <md-table-row>
            <md-table-head>Total questions:</md-table-head>
            <md-table-cell>{{startData.test.valid_questions}}</md-table-cell>
         </md-table-row>
         <md-table-row>
            <md-table-head>duration:</md-table-head>
            <md-table-cell>{{Math.ceil(startData.test.duration / 60)}}</md-table-cell>
         </md-table-row>
      </md-table>
      <div class="md-title">{{message}}</div>
      </md-dialog-content>
      <md-dialog-actions>
      <md-button @click="startTest(startData)" class="md-accent md-raised md-dense">Start</md-button>
      <md-button @click="$modal.cancel()" class="md-accent md-raised md-dense">Cancel</md-button>  
      </md-dialog-actions>
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
      message: 'Do you want to start test? Click on the Start button to start.',
      }
   },
   methods: {
      startTest (startData) {
         this.status = ""
         this.message = ""
         let data = {"password": startData.password, "testId": startData.test.id}
         this.$http({url: 'testapi/1/testquestions/', method: 'POST', data})
         .then((resp) => {
            //console.log(resp.data)
            this.$modal.submit(resp.data)
         })
         .catch((err) => {
            //console.log(err);
            this.showLoading = true
            //console.log(err.response.data)
            this.message = err.response.data.error
            this.status = err.response.data.error
         })
      },
   }
}
</script>