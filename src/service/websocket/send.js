/* eslint-disable */
import socketMgr from '@/service/websocket/websocket';
import store from '@/store'; //在js文件引入store模块

/**
 * 请求样本列表
 * @param { Number } id 样本ID
 * @param { String } startTime 开始时间
 * @param { String } endTime 截止时间
 */
export function reqSampleList(startTime, endTime, id = proto.EntityType.SS_SEISMIC) {
  let R2S = new proto.rqt_2pf_std();
  R2S.setRqtCode(6);
  R2S.setParams(`${id},${startTime},${endTime}`);
  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(R2S.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.RQT_2PF_STD);
  mainPack.setOriginEntityId(store.state.userID);
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  // console.log(mainPack);
  socketMgr.send(mainPack.serializeBinary());
  // console.log('请求样本列表');
}

/**
 * 请求样本的关联样本
 * @param { Number } id 原样本id
 * @param { Number } type 目标样本类型
 * @param { Number } destEntityId 目标id（作为返回结果的destentityid）
 */
export function reqRelatedSample(id, type, destEntityId = store.state.userID) {
  let R2S = new proto.rqt_2pf_std();
  R2S.setRqtCode(12);
  R2S.setParams(`${id},${type},${destEntityId}`);
  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(R2S.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.RQT_2PF_STD);
  mainPack.setOriginEntityId(store.state.userID);
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  // console.log(mainPack);
  socketMgr.send(mainPack.serializeBinary());
}


/**
 * 请求样本数据
 * @param { Number } id 样本ID
 */
export function reqSampleData(id) {
  let R2S = new proto.rqt_2pf_std();
  R2S.setRqtCode(7);
  R2S.setParams(`${id}`);
  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(R2S.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.RQT_2PF_STD);
  mainPack.setOriginEntityId(store.state.userID);
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  // console.log(mainPack);
  socketMgr.send(mainPack.serializeBinary());
  // console.log('请求震动样本数据');
}

/**
 * 请求傅里叶变换数据
 * @param { Number } sampleID 样本ID
 * @param { Number } destEntityId 目标ID
 */
export function reqFftData(sampleID, destEntityId = store.state.userID) {
  let R2S = new proto.rqt_2pf_std();
  R2S.setRqtCode(8);
  R2S.setParams(`${sampleID},${destEntityId}`);
  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(R2S.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.RQT_2PF_STD);
  mainPack.setOriginEntityId(store.state.userID);
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  socketMgr.send(mainPack.serializeBinary());
  // console.log('请求傅里叶变换数据');
}

/**
 * 请求删除样本数据
 * @param { Number } sampleID 样本ID
 */
export function reqDeleteSample(sampleID) {
  let R2S = new proto.rqt_2pf_std();
  R2S.setRqtCode(9);
  R2S.setParams(`${sampleID}`);
  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(R2S.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.RQT_2PF_STD);
  mainPack.setOriginEntityId(store.state.userID);
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  socketMgr.send(mainPack.serializeBinary());
  console.log('请求删除样本数据');
}

/**
 * 请求样本分类结果
 * @param { Number } sampleID 样本ID
 */
export function reqSampleClassifyRes(sampleID) {
  let R2S = new proto.rqt_2pf_std();
  R2S.setRqtCode(10);
  R2S.setParams(`${sampleID}`);
  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(R2S.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.RQT_2PF_STD);
  mainPack.setOriginEntityId(store.state.userID);
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  socketMgr.send(mainPack.serializeBinary());
}

/**
 * 发送算法识别指令
 * @param { Number } sampleID 样本ID
 * @param { Number } AlgoType 算法类型
 * @param { Number } destEntityId 目标ID 其实就是用户ID
 */
export function reqAlgo(sampleID, AlgoType, destEntityId = store.state.userID) {
  let R2S = new proto.rqt_2pf_std();
  R2S.setRqtCode(11);
  R2S.setParams(`${sampleID},${AlgoType},${destEntityId}`);
  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(R2S.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.RQT_2PF_STD);
  mainPack.setOriginEntityId(store.state.userID);
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  socketMgr.send(mainPack.serializeBinary());
  console.log('请求样本分类结果', R2S);
}

