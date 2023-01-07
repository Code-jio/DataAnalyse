# 一款基于 webpack+vue3+element-plus+websocket 框架的半自动化数据分析工具

### 运行环境要求

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

### 开发模式

> 1. 由 vuex 实现全局状态管理，eventBus 辅助实现兄弟间组件数据沟通（由于体量原因，暂未实现模块化）。
>
> 2. 在/router/index.js 中创造对应页面的路由。
>
> 3. 模块化、组件化开发，合理掌握组件粒度。
>
> 4. 由 webpack 实现打包优化，优化 elemen-plus 组件加载，html、js、css 样式、静态资源处理等（详见/config/webpack.config.js）。

### 接口地址

[ws://172.16.100.240:20002]()

### 本地安装

```js
npm install
```

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
│   └── index.html  打包后的html入口文件
├── public  公共文件
│   ├── favicon.ico  网页图标
│   └── index.html  html入口文件
├── src
│   ├── assets 静态资源文件夹
│   │   └── iamges 图片文件夹
│   ├── components 公共组件文件夹
│   ├── router 路由文件夹
│   │   └── index.js 全局路由管理
│   ├── store 全局状态管理
│   │   └── index.js vuex主要内容（由于体量原因，暂未实现模块化）
│   ├── service api请求文件夹
│   │   ├── proto ProtoBuffer Api文件夹
│   │   │   ├── msg_v_1.proto proto文件
│   │   │   └── proto_main.js proto文件经过ProtoBuffer转化后的Api文件
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

本系统主要是用 Websocket+ProtoBuffer 作为通信手段，其中 Protobuffer 主要定义前后端沟通交流的数据结构和构建序列化消息，Websocket 则主要为二者提供全双工通信，保持双方的实时沟通和数据交流。该功能主要内容位于/src/service 文件，而 websocket.js 提供创建 websocket 长连接，以及在长连接的条件下接收数据消息，并对其进行反序列化，值得注意的是，proto_main.js 文件（proto_main.js 文件是由同目录下 msg_v_1.proto 文件提取出得 API 编译组成）为该功能提供消息反序列化 API 支持。

#### 功能说明

该功能的实现主要由 websocket.js 文件完成，其中 websocket.js 主要负责管理 websocket 长连接和已接收数据消息的反序列化，由 proto_main.js 提供 API 支持。

在 websocket.js 创建出 SocketManager 自执行函数，函数内部创建 Websocket 对象实现长连接，并且在本函数内部创建一系列 WebsocketAPI（如 onOpen、onMessage、onSend 等等）并将其绑定到 Websocket 对象上。在开启长连接的前提下，接收到服务器消息时，首先数据消息进行 ArrayBuffer 类型判断，判断通过后对该数据消息进行首层解析，解析后将获得 mainPacket，根据 mainPacket 下的 messageType 的属性值判断消息类型，根据消息类型的不同采取不同的 API 进行第二层解析，将解析后的数据通过处理后即可在页面或组件中直接使用。

#### 字段说明

##### 首层输入项参数：

| 字段     | 说明         | 类型   | 备注                     | 是否必填 |
| -------- | ------------ | ------ | ------------------------ | -------- |
| cmd_code | 控制命令编码 | Number | 枚举编号 ×224+本类别编号 | 是       |
| params   | 参数         | String |                          | 是       |

##### 首层返回值：

| 字段    | 说明 | 类型        | 备注                        | 是否必填 |
| ------- | ---- | ----------- | --------------------------- | -------- |
| content |      | ArrayBuffer | 此数据为主包的 content 内容 |          |

##### 第二层输入项参数：

| 字段             | 说明           | 类型        | 备注                     | 是否必填 |
| ---------------- | -------------- | ----------- | ------------------------ | :------- |
| accessPointId    | 接入点         | Number      | 枚举编号 ×224+本类别编号 |          |
| check            | 字段校验码     | String      |                          |          |
| content          | 内容包         | ArrayBuffer |                          | 是       |
| destEntityId     | 目标实体 id    | Number      | 枚举编号 ×224+本类别编号 | 是       |
| messageType      | 消息类型       | Number      | 枚举编号                 | 是       |
| originEntityType | 消息源实体类型 | Number      | 枚举编号                 | 是       |
| originEntityId   | 消息源实体 id  | Number      | 枚举编号 ×224+本类别编号 | 是       |
| time             | 时间戳         | Number      |                          | 是       |
| token            | 通行证         | String      |                          |          |

##### 首层返回值：

| 字段 | 说明 | 类型        | 备注             | 是否必填 |
| ---- | ---- | ----------- | ---------------- | -------- |
| data |      | ArrayBuffer | 此数据为主包内容 |          |

#### 消息订阅表说明：

由于本系统与狼蛛共用同一数据接口，在日常运行中偶尔会接受来自于狼蛛系统的广播消息，但用户可能并不需要此类消息或数据，这时可能会造成数据冗余，那么适时合理接收广播消息就是本消息订阅功能的存在意义。

```js
let subs_Table = new Array(16);
subs_Table = [
  0b00000000, // 0-7
  0b00000000, // 8-15
  0b00000000, // 16-23
  0b00000000, // 24-31
  0b00000000, // 32-39
  0b00000000, // 40-47
  0b00000000, // 48-55
  0b00000000, // 56-63
  0b00000000, // 64-71
  0b00000000, // 72-79
  0b00000000, // 80-87
  0b00000000, // 88-95
  0b00000000, // 96-103
  0b00000000, // 104-111
  0b00000000, // 112-119
  0b00000000, // 120-127
];
export default new Uint8Array(subs_Table);
```

此消息订阅表为长度固定为 16 的二进制数组，数组元素为固定长度为 8 的二进制数字，每个元素初始状态皆为 0b00000000，背后代表了 8 条消息的订阅与否，整个消息订阅表从数组首个元素的第一位开始一直到最后一个元素的第八位结束，分别代表了 8\*16=128（对应着 proto 文件中的 MessageType）条二进制消息的订阅状态（0 代表该消息未被订阅，1 代表该消息已订阅）。在本系统中我们拒绝接受所有广播消息，只需将所有数组元素的每一位置 0 即可。

在确认登陆成功之后，才会向后台发送此条消息，如果想要重新确认需要接受的广播消息，只需将修改后的消息订阅表发送至后台即可。

#### 注意事项：

值得注意的是，在解析到 SS_SIGNAL_SAMPLE 类型的消息时，proto_main.js 给出的解析方法会默认将数据按照 B64 格式解析，所以我们确定要接收非图像类数据的时候，需要使用另外的解析方法，例如：

```js
if (ssSignalSample.originEntityType === proto.EntityType.SS_SEISMIC) {
  let sampleValue = proto.ss_signal_sample
    .deserializeBinary(content)
    .getSampleValue();
  ssSignalSample.sampleValue = sampleValue;
}
```

### 运行截图

#### 首页

![](https://p.ipic.vip/tptooo.png)

### 版本内容更新

```
1.0.0:创建基础数据分析视图（2022.12.12）
        消息订阅表发送的异步处理 （12.30）
        开启vuex模块化（1.7）
```
