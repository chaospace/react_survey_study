var path = require( "path" );
var webpack = require( "webpack" );
var ExtractTextPlugin = require( "extract-text-webpack-plugin" );
var CopyWebpackPlugin = require( "copy-webpack-plugin" );
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function( options ) {

	var config = {
		devtool:'inline-source-map',
		entry :{
			main:__dirname + "/src/index.js",
			vender:['react', 'react-dom', 'firebase', 'bootstrap', 'react-router-dom']
		},
		output:{
			publicPath:"/",
			filename:"[name].js",
			path: path.resolve( __dirname, "build" ),
			libraryTarget:'umd'
		},
		devServer:{
			historyApiFallback: true,
			inline:true,
			contentBase: path.resolve( __dirname, "build" )
		},
		plugins:[
			/*new webpack.HotModuleReplacementPlugin(), // enable HMR*/
			new ExtractTextPlugin( 'css/styles.css'), // css추출
			// 별도 모듈별로 js파일 생성 처리
			new webpack.optimize.CommonsChunkPlugin({
				name:"vender",
				minChunks : function ( module ){
					return module.context && module.context.indexOf( "node_modules" ) !== -1;
				}
			})
			/*,
			// 공통 요소를 묵어서 관리
			new webpack.optimize.CommonsChunkPlugin({
				names:"vender"
			})*/
			/*,
			// libs 및 assets카피
			new CopyWebpackPlugin([ {from:"libs", to:"libs"} ], {copyUnmodified : true} )*/
		],
		resolve:{
			modules:[path.resolve(__dirname, "src"),  "node_modules"]
		},
		module:{
			rules:[
			{
				test:/\.css$/,
				/*use:[
					"style-loader",
					"css-loader"
				]*/
				use :  ExtractTextPlugin.extract({ use:'css-loader'})
			},
			{
				test:/\.(png|svg|jpg|gif)$/,
				use:[ "file-loader" ]
			},
			{
				test:/\.(woff|woff2|eot|ttf|otf)$/,
				use:[ "file-loader" ]
			},
			{
				test:/\.jsx?$/,
				loader:"babel-loader",
				exclude: /node_modules/,
				query:{
						cacheDirectory:true,
						presets:["es2015", "react", "stage-3"]
				}
			}
			]
		} ,

		externals:[
			"jQuery"
		]
	}

	if (options.buildType === 'prod') {
		config.devtool = false;
		config.plugins = config.plugins.concat([
			new webpack.optimize.UglifyJsPlugin()
		]);
	}

	return config;
}
