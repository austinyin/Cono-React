const webpack = require('webpack');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, 'src', dir)
}


module.exports = {
    entry : {
        main : path.resolve(__dirname,'./src/index.jsx'),
    },
    output:{
        path: path.resolve(__dirname,'./public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer:{
        historyApiFallback: true,
        contentBase: "./public",
        inline:true,
        port:3000,
    },

    module: {
        rules: [
            {test: /\.scss/, use: ['style-loader','css-loader','sass-loader']},
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|mp4)$/,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ]
            },
            {test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {test: /\.svg/, loader: 'svg-url-loader'},

        ]
    },
    resolve: {
        extensions: [ '.js','.jsx', '.json', '.scss'],
        alias: {
            src: path.resolve('src'),
            fetch: path.resolve('src/fetch'),
            main: path.resolve('src/Main'),
            reducers: path.resolve('src/reducer'),
            components: path.resolve('src/components'),
            store: path.resolve('src/store'),
            util: path.resolve('src/util'),
            api: path.resolve('src/api'),
            static: path.resolve('src/static'),
            shared: path.resolve('src/shared')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],


};
