// node引入包名
const iot = require('alibabacloud-iot-device-sdk');
//创建iot.device对象将会发起到阿里云IoT的连接
const device = iot.device({
    productKey: 'a19zk4BbfiH', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'led1',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'cMSYA6KVGB94ZtK5g4v2qA74QV2XB1HP',//将<deviceSecret>修改为实际设备的DeviceSecret
});
//监听connect事件
device.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device.subscribe('/a19zk4BbfiH/led1/user/get');
    console.log('connect successfully!');
    device.publish('/a19zk4BbfiH/led1/user/update', '12345');
});

//监听message事件
device.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});

// 上报设备属性
device.postProps({
    LightStatus: 0 // LightSwitch
}, (res) => {
    console.log(res);
});

// 监听云端设置属性服务消息，示例代码为一个灯
device.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'LightStatus') { //判断是否设置的是LightSwitch属性
            console.log('set property ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            lightState = cmd.params.LightStatus;
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            device.postProps({ 'LightStatus': lightState });
        }
    }
});

const tags = [
    {
        "attrKey": "RoomId",
        "attrValue": "602"
    }
]
device.postTags(
    tags,
    (res) => {
        console.log(`add tag ok res:${res.id}`);
        done()
    }
);