/**
 * 发送人工标签
 * @param { Number } sampleID 样本ID
 * @param { Number } targetType 目标类型
 * @param { Number } confidenceLevel 置信度 人工标签置信度默认为100
 */
export function sendTags(sampleID, targetType, confidenceLevel = 100) {
  let AlgoClassifyRst = new proto.algo_classify_rst();
  AlgoClassifyRst.setSampleId(sampleID);
  AlgoClassifyRst.setTargetType(targetType);
  AlgoClassifyRst.setConfidenceLevel(confidenceLevel);
  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(AlgoClassifyRst.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.ALGO_CLASSIFY_RST);
  mainPack.setOriginEntityId(store.state.userID);
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  socketMgr.send(mainPack.serializeBinary());
  // console.log('发送标签', AlgoClassifyRst);
}

/**
 * 登录请求
 * @param { Object } msg
 * @returns
 */
export function login(msg) {
  // 登录信息打包
  let loginMsg = new proto.pc_logon_request();
  loginMsg.setUsername(msg.Account);
  loginMsg.setPassword(msg.Passwd);
  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(loginMsg.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.PC_LOGON_REQUEST);
  mainPack.setOriginEntityId(); // 登陆设备id
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  socketMgr.send(mainPack.serializeBinary());
  // console.log('成功发送登录信息', mainPack.serializeBinary());
  return mainPack.serializeBinary();
}

/**
 * 发送订阅表
 * @param { Array } msg 订阅表
 * @returns 打包后的主包
 */
export function sendSubscribeTable(msg) {
  // 登录信息打包
  let pcEntityRegister = new proto.pc_entity_register();
  pcEntityRegister.setSubscribeTable(msg);
  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(pcEntityRegister.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.PC_ENTITY_REGISTER);
  mainPack.setOriginEntityId(store.state.userID); // 登陆设备id
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  socketMgr.send(mainPack.serializeBinary());
  // console.log('发送订阅表', mainPack.serializeBinary());
  return mainPack.serializeBinary();
}

/**
 * 请求样本列表
 */
export function getSensorList() {
  let R2S = new proto.rqt_2pf_std();
  R2S.setRqtCode(1);

  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(R2S.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.RQT_2PF_STD);
  mainPack.setOriginEntityId(store.state.userID);
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  socketMgr.send(mainPack.serializeBinary());
  console.log('完成主页加载，发出传感器列表请求');
}

// 请求拓扑图数据
export function getTopoList() {
  let R2S = new proto.rqt_2pf_std();
  R2S.setRqtCode(4);

  // 消息主体打包
  let mainPack = new proto.main_packet();
  mainPack.setContent(R2S.serializeBinary());
  mainPack.setCheck('0');
  mainPack.setMessageType(proto.MessageType.RQT_2PF_STD);
  mainPack.setOriginEntityId(store.state.userID);
  mainPack.setOriginEntityType(proto.EntityType.FE_BROWSER); // 原始实体类型
  mainPack.setTime(new Date().getTime());
  socketMgr.send(mainPack.serializeBinary()) && console.log('发出拓扑列表请求');
}

/**
 * 请求实体类型
 * @param { Number } num
 * @returns
 */
