<template>
  <div class="listwrapper">
    <span class="list-group-title">我是listview占位符</span>
    <ul class="list-group-ul">
      <li v-for="group in data" class="list-group-li" ref="listGroup" :key="group" @click="selectItem(item)">
        <img class="avatar">
        <span class="textspan"> 测试下文本位置内容{{group}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  const TITLE_HEIGHT = 30;
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {},
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1,
        group: []
      };
    },
    created() {
      this.touch = {};
      this.listHeight = [];
    },
    methods: {
      selectItem(item) {
        this.$emit("select", item);
      },
      refresh() {
        this.$refs.listview.refresh();
      },
      scroll(pos) {
        this.scrollY = pos.y;
      },
      _calculateHeight() {
        this.listHeight = [];
        const list = this.$refs.listGroup;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight();
        }, 20);
      },
      scrollY(newY) {
        const listHeight = this.listHeight;
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0;
          return;
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i];
          let height2 = listHeight[i + 1];
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i;
            this.diff = height2 + newY;
            return;
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2;
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
        if (this.fixedTop === fixedTop) {
          return;
        }
        this.fixedTop = fixedTop;
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
      }
    },
    components: {}
  };
</script>

<style lang='scss'>
  .listwrapper {
    position: relative;
    background-color: #F0F0F0;
    border-radius: 1px;
    .list-group-title {
      position: relative;
      margin-left: 15rpx;
      display: inline-block;
      padding-left: 15rpx;
      width: 750rpx;
      text-align: center;
    }
    .list-group-ul {
      position: relative;
      margin-top: 8rpx;
      .list-group-li {
        margin-left: 15rpx;
        margin-right: 15rpx;
        margin-top: 2rpx;
        border-radius: 1%;
        background-color: bisque;
        width: 720rpx;
        height: 80rpx;
        .avatar {
          width: 50rpx;
          height: 50rpx;
          background: center url("../../static/img/me-active.png") no-repeat ;
          margin-top: 40rpx;
          transform: translateY(-50%);
        }
        .textspan {
          display: inline-block;
          height: 80rpx;
          margin-top: 40rpx;
          margin-left: 15rpx;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>
