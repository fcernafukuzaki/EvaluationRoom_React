const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        'index': './src/index.js',
        'index_public': './src/index_public.js',
        'index_exam': './src/index_exam.js',
    }, 
    output: {
        path: path.resolve(__dirname, '../EvaluationRoom/src/main/resources/public/'),
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ],
           },
           {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            chunks: ['index'],
            filename: './index.html'
        }),
        new HtmlWebPackPlugin({
            template: './public/index.html',
            chunks: ['index_public'],
            filename: './evaluacion/index.html'
        }),
        new HtmlWebPackPlugin({
            template: './public/index_exam.html',
            chunks: ['index_exam'],
            filename: './pages/examen.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ]
}