export function getEntityType(num) {
  let Entity;
  switch (num) {
    case proto.EntityType.PC_REPEATER:
      Entity = { id: 'PC_REPEATER', name: 'DDS平台' }; // DDS平台
      break;
    case proto.EntityType.PC_MONITOR:
      Entity = { id: 'PC_MONITOR', name: '监控' }; // 监控
      break;
    case proto.EntityType.PC_SCHEDULER:
      Entity = { id: 'PC_SCHEDULER', name: '任务调度引擎' }; // 任务调度引擎
      break;
    case proto.EntityType.PC_DBPROXY:
      Entity = { id: 'PC_DBPROXY', name: '数据库代理' }; // 数据库代理
      break;
    case proto.EntityType.GW_SERIALPORT:
      Entity = { id: 'GW_SERIALPORT', name: '串口网关' }; // 串口网关
      break;
    case proto.EntityType.GW_WEBSOCKET:
      Entity = { id: 'GW_WEBSOCKET', name: 'websocket网关' }; // websocket网关
      break;
    case proto.EntityType.GW_MQTT:
      Entity = { id: 'GW_MQTT', name: 'MQTT网关' }; // MQTT网关
      break;
    case proto.EntityType.GW_LORABASE:
      Entity = { id: 'GW_LORABASE', name: 'LORA基站' }; // LORA基站
      break;
    case proto.EntityType.GW_DTU:
      Entity = { id: 'GW_DTU', name: 'DTU' };
      break;
    case proto.EntityType.GW_CAMERA:
      Entity = { id: 'GW_CAMERA', name: 'GW_CAMERA' };
      break;
    case proto.EntityType.SS_SEISMIC:
      Entity = { id: 'SS_SEISMIC', name: '震动传感器' }; // 震动传感器
      break;
    case proto.EntityType.SS_SOUND:
      Entity = { id: 'SS_SOUND', name: '声音传感器' }; // 声音传感器
      break;
    case proto.EntityType.SS_MAGNETIC:
      Entity = { id: 'SS_MAGNETIC', name: '地磁传感器' }; // 地磁传感器
      break;
    case proto.EntityType.SS_RADAR:
      Entity = { id: 'SS_RADAR', name: '雷达传感器' }; // 雷达传感器
      break;
    case proto.EntityType.SS_CAMERA:
      Entity = { id: 'SS_CAMERA', name: '图像传感器' }; // 图像传感器
      break;
    case proto.EntityType.SS_IR:
      Entity = { id: 'SS_IR', name: '红外传感器' }; // 红外传感器
      break;
    case proto.EntityType.SS_TEMPERATURE:
      Entity = { id: 'SS_TEMPERATURE', name: '温度传感器' }; // 温度传感器
      break;
    case proto.EntityType.ALGO_SVM:
      Entity = { id: 'ALGO_SVM', name: '支持向量机' }; // 算法
      break;
    case proto.EntityType.ALGO_VISION:
      Entity = { id: 'ALGO_VISION', name: '图像识别' }; // 算法
      break;
    case proto.EntityType.FE_BROWSER:
      Entity = { id: 'FE_BROWSER', name: '浏览器' }; // 浏览器（终端）
      break;
    case proto.EntityType.SS_OT:
      Entity = { id: 'SS_OT', name: '其他传感器' }; // 其他传感器
      break;
    case proto.EntityType.OT_TEST:
      Entity = { id: 'OT_TEST', name: '测试' }; // 其他的测试用
      break;
  }
  return Entity;
}

/**
 * 请求工作模式
 * @param { Number } num
 * @returns
 */
export function getWorkingMode(num) {
  let workingMode;
  switch (num) {
    case proto.WorkingMode.WM_EVENT_DETEC:
      workingMode = '事件报送';
      break;
    case proto.WorkingMode.WM_OTHER:
      workingMode = '其他';
      break;
    case proto.WorkingMode.WM_RAWSIG_PUSH:
      workingMode = '数据推送';
      break;
    case proto.WorkingMode.WM_STANDBY:
      workingMode = '待机模式';
      break;
  }
  return workingMode;
}

/**
 * 请求目标类型
 * @param { Number } num
 * @returns
 */
export function getTargetType(num) {
  let TargetType;
  switch (num) {
    case proto.TargetType.TT_HUMAN:
      TargetType = '人员';
      break;
    case proto.TargetType.TT_VEHICLE:
      TargetType = '车辆';
      break;
    case proto.TargetType.TT_UNCLASSIFIED:
      TargetType = '未分类';
      break;
    case proto.TargetType.TT_OTHER:
      TargetType = '其他';
      break;
  }
  return TargetType;
}
