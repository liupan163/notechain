<template>
  <div class="page">
      <button type="default" class='page_button new_note' @click='addBtnClick'>新增内容</button>
      <button type="default" class='page_button show_list' @click='showListBtnClick'>查看列表</button>
  </div>
</template>
<script>
  import config from "@/config";

  const app = getApp();

  export default {
    data() {
      return {
        comments: [],
        userinfo: {},
        bookid: "",
        info: {},
        comment: "",
        location: "",
        phone: ""
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
      wx.getUserInfo({
        success: res => {
          //app.globalData.userInfo = res.userInfo
          const userInfo = res.userInfo;
          console.log("wx.getUserInfo", userInfo);
          console.log("nickName ", userInfo.nickName );
          console.log("avatarUrl ", userInfo.avatarUrl);
          console.log("gender ",userInfo.gender);
          console.log("province ", userInfo.province);
          console.log("city",userInfo.city);
          console.log("country ", userInfo.country);
          config.userinfo.nickName = res.userInfo.nickName;
          config.userinfo.hasUserInfo = true;
          // this.setData({
          //   userInfo: res.userInfo,
          //   hasUserInfo: true
          // })
        }
      });
      //   }
    }
  };
</script>
<style lang='scss'>
  .page{
    background-color: #1571FA;
    height: 100%;
  }
  .page_button {
    width: 98%;
    margin-left: 1%;
    margin-top: 30 rpx;
    background-color: #1571FA;
    color: white;
    height: 150rpx;
    text-align: center;
    line-height: 150rpx;
    border-radius: 30rpx;
  }

  .new_note {
    background-color: green;
  }

  .show_list {
    background-color: yellowgreen;
  }
</style>
