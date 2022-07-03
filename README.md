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
一、路由和布局
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
3.引入ant design的组件 如设置抽屉 里面的样式单选键盘 配置完后 点击需要同步在布局上
然后通过抽屉与basiclayout通过属性的传递和事件通知的一个方式去改变主题，可以把配置建立在router
信息的里面。存放在query里面 需要把值同步到router query里面就不适合用v-model

二、菜单和路由结合
如果菜单多级，就需要用递归的方式去生成菜单 ，
如果使用jsx,使用的递归，形参的菜单就会非常方便，
如果使用单文件的方式，就需要遵循vue单文件递归的规范去写递归方式的组件
1.完成菜单路由配置
2.在根据制定路由配置的规范，去生成菜单的原始数据
 -->
 