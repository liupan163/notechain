<template>
  <div class="page">
    <view v-for="item in noteList" :key="item" class='list-item' v-show="noteList.length>0"
          @click="compileDetail(item)">
      <view class='list-title'>{{item.title}}</view>
      <view class="list-date">{{item.timestamp}}</view>
    </view>
  </div>
</template>
<script>
  import config from "@/config";
  import ListView from "@/components/ListView";

  export default {
    components: {
      ListView
    },
    data() {
      return {
        noteList: []
      };
    },
    methods: {
      compileDetail(item) {
        wx.navigateTo({
          url: "../details/main?title=" + item.title + "&content=" + item.content + "&txhash=" + item.txhash
          + "&hdaddr=" + item.hdaddr + "&nickname=" + item.nickname + "&timestamp=" + item.timestamp
        });
      }
    },
    mounted() {
      wx.request({
        url: config.host + "/getList",
        data: {
          nickName: config.userinfo.nickName
        },
        success: (res) => {
          res.data.forEach((x) => {
            x.timestamp = new Date(parseInt(x.timestamp)).toLocaleString().replace(/:\d{1,2}$/, ' ');
          });
          this.noteList = res.data;
          console.log("this.res.data=>", res.data);
        }
      });
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
    padding-top: 15px;
  }

  .list-item {
    position: relative;
    width: 92%;
    height: 45px;
    margin-left: 4%;
    margin-right: 4%;
    border-radius: 3px;
    margin-top: 6px;
    background: aliceblue;
  }

  .list-title {
    position: absolute;
    left: 0px;
    width: 60%;
    height: 45px;
    line-height: 45px;
    color: rgba(45, 45, 45, 1);
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 10px;
    font-size: 16px;
    font-family: PingFangSC-regular;
  }

  .list-date {
    position: absolute;
    right: 0px;
    width: 30%;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    vertical-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(172, 172, 172, 1);
    padding-right: 10px;
    text-align: left;
    font-family: PingFangSC-regular;
  }
</style>
