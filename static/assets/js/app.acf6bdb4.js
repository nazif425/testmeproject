(function(t){function e(e){for(var n,a,r=e[0],c=e[1],u=e[2],l=0,d=[];l<r.length;l++)a=r[l],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&d.push(s[a][0]),s[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);m&&m(e);while(d.length)d.shift()();return i.push.apply(i,u||[]),o()}function o(){for(var t,e=0;e<i.length;e++){for(var o=i[e],n=!0,a=1;a<o.length;a++){var r=o[a];0!==s[r]&&(n=!1)}n&&(i.splice(e--,1),t=c(c.s=o[0]))}return t}var n={},a={app:0},s={app:0},i=[];function r(t){return c.p+"assets/js/"+({add_user:"add_user",dashboard:"dashboard",groups:"groups",home:"home",login:"login",profile:"profile",results:"results",signup:"signup",test:"test","testbuilder~write_test":"testbuilder~write_test",testbuilder:"testbuilder",write_test:"write_test",users:"users",tabulator:"tabulator"}[t]||t)+"."+{add_user:"6d1f7c53",dashboard:"ddcee129",groups:"2abc4d0f",home:"ec90e4be",login:"b8c7afe0",profile:"8543c295",results:"bca443b9",signup:"ef2526a7",test:"97c640ec","testbuilder~write_test":"47121c4d",testbuilder:"ad142db8",write_test:"b9e582f5",users:"6e2c4997",tabulator:"1c76f398"}[t]+".js"}function c(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.e=function(t){var e=[],o={testbuilder:1};a[t]?e.push(a[t]):0!==a[t]&&o[t]&&e.push(a[t]=new Promise((function(e,o){for(var n="assets/css/"+({add_user:"add_user",dashboard:"dashboard",groups:"groups",home:"home",login:"login",profile:"profile",results:"results",signup:"signup",test:"test","testbuilder~write_test":"testbuilder~write_test",testbuilder:"testbuilder",write_test:"write_test",users:"users",tabulator:"tabulator"}[t]||t)+"."+{add_user:"31d6cfe0",dashboard:"31d6cfe0",groups:"31d6cfe0",home:"31d6cfe0",login:"31d6cfe0",profile:"31d6cfe0",results:"31d6cfe0",signup:"31d6cfe0",test:"31d6cfe0","testbuilder~write_test":"31d6cfe0",testbuilder:"9f3956be",write_test:"31d6cfe0",users:"31d6cfe0",tabulator:"31d6cfe0"}[t]+".css",s=c.p+n,i=document.getElementsByTagName("link"),r=0;r<i.length;r++){var u=i[r],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===n||l===s))return e()}var d=document.getElementsByTagName("style");for(r=0;r<d.length;r++){u=d[r],l=u.getAttribute("data-href");if(l===n||l===s)return e()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=e,m.onerror=function(e){var n=e&&e.target&&e.target.src||s,i=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete a[t],m.parentNode.removeChild(m),o(i)},m.href=s;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){a[t]=0})));var n=s[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise((function(e,o){n=s[t]=[e,o]}));e.push(n[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=r(t);var d=new Error;u=function(e){l.onerror=l.onload=null,clearTimeout(m);var o=s[t];if(0!==o){if(o){var n=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+n+": "+a+")",d.name="ChunkLoadError",d.type=n,d.request=a,o[1](d)}s[t]=void 0}};var m=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=n,c.d=function(t,e,o){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(o,n,function(e){return t[e]}.bind(null,n));return o},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var m=l;i.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"1bff":function(t,e,o){"use strict";var n=o("b994"),a=o.n(n);a.a},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("2b0e"),a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("md-app",{attrs:{"md-mode":"fixed","md-waterfall":""}},[t.showTestToolBar?o("md-app-toolbar",{staticClass:"fixed-toolbar md-primary md-elevation-5"},[o("div",{staticClass:"md-toolbar-section-start"},[o("span",{staticClass:"md-title"},[t._v(t._s(t.pageTitle))])]),o("div",{staticClass:"md-toolbar-section-end"},[o("span",{staticClass:"md-title"},[t._v(t._s(t.testTime))]),o("md-menu",[o("md-button",{staticClass:"md-icon-button",attrs:{"md-menu-trigger":""}},[o("iconify-icon",{staticClass:"iconify vsm--icon",attrs:{icon:"dots-vertical",width:"25",height:"25"}})],1),o("md-menu-content",[o("md-menu-item",[o("a",{staticClass:"cursor",on:{click:function(e){return t.showtestExitDialog()}}},[t._v("Exit Test")])])],1)],1)],1)]):t.showTestBuilderToolBar?o("md-app-toolbar",{staticClass:"fixed-toolbar md-primary md-elevation-5"},[o("div",{staticClass:"md-toolbar-row"},[o("div",{staticClass:"md-toolbar-section-start"},[o("span",{staticClass:"md-title"},[t._v(t._s(t.pageTitle))])]),o("div",{staticClass:"md-toolbar-section-end"},[o("md-button",{staticClass:"md-icon-button",on:{click:function(e){return t.$store.commit("showTestListDialog",!0)}}},[o("iconify-icon",{staticClass:"iconify",attrs:{icon:"format-list-bulleted",width:"25",height:"25"}})],1),o("md-menu",[o("md-button",{staticClass:"md-icon-button",attrs:{"md-menu-trigger":""}},[o("iconify-icon",{staticClass:"iconify vsm--icon",attrs:{icon:"dots-vertical",width:"25",height:"25"}})],1),o("md-menu-content",[o("md-menu-item",[o("a",{staticClass:"cursor",on:{click:function(e){return t.$router.go(-1)}}},[t._v("Exit")])])],1)],1)],1)])]):o("md-app-toolbar",{staticClass:"fixed-toolbar md-primary md-elevation-5"},[t.showNavigation?t._e():o("md-button",{staticClass:"md-icon-button show-menu",on:{click:function(e){t.showNavigation=!0}}},[o("iconify-icon",{staticClass:"iconify vsm--icon",attrs:{icon:"menu",width:"25",height:"25"}})],1),o("span",{staticClass:"md-title"},[t._v(t._s(t.pageTitle))])],1),t.showAppDrawer?o("md-app-drawer",{staticClass:"md-scrollable",attrs:{"md-fixed":!0,"md-active":t.showNavigation,"md-permanent":"full","md-swipeable":""},on:{"update:mdActive":function(e){t.showNavigation=e},"update:md-active":function(e){t.showNavigation=e}}},[o("sidebar-menu",{attrs:{relative:!0,menu:t.menu,hideToggle:!0},on:{"toggle-collapse":t.onToggleCollapse,"item-click":t.onItemClick}},[o("div",{staticClass:"nav-header",attrs:{slot:"header"},slot:"header"},[t.userDetail?o("div",[o("div",{staticClass:"md-alignment-center-center md-layout md-size-100"},[o("md-avatar",{staticClass:"md-large md-primary"},[t.userDetail?o("img",{attrs:{src:t.userDetail.profile_pic}}):o("iconify-icon",{staticClass:"iconify",attrs:{icon:"account"}})],1)],1),o("div",{staticClass:"md-alignment-center-center  md-layout"},[o("span",{staticClass:"md-subheading"},[t._v(" "+t._s(t.userDetail.last_name)+" "+t._s(t.userDetail.first_name)+" ")])]),o("div",{staticClass:"md-alignment-center-center  md-layout"},[o("span",{staticClass:"md-body-1"},[t._v(t._s(t.userDetail.username))])]),o("div",{staticClass:"md-alignment-center-center  md-layout"},[o("span",{staticClass:"md-caption"},[o("router-link",{attrs:{to:""},nativeOn:{click:function(e){return t.showLogoutDialog()}}},[t._v("Logout")])],1)])]):o("div",[o("router-link",{attrs:{to:"/login"}},[o("div",{staticClass:"md-alignment-center-center md-layout md-size-100"},[o("md-avatar",{staticClass:"md-medium md-primary"},[o("iconify-icon",{staticClass:"iconify",attrs:{icon:"account"}})],1)],1),o("div",{staticClass:"md-alignment-center-center md-layout"},[t._v(" Login ")])])],1)])])],1):t._e(),o("md-app-content",[o("router-view")],1)],1)],1)},s=[],i=o("4776"),r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("md-modal-dialog",{attrs:{"md-click-outside-to-close":!1,"md-fullscreen":!1},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.userDetail,a=e.dispatch;return[o("md-toolbar",{staticClass:"md-accent"},[o("span",{staticClass:"md-title"},[t._v("Logout")])]),o("md-dialog-content",[o("div",{staticClass:"md-layout md-alignment-center-left"},[o("div",{staticClass:"md-layout-item md-size-30"},[o("md-avatar",{staticClass:"md-large"},[n?o("img",{attrs:{src:n.profile_pic}}):o("iconify-icon",{staticClass:"iconify",attrs:{icon:"account"}})],1)],1),o("div",{staticClass:"md-layout-item md-size-70"},[n?o("span",{staticClass:"md-title"},[t._v(t._s(n.username))]):t._e()])]),o("div",{staticClass:"md-layout"},[o("div",{staticClass:"md-layout md-title"},[t._v("Are you sure you want to logout?")])])]),o("md-snackbar",{attrs:{"md-active":t.logoutSuccess},on:{"update:mdActive":function(e){t.logoutSuccess=e},"update:md-active":function(e){t.logoutSuccess=e}}},[t._v(t._s(t.snackMessage))]),o("md-dialog-actions",[o("md-button",{staticClass:"md-primary",attrs:{disabled:t.disableLogout},on:{click:function(e){return t.logMeOut(a)}}},[t._v("Logout")]),o("md-button",{staticClass:"md-primary",on:{click:t.onCancel}},[t._v("Back")])],1)]}}])})],1)},c=[],u=o("5530"),l=o("2f62"),d={name:"LogoutDialog",data:function(){return{logoutSuccess:!1,snackMessage:"",disableLogout:!1}},methods:{onCancel:function(){this.$modal.cancel()},logMeOut:function(t){var e=this;this.disableLogout=!0,t("logout").then((function(){e.snackMessage="logout successful",e.logoutSuccess=!0,e.$modal.submit()})).catch((function(t){e.disableLogout=!1,e.snackMessage="logout failed",e.logoutSuccess=!0}))}},computed:Object(u["a"])(Object(u["a"])({},Object(l["b"])(["userDetail"])),Object(l["b"])(["getprofilePicUrl"]))},m=d,f=(o("1bff"),o("2877")),h=Object(f["a"])(m,r,c,!1,null,"092f87b0",null),p=h.exports,g=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("md-snackbar",{attrs:{"md-active":t.showLoading},on:{"update:mdActive":function(e){t.showLoading=e},"update:md-active":function(e){t.showLoading=e}}},[t._v(" "+t._s(t.status)+" ")]),o("md-modal-dialog",{attrs:{"md-click-outside-to-close":!1,"md-fullscreen":!1},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.testExit;return[o("md-toolbar",{staticClass:"md-accent"},[o("span",{staticClass:"md-title"},[t._v("Exit")])]),o("md-dialog-content",[o("div",{staticClass:"md-title"},n?[t._v("Do you want to Exit?")]:[t._v("Please submit test before you exit")])]),o("md-dialog-actions",n?[o("md-button",{staticClass:"md-accent md-raised md-dense",on:{click:function(e){return t.$modal.submit()}}},[t._v("Exit")]),o("md-button",{staticClass:"md-accent md-raised md-dense",on:{click:function(e){return t.$modal.cancel()}}},[t._v("Cancel")])]:[o("md-button",{staticClass:"md-accent md-raised md-dense",on:{click:function(e){return t.$modal.cancel()}}},[t._v("Ok")])],1)]}}])})],1)},b=[],v={name:"exitTestDialog",data:function(){return{showLoading:!1,status:"loading ..."}},methods:{}},w=v,_=Object(f["a"])(w,g,b,!1,null,null,null),T=_.exports,y=[{header:!0,title:"Main Menu",hiddenOnCollapse:!0},{href:"/",title:"Home",icon:{element:"iconify-icon",class:"vsm--icon iconify",attributes:{icon:"home"},text:"hello"}},{href:"/dashboard",title:"Dashboard",icon:{element:"iconify-icon",class:"vsm--icon iconify",attributes:{icon:"view-dashboard"}}},{href:"/dashboard/test",title:"Tests",icon:{element:"iconify-icon",class:"vsm--icon iconify",attributes:{icon:"monitor-edit"}}},{href:"/dashboard/groups",title:"Groups",icon:{element:"iconify-icon",class:"vsm--icon iconify",attributes:{icon:"account-group"}}},{href:"/#contact",title:"Contacts",icon:{element:"iconify-icon",class:"vsm--icon iconify",attributes:{icon:"card-account-details-outline"}}},{href:"/#about",title:"About",icon:{element:"iconify-icon",class:"vsm--icon iconify",attributes:{icon:"contacts"}}}],C={components:{SidebarMenu:i["SidebarMenu"]},methods:{onToggleCollapse(){},onItemClick(t,e){"/#contact"===e.href?this.$nextTick(()=>this.$scrollTo("#contact")):"/#about"===e.href&&this.$nextTick(()=>this.$scrollTo("#about")),!0===this.showNavigation&&(this.showNavigation=!this.showNavigation)},showtestExitDialog(){this.$modal.show(T,{testExit:this.testExit}).then(()=>{this.$router.go(-1)}).catch(()=>{})},showLogoutDialog(){this.$modal.show(p,{userDetail:this.userDetail,dispatch:this.$store.dispatch}).then(()=>{this.$router.push("/")}).catch(()=>{})}},computed:{...Object(l["b"])(["testExit"]),...Object(l["b"])(["pageTitle"]),...Object(l["b"])(["showTestToolBar"]),...Object(l["b"])(["showAppDrawer"]),...Object(l["b"])(["showTestBuilderToolBar"]),...Object(l["b"])(["userDetail"]),...Object(l["b"])(["testTime"]),...Object(l["b"])(["getprofilePicUrl"])},data:function(){return{showNavigation:!1,showSidepanel:!1,menu:y,paginate:{pageQ:{}}}},props:{},mounted:function(){!this.userDetail&&this.$http.defaults.headers.common["Authorization"]&&this.$store.dispatch("getUserData")},created:function(){this.$http.interceptors.response.use(void 0,(function(t){return new Promise((function(){throw 401===t.status&&t.config&&!t.config.__isRetryRequest&&this.$store.dispatch("logout"),t}))}))}},k=C,D=(o("5c0b"),Object(f["a"])(k,a,s,!1,null,null,null)),A=D.exports,I=o("8c4f"),x=o("8b18"),S=o("e8e5"),O=o("77e6"),E=o("930b"),L=o("5019"),P=o("a3f9"),j=o("bdb4"),q=o("b748"),$=o("ad9f"),B=o("a09e"),U=o("0f67"),M=o("dfab"),N=o("9503"),z=o("67f5"),G=o("5829"),F=o("5408"),H=o("54ec"),V=o("8617"),J=o("d634"),R=o("0690"),K=o("4eee"),Q=o("f032"),W=o("e42d"),X=o("469c"),Y=o("86a2"),Z=o("de87"),tt=o("59bd"),et=o("9620"),ot=o("783f");function nt(t){t.addIcon("close-circle-outline",x["a"]),t.addIcon("dots-vertical",S["a"]),t.addIcon("logout",O["a"]),t.addIcon("cog-outline",E["a"]),t.addIcon("clipboard-check-outline",L["a"]),t.addIcon("bulletin-board",P["a"]),t.addIcon("card-account-details-outline",j["a"]),t.addIcon("monitor-edit",q["a"]),t.addIcon("menu",$["a"]),t.addIcon("account",B["a"]),t.addIcon("account-group",U["a"]),t.addIcon("home",M["a"]),t.addIcon("view-dashboard",N["a"]),t.addIcon("monitor-edit",q["a"]),t.addIcon("round-add",z["a"]),t.addIcon("round-minus",G["a"]),t.addIcon("round-close",F["a"]),t.addIcon("round-keyboard-arrow-down",H["a"]),t.addIcon("contacts",J["a"]),t.addIcon("round-delete",V["a"]),t.addIcon("download",R["a"]),t.addIcon("format-list-bulleted",K["a"]),t.addIcon("settings-box",Q["a"]),t.addIcon("function-variant",W["a"]),t.addIcon("arrow-left-thick",X["a"]),t.addIcon("arrow-right-thick",Y["a"]),t.addIcon("call",Z["a"]),t.addIcon("chat",tt["a"]),t.addIcon("facebook",et["a"]),t.addIcon("gmail",ot["a"])}var at=nt,st=o("c850"),it=o("9483");Object(it["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});o("45fc"),o("d3b7");var rt=o("bc3a"),ct=o.n(rt);n["default"].use(l["a"]);var ut=new l["a"].Store({state:{status:"",token:localStorage.getItem("token")||"",user:null,pageData:{showTestToolBar:!1,showTestBuilderToolBar:!1,showAppDrawer:!0,pageTitle:"TestMe"},staticUrl:"",developerAvatar:"assets/img/dev_avatar.png",testmeLogo:"assets/img/testme_logo.png",landScapeUrl:"assets/img/card-image-3.jpg",frontView:"assets/img/testme_front_view.png",profilePicUrl:"assets/img/avatar.png",showTestListDialog:!1,testTime:"",testExit:!0},getters:{isLoggedIn:function(t){return!!t.token},authStatus:function(t){return t.status},getFrontView:function(t){return t.frontView},getDeveloperAvatar:function(t){return t.developerAvatar},getLandScapeUrl:function(t){return t.staticUrl+t.landScapeUrl},getprofilePicUrl:function(t){return t.staticUrl+t.landScapeUrl},pageTitle:function(t){return t.pageData.pageTitle},showTestToolBar:function(t){return t.pageData.showTestToolBar},showAppDrawer:function(t){return t.pageData.showAppDrawer},showTestBuilderToolBar:function(t){return t.pageData.showTestBuilderToolBar},showTestListDialog:function(t){return t.showTestListDialog},userDetail:function(t){return t.user},testTime:function(t){return t.testTime},testExit:function(t){return t.testExit}},mutations:{setPageData:function(t,e){for(var o in t.pageData={showTestToolBar:!1,showTestBuilderToolBar:!1,showAppDrawer:!0,pageTitle:"TestMe"},e)t.pageData[o]=e[o]},updateTestTime:function(t,e){t.testTime=e},allowTestExit:function(t,e){t.testExit=e},auth_request:function(t){t.status="loading"},auth_success:function(t,e,o){t.status="success",t.token=e,t.user=o},auth_error:function(t){t.status="error"},logout:function(t){t.status="",t.token="",t.user=null},user_data_success:function(t,e){t.user=e},showTestListDialog:function(t,e){t.showTestListDialog=e}},actions:{getUserData:function(t){var e=t.commit;return new Promise((function(t,o){e("auth_request"),ct()({url:"/user/",method:"GET"}).then((function(o){var n=o.data;e("user_data_success",n),t(o)})).catch((function(t){e("auth_error"),o(t)}))}))},updateUserData:function(t,e){var o=t.commit,n=t.dispatch;return new Promise((function(t,a){o("auth_request"),ct()({url:"/user/",data:e,method:"PUT"}).then((function(e){n("getUserData"),t(e)})).catch((function(t){o("auth_error"),a(t)}))}))},login:function(t,e){var o=t.commit,n=t.dispatch;return new Promise((function(t,a){o("auth_request"),ct()({url:"/rest-auth/login/",data:e,method:"POST"}).then((function(e){var a="Token "+e.data.key;localStorage.setItem("token",a),ct.a.defaults.headers.common["Authorization"]=a,o("auth_success",a),n("getUserData"),t(e)})).catch((function(t){o("auth_error"),localStorage.removeItem("token"),a(t)}))}))},register:function(t,e){var o=t.commit;return new Promise((function(t,n){o("auth_request"),ct()({url:"/rest-auth/registration/",data:e,method:"POST"}).then((function(e){t(e)})).catch((function(t){o("auth_error"),n(t)}))}))},logout:function(t){var e=t.commit;return new Promise((function(t,o){e("auth_request"),ct()({url:"/rest-auth/logout/",method:"POST"}).then((function(){e("logout"),localStorage.removeItem("token"),delete ct.a.defaults.headers.common["Authorization"],t()})).catch((function(t){o(t)}))}))}},modules:{}});n["default"].use(I["a"]);var lt=[{path:"/",name:"Home",component:function(){return o.e("home").then(o.bind(null,"6511"))},meta:{requiresAuth:!1,title:"Testme - build and manage quiz"}},{path:"/dashboard",component:function(){return o.e("dashboard").then(o.bind(null,"4601"))},meta:{requiresAuth:!1,title:"Dashboard - Testme"}},{path:"/dashboard/profile",component:function(){return o.e("profile").then(o.bind(null,"b3b1"))},meta:{requiresAuth:!1,title:"Profile - Testme"}},{path:"/dashboard/test",component:function(){return o.e("test").then(o.bind(null,"2762"))},meta:{requiresAuth:!1,title:"Test - Testme"}},{path:"/dashboard/test/group/:group_id",component:function(){return o.e("test").then(o.bind(null,"2762"))},meta:{requiresAuth:!1,title:"Group test - Testme"},props:!0},{path:"/dashboard/testbuilder",component:function(){return Promise.all([o.e("testbuilder~write_test"),o.e("testbuilder")]).then(o.bind(null,"95fd"))},meta:{requiresAuth:!1,title:"Test builder - Testme"}},{path:"/dashboard/testbuilder/:test_id",component:function(){return Promise.all([o.e("testbuilder~write_test"),o.e("testbuilder")]).then(o.bind(null,"95fd"))},meta:{requiresAuth:!1,title:"Test builder - Testme"},props:!0},{path:"/write_test/:test_id",component:function(){return Promise.all([o.e("testbuilder~write_test"),o.e("write_test")]).then(o.bind(null,"7858"))},meta:{requiresAuth:!1,title:"write test - Testme"},props:!0},{path:"/users/group/:group_id",component:function(){return o.e("users").then(o.bind(null,"4c7a"))},props:!0,meta:{requiresAuth:!1,title:"Group User - Testme"}},{path:"/users/group/:group_id/add_user",component:function(){return o.e("add_user").then(o.bind(null,"84ff"))},meta:{requiresAuth:!1,title:"Add group member - Testme"},props:!0},{path:"/dashboard/groups",component:function(){return o.e("groups").then(o.bind(null,"53fe"))},meta:{requiresAuth:!1,title:"Groups - Testme"}},{path:"/dashboard/results",component:function(){return o.e("results").then(o.bind(null,"e010"))},meta:{requiresAuth:!1,title:"Test result - Testme"}},{path:"/dashboard/results/test/:test_id",component:function(){return o.e("results").then(o.bind(null,"e010"))},meta:{requiresAuth:!1,title:"Test result - Testme"},props:!0},{path:"/dashboard/results/group/:group_id",component:function(){return o.e("results").then(o.bind(null,"e010"))},meta:{requiresAuth:!1,title:"Group test result - Testme"},props:!0},{path:"/login",component:function(){return o.e("login").then(o.bind(null,"dd7b"))},meta:{requiresAuth:!1,title:"Login - Testme"}},{path:"/signup",component:function(){return o.e("signup").then(o.bind(null,"62c4"))},meta:{requiresAuth:!1,title:"Signup - Testme"}},{path:"/signup/:group_id",component:function(){return o.e("signup").then(o.bind(null,"62c4"))},meta:{requiresAuth:!1,title:"Group signup - Testme"},props:!0}],dt=new I["a"]({routes:lt});dt.beforeEach((function(t,e,o){if(t.matched.some((function(t){return t.meta.requiresAuth}))){if(ut.getters.isLoggedIn)return void o();o("/login")}else o()})),dt.afterEach((function(t){document.title=t.meta.title}));var mt=dt,ft=o("43f9"),ht=o.n(ft),pt=o("5181"),gt=o.n(pt),bt=o("0a47"),vt=o.n(bt),wt=o("6aab"),_t=o("f13c"),Tt=o.n(_t);at(st["a"]),n["default"].prototype.$http=ct.a;var yt=localStorage.getItem("token");yt&&(n["default"].prototype.$http.defaults.headers.common["Authorization"]=yt),n["default"].use(wt["a"]),n["default"].config.productionTip=!1,n["default"].use(gt.a),n["default"].use(ht.a),n["default"].use(vt.a),n["default"].use(I["a"]),n["default"].use(l["a"]),n["default"].use(st["a"]),n["default"].use(Tt.a,{container:".md-app-scroller",duration:500,easing:"ease",offset:0,force:!0,cancelable:!0,onStart:!1,onDone:!1,onCancel:!1,x:!1,y:!0}),n["default"].material.locale.dateFormat="yyyy-MM-dd",new n["default"]({store:ut,router:mt,render:function(t){return t(A)}}).$mount("#app")},"5c0b":function(t,e,o){"use strict";var n=o("9c0c"),a=o.n(n);a.a},"9c0c":function(t,e,o){},b994:function(t,e,o){}});
//# sourceMappingURL=app.acf6bdb4.js.map