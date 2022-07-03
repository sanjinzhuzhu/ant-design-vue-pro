# ant-design-vue-pro

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
<!-- 
1.先写注册和登录的路由 自定义webpack和babel配置完成后
2.在切换路由的时候给用户友好提示 安装npm i nprogress 做加载的动画
router.beforeEach((to,from,next)=>{
  Nprogress.start();
  next();
});
router.afterEach((to,from,next)=>{
  Nprogress.done();
})
export default router;
 -->