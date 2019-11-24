// node引入包名
const iot = require('alibabacloud-iot-device-sdk');
//创建iot.device对象将会发起到阿里云IoT的连接
const device = iot.device({
    productKey: 'a1yqj8hd3x6', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'ledxx',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'aSLQlSkKnLvh7EyQZgszPjA8soY2zftm',//将<deviceSecret>修改为实际设备的DeviceSecret
});

const fan = iot.device({
    productKey: 'a1VypKgZ5A3', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'fan1',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'cxuO3xRXxiQpTJ6FqC05Y1CJyHl7dOCJ',//将<deviceSecret>修改为实际设备的DeviceSecret
});

//监听connect事件
device.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device.subscribe('/a1yqj8hd3x6/ledxx/get');
    console.log('connect successfully!');
    device.publish('/a1yqj8hd3x6/ledxx/update', 'hello world!');
});
//监听message事件
device.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});

//监听connect事件
fan.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    fan.subscribe('/a1VypKgZ5A3/fan1/get');
    console.log('connect successfully!');
    fan.publish('/a1VypKgZ5A3/fan1/update', 'hello world!');
});
//监听message事件
fan.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});

var lightState = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
device.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'LightStatus') { //LightStatus
            console.log('set property ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            lightState = cmd.params.LightStatus;
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            device.postProps({ 'LightStatus': lightState });
        }
    }
});

const express = require('express');
const app = express();
app.put('/led/:id/:status', function (req, res) {
    const id = req.params["id"];
    const status = req.params["status"];

    // 上报设备属性
    device.postProps({
        LightStatus: status === "0" ? 0 : 1
    }, (res) => {
        console.log(res);
    });

    // 从阿里云拿到的数据下发给设备
    res.send(JSON.stringify({
        id: id,
        status: lightState
    }));
});

var fanState = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
fan.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'PowerSwitch') { //LightStatus
            console.log('set property ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            fanState = cmd.params.PowerSwitch;
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            device.postProps({ 'PowerSwitch': fanState });
        }
    }
});

app.put('/fan/:id/:status', function (req, res) {
    const id = req.params["id"];
    const status = req.params["status"];

    // 上报设备属性
    fan.postProps({
        PowerSwitch: status === "0" ? 0 : 1
    }, (res) => {
        console.log(res);
    });

    // 从阿里云拿到的数据下发给设备
    res.send(JSON.stringify({
        id: id,
        status: fanState
    }));
});

app.listen(3000,
    () => console.log('Start server at 3000!'));