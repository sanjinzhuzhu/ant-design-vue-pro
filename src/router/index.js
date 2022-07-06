import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
// import Home from "../views/Home.vue";
import NotFound from "../views/User/404";
import Forbidden from "../views/User/403";
import { check, isLogin } from "../utils/auth";
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
      hideInMenu: true,
      component: () =>
        import(/*webpackChunkName:'layout'*/ "../layouts/UserLayout"),
      //component: {render: h=> h("router-view")},//这样写就不用在router下面新建文件，在填RenderRouterView到这里
      children: [
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
        {
          path: "/user",
          redirect: "/user/login",
        },
      ],
    },
    {
      path: "/",
      meta: { authority: ["admin"] },
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
          meta: { icon: "dashboard", title: "仪表盘" },
          component: { render: (h) => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: { title: "分析页" },
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
          meta: { icon: "form", title: "表单", authority: ["admin"] },
          component: { render: (h) => h("router-view") },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              meta: { title: "基础表单" },
              component: () =>
                import(
                  /* webpackChunkName: "form" */ "../views/Forms/BasicForm"
                ),
            },
            {
              path: "/form/step-form",
              name: "stepform",
              hideChildrenInMenu: true,
              meta: { title: "分步表单" },
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
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: Forbidden,
    },
    // path: "/",
    // name: "home",
    // component: Home,
    {
      path: "*",
      name: "404",
      hideInMenu: true,
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
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    Nprogress.start();
  }
  // 去我们即将要做的路由，matched是路由提供的一个接口，可以从这个字段里取到，
  // 我们当前访问到的路由匹配到的所有的路由信息，如果找到了就去成熟的权限去校验，如果没有权限的话
  // 就直接跳转到我们的登陆信息或者是403，在进行进一步是否已经登陆的判断，如果没有登陆就跳转到登陆页，在加一个判断，防止
  // 栈溢出，如果已经登陆了就直接掉403，在配置一个403的路由
  const record = findLast(to.matched, (record) => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login",
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "你没有权限访问，请联系管理员咨询。",
      });
      next({
        path: "/403",
      });
    }
    Nprogress.done();
  }
  next();
});

router.afterEach(() => {
  Nprogress.done();
});
export default router;
// const originalPush = VueRouter.prototype.push

// VueRouter.prototype.push = function push(location) {

//   return originalPush.call(this, location).catch(err => err)

// }
