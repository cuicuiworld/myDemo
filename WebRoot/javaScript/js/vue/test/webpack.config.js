var path = require('path');
module.exports = {
    entry: ['./src/main.js'],     //��Ŀ����ļ���·���������ж���ļ�
    output: {     //����webpack������ļ��������������ļ������dist�ļ��������build.js
        path: './dist',
        publicPath:'./dist/',
        filename: 'build.js'
    },
    //�����Զ�ˢ��,����򿪻�ʹ�����ˢ�¶��������滻
    /*devServer: {
     historyApiFallback: true,
     hot: false,
     inline: true,
     grogress: true
     },*/
    module: {
        loaders: [
            //ת��ES6�﷨
            {
                test: /\.js$/,          //������ƥ���ļ�������
                loader: 'babel',        //������ָ������loaderȥ�����Ӧ�ļ�����
                exclude: /node_modules/
            },
            //����.vue�ļ�
            {
                test:/\.vue$/,
                loader:'vue'
            },
            //ͼƬת����С��8K�Զ�ת��Ϊbase64�ı���
            {
                test: /\.(png|jpg|gif)$/,
                loader:'url-loader?limit=8192'
            }
        ]
    },
    vue:{
        loaders:{
            js:'babel' //loader������ɡ�
        }
    },
    resolve: {
        // requireʱʡ�Ե���չ�����磺require('app') ����Ҫapp.js
        extensions: ['', '.js', '.vue'],
        // ���ü�д��·������ʡ���ļ�����
        alias: {
            filter: path.join(__dirname, './src/filters'),
            components: path.join(__dirname, './src/components')
        }
    }
}