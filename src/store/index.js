/* eslint-disable no-undef */
import { createStore } from "vuex"
import "@/service/proto/proto_main.js"
export default createStore({
    state: {
        shakeData: [],
        ssSeimicFft: [],
        userID: null,
        sampleList: []
    },
    mutations: {
        addShakeData(state, payload) {
            for (let i = 0; i < payload.length; i++) {
                if (payload[i] < 4096 && payload[i] > 0) {
                    state.shakeData.push(payload[i]);
                }
            }
            if (state.shakeData.length > 5000) {
                state.shakeData.splice(0, 20);
            }
        },
        addFftData(state, payload) {
            let data = [];
            for (let i = 1; i < payload.length; i++) {
                data.push(payload[i]);
            }
            state.ssSeimicFft = data;
        },
        getUserID(state, payload) {
            state.userID = payload;
        },
        getSampleList(state, payload) {
            console.log(payload);
            state.sampleList = payload;
        },
        // 解析样本数据
        resolveSample(state, payload) {
            // console.log('接收到payload', payload);
            // 处理图片数据
            // 判断设备类型
            if (payload.mainPacket.originEntityType === proto.EntityType.SS_CAMERA) {
                console.log("图片源自摄像头");
                // 在以往 接受的图片数据为二进制类型，转换成图片需要将其从buffer类型转化为Base64再进行拼接才能够完整显示
                // 现在接收到的数据为base64数据 直接进行拼接就可以直接显示
                // 并且将新拍到的照片添加到列表尾部
                payload.ssSignalSample.sampleValue =
                    'data:image/jpg;base64,' + payload.ssSignalSample.sampleValue;
                // 面板显示的单个图片(显示为该传感器的最新图片,所有再次对该图片进行判断，如果经判断sensorID与photo数组内数据sensorID又重复，则去更新该图片——有则更新，无则添加)
                // console.log('获取到图像传感器样本数据');

                // 当数组为空 兜底
                if (state.lastPhotoList.length === 0) {
                    state.lastPhotoList.push(payload.ssSignalSample);
                }
                // 检测最新图片
                for (let j = 0; j < state.lastPhotoList.length; j++) {
                    if (
                        state.lastPhotoList[j].originEntityId ===
                        payload.ssSignalSample.originEntityId
                    ) {
                        // 直接赋值的方法无法进行深度侦听，所以需要用splice方法进行替换,以后还是少用等号赋值比较好
                        // state.lastPhotoList[j] = payload.ssSignalSample;
                        state.lastPhotoList.splice(j, 1, payload.ssSignalSample);
                    } else {
                        state.lastPhotoList.push(payload.ssSignalSample);
                    }
                }
                state.photoList.push(payload.ssSignalSample);
            } else if (
                payload.mainPacket.originEntityType === proto.EntityType.PC_DBPROXY
            ) {
                console.log("接收的是数据库中的图片");
                // console.log(payload.ssSignalSample);
                payload.ssSignalSample.sampleValue =
                    'data:image/jpg;base64,' + payload.ssSignalSample.sampleValue;
                state.photoList.push(payload.ssSignalSample);
            }
        },

    },
    getters: {},
    actions: {},
})