<template>
  <md-modal-dialog :md-click-outside-to-close="false" :md-fullscreen="false">
    <md-toolbar class="md-accent">
      <span class="md-title">Upload Image File</span>
    </md-toolbar>
    <md-dialog-content>
      
      <md-field>
          <label>Select Image</label>
          <md-file v-model="fileName" @change="onFileChange" accept="image/*" />
      </md-field>
      <md-field>
          <label>Image Name</label>
          <md-input v-model="name" />
      </md-field>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button @click="uploadData()">Upload</md-button>
      <md-button @click="$modal.cancel()">Cancel</md-button>  
    </md-dialog-actions>
  </md-modal-dialog>
</template>

<script>
  export default {
    name: 'uploadDialog',
    data () {
      return {
        name: "",
        image: "",
        file_name: ""
      }
    },
    methods: {
      onFileChange(e){
        this.image = e.target.files[0];
      },
      uploadData() {
        if(this.name.trim() && this.image) {
          let data = new FormData()
          data.append('image', this.image)
          data.append('name', this.name.trim())
          this.$modal.submit(data)
        }
      }
    }
  }
</script>