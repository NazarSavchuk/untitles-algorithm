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
  return fromMobileToUser(users, mobileDevices, iotDevices);
  // expected time complexity O(n, m, c) = n * m + m * c + n
  //----------------------------------------------------

  // return firstIdea (users, mobileDevices, iotDevices)

  // array with count of iotDevices of every unique user
  // expected time complexity O(n, m, c) = n * m * c    **bad choice**
}

function fromMobileToUser(users, mobileDevices, iotDevices) {
  const mobileDeviceCount = fromIotToMobile(mobileDevices, iotDevices);

  function fromIotToMobile(mobileDevices, iotDevices) {
    const mobileDeviceCount = Array(mobileDevices.length).fill(0);

    for (let i = mobileDevices.length; i > 0; i--) {
      for (let j = iotDevices.length; j > 0; j--) {
        if (mobileDevices[i - 1].id === iotDevices[j - 1].mobile) {
          mobileDeviceCount[i - 1]++;
          iotDevices.splice(j - 1, 1);
        }
      }
    }

    return mobileDeviceCount;
  }

  const usersResult = users.map((user) => user.name.split(" ")[0]);
  const result = Array(users.length).fill(0);

  for (let i = users.length; i > 0; i--) {
    for (let j = mobileDevices.length; j > 0; j--) {
      if (users[i - 1].id === mobileDevices[j - 1].user) {
        result[i - 1] = result[i - 1] + mobileDeviceCount[j - 1];
        mobileDevices.splice(j - 1, 1);
        mobileDeviceCount.splice(j - 1, 1);
      }
    }
    result[i - 1] = {
      user: usersResult[i - 1],
      devices: result[i - 1],
    };
  }

  function findDuplicates(result) {
    for (let i = 0; i < result.length; i++) {
      //find duplicates in users
      const tempIndex = result.findIndex(
        (user) => user.user === result[i].user
      );
      if (tempIndex !== i) {
        result[tempIndex].devices += result[i].devices;
        result.splice(i, 1);
        i--;
      }
    }
    return result.map((user) => {
      return `${user.user} => ${user.devices}`;
    });
  }

  return findDuplicates(result);
}

function firstIdea(users, mobileDevices, iotDevices) {
  const resU = Array(users.length).fill(0);
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < mobileDevices.length; j++) {
      for (let k = 0; k < iotDevices.length; k++) {
        if (
          users[i].id === mobileDevices[j].user &&
          mobileDevices[j].id === iotDevices[k].mobile
        ) {
          resU[i]++;
        }
      }
    }
  }
  return resU;
}
