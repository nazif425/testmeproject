<template>
  <div>
    <md-modal-dialog v-slot="{prompt}" :md-click-outside-to-close="false" :md-fullscreen="false">
      <md-toolbar class="md-accent">
          <span class="md-title">Delete</span>
      </md-toolbar>
      <md-dialog-content>
         <div class="md-title">{{prompt}}</div>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="$modal.submit()" class="md-accent md-raised md-dense">Delete</md-button>
        <md-button @click="$modal.cancel()" class="md-accent md-raised md-dense">Cancel</md-button>  
      </md-dialog-actions>
    </md-modal-dialog>
  </div>
</template>

<script>
//
  export default {
    name: 'deleteDialog',
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