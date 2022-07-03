import Vue from "vue";
import VueRouter from "vue-router";
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// import Home from "../views/Home.vue";
import NotFound from "../views/User/404"
// import RenderRouterView from './components/RenderRouterView'

Vue.use(VueRouter);

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     component: Home,
//   },
//   {
//     path: "/about",
//     name: "About",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue"),
//   },
// ];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      component: () =>
        import(/*webpackChunkName:'layout'*/ "../layouts/UserLayout"),
      //component: {render: h=> h("router-view")},//这样写就不用在router下面新建文件，在填RenderRouterView到这里
      children: [
        {
          path: "/user",
          redirect: "/user/login",
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/*webpackChunkName:'user'*/ "../views/User/Login"), //将根据需要可以把都是user的大包在一个包里面
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/*webpackChunkName:'user'*/ "../views/User/Register"),
        },
      ],
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
      children: [
        //dashboard
        {
          path: "/",
          redirect: "dashboard/analysis",
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: { render: (h) => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
                ),
            },
          ],
        },
        //form
        {
          path: "/form",
          name: "form",
          component: { render: (h) => h("router-view") },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              component: () =>
                import(
                  /* webpackChunkName: "form" */ "../views/Forms/BasicForm"
                ),

              path: "/form/step-form",
              name: "stepform",
              component: () =>
                import(
                  /* webpackChunkName: "form" */ "../views/Forms/StepForm"
                ),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info",
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1"
                    ),
                },
                {
                  path: "/form/step-form/comfirm",
                  name: "comfirm",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"
                    ),
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3"
                    ),
                },
              ],
            },
          ],
        },
      ],
    },

    {
      // path: "/",
      // name: "home",
      // component: Home,
      path: "*",
      name: "404",
      component: NotFound,
    },
    // {
    //   path: "/about",
    //   name: "about",
    // },
  ],
});

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });
// export default router;
// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });
router.beforeEach((to,from,next)=>{
  Nprogress.start();
  next();
});
router.afterEach((to,from,next)=>{
  Nprogress.done();
})
export default router;
