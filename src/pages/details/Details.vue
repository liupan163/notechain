<template>
  <div>
    <view class='page'>
      <view class='form-box'>
        <form bindsubmit="submit">
          <input class='title-input' name="title" v-model="title"/>
          <textarea class='content-input' v-model='content'/>
          <button class='form-button' @click="submit">修 改</button>
        </form>
      </view>
    </view>
  </div>
</template>
<script>
  import config from "@/config";

  export default {
    onLoad(option){
      console.log("details="+option.title+option.content+option.txhash+option.hdaddr+option.nickname+option.timestamp);
      this.title = option.title;
      this.content = option.content;
      this.txhash = option.txhash;
      this.hdaddr = option.hdaddr;
      this.nickname = option.nickname;
      this.timestamp = option.timestamp;
    },
    components: {},
    data() {
      return {
        title: "",
        content: "",
        txhash: "",
        hdaddr: "",
        nickname: "",
        timestamp: ""
      };
    },
    computed: {

    },
    methods: {
      submit(){
        if (this.content.length === 0 || this.title.length === 0) {
          console.log("it is failure" + this.content);
        } else {
          wx.request({
            url: config.host + "/updateNote",
            data: {
              title: this.title,
              content: this.content,
              txhash: this.txhash,
              hdaddr: this.hdaddr,
              nickname: this.nickname,
              timestamp: this.timestamp
            },
            success: (res) => {
              console.log("updateNote is ok,this is callback msg!~~" + res.statusCode);
              if (res.statusCode === 200) {
                wx.showModal({
                  title: "提示",
                  content: "更新成功！是否选择查看列表？",
                  success: function(res) {
                    wx.redirectTo({
                      url: "../list/main"
                    });
                  }
                });
              } else {
                wx.showModal({
                  title: "提示",
                  content: "添加失败",
                  success: function(res) {
                    wx.redirectTo({
                      url: "../list/main"
                    });
                  }
                });
              }
            }
          });
        }
      }
    },
    mounted() {
      const userinfo = wx.getStorageSync("userinfo");
      console.log("userinfo", userinfo);
      if (userinfo) {
        this.userinfo = userinfo;
      }
    }
  };
</script>
<style lang='scss'>
  .title-input {
    width: 100%;
    border: 1px solid #1571FA;
    height: 90 rpx;
    border-radius: 10 rpx;
    box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.1);
    font-size: 35 rpx;
    line-height: 90 rpx;
  }

  .form-button {
    margin-top: 23rpx;
    height: 90rpx;
    background-color: #1571FA;
    color: white;
    box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.1);
    font-size: 35rpx;
    line-height: 90rpx;
    position: absolute;
    bottom: 20rpx;
    width: 94%;
  }

  .form-box {
    margin-top: 30rpx;
    width: 94%;
    margin-left: 3%;
  }

  .content-input {
    border: 1px solid #1571FA;
    width: 100%;
    height: 800rpx;
    margin-top: 20rpx;
    border-radius: 6rpx;
  }
</style>

