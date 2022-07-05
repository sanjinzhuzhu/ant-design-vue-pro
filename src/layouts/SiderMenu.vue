<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $router.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="`${item.path}`" />
      </template>
    </a-menu>
  </div>
</template>

<script>
// recommend use functional component
// <template functional>
//   <a-sub-menu :key="props.menuInfo.key">
//     <span slot="title">
//       <a-icon type="mail" /><span>{{ props.menuInfo.title }}</span>
//     </span>
//     <template v-for="item in props.menuInfo.children">
//       <a-menu-item v-if="!item.children" :key="item.key">
//         <a-icon type="pie-chart" />
//         <span>{{ item.title }}</span>
//       </a-menu-item>
//       <sub-menu v-else :key="item.key" :menu-info="item" />
//     </template>
//   </a-sub-menu>
// </template>
// export default {
//   props: ['menuInfo'],
// };
import SubMenu from "../layouts/SubMenu.vue";

export default {
  props: {
    theme: {
      type: String,
      default: "dark",
    },
  },
  //一、
  //使用路由的数据去生成菜单，需要把router里树形的结构，通过递归的方式把数据渲染到menu组件
  //但是录音上的结构并不是全部都需要渲染到菜单上的，有些事不需要的如user，这时候就可以用一个标志位
  //去标记，用hideInMenu:true，加了这个标记，后面去初始化生成数据的时候，通过这个标志位去过滤掉
  //有一个约定，有name字段的才去渲染到菜单上，没有的就不渲染，相当于就是渲染一级菜单，以及表格中含有子
  //子对象时，可用hideChildrenMenu:true
  //二、添加原信息 用meta
  //三、根据制定的路由规范去生成菜单的一个原始数据
  //四、主要用到vue 单文件组件的递归，函数式组件，watch监听和.sync的双向绑定

  components: {
    "sub-menu": SubMenu,
  },
  watch: {
    "$route.path": function (val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);//通过这个this.$router.options.routes可以拿到路由里的配置
    return {
      collapsed: false,
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routers = [], parentKeys = [], selectedKey) {
      const menuData = [];
      routers.forEach((item) => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path,
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hidenChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      });

      return menuData;
    },
  },
};
</script>
