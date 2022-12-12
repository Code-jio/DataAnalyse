export function decodeBuffer(data) {
    if (!(data instanceof ArrayBuffer)) {
        data = new Uint8Array(data).buffer
    }
    let dv = new DataView(data)
    let text_arr = []
    let pos = 0
    for (let i = 0; i < data.byteLength; i++) {
        text_arr[i] = dv.getUint8(pos++)
    }
    return text_arr
}
// 将uint8类型转成可用的数组
export function getArr(arr) {
    let data_array = []
    for (let i = 0; i < arr.length / 2; i++) {
        let j = arr[2 * i] * 256 + arr[2 * i + 1]
        data_array.push(j)
    }
    return data_array
}