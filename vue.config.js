// 自定义样式 因为依赖脚手架完成的所以要去脚手架里面自定义配置-css loder里面来配置
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true, // 这里的选项会传递给 css-loader
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        bypass: function (req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if(process.env.MOCK !== "none"){
            //    /api/dashboard/chart 
            //  ['/api', 'dashboard/chart']
            // ['dashboard', 'chart']
            // dashboard_chart1
            const name = req.path.split("/api/")[1].split("/").join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        },
      },
    },
  },
};
