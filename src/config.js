// 配置项

const host = "http://localhost:3000"; // 本地环境
// const host = "https://bbkp3fin.qcloud.la"; // 测试环境

const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`,
  userinfo: {
    nickName: " ",
    hasUserInfo: false
  }
};
export default config;
