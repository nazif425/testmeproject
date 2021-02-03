/* eslint-disable no-console */

<template>
<div>
   <md-card class="md-elevation-2">
      <md-card-media-cover md-text-scrim>
      <md-card-media md-ratio="16:9">
         <img
            :src="getFrontView || getLandScapeUrl"
            alt="intro-card background"
         />
      </md-card-media>
      <md-card-area>
         <md-card-header>
            <div class="md-title">Testme</div>
         </md-card-header>
         <md-card-content>
            Build and manage Quiz
         </md-card-content>
         <md-card-actions md-alignment="right">
            <md-button v-if="!isLoggedIn" to="/signup" class="md-raised md-accent">Signup</md-button>
            <md-button v-if="!isLoggedIn" to="/login" class="md-raised  md-accent">Login</md-button>
         </md-card-actions>
      </md-card-area>
      </md-card-media-cover>
   </md-card>
   <md-card v-if="stat" class="md-elevation-5  md-size-100">
      <md-card-header>
         <div class="md-title">Site statistics</div>
      </md-card-header>
      <md-card-content class="md-subheading md-layout md-gutter md-size-100">
         <div class="md-layout-item md-xsmall-size-20 md-size-100">Users {{stat.users}}</div>
         <div class="md-layout-item md-xsmall-size-20 md-size-100">tests {{stat.tests}}</div>
         <div class="md-layout-item md-xsmall-size-20 md-size-100">Groups {{stat.groups}}</div>
      </md-card-content>
   </md-card>
   <app-footer/>
</div>
</template>

<script>
import {mapGetters} from "vuex";
//import {mapState} from "vuex";
import appFooter from "../components/footer";   
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
//import contact from "../components/contact.vue"
//import about from "../components/about.vue"

export default {
   name: "Home",
   components: {appFooter},
   data: () => ({
         pageData: {
            pageTitle: 'TestMe'
         },
         stat: null,
   }),
   method: {
      getStatistics () {
         this.$http({url: 'testapi/1/statistics/', method: 'GET' })
         .then(resp => {
            //console.log(resp)
            this.stat = resp.data
         })
         .catch(err => {
            //console.log(err);
         })
      },
   },
   computed: {
      ...mapGetters(["getFrontView"]),
      ...mapGetters(["getDeveloperAvatar"]),
      ...mapGetters(["isLoggedIn"]),
      ...mapGetters(["getPageTitle"]),
      ...mapGetters(["getLandScapeUrl"])
   },
   mounted: function() {
      this.getStatistics()
      this.$store.commit('setPageData', this.pageData)
   },
};
</script>
