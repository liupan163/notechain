<template>
  <div class='page'>
    <view class='form-box'>
      <form bindsubmit="submit">
        <view type="default" class='title_title' @click='showListBtnClick'>标题</view>
        <input class='title_input' placeholder="请输入标题" v-model="title"/>
        <view type="default" class='content_title' @click='showListBtnClick'>内容</view>
        <textarea class='content_input' placeholder="请输入内容" v-model="content"/>
        <button class='form-button' @click="submit"> 确认添加 </button>
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
  .page {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 375px;
    height: 667px;
    background-color: rgba(220, 218, 255, 1);
  }
  .title_title{
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

  .content_title{
    margin-top:21px;
    font-size: 16px;
  }

  .content_input {
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
    padding:3px 0px 0px 3px;
    maxlength: -1;
  }

  .form-button {
    margin-top: 42px;
    height: 40px;
    background-color: #1571FA;
    color: white;
    box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.1);
    line-height:40px;
    position: absolute;
    width: 92%;
    background-color: rgba(191, 191, 191, 1);
    border: 1px solid rgba(255, 255, 255, 0);
    text-align: center;
    font-family: Microsoft Yahei;
    border-radius: 4px;
    color: rgba(0, 0, 0, 1);
    font-size: 18px;
  }
</style>

