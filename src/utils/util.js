import config from "../config";
import { showModal } from "../util";

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join("/") + " " + [hour, minute, second].map(formatNumber).join(":");
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

module.exports = {
  formatTime: formatTime
};


export function get(url, data) {
  return request(url, "get", data);
}
export function post(url, data) {
  return request(url, "post", data);
}
function request(url, method, data, header = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,
      url: config.host + url,
      success: function(res) {
        if (res.data.code === 0) {
          resolve(res.data.data);
        } else {
          showModal("失败", res.data.data.msg);
          reject(res.data);
        }
      }
    });
  });
}

export function showModel(title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  });
}

export function showSuccess(text) {
  wx.showModal({
    title: text,
    icon: "success"
  });
}
