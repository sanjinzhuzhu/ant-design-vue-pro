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

 <!-- 
 三、如何使用路由管理用户权限

 1、先建立一个utils(工具包文件）
 a、写一个权限校验的函数，,权限是通过后台的权限返回给我们的，为了方便用一个假的数据
 export function getCurrentAuthority() {
  return【“admin”】 
 }
 b、在建立一个做校验的函数，就是我们需要的一个权限,获取到我们现在的权限，和我们需要的权限进行一个
 校验，如果用户的权限属于这个范围内，就返回一个true，没有通过就返回一个false
  export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}
 c.验证登录情况函数，如果说我获取到了当前的用户权限，而且用户权限不等于guest游客，那么就是登陆了
  export function isLogin () {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}

四、如何去判断路由是否有权限，同样也是通过给路由配置meta信息，在路由守卫中进行判断，
 安装npm i lodash 来监控  Lodash是一个著名的javascript原生库，不需要引入其他第三方依赖。
 是一个意在提高开发者效率,提高JS原生方法性能的JS库。

 _.findLast是从右至左遍历collection （集合）元素的。
 如 
 _.findLast([1, 2, 3, 4], function(n) {
  return n % 2 == 1;
});
// => 3

  -->
 