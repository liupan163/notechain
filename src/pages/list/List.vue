<template>
  <div class="mepagewrap">
    <view class='page'>
      <view v-for="item in noteList" :key="item" class='list-item' v-show="noteList.length>0">
        <view class='list-content' @click='viewStateClick'>{{item.title}}</view>
        <view class="list-btn">{{item.content}}</view>
        <button class="list-btn" @click='compileDetail(item)'>编辑</button>
      </view>
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
        noteList: ["123", "321"]
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
          this.noteList = res.data;
          console.log("this.res.data=>", res.data);
        }
      });
    }
  };
</script>

<style lang='scss'>
  .list-item {
    width: 96%;
    margin-left: 2%;
    background-color: yellowgreen;
    border-radius: 10 rpx;
    overflow: hidden;
    margin-top: 10 rpx;
  }

  .list-name {
    width: 80%;
    height: 80 rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 80 rpx;
    float: left;
  }

  .list-content {
    width: 20%;
    height: 80 rpx;
    line-height: 80 rpx;
    float: left;
    background-color: yellowgreen;
    color: white;
    text-align: center;
  }

  .list-btn {
    width: 4%;
    height: 80 rpx;
  }
</style>
