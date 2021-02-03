<template>
  <md-modal-dialog v-slot="{ tests, openTest}" :md-click-outside-to-close="false" :md-fullscreen="false">
    <md-toolbar class="md-accent">
      <span class="md-title">Tests list</span>
    </md-toolbar>
    <md-dialog-content>
      <md-list class="md-double-line">
         <md-subheader>Test</md-subheader>
         <md-divider />
         <div v-if="tests">
            <md-list-item v-for="(test, index) in tests" :key="index">
               
               <div class="md-list-item-text">
                  <span>{{test.name}}</span>
                  <div>
                    groups:
                    <span v-for="(group, i) in test.group" :key="i"> {{group}} </span>
                  </div>
               </div>
               <md-button 
                  class="md-list-action md-icon-button"
                  @click="openTest(index)">
                  <iconify-icon class="iconify" width="26" height="26" icon="download"></iconify-icon>
                </md-button>
            </md-list-item>
         </div>
      </md-list>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button @click="$modal.cancel()">Cancel</md-button>  
    </md-dialog-actions>
  </md-modal-dialog>
</template>

<script>
  export default {
    name: 'testListDialog',
    data () {
      return {
        newTestName: '',
        disableCreate: true,
      }
    },
    methods: {
      validateName () {
          this.disableCreate = !this.newTestName.trim()
      }
    }
  }
</script>