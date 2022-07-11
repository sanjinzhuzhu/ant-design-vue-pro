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

四、路由式权限控制，如何去判断路由是否有权限，同样也是通过给路由配置meta信息，在路由守卫中进行判断，
 安装npm i lodash 来监控  Lodash是一个著名的javascript原生库，不需要引入其他第三方依赖。
 是一个意在提高开发者效率,提高JS原生方法性能的JS库。

 _.findLast是从右至左遍历collection （集合）元素的。
 如 
 _.findLast([1, 2, 3, 4], function(n) {
  return n % 2 == 1;
});
// => 3
  -->

  <!-- 
  五、更加精细化的权限设置（权限组件，权限指令
  1.组件式的权限控制，
  a、首先在components下新建立一个组件，Authorized.vue，这个组件仅仅是权限控制的一部分
  所以可以用函数式组件来提高我们的渲染性能的，函数时组件使用template的话会有些限制，需要一个check的函数
  校验我们的权限。
  b、函数式组件里面是没有this的，那如何把这个check给到template中使用呢？这一块就不是很方便了，
  在template中，不能把slot作为根元素的，如果想直接加载slot，要提供一个其他的标签，这样就会破坏原有的HTML结
  构，这样不是很友好的，会破坏我们的样式，基于这个问题就不使用template，就直接写render,它提供两个参数，第一个是create element，第二个是context，这时候可以去context里面取出props，和scopedSlots ,和Slot可以挂载到scopedSlots 下面，不用区分是作用域插槽和具名插槽，
  c、在直接返回一个check通过传递过来的authrized，如果校验通过就返回插槽，就是传递过来的子组件，如果没有校验通过的话就返回null，在到props里去声明，权限的对象里的属性和值，
  d、配置完成，但是在权限校验的时候会经常使用的，每次都要import进来就不是很方便，那么可以注册为全局组件
  e.将权限设置注册为全局组件，依然是在main.js里注册，注册方式就不是vue.use了，之所以之前的使用vue.use是因为已经做过一些处理，vue全局注册的方式，就是最开始vue讲到的 vue.component("Authorized",Authorized),注册完就可以在组件中使用了，
  f.测试。测试抽屉权限，只有管理员可以设置
  2.指令式权限设置，不会出现上面的组件式设置的需要写一个组件去嵌套他
  a、首先可以在src里新建一个专门存放指令的文件directives-auth.js,同样也是先把权限校验的引入进去。
  b、把这个指令写成一个自己去注册的，引用的一个指令,名称的话可以用户自己选择配置，不用的话默认就是auth。
  c、在指令这个insert周期里面去做一个权限的校验，如果没有校验成功，就直接把我们的元素从dom节点中移除掉。
  d、在把install暴露出去，配置好后 同样需要去main.js里使用，因为是插件式的方式，可以直接使用Vue.use。
  总结：不管是权限组件还是权限指令，效果都达到了，但是指令式的权限控制它是有一定的弊端的，只有在第一次的时候才可以控制，那如果说是权限式动态的更改的，就没有办法去控制本来的一个，我们把它remove掉了，不能把它给加回来了，这就是权限指令的一个弊端，组件式的指令就比较灵活一些，唯一的一个弊端就是写法不太方便，需要自己写一个组件然后嵌套进来，优点就是比较灵活，但是权限一个不会随意的变动，一般情况下给用户配置的管理员就是管理员，普通用户就是普通用户，具体使用看需求
  重点：
  1、render 函数  书写了函数式组件 又使用全局的方式注册了一个组件，不是像组件里面注册的，只能在当前的组件中使用，全局注册的可以在整个系统中项目中都可以使用，不用在每次都import进来了
  2、自定义指令  使用插件式这样一个注册指令的方式，就通过vue.use的这样一个形式
   -->

   <!-- 
   六、第三方库的使用
   涉及的Vue知识点，主要是
   a、vue的生命周期钩子 ：beforeCreate、created、mounted、beforeDestroy

   b、ref的一个使用：ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：
    -->
  <!-- 
  七、高效的使用Mock数据进行开发
  a、首先 npm i axios，在到src里建立mock文件夹-dashbo_chart.js,在拿到方法 拿到值，值时自己定义的
  b、那router.js中就不能用import default的形式了，因为mock的文件时需要在node的环境下运行的，所以需要common js 的一个规范，模块化比较流行的有 common js ，cmd， amd ，和es6的模块化规范
  c、mock文件写好后，要做的就是接口请求过来之后，我们要我们这个接口，把它代理到mock文件中。
  d、更改配置，就是我们的vue-cli它提供的一个config js，我们是可以更改我们webpack的一些配置的，在前面章节中css也是定义了一个less的webpack的配置，我们现在前端在页面上跑起来的画url实际上webpack给我们提供了一个服务的，这个是devServer，可以去vue-cil里面也有devServer最简单的一个更改的一个配置，如果这个不能满足我们的需求，我们还可以去看webpack的一个文档https://webpack.docschina.org/configuration/dev-server/#devserver-proxy,里面会有一些更加复炸的事例，现在要的就是devServer，然后proxy 代理的我们api这样一个接口的时候，通过bypass去做一些mock数据的一些拦截 代理的操作,复制这段代码，devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        bypass: function (req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }
        },
      },
    },
  },到vue.config文件中。
  f、当是我们api请求的时候，我们是可以拿到url的一个pass的链接的，按照约定的规范，就是api截断之后，把后面的dashboard chart阻断成我们的一个文件名称。name就是我们需要mock下面的文件名称了,在把mock文件require进去
  g、mock方案完成后，还存在一个问题 当require进来之后 这个模块被缓存掉了，也就是说require完之后在去更改mock数据，是不生效的，当每次结果过来时，想要改动，想要生效，必须要清除缓存
  重点：一个是用cil去定制webpack，尤其是定制的webpack的devServer，来集成我们mock的数据方案，进一步提升我们的开发效率
   -->

   <!-- 
   八、开发完后需要与后端进行联调，需要一个比较简单的方式能够快递的切换mock环境和联调环境，可以添加环境变量去区分这个环境
   首先环境变量可以在package.js里面新增一个命令, "serve:no-mock": "Mock=none vue-cli-service serve",这个就只能在Linux mac下使用，如果需要在window下使用，需要在添加一个包 npm i cross-env 在把cross-env添加到命令里，这样mac和window就都没有问题了，
   还需要更改一下vue.config 需要在判断一下,由于更改了config我们需要重启一下环境
  一般情况不会直接使用axios这个库去法请求，会在去做一些二次封装，做一些错误的统一的处理，可以在捕捉错误的函数后面街上一个promise.reject，这么做的好处就是请求的时候在正确的回调里面 如果说return了一个promise.reject，就不会进入then的回调里面去了，这样的话去处理数据的时候就不用特别去考虑有没有值或者是data和不合理，如果想去进一步catch处理错误信息也是可以的，一般情况下，在这里做一个提醒就可以了，
  然后在把analysis里面的借口去更改为刚刚写的request.js文件，因为现在每次都需要引入，所以我们可以把这个挂载到main.js原型里，然后我们就可以通过this.$request的形式直接去访问也是可以的，如果想要给404和文字给一些样式信息，我们可以使用render函数，但是render函数比较繁琐，我们还可以使用jsx，首先将jsx配置到我们项目中，具体如下
  a，查看vue.js中支持jsx的babel插件，网站https://github.com/vuejs/jsx-vue2，安装npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props，在到babel中配置'@vue/babel-preset-jsx',载重启服务器，重启完后就可以对message去做一个定制化的东西，我们可以使用一个方法来返回一个vnode，这个方法的第一个参数就是create Element
  -->
  <!-- 
  八、初始数据、自动校验、动态数据
 市场上比较常见的两种表单校验方案
 第一种：基于双向绑定的表单校验方案 ivue 和element这种模式
