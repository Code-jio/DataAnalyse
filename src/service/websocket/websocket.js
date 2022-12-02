/* eslint-disable */
import store from '@/store';
import { ElMessage } from 'element-plus';
import '@/service/proto/proto_main.js';
import { sendSubscribeTable } from "./send.js"
import subscribeTable from '../../utils/subscribeTable.js';
function sendLoginMsg(msg) {
  // 登录信息打包
  let loginMsg = new proto.pc_logon_request();
  loginMsg.setUsername(msg.Account);
  loginMsg.setPassword(msg.Passwd);
  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(loginMsg.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.PC_LOGON_REQUEST);
  mainPack.setOriginEntityId(msg.id); // 登陆设备id
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  console.log('成功发送登录信息', mainPack.serializeBinary());
  return mainPack.serializeBinary();
}


let url = 'ws://172.16.100.240:20002';
let _socket;
// 没有服务器的前提下 用浏览器作为运行环境 寻找用于绘图的包
let SocketManager = (function () {
  let log = function (s) {
    console.log('[socket]' + s);
  };
  // 关闭原因
  let CLOSE_REASON = {
    socketFail: 0,
    doError: 1,
    reconnect: 2,
    forceClose: 3
  };
  let MessageType;
  /**
   * @lends module:SocketMgr
   */
  let SocketManager = function () {
    this.connect = function () {
      //test Long
      console.log('wo---, 初次连接尝试');
      // console.log(main_packet);
      // console.log(protoRoot);
      // 如果连接未成功 提示用户连接失败
      try {
        _socket = new WebSocket(url);
        // 指定WebSocket接受ArrayBuffer实例作为参数
        _socket.binaryType = 'arraybuffer';
      } catch (error) {
        console.log(error);
        ElMessage("连接失败，暂时无法连接")
      }

      _socket.onopen = this.onOpen.bind(this);
      // _socket.onerror = this.onError.bind(this);
      _socket.onmessage = this.onMessage.bind(this);
      _socket.onclose = this.onClose.bind(this);
    };
    this.onOpen = function () {
      console.log('连接成功');
      this.send(sendLoginMsg({ Account: "test", Passwd: "test" }))
      MessageType = proto.MessageType;
      // console.log(MessageType);
    };
    this.onMessage = function ({ data }) {
      if (!(data instanceof ArrayBuffer)) return;
      // let mainPacket = main_packet.decode(util.decodeBuffer(data));
      // new 主包解析
      let evt = new Uint8Array(data);
      let mainPack_Ser = proto.main_packet.deserializeBinary(evt);
      // 主包转化为解析度较高的对象形式
      let mainPacket = proto.main_packet.deserializeBinary(evt).toObject();
      // if (mainPacket.destEntityId === 0) {
      console.log(mainPacket);
      //   return
      // }
      // 获取主包中的内容（Arraybuffer格式）
      let content = mainPack_Ser.getContent();

      // console.log(mp.toObject(util.decodeBuffer(data)));
      // console.log(util.decodeBuffer(data));
      // 每个传感器都是单独的一个数据包
      // store.commit('primaryInspect', mainPacket);
      // console.log(mainPacket);
      // 时间戳转换
      // console.log(new Date(mainPacket.time * 1000));
      // 更改为switch语句

      // 通过消息类型判断 再根据消息类型对主包内容进行解码
      switch (mainPacket.messageType) {
        //  传感器状态无线信号数据
        // case MessageType.SS_WIRELESS_STATUS:
        //   let ssSensorStatus = proto.ss_sensor_status
        //     .deserializeBinary(content)
        //     .toObject();
        //   store.commit('addSersorStatus', {
        //     ssSensorStatus,
        //     mainPacket
        //   });
        //   // console.log(ssSensorStatus, mainPacket, '无线信号')
        //   break;
        // // 震动信号原始数据
        // case MessageType.SS_SEISMIC_RAWSIG:
        //   let ssSeimicRawsig = proto.ss_seimic_rawsig
        //     .deserializeBinary(content)
        //     .toObject();
        //   store.commit('addShakeData', ssSeimicRawsig.sampleValueList);
        //   break;
        // 震动事件
        // case MessageType.SS_SEISMIC_EVEVT:
        //   let ssSeimicEvent = proto.ss_seimic_event
        //     .deserializeBinary(content)
        //     .toObject();
        //   // console.log(ssSeimicEvent);
        //   break;
        // 震动信号 快速傅里叶变换
        case MessageType.SS_SEISMIC_FFT:
          let ssSeimicFft = proto.ss_seimic_fft
            .deserializeBinary(content)
            .toObject();
          // console.log(ssSeimicFft);
          store.commit('addFftData', ssSeimicFft.sampleValueList);
          break;
        // 样本分类信息
        case MessageType.SP_CLASIFY_INFO:
          let spClasifyInfo = proto.sp_clasify_info
            .deserializeBinary(content)
            .toObject();
          console.log(spClasifyInfo, "已获取样本分类信息");
          store.commit('getSPClassifyInfo', spClasifyInfo);
          break;
        // 样本分类信息
        case MessageType.ALGO_CLASSIFY_RST:
          let algoClassifyRst = proto.algo_classify_rst
            .deserializeBinary(content)
            .toObject();
          console.log(algoClassifyRst, "已获取样本分类信息");
          store.commit('getTag', algoClassifyRst);
          break;
        // // 地磁原始数据
        // case MessageType.SS_MAGNETIC_RAWSIG:
        //   let ssMagneticRawsig = proto.ss_magnetic_rawsig
        //     .deserializeBinary(content)
        //     .toObject();
        //   // console.log(ssMagneticRawsig);
        //   store.commit('addMagneticRawsig', ssMagneticRawsig.sampleValue);
        //   break;
        // // 地磁事件
        // case MessageType.SS_MAGNETIC_EVENT:
        //   let ssMagneticEvent = proto.ss_magnetic_event
        //     .deserializeBinary(content)
        //     .toObject();
        //   console.log('地磁事件', ssMagneticEvent);
        //   store.commit('addEvent', { ssMagneticEvent, mainPacket });
        //   break;
        // // 温度传感器原始数据--温度、湿度
        // case MessageType.SS_2DOUBLES_STD:
        //   let ss2DoublesStd = proto.ss_2doubles_std
        //     .deserializeBinary(content)
        //     .toObject();
        //   store.commit('addHumiture', ss2DoublesStd);
        //   break;
        // // 更新拓扑图
        // case MessageType.PC_TOPOLOGY_UPDATE:
        //   let Topology_update = proto.pc_topology_update
        //     .deserializeBinary(content)
        //     .toObject();
        //   console.log(Topology_update.statisticList);
        //   store.commit('updateTopo', Topology_update.statisticList);
        //   break;
        // 图像传感器 拍摄图片
        case MessageType.SS_SIGNAL_SAMPLE:
          // proto_main.js 默认按照Base64格式解码 除图片外的其他类型数据建议按Base64反解码
          let ssSignalSample = proto.ss_signal_sample.deserializeBinary(content).toObject();
          let sampleValue = proto.ss_signal_sample.deserializeBinary(content).getSampleValue()
          ssSignalSample.sampleValue = sampleValue
          store.commit('resolveSample', { ssSignalSample, mainPacket });
          break;
        // 获取样本列表
        case MessageType.PC_SAMPLE_LIST:
          let pcSampleList = proto.pc_sample_list.deserializeBinary(content).toObject();
          store.commit("getSampleList", pcSampleList)
          console.log(pcSampleList, "已获取样本列表");
          break;
        // 登陆回应
        case MessageType.PC_LOGON_ASW:
          let pcLogonAsw = proto.pc_logon_asw
            .deserializeBinary(content)
            .toObject();
          // console.log(pcLogonAsw);
          // 判断登录是否成功
          if (pcLogonAsw.rst === true) {
            // 在此处存储登录的token信息,并发送消息订阅表
            store.commit("getUserID", pcLogonAsw.id)
            sendSubscribeTable(subscribeTable)
            if (!window.localStorage) {
              alert('该设备不支持localstorage');
              return false;
            } else {
              localStorage.setItem(
                'usertoken',
                JSON.stringify(pcLogonAsw.token)
              );
            }
          }
          break;
        default:
          // console.log('未找到针对此消息的处理方式', mainPacket, content);
          break;
      }
    };
    // 关闭时
    this.onClose = function (event) {
      console.log('关闭了', event);
      // _socket = null;
    };
    this.send = function (args) {
      if (!_socket) {
        console.log('连接已关闭或者没有链接成功');
        ElMessage('连接已关闭或者没有链接成功');
        _socket = null;
        return;
      }
      if (args) {
        // console.log(args);
        _socket.send(args);
      }
    };
    this.forceClose = function () {
      _socket.close(); // 主动关闭
      console.log('websocket已经关闭');
      _socket = null;
    };
  };

  let _me = null;
  return {
    get instance() {
      _me || (_me = new SocketManager());
      return _me;
    }
  };
  //return { instance: (function() { _me || (_me = new SocketManager()); return _me; })() };
})();

// module.exports=SocketManager.instance;

const a = SocketManager.instance;
a.connect(0, 0, 1);
export default a;
