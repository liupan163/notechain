<template>
  <div class='page'>
    <view class="container">
      <view class="userinfo">
        <block wx:if="{{!hasUserInfo && canIUse}}" class='show-author'>
          <button open-type="getUserInfo" class='show-author' bindgetuserinfo="getUserInfo">
            <!--随意定制 -->
            <view class='get-userinfo'>获取用户信息</view>
          </button>
        </block>
        <block wx:else>
          <image bindtap="bindViewTap" class="userinfo-avatar" src="{{userInfo.avatarUrl}}" mode="cover"></image>
          <text class="userinfo-nickname">{{userInfo.nickName}}</text>
        </block>
      </view>
    </view>

  </div>
</template>

<script>

  export default {
    components: {
      Rate
    },
    props: ["info"],
    computed: {
      userinfo() {
        return this.info.user_info || {};
      }
    },
    methods: {
      // 登录
      wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorageSync("code", res.code);
        console.log(wx.getStorageSync("code"));
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting["scope.userInfo"]) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo;

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res);
                  }
                }
              });
            } else {

            }
          }
        });
      }
    })
  };
</script>

<style lang='scss'>
  .show-author {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: #000;
    opacity: 0.8;
  }

  .get-userinfo {
    color: #fff;
    background-color: #f00;
    border-radius: 15px;
    top: 50%;
    margin-top: 70%;
  }
</style>


