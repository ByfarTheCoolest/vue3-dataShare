import axios from "axios";
import { Message, Loading } from "element-ui";
// let ConfigBaseUrl = "http://127.0.0.1:8080/";
let ConfigBaseUrl = "/";
let loadingInstance = null;
export let Service = axios.create({
    timeout: 5000,
    baseURL: ConfigBaseUrl,
    withCredentials: true,
    method: "post",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

// 请求拦截器
Service.interceptors.request.use(config => {
    loadingInstance = Loading.service({
        lock: true,
        text: "loading..."
    })
    config.url = encodeURI(config.url);
    return config;
}, error => {
    Message.error({
        message: "加载超时"
    })
    return Promise.reject(error)
})



// 响应拦截器
Service.interceptors.response.use(response => {
    loadingInstance.close();
    return response;
}, error => {
    console.log("TCL--ERROR", error);
    let msg = error.Message !== undefined ? error.Message : "";
    Message({
        message: "网络错误" + msg,
        type: "error",
        duration: 3 * 1000
    })
    loadingInstance.close();
    return Promise.reject(error)
})


