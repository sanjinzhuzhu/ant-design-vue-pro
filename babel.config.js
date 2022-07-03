//按需加载babel配置文件
//1. 安装babel模块 npm i --save-dev babel-plugin-import
module.exports = {
  // presets: ["@vue/cli-plugin-babel/preset"],
  presets: ["@vue/app"],
  "plugins": [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "true" }] // `style: true` 会加载 less 文件
  ]
};
