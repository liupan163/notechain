<template>
  <div class='page'>
    <view class='form-box'>
      <form bindsubmit="submit">
        <input class='title-input' placeholder="请输入标题" v-model="title"/>
        <textarea class='content-input' placeholder="请输入内容" v-model="content"/>
        <button class='form-button' @click="submit"> 提 交</button>
      </form>
    </view>
  </div>

</template>
<script>
  import config from "@/config";

  export default {
    components: {},
    data() {
      return {
        title: "",
        content: ""
      };
    },
    computed: {},
    methods: {
      submit() {
        if (this.content.length === 0 || this.title.length === 0) {
          console.log("it is failure" + this.content);
        } else {
          wx.request({
            url: config.host + "/addNote",
            data: {
              title: this.title,
              content: this.content,
              nickName: config.userinfo.nickName
            },
            success: (res) => {
              console.log("addNote is ok,this is callback msg!~~" + res.statusCode);
              if (res.statusCode === 200) {
                wx.showModal({
                  title: "提示",
                  content: "添加成功！是否选择查看列表？",
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
    margin-top: 23 rpx;
    height: 90 rpx;
    background-color: #1571FA;
    color: white;
    box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.1);
    font-size: 35 rpx;
    line-height: 90 rpx;
    position: absolute;
    bottom: 20 rpx;
    width: 94%;
  }

  .form-box {
    margin-top: 30 rpx;
    width: 94%;
    margin-left: 3%;
  }

  .content-input {
    border: 1px solid #1571FA;
    width: 100%;
    height: 800 rpx;
    margin-top: 20 rpx;
    border-radius: 6 rpx;
  }

</style>

