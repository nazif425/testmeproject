<template>
  <div>
    <md-modal-dialog v-slot="testInfo" :md-click-outside-to-close="false" :md-fullscreen="false">
      <md-toolbar class="md-accent">
          <span class="md-title">Submit Test</span>
      </md-toolbar>
      <md-dialog-content>
         <div class="md-title">Are you sure you want to submit test?</div>
         <div class="md-caption">Answered: {{testInfo.answered}}</div>
         <div class="md-caption">Unanswered: {{testInfo.unanswered}}</div>
         <div class="md-caption">Total Questions: {{testInfo.total}}</div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="$modal.submit()" class="md-accent md-raised md-dense">Submit</md-button>
        <md-button @click="$modal.cancel()" class="md-accent md-raised md-dense">Cancel</md-button>  
      </md-dialog-actions>
    </md-modal-dialog>
  </div>
</template>

<script>
//
  export default {
    name: 'submitDialog',
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