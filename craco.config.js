// 添加自定义webpack的配置
const path = require('path')

module.exports = {
  //webpack 配置
  webpack: {
    //（路径别名）
    alias: {
      //约定，使用@表示文件所在路径
      '@': path.resolve(__dirname, 'src')
    }
  }
}