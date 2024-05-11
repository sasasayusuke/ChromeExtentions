const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
    mode: 'development', // 'production'に変更して本番環境用のビルドを行う
    entry: './src/popup.js', // エントリーポイント
    output: {
        path: path.resolve(__dirname, 'dist'), // ビルドしたファイルの出力先ディレクトリ
        filename: 'bundle.js' // 出力するファイル名
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader' // Vueコンポーネントを処理
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', // CSSをDOMに注入する
                    'css-loader' // CSSファイルを解析する
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin() // Vueをロードするためのプラグイン
    ],
    resolve: {
        extensions: ['.js', '.vue'], // import文でファイル拡張子を省略可能
    }
};
