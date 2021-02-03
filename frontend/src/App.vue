/* eslint-disable */

<template>
<div>
<md-app md-mode="fixed" md-waterfall>
   <md-app-toolbar v-if="showTestToolBar" class="fixed-toolbar md-primary md-elevation-5">
      <div class="md-toolbar-section-start">
         <span class="md-title">{{pageTitle}}</span>
      </div>
      <div class="md-toolbar-section-end">
      <span class="md-title">{{testTime}}</span>
      <md-menu>
         <md-button class="md-icon-button" md-menu-trigger>
            <iconify-icon 
            class="iconify vsm--icon" 
            icon="dots-vertical"
            width="25" height="25">
            </iconify-icon>
         </md-button>
         <md-menu-content>
            <md-menu-item ><a class="cursor" @click="showtestExitDialog()">Exit Test</a></md-menu-item>
         </md-menu-content>
      </md-menu>
      </div>
   </md-app-toolbar>
   <md-app-toolbar v-else-if="showTestBuilderToolBar" class="fixed-toolbar md-primary md-elevation-5">
      <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
            <span class="md-title">{{pageTitle}}</span>
      </div>
      <div class="md-toolbar-section-end">
         <md-button class="md-icon-button" 
            @click="$store.commit('showTestListDialog', true)">
            <iconify-icon class="iconify" 
            icon="format-list-bulleted"
            width="25" height="25">
            </iconify-icon>
         </md-button>
         <md-menu>
            <md-button class="md-icon-button" md-menu-trigger>
            <iconify-icon 
               class="iconify vsm--icon" 
               icon="dots-vertical"
               width="25" height="25">
            </iconify-icon>
            </md-button>
            <md-menu-content>
            <!--
               <md-menu-item><a class="cursor" @click="()=>{}">Download questions template(csv)</a></md-menu-item>
               <md-menu-item><a class="cursor" @click="()=>{}">Import questions (csv)</a></md-menu-item>
               <md-menu-item><a class="cursor" @click="()=>{}">Export questions (csv)</a></md-menu-item>
            -->
            <md-menu-item><a class="cursor" @click="$router.go(-1)">Exit</a></md-menu-item>
            </md-menu-content>
         </md-menu>
      </div>
      </div>
   </md-app-toolbar>
   <md-app-toolbar v-else class="fixed-toolbar md-primary md-elevation-5">
      <md-button v-if="!showNavigation" class="md-icon-button show-menu" @click="showNavigation = true">
      <iconify-icon 
      class="iconify vsm--icon" icon="menu"
      width="25" height="25">
      </iconify-icon>
      </md-button>
      <span class="md-title">{{pageTitle}}</span>
   </md-app-toolbar>
   <md-app-drawer v-if="showAppDrawer" :md-fixed="true" :md-active.sync="showNavigation"  
      class="md-scrollable" md-permanent="full" md-swipeable>   
      <sidebar-menu :relative="true" :menu="menu" 
      @toggle-collapse="onToggleCollapse" :hideToggle="true" @item-click="onItemClick"
      >
      <div slot="header" class="nav-header">
         <div v-if="userDetail">          
            <div class="md-alignment-center-center md-layout md-size-100">
            <md-avatar class="md-large md-primary">
                  <img v-if="userDetail" :src="userDetail.profile_pic">
                  <iconify-icon v-else class="iconify" icon="account"></iconify-icon>
            </md-avatar>
            </div>
            <div class="md-alignment-center-center  md-layout">
            <span class="md-subheading">
               {{userDetail.last_name}} {{userDetail.first_name}}
            </span>
            </div>
            <div class="md-alignment-center-center  md-layout">
            <span class="md-body-1">{{userDetail.username}}</span>
            </div>
            <div class="md-alignment-center-center  md-layout">
            <span class="md-caption">  
               <router-link to="" @click.native="showLogoutDialog()">Logout</router-link>
            </span>
            </div>
         </div>
         <div v-else>
            <router-link to="/login">
            <div class="md-alignment-center-center md-layout md-size-100">
               <md-avatar class="md-medium md-primary">
                  <iconify-icon class="iconify" icon="account"></iconify-icon>
               </md-avatar>
            </div>
            <div class="md-alignment-center-center md-layout">
               Login
            </div>
            </router-link>
         </div>
      </div>
      </sidebar-menu>
   </md-app-drawer>
   <md-app-content>
      <router-view />
   </md-app-content>
</md-app></div>
</template>

<style lang="scss">
//@import "./assets/css/bootstrap.min.css";
@import "./assets/css/scss/vue_material_theme.scss";
@import "./assets/css/scss/sidebar_theme.scss";
@import "./assets/css/my_style.css";
@import "~tabulator-tables/dist/css/semantic-ui/tabulator_semantic-ui.min.css";
@import "~katex/dist/katex.min.css";
@import "../public/assets/mathquill-0.10.1/mathquill.css";
@import "~quill/dist/quill.snow.css";
@import "~mathquill4quill/mathquill4quill.css";
//@import "~tabulator-tables/dist/css/materialize/tabulator_materialize.min.css";
//@import '~vue-material-modal-dialog/dist/md-modal-dialog.css';'
//@import "./assets/Semantic-UI-CSS/semantic.min.css";
//@import "./assets/quill/quill.bubble.css";

</style>

<script lang="ts">
import {SidebarMenu} from "vue-sidebar-menu";
import LogoutDialog from "./components/logout.vue";
import exitTestDialog from "./components/exit_test.vue";
import {mapGetters} from "vuex";
//import {mapActions} from "vuex";
import menuData from "./assets/js/menudata";

export default {
   components: { SidebarMenu},
   methods: {
      onToggleCollapse() {
      //collapsed
      },
      onItemClick(event, item) {
      //console.log(event)
      //console.log(item)
      if (item.href === '/#contact')
         this.$nextTick(()=> this.$scrollTo('#contact'))
      else if (item.href === '/#about')
         this.$nextTick(()=> this.$scrollTo('#about'))
      if(this.showNavigation === true) 
         this.showNavigation = !this.showNavigation
      },
      showtestExitDialog () {
      this.$modal.show(exitTestDialog, {
         testExit: this.testExit
      })
      .then(()=>{
         this.$router.go(-1)
      })
      .catch(()=>{})
      },
      showLogoutDialog () {
      this.$modal.show(
         LogoutDialog, 
         {
            userDetail: this.userDetail, 
            dispatch: this.$store.dispatch
         }
      )
      .then(()=>{
         this.$router.push('/')
      })
      .catch(()=>{})
      }
   },
   computed: {
      ...mapGetters(["testExit"]),
      ...mapGetters(["pageTitle"]),
      ...mapGetters(["showTestToolBar"]),
      ...mapGetters(["showAppDrawer"]),
      ...mapGetters(["showTestBuilderToolBar"]),
      ...mapGetters(["userDetail"]),
      ...mapGetters(["testTime"]),
      ...mapGetters(["getprofilePicUrl"]),
   },
   data: function(){
      return {
         showNavigation: false,
         showSidepanel: false,
         menu: menuData,
         paginate: {'pageQ': {}}
      };
   },
   props: {
   },
   mounted: function() {
      if(!this.userDetail 
         && this.$http.defaults.headers.common['Authorization'])
      this.$store.dispatch("getUserData")
   },
   created: function () {
   this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
      //resolve, reject
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
         this.$store.dispatch('logout')
      }
      throw err;
      });
   });
}
}
/**/
</script>