# 一款基于 webpack+vue3+element-plus+websocket 框架的半自动化数据分析工具

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

### 请求方式

```
1.后端更新proto文件之后，转换获取更新后的proto_main.js文件
2.在/service/websocket/
```

### 演示地址

```http
localhost:3000
```

### 接口地址

``` 
ws://172.16.100.240:20002
```

### 本地安装

### 开发工具

vscode

### 目录说明

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

### 通信方式（长连接-消息序列化）

#### 简介

​		本系统主要是用Websocket+ProtoBuffer作为通信手段，其中Protobuffer主要定义前后端沟通交流的数据结构和构建序列化消息，Websocket则主要为二者提供全双工通信，保持双方的实时沟通和数据交流。该功能主要内容位于/src/service文件，而websocket.js提供创建websocket长连接，以及在长连接的条件下接收数据消息，并对其进行反序列化，值得注意的是，proto_main.js文件（proto_main.js文件是由同目录下msg_v_1.proto文件提取出得API编译组成）为该功能提供消息反序列化API支持。

#### 功能说明

​		该功能的实现主要由websocket.js文件完成，其中websocket.js主要负责管理websocket长连接和已接收数据消息的反序列化，由proto_main.js提供API支持。

​		在websocket.js创建出SocketManager自执行函数，函数内部创建Websocket对象实现长连接，并且在本函数内部创建一系列WebsocketAPI（如onOpen、onMessage、onSend等等）并将其绑定到Websocket对象上。在开启长连接的前提下，接收到服务器消息时，首先数据消息进行ArrayBuffer类型判断，判断通过后对该数据消息进行首层解析，解析后将获得mainPacket，根据mainPacket下的messageType的属性值判断消息类型，根据消息类型的不同采取不同的API进行第二层解析，将解析后的数据通过处理后即可在页面或组件中直接使用。

#### 字段说明

首层输入项参数：

| 字段     | 说明         | 类型   | 备注                    | 是否必填 |
| -------- | ------------ | ------ | ----------------------- | -------- |
| cmd_code | 控制命令编码 | Number | 枚举编号×224+本类别编号 | 是       |
| params   | 参数         | String |                         | 是       |

 

首层返回值：

| 字段    | 说明 | 类型        | 备注                      | 是否必填 |
| ------- | ---- | ----------- | ------------------------- | -------- |
| content |      | ArrayBuffer | 此数据为主包的content内容 |          |

 

第二层输入项参数：

| 字段             | 说明           | 类型        | 备注                    | 是否必填 |
| ---------------- | -------------- | ----------- | ----------------------- | -------- |
| accessPointId    | 接入点         | Number      | 枚举编号×224+本类别编号 |          |
| check            | 字段校验码     | String      |                         |          |
| content          | 内容包         | ArrayBuffer |                         | 是       |
| destEntityId     | 目标实体id     | Number      | 枚举编号×224+本类别编号 | 是       |
| messageType      | 消息类型       | Number      | 枚举编号                | 是       |
| originEntityType | 消息源实体类型 | Number      | 枚举编号                | 是       |
| originEntityId   | 消息源实体id   | Number      | 枚举编号×224+本类别编号 | 是       |
| time             | 时间戳         | Number      |                         | 是       |
| token            | 通行证         | String      |                         |          |

 

首层返回值：

| 字段 | 说明 | 类型        | 备注             | 是否必填 |
| ---- | ---- | ----------- | ---------------- | -------- |
| data |      | ArrayBuffer | 此数据为主包内容 |          |

### 版本内容更新

```
1.0.0:创建基础数据分析视图（2022.12.12）
```
