<template>
  <div>
    <md-snackbar :md-active.sync="showLoading"> {{status}} </md-snackbar>
    <md-modal-dialog v-slot="{testExit}" :md-click-outside-to-close="false" :md-fullscreen="false">
      <md-toolbar class="md-accent">
        <span class="md-title">Exit</span>
      </md-toolbar>
      <md-dialog-content>
        <div v-if="testExit" class="md-title">Do you want to Exit?</div>
        <div v-else class="md-title">Please submit test before you exit</div>
      </md-dialog-content>

      <md-dialog-actions v-if="testExit">
        <md-button @click="$modal.submit()" class="md-accent md-raised md-dense">Exit</md-button>
        <md-button @click="$modal.cancel()" class="md-accent md-raised md-dense">Cancel</md-button>  
      </md-dialog-actions>
      <md-dialog-actions v-else>
        <md-button @click="$modal.cancel()" class="md-accent md-raised md-dense">Ok</md-button>  
      </md-dialog-actions>
    </md-modal-dialog>
  </div>
</template>

<script>
//
  export default {
    name: 'exitTestDialog',
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