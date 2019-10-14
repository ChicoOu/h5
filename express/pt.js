var ledStatus = 0;
function setup() {
    pinMode(0, OUTPUT);
}
function loop() {
    Serial.println(ledStatus);
    RealHTTPClient.put('http://127.0.0.1:3000/led/001/'
        + ledStatus, {}, function (status, data) {
            Serial.println(data);
            if (data) {
                var ledObj = JSON.parse(data);
                if (ledObj.status === 1) {
                    digitalWrite(0, HIGH);
                    ledStatus = 1;
                } else {
                    digitalWrite(0, LOW);
                    ledStatus = 0;
                }
            }
        });

    delay(1000);
}
