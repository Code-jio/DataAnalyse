import { createStore } from "vuex"
export default createStore({
    state: {
        shakeData: [],
        ssSeimicFft: [],
        userID: null
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
            state.userID = payload
        }
    },
    getters: {},
    actions: {},
})