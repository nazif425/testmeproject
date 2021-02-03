import Vue from "vue";
import vueRouter from "vue-router";
import store from "../store";

Vue.use(vueRouter);
const routes = [
{
   path: "/",
   name: "Home",
   component: () => import(/* webpackChunkName: "home" */ "../views/home.vue"),
   meta: { 
      requiresAuth: false,
      title: "Testme - build and manage quiz"
   }
},
//{
//   path: "/contact_us",
//   component: () => import(/* webpackChunkName: "contact_us" */ "../views/contact_us.vue"),
//   meta: { 
//      requiresAuth: false,
//      title: "Contact us - Testme"
//   }
//},
//{
//   path: "/about_us",
//   component: () => import(/* webpackChunkName: "about_us" */ "../views/about_us.vue"),
//   meta: { 
//     requiresAuth: false,
//      title: "About us - Testme"
//   }
//},
{
   path: "/dashboard",
   component: () => import(/* webpackChunkName: "dashboard" */ "../views/dashboard.vue"),
   meta: { 
      requiresAuth: false,
      title: "Dashboard - Testme"
   }
},
{
   path: "/dashboard/profile",
   component: () => import(/* webpackChunkName: "profile" */ "../views/profile.vue"),
   meta: { 
      requiresAuth: false,
      title: "Profile - Testme"
   }
},
{
   path: "/dashboard/test",
   component: () => import(/* webpackChunkName: "test" */ "../views/test.vue"),
   meta: { 
      requiresAuth: false,
      title: "Test - Testme"
   }
},
{
   path: "/dashboard/test/group/:group_id",
   component: () => import(/* webpackChunkName: "test" */ "../views/test.vue"),
   meta: { 
      requiresAuth: false,
      title: "Group test - Testme"
   },
   props: true
},

{
   path: "/dashboard/testbuilder",
   component: () => import(/* webpackChunkName: "testbuilder" */ "../views/testbuilder.vue"),
   meta: { 
      requiresAuth: false,
      title: "Test builder - Testme"
   },
},
{
   path: "/dashboard/testbuilder/:test_id",
   component: () => import(/* webpackChunkName: "testbuilder" */ "../views/testbuilder.vue"),
   meta: {
      requiresAuth: false,
      title: "Test builder - Testme"
   },
   props: true
},
{
   path: "/write_test/:test_id",
   component: () => import(/* webpackChunkName: "write_test" */ "../views/write_test.vue"),
   meta: { 
      requiresAuth: false,
      title: "write test - Testme"
   },
   props: true
},
/*{
   path: "/dashboard/users",
   component: users,
   meta: { 
      requiresAuth: false,
      title: " - Testme"
   }
},*/
{
   path: "/users/group/:group_id",
   component: () => import(/* webpackChunkName: "users" */ "../views/users.vue"),
   props: true,
   meta: { 
      requiresAuth: false,
      title: "Group User - Testme"
   },
},
{
   path: "/users/group/:group_id/add_user",
   component: () => import(/* webpackChunkName: "add_user" */ "../views/user_views/add_user.vue"),
   meta: { 
      requiresAuth: false,
      title: "Add group member - Testme"
   },
   props: true,
},
{
   path: "/dashboard/groups",
   component: () => import(/* webpackChunkName: "groups" */ "../views/groups.vue"),
   meta: { 
      requiresAuth: false,
      title: "Groups - Testme"
   }
},
{
   path: "/dashboard/results",
   component: () => import(/* webpackChunkName: "results" */ "../views/results.vue"),
   meta: { 
      requiresAuth: false,
      title: "Test result - Testme"
   }
},
{
   path: "/dashboard/results/test/:test_id",
   component: () => import(/* webpackChunkName: "results" */ "../views/results.vue"),
   meta: { 
      requiresAuth: false,
      title: "Test result - Testme"
   },
   props: true
},
{
   path: "/dashboard/results/group/:group_id",
   component: () => import(/* webpackChunkName: "results" */ "../views/results.vue"),
   meta: { 
      requiresAuth: false,
      title: "Group test result - Testme"
   },
   props: true
},
{
   path: "/login",
   component: () => import(/* webpackChunkName: "login" */ "../views/login.vue"),
   meta: { 
      requiresAuth: false,
      title: "Login - Testme"
   }
},
{
   path: "/signup",
   component: () => import(/* webpackChunkName: "signup" */ "../views/signup.vue"),
   meta: { 
      requiresAuth: false,
      title: "Signup - Testme"
   }
},
{
   path: "/signup/:group_id",
   component: () => import(/* webpackChunkName: "signup" */ "../views/signup.vue"),
   meta: { 
      requiresAuth: false,
      title: "Group signup - Testme"
   },
   props: true,
},
];

const router = new vueRouter({
routes
});

router.beforeEach((to, from, next) => {
if(to.matched.some(record => record.meta.requiresAuth)) {
   if (store.getters.isLoggedIn) {
      next()
      return
   }
   next('/login') 
} else {
   next() 
}
})
router.afterEach((to) => {
document.title = to.meta.title;
});

export default router;
