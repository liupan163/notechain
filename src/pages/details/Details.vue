<template>
  <div class='page'>
    <view class='form-box'>
      <form bindsubmit="submit">
        <text type="default" class='title_title' @click='showListBtnClick'>标题</text>
        <input class='title_input' placeholder="请输入标题" v-model="title"/>
        <text type="default" class='content_title' @click='showListBtnClick'>内容</text>
        <textarea class='content_input' placeholder="请输入内容" v-model="content"/>
        <text class='txhash_title'>链记录hash</text>
        <text class='txhash_content' @touchstart.native="copyhash" @touchstart="copyhash">{{txhash}}</text>
        <button class='form-button' @click="submit"> 确认修改</button>
        <div class="btn-group">
          <button class="btn-share">分享</button>
          <button class="btn-compile">编辑</button>
        </div>
      </form>
    </view>
  </div>
</template>

<script>
  import config from "@/config";

  export default {
    onLoad(option) {
      console.log("details=" + option.title + option.content + option.txhash + option.hdaddr + option.nickname + option.timestamp);
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
    computed: {},
    methods: {
      submit() {
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
      },
      copyhash() {
        console.log("check onlongclick event");
        wx.setClipboardData({
          data: this.txhash,
          success(res) {
            wx.getClipboardData({
              success(res) {
                console.log(res.data); // data
              }
            });
          }
        });
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
  .page {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 375px;
    height: 667px;
    background-color: rgba(220, 218, 255, 1);
  }

  .title_title {
    font-size: 16px;
    margin-top: 11px;
  }

  .title_input {
    width: 100%;
    border: 1px solid #1571FA;
    height: 42px;
    border-radius: 2px;
    line-height: 42px;
    color: rgba(136, 136, 136, 1);
    font-size: 14px;
    text-align: left;
    margin-top: 4px;
    background: aliceblue;
    border: 1px solid rgba(255, 255, 255, 0);
    font-family: Microsoft Yahei;
  }

  .form-box {
    width: 92%;
    margin-left: 4%;
    margin-right: 4%;
  }

  .content_title {
    margin-top: 21px;
    font-size: 16px;
  }

  .content_input {
    position: relative;
    width: 100%;
    border: 1px solid #1571FA;
    height: 343px;
    margin-top: 4px;
    border-radius: 2px;
    background: aliceblue;
    color: rgba(136, 136, 136, 1);
    font-size: 14px;
    text-align: left;
    font-family: PingFangSC-regular;
    padding: 3px 0px 0px 3px;
    maxlength: -1;
  }

  .txhash_title {
    position: relative;
    width: 99px;
    height: 22px;
    margin-top: 21px;
    color: rgba(16, 16, 16, 1);
    font-size: 16px;
    text-align: left;
    font-family: PingFangSC-regular;
  }

  .txhash_content {
    position: relative;
    width: 100px;
    height: 6px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: left;
    font-family: PingFangSC-regular;
  }

  .form-button {
    position: relative;
    margin-top: 12px;
    height: 40px;
    background-color: #1571FA;
    width: 92%;
    background-color: rgba(191, 191, 191, 1);
    border: 1px solid rgba(255, 255, 255, 0);
    text-align: center;
    font-family: Microsoft Yahei;
    border-radius: 4px;
    color: rgba(0, 0, 0, 1);
    font-size: 18px;
    display: none;
  }

  .btn-group {
    display: flex;
    flex: 1;
    height: 40px;
    margin-top: 12px;
  }

  .btn-share {
    float: left;
    width: 40%;
    text-align: center;
    border-radius: 4px 4px 4px 4px;
    background-color: rgba(134, 68, 255, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 18px;
    box-shadow: 0px 0px 0px 0px rgba(67, 53, 134, 1);
    font-family: Microsoft Yahei;
    border: 1px solid rgba(255, 255, 255, 0);
  }

  .btn-compile {
    float: right;
    width: 40%;
    text-align: center;
    border-radius: 4px 4px 4px 4px;
    background-color: rgba(134, 68, 255, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 18px;
    box-shadow: 0px 0px 0px 0px rgba(67, 53, 134, 1);
    font-family: Microsoft Yahei;
    border: 1px solid rgba(255, 255, 255, 0);
  }
</style>

