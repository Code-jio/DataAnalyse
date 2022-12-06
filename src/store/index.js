/* eslint-disable no-undef */
import { createStore } from "vuex"
import { getTime } from "@/utils/utils.js"
import {
    decodeBuffer, getArr
} from "@/utils/dataTransform.js"
export default createStore({
    state: {
        shakeData: [],
        ssSeimicFft: [],
        userID: null,
        sampleList: [],
        photoList: [],
        sampleTag: {},
        sampleClassifyInfo: {}
    },
    mutations: {
        // 获取傅里叶变换数据
        addFftData(state, payload) {
            let data = [];
            for (let i = 1; i < payload.length; i++) {
                data.push(payload[i]);
            }
            state.ssSeimicFft = data;
        },
        // 获取用户id
        getUserID(state, payload) {
            state.userID = payload;
        },
        // 获取样本列表
        getSampleList(state, payload) {
            for (let i = 0; i < payload.sampleListList.length; i++) {
                payload.sampleListList[i].date = getTime(payload.sampleListList[i].time * 1000, "YYYY-MM-DD  hh:mm:ss")
            }
            state.sampleList = payload.sampleListList;
        },
        // 解析样本数据
        resolveSample(state, payload) {
            if (payload.ssSignalSample.originEntityType === proto.EntityType.SS_SEISMIC) {
                console.log("接收的是数据库中的震动信号样本数据", payload.mainPacket);
                getArr(decodeBuffer(payload.ssSignalSample.sampleValue))
                payload.ssSignalSample.sampleValue = getArr(decodeBuffer(payload.ssSignalSample.sampleValue))
                state.shakeData = payload.ssSignalSample.sampleValue;
            } else if (payload.ssSignalSample.originEntityType === proto.EntityType.SS_CAMERA) {
                console.log("接收的是数据库中的图片");
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
        resetPhotoList(state, payload) {
            state.photoList = payload
        }
    },
    getters: {},
    actions: {},
})