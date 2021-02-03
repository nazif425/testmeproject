<template>
<div>
   <md-modal-dialog v-slot="{test}" :md-click-outside-to-close="false" :md-fullscreen="false">
      <md-toolbar class="md-accent">
         <div class="md-title">{{test.name}}</div>
      </md-toolbar>
      <md-dialog-content>
         <div class="md-subheading">Settings</div>
         <md-divider></md-divider>
         <div v-if="test">
            <div class="">
               <md-field>
                  <label class="">Test Title:</label>
                  <md-input class=" " v-model="test.name"></md-input>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">Status:</label>
                  <md-select class=" " v-model="test.status">
                     <md-option  value="available">Available</md-option>
                     <md-option  value="unavailable">Unavailable</md-option>
                  </md-select>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">mark per question:</label>
                  <md-input class=" " v-model="test.points_per_mark" type="number"></md-input>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">Question per page:</label>
                  <md-input class=" " v-model="test.question_per_page" type="number"></md-input>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">Test duration (Mins):</label>
                  <md-input class=" " v-model="test.duration" type="number"></md-input>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">date created:</label>
                  <md-input class=" " v-model="test.created" type="datetime-local" disabled></md-input>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">Total questions:</label>
                  <md-input class=" " v-model="test.total_questions" type="number" disabled></md-input>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">Valid questions:</label>
                  <md-input class=" " v-model="test.valid_questions" type="number" disabled></md-input>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">Total test attempts:</label>
                  <md-input class=" " v-model="test.total_attempts" type="number" disabled></md-input>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">Start date:</label>
                  <md-input class=" " v-model="test.start_date" type="datetime-local"></md-input>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">End date:</label>
                  <md-input class="" v-model="test.end_date" type="datetime-local"></md-input>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">Allowed Attempts Per Member:</label>
                  <md-input class=" " v-model="test.allowed_attempts" type="number"></md-input>
               </md-field>
            </div>
            <div class="">
               <md-field>
                  <label class="">New test password:</label>
                  <md-input class=" " v-model="test.password" type="password" autocomplete="new-password"></md-input>
               </md-field>
            </div>
            
            <div class="">
               <md-field>
                  <label class="">Test description:</label>
                  <md-textarea class=" " v-model="test.description" md-autogrow></md-textarea>
               </md-field>
            </div>
            <div class="">
               <md-list>
                  <md-list-item>
                     <div><label>Randomize questions:</label></div>
                     <md-switch class="md-list-action" v-model="test.randomize_questions"></md-switch>
                  </md-list-item>
                  <md-list-item>
                     <div><label>View result:</label></div>
                     <md-switch class="md-list-action" v-model="test.view_result"></md-switch>
                  </md-list-item>
               </md-list>
            </div>
            <div class="">
               <md-field class="">
                  <label class="">Test cover image:</label>
                  <md-file @change="onFileChange"/>
                  <img id="preview-image" :src="test.cover_image" alt="test cover image" width="50">
               </md-field>
            </div>
         </div>
      </md-dialog-content>
      <md-dialog-actions>
      <md-button @click="$modal.submit(getFormData(test))" class="md-accent md-raised md-dense">Submit</md-button>   
      <md-button @click="$modal.cancel()" class="md-accent md-raised md-dense">Back</md-button>  
      </md-dialog-actions>
   </md-modal-dialog>
</div>
</template>

<script>
//
export default {
   name: 'testConfigDialog',
   data () {
      return {
      showLoading: false,
      status: 'loading ...',
      uploadFile: '',
      }
   },
   methods: {
      getFormData(data) {
         let formData= new FormData()
         Object.keys(data).forEach((key)=>{
            //null to empty string
            if (!data[key])
               data[key] = '' 
            if (key == 'cover_image')
               formData.append(key, this.uploadFile)
            else if (key == 'start_date' || key == 'end_date'){
               if (data[key].length != 16) formData.append(key, data[key])
               else formData.append(key, (new Date(data[key])).toISOString())
            } 
            else formData.append(key, data[key])
         })
         return formData
      },
      onFileChange(e){
         this.uploadFile = e.target.files[0];
         let reader = new FileReader()
         reader.onload = function(e) {
            document.getElementById('preview-image').src = e.target.result
         }
         reader.readAsDataURL(this.uploadFile)
      },
   },
   
}
</script>