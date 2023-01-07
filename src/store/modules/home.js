/* eslint-disable no-undef */
import { getTime } from "@/utils/utils.js"
import {
    decodeBuffer, getArr
} from "@/utils/dataTransform.js"

export const home = {
    namespaced: true,
    state: {
        shakeData: { data: [], chartType: "Line" }, // 震动信号数据
        ssSeimicFft: { data: [], chartType: "Bar" }, // 傅立叶变换数据
        userID: null, // 用户id
        sampleList: [], // 样本列表
        photoList: [], // 图片列表
        sampleTag: {}, // 样本标签
        sampleClassifyInfo: {} // 样本分类结果
    },
    mutations: {
        // 获取傅里叶变换数据
        addFftData(state, payload) {
            let data = [];
            for (let i = 0; i < payload.length; i++) {
                data.push(payload[i]);
            }
            state.ssSeimicFft.data = data;
            state.ssSeimicFft.chartType = "Bar";
        },
        // 获取用户id
        getUserID(state, payload) {
            state.userID = payload;
        },
        // 获取样本列表
        getSampleList(state, payload) {
            if (state.sampleList) state.sampleList = []
            for (let i = 0; i < payload.sampleListList.length; i++) {
                payload.sampleListList[i].date = getTime(payload.sampleListList[i].time * 1000, "YYYY-MM-DD  hh:mm:ss")
            }
            state.sampleList = payload.sampleListList;
        },
        // 解析样本数据
        resolveSample(state, payload) {
            if (payload.ssSignalSample.originEntityType === proto.EntityType.SS_SEISMIC) {

                if (state.shakeData.data) state.shakeData.data = []
                // console.log("接收的是数据库中的震动信号样本数据", payload.mainPacket);
                getArr(decodeBuffer(payload.ssSignalSample.sampleValue))
                payload.ssSignalSample.sampleValue = getArr(decodeBuffer(payload.ssSignalSample.sampleValue))
                state.shakeData.data = payload.ssSignalSample.sampleValue;
            } else if (payload.ssSignalSample.originEntityType === proto.EntityType.SS_CAMERA) {
                // console.log("接收的是数据库中的图片");
                payload.ssSignalSample.sampleValue =
                    'data:image/jpg;base64,' + payload.ssSignalSample.sampleValue;
                payload.ssSignalSample.tag = ""
                // 数组去重
                if (state.photoList.find(item => item.id === payload.ssSignalSample.id)) {
                    return
                } else {
                    state.photoList.push(payload.ssSignalSample);
                }
            }
        },
        // 存储样本标签
        getTag(state, payload) {
            state.sampleTag = payload
        },
        // 存储样本分类结果
        getSPClassifyInfo(state, payload) {
            state.sampleClassifyInfo = payload
        },
        // 重置photolist
        resetData(state, payload) {
            state.photoList = payload
            state.sampleTag = payload
            state.sampleClassifyInfo = payload
        }
    },
    getters: {},
    actions: {},

}