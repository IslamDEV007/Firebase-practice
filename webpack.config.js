const path = require('path'); 

module.exports = {
    entry:'./src/index.js',
    target: ["web", "es5"],
    output:{
        path:path.resolve(__dirname, 'dist/assets'),
        filename:'bundle.js'
    },
    module:{
        rules:[{
            test:/\.js$/,
            exclude:/node_modules/,
            use:{
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-env']
                }
            }
        }]
       },  
       
    devServer: {
        static:{
            directory: path.resolve(__dirname, "dist")
        },
        devMiddleware: {
            publicPath:'/assets/'
          }
       
    }
};