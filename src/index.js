const fs = require("fs");
const path = require("path");

(function init() {
  const users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/users.json"), "utf-8")
  );
  const mobileDevices = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../data/mobile_devices.json"),
      "utf-8"
    )
  );
  const iotDevices = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../data/iot_devices.json"),
      "utf-8"
    )
  );

  console.log(new Date().toISOString());
  console.log(count(users, mobileDevices, iotDevices));
  console.log(new Date().toISOString());
})();

function count(users, mobileDevices, iotDevices) {
  const mobileDeviceCount = fromIotToMobile(mobileDevices, iotDevices);
  return fromMobileToUser(users, mobileDevices, mobileDeviceCount);
}

function fromMobileToUser(users, mobileDevices, mobileDeviceCount) {
  let result = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < mobileDevices.length; j++) {
      if (mobileDevices[j].user === users[i].id) {
        console.log("");
      }
    }
  }
}

function fromIotToMobile(mobileDevices, iotDevices) {
  const mobileDeviceCount = Array(mobileDevices.length).fill(0);

  for (let i = 0; i < mobileDevices.length; i++) {
    for (let j = 0; j < iotDevices.length + 2; j++) {
      if (mobileDevices[i].id === iotDevices[0].mobile) {
        mobileDeviceCount[i]++;
        iotDevices.shift();
      }
    }
  }

  return mobileDeviceCount;
}
