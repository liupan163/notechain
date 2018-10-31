<template>
  <div class="mepagewrap">
    <div class="userinfo" @click='login'>
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <div class="mottowrap">
      <span>瞎写点啥motto占坑</span>
    </div>
    <button class="newflagbtn" @click="addnewFlag">newflag</button>
    <span>flag</span>
    <div class="listviewwrap">
      <list-view :data="fakeListData"></list-view>
    </div>
    <span>task</span>
    <div class="listviewwrap">
      <list-view :data="fakeListData"></list-view>
    </div>
  </div>
</template>
<script>
  import qcloud from "wafer2-client-sdk";
  import YearProgress from "@/components/YearProgress";
  import { showSuccess, post, showModal } from "@/util";
  import config from "@/config";
  import ListView from "@/components/ListView";

  export default {
    mounted(){
      //
    },
    components: {
      YearProgress,
      ListView
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
      login(){
        console.log("method login res");
        wx.login({
          success(res){
            console.log("method login res"+res);
          }
        })
      }
    },
    onShow() {
      let userinfo = wx.getStorageSync("userinfo");
      console.log([userinfo])
      if (userinfo) {
        this.userinfo = userinfo;
      }
    }
  };
</script>

<style lang='scss'>
  .mepagewrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 750rpx;
    .userinfo {
      position: relative;
      margin-top: 10rpx;
      text-align: center;
      height: 280rpx;
      width: 720rpx;
      background-color: bisque;
      img {
        width: 150rpx;
        height: 150rpx;
        margin: 20rpx;
        border-radius: 50%;
      }
    }
    .mottowrap {
      position: relative;
      width: 750rpx;
      margin-left: 15rpx;
      margin-top: 10rpx;
      height: 50rpx;
    }
    .newflagbtn {
      position: relative;
      margin-right: 10rpx;
      margin-top: 10rpx;
      box-shadow: 0rpx 2rpx 5rpx 5rpx black;
    }
    .listviewwrap {
      position: relative;
      margin-top: 10rpx;
      width: 750rpx;
      height: 300rpx;
    }
  }
</style>
