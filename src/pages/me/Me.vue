<template>
  <div class="page">
    <div class="userinfo-box" @click='login'>
      <img class="avatar-img" :src="userinfo.avatarUrl" alt="">
      <p class="username">{{userinfo.nickName}}</p>
    </div>
    <div class="divide-line-horizon"></div>
    <div class="note-box">
      <text class="note-number">30</text>
      <text class="note-text">全部笔记</text>
    </div>
    <div class="divide-line-horizon"></div>
  </div>
</template>
<script>
  import { showSuccess, post, showModal } from "@/util";

  export default {
    mounted() {
      //
    },
    components: {
    },
    data() {
      return {
        userinfo: {
          avatarUrl: "../../../static/img/unlogin.png",
          nickName: "点击登录"
        }
      };
    },
    methods: {
      login() {
        console.log("method login res");
        wx.login({
          success(res) {
            console.log("method login res" + res.code);
          }
        });
      }
    },
    onShow() {
      let userinfo = wx.getStorageSync("userinfo");
      console.log([userinfo]);
      if (userinfo) {
        this.userinfo = userinfo;
      }
    }
  };
</script>

<style lang='scss'>
  .page {
    position: absolute;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(220, 218, 255, 1);
  }

  .userinfo-box {
    position: relative;
    margin-top: 30px;
    height: 150px;
    width: 100%;
  }

  .avatar-img {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .username {
    position: absolute;
    bottom: 0px;
    width: 100px;
    height: 20px;
    margin-bottom: 10px;
    display: inline-block;
    color: rgba(51, 51, 51, 1);
    font-size: 14px;
    text-align: center;
    left: 50%;
    transform: translate(-50%, 0);
    font-family: PingFangSC-regular;
  }

  .note-box {
    position: relative;
    width: 100%;
    height: 70px;
    margin-left: 20px;
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .note-number {
    position: relative;
    left:16px;
    top: 0px;
    width: 64px;
    height: 32px;
    font-size: 16px;
    text-align: center;
    font-family: PingFangSC-regular;
    background-color: rgba(220, 218, 255, 1);
    transform: translate(-50%, 0);
  }

  .note-text {
    position: absolute;
    bottom: 0px;
    left: 0px;
    float: bottom;
    width: 64px;
    height: 32px;
    display: inline-block;
    font-size: 16px;
    text-align: center;
    color: rgba(16, 16, 16, 1);
    font-family: PingFangSC-regular;
    background-color: rgba(220, 218, 255, 1);
  }
  .divide-line-horizon{
    width: 96%;
    height: 2px;
    background: black;
    margin-left: 2%;
  }
</style>
