<template>
  <div>
    <div class="page">
      <button class='new_button' @click='addBtnClick'>新增内容</button>
      <view type="default" class='show_list_title' @click='showListBtnClick'>全部记录>></view>
      <view v-for="item in noteList" :key="item" class='list-item' v-show="noteList.length>0"
            @click="compileDetail(item)">
        <view class='list-title'>{{item.title}}</view>
        <view class="list-date">{{item.timestamp}}</view>
      </view>
    </div>
  </div>
</template>
<script>
  import config from "@/config";

  const app = getApp();

  export default {
    data() {
      return {
        userinfo: {},
        bookid: "",
        info: {},
        comment: "",
        location: "",
        phone: "",
        noteList: []
      };
    },
    computed: {},
    methods: {
      getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        });
      },
      addBtnClick: function() { // 新增内容
        wx.navigateTo({
          url: "../newnote/main"
        });
      },

      showListBtnClick: function() { // 列表
        wx.navigateTo({
          url: "../list/main"
        });
      }
    },
    mounted() {
      //   if (app.globalData.userInfo) {
      //     this.setData({
      //       userInfo: app.globalData.userInfo,
      //       hasUserInfo: true
      //     })
      //   } else if (this.data.canIUse) {
      //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //     // 所以此处加入 callback 以防止这种情况
      //     app.userInfoReadyCallback = res => {
      //       this.setData({
      //         userInfo: res.userInfo,
      //         hasUserInfo: true
      //       })
      //     }
      //   } else {
      //     // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.login({
        success: res => {
          console.log("res.code",res.code)
        }
      });
      wx.getUserInfo({
        success: res => {
          //app.globalData.userInfo = res.userInfo
          console.log("wx.getUserInfo res=", res);
          const userInfo = res.userInfo;
          console.log("wx.getUserInfo", userInfo);
          console.log("nickName ", userInfo.nickName);
          config.userinfo.nickName = res.userInfo.nickName;
          config.userinfo.hasUserInfo = true;
        }
      });
      console.log(" config.userinfo.nickName=>" + config.userinfo.nickName + config.userinfo.hasUserInfo);
      wx.request({
        url: config.host + "/getList",
        data: {
          nickName: config.userInfo.nickName
        },
        success: (res) => {
          res.data.forEach((x) => {
            x.timestamp = new Date(parseInt(x.timestamp)).toLocaleString().replace(/:\d{1,2}$/, " ");
          });
          this.noteList = res.data;
          //console.log("this.res.getList data=>", res.data);
        }
      });
      //   }
    }
  };
</script>
<style lang='scss'>
  .page {
    height: 100%;
    position: absolute;
    width: 100%;
    background-color: rgba(220, 218, 255, 1);
  }

  .new_button {
    position: relative;
    width: 61.8%;
    color: white;
    text-align: center;
    margin-top: 50px;
    height: 100px;
    line-height: 100px;
    border-radius: 4px 4px 4px 4px;
    background-color: rgba(166, 84, 251, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 24px;
    font-family: Arial;
    border: 1px solid rgba(255, 255, 255, 0);
  }

  .show_list_title {
    position: relative;
    margin-right: 13px;
    float: right;
    margin-top: 35px;
    color: rgba(102, 102, 102, 1);
    font-size: 14px;
    text-align: left;
    font-family: PingFangSC-regular;
  }

  .list-item {
    position: relative;
    width: 96%;
    height: 100px;
    margin-left: 2%;
    margin-right: 1%;
    border-radius: 10 rpx;
    overflow: hidden;
    margin-top: 5px;
  }

  .list_content {
    width: 30%;

  }
</style>
