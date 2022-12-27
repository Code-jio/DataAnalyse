# 基于 webpack+vue3+sass+element-plus 框架的半自动化数据分析工具

### 运行要求

```bash
node版本 v16.13.0
npm版本  8.0.0以上
```

### 命令介绍

```bash
npm start       启动项目
npm run dev     运行dev环境
npm run build   打包
```

### 开发方式

```
1.在views里面创建vue的页面
2.在/router/index.js中创造对应的路由 
```

### 演示地址

localhost:3000

### 本地安装

#### 开发工具

vscode

#### 目录说明

```
├── config  webpack的配置文件
│   └── webpack.config.js  webpack运行的配置文件
├── dist  生产代码文件夹
│   ├── static  js与css的资源文件夹
│   │   ├── css  打包后的css文件夹
│   │   └── js  打包后的js文件夹
│   ├── favicon.ico  网页图标
│   └── index.html  html入口文件
├── public  公共
│   ├── demo  mock示例
│   ├── _createProductionServer.ts  mock注入初始化
│   └── _util.ts 基础模型
├── src
│   ├── assets 静态资源文件夹
│   │   └── iamges 图片文件夹
│   ├── components 公共组件文件夹 
│   ├── router 路由文件夹
│   │   └── index.js 全局路由管理
│   ├── service api请求文件夹
│   │   ├── proto ProtoBuffer Api文件夹
│   │   │   └──proto_main.js 经过ProtoBuffer转化后的Api文件
│   │   └── websocket 所有请求地址放置处
│   │   │   ├── send.js 发送指令的Api文件
│   │   │   └── websocket.js websocket主体文件，包含websocket创建、连接、解析等等操作
│   ├── styles 样式文件夹
│   │   ├── element  字体图标
│   │   │   └──index.scss element-plus自定义样式
│   │   ├── common.css 自定义公共样式
│   │   ├── localize elment-plus的样式本地化 
│   │   └── preset.css 全局的预设样式
│   ├── views vue页面
│   │   └── Home 主页文件夹
│   │   │   └── Home.vue 描述主页的vue文件
│   │   │   └── components 针对当前页面的 组件文件夹
│   │   │   │   ├── AlgorithmPicker.vue 算法选择组件
│   │   │   │   ├── BarChart.vue 柱状图组件
│   │   │   │   ├── LineChart.vue 折线图组件
│   │   │   │   ├── PhotoList.vue 图片列表组件
│   │   │   │   ├── SampleList.vue 样本列表组件
│   │   │   │   ├── ShowTags.vue 标签展示组件
│   │   │   │   └── TimePicker.vue 时间选择组件
│   ├── utils  
│   │   ├── da taTransform  数据转换
│   │   ├── eventBus.js  中央事件总线（用于兄弟组件之间的数据传递
│   │   ├── subscribeTable.js  消息订阅表
│   │   └── utils.js  自定义工具函数
│   ├── App.vue  vue入口文件
│   └── main.js  项目全局入口文件
├── .gitignore  git排除文件
├── .eslintrc.js  eslint配置
├── babel.config.js  babel配置
├── package-lock.json   记录实际安装的各个npm 包的具体来源和版本号的json文件
└── package.json   记录本项目所需要的各种模块
```



