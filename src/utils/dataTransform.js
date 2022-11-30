// 返回数据视图
export function getView(bytes) {
    var view = new DataView(new ArrayBuffer(bytes.length));
    for (let i = 0; i < bytes.length; i++) {
        view.setUint8(i, bytes[i])
    }
    return view;
}

// 将字节数组转为无符号16位整型
export function toUint16(bytes) {
    return getView(bytes).getUint16()
}
// 字符串转二进制字符
export function textToArrayBuffer(str) {
    var len, c;
    len = str.length;
    var bytes = [];
    for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}
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