一个理想的表单校验方式 数据+表单规则映射到表单视图，当我们通过双向绑定，然后载通过form表单数据变化的时候，同步到data和rule，然后组件内部会通过规则自动的去匹配我们是否符合我们设定的这个规则，如果不符合就给出提示，但事情往往不会这么简单，数据不会仅仅提供给表单使用，也就是说同一个数据可能会在多个组件中使用，如果使用双向绑定的话，当我们在表单修改数据的时候，其他组件的数据也会同样的被修改，也许这就是想要的，还有一种情况 那我们希望我们的表单提交成功后 提交给后台 载做一些逻辑判断，载通过逻辑判断之后载同步给其他组件进行展示，这种情况需要复制一份数据可能是deep clone 提交成功之后 就把复制给from的数据在同步给原数据，这样就是双向绑定的一种模式
 第二种：ant D的这种模式
  ant D是另外一种模式，如果使用ant D的话就不能使用v-binf这样双向绑定的形式了，而是把所有的数据都托管给form，不再需要深复制数据，数据提供的仅仅就是初始值，它就像一个黑一样，里面的数据不管如何变化都不会影响到我们的其他部分，和其他组件使用的数据，如果后续我们的数据需要通过同步，就是说载提交之后，然后校验通过了，然后要把数据同步给data，然后由data改变其他组件使用数据的展示情况，这时候from提供了一系列的api，比如getFieldsValue(),获取黑盒中所有数据，获取之后载去复制给data，然后其他的组件会进行同步的更新，这是ant d响应的设计模式
  如果说想通过接口，返回过来数据之后，动态的改变form表单的值的话，同样需要使用form表单提供的api去更改这个值，mounted() {
  setTimeout(()=>{
    this.form.setFieldsValue({fieldA:"hello zhuzhu"});
  },3000)
},
初始值和defaultValue是一样的性质，也只在组件实例化的时候生效一次。
   -->


    
    
    
    
    