<template>
  <div>
    <md-modal-dialog v-slot="{group}" :md-click-outside-to-close="false" :md-fullscreen="false">
      <md-toolbar class="md-accent">
          <span class="md-title">Rename</span>
      </md-toolbar>
      <md-dialog-content>
         <md-field>
            <label class="">Test Title:</label>
            <md-input class=" " v-model="group.name"></md-input>
         </md-field>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="$modal.submit(group)" class="md-accent md-raised md-dense">Ok</md-button>
        <md-button @click="$modal.cancel()" class="md-accent md-raised md-dense">Cancel</md-button>  
      </md-dialog-actions>
    </md-modal-dialog>
  </div>
</template>

<script>
//
  export default {
    name: 'renameDialog',
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