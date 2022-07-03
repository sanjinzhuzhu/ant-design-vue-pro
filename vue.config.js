// 自定义样式 因为依赖脚手架完成的所以要去脚手架里面自定义配置-css loder里面来配置
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true, // 这里的选项会传递给 css-loader
      },
    },
  },
};
