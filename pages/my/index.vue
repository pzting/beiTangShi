<template>
  <view class="my">
    <view :class="{show:isSetDifficulty}" class="difficultyMask">
      <view class="box">
        <view class="title">难度选择</view>
        <u-subsection :current="curNow" :list="difficultyArr" @change="sectionChange"></u-subsection>
        <view v-if="curNow===0">
          <u-cell :value="(difficultyArr[curNow].time/1000)+'s'" title="倒计时"></u-cell>
          <u-cell :value="difficultyArr[curNow].isTitle?'默认显示':'点击查看'" title="标题"></u-cell>
          <u-cell :value="difficultyArr[curNow].isAuthor?'默认显示':'点击查看' " title="作者"></u-cell>
        </view>
        <view v-if="curNow===1">
          <u-cell :value="(difficultyArr[curNow].time/1000)+'s'" title="倒计时"></u-cell>
          <u-cell :value="difficultyArr[curNow].isTitle?'默认显示':'点击查看'" title="标题"></u-cell>
          <u-cell :value="difficultyArr[curNow].isAuthor?'默认显示':'点击查看' " title="作者"></u-cell>
        </view>
        <view v-if="curNow===2">
          <u-cell :value="(difficultyArr[curNow].time/1000)+'s'" title="倒计时"></u-cell>
          <u-cell :value="difficultyArr[curNow].isTitleHide?'不可查看':difficultyArr[curNow].isTitle?'默认显示':'点击查看'"
                  title="标题"></u-cell>
          <u-cell :value="difficultyArr[curNow].isAuthor?'不可查看':difficultyArr[curNow].isAuthor?'默认显示':'点击查看' "
                  title="作者"></u-cell>
        </view>
        <view v-if="curNow===3">
          <u-cell :value="(difficultyArr[curNow].time/1000)+'s'" title="倒计时"></u-cell>
          <u-cell :value="difficultyArr[curNow].isTitleHide?'不可查看':difficultyArr[curNow].isTitle?'默认显示':'点击查看'"
                  title="标题"></u-cell>
          <u-cell :value="difficultyArr[curNow].isAuthorHide?'不可查看':difficultyArr[curNow].isAuthor?'默认显示':'点击查看' "
                  title="作者"></u-cell>
        </view>
        <view class="btns">
          <u-button class="btn" customStyle="width:250rpx" plain text="取消" type="error"
                    @click="isSetDifficulty=false"></u-button>
          <u-button class="btn" customStyle="width:250rpx" plain type="primary" @click="setDifficulty">保存</u-button>
        </view>
      </view>
    </view>
    <view class="title">{{ rankingData.name }}</view>
    <view class="card">
      <view class="item">背诵数
        <text>{{ dataResult.write }}</text>
      </view>
      <view class="item">成功数
        <text>{{ dataResult.success }}</text>
      </view>
      <view class="item">失败数
        <text>{{ dataResult.error }}</text>
      </view>
    </view>
    <view class="list">
      <u-cell-group>
        <u-cell :value="winRate+'%'" title="胜率"></u-cell>
        <u-cell :isLink="true" :value="difficulty.name" title="难度" @click="isSetDifficulty=true">
          <text
              slot="value"
              :class="{
            type0:difficulty.curNow===0,
            type1:difficulty.curNow===1,
            type2:difficulty.curNow===2,
            type3:difficulty.curNow===3,
              }"
              class="u-slot-value-difficulty"
          >{{ difficulty.name }}
          </text>
        </u-cell>
        <u-cell :isLink="true" clickable title="数据" value="清空" @click="showClear = true"></u-cell>
        <u-cell :isLink="true" clickable title="唐诗" url="/pages/poemList/index" value="查看"></u-cell>
      </u-cell-group>
    </view>


    <u-modal :show="showClear" content="真的要清空所有数据吗?" showCancelButton title="提示" @cancel="showClear = false"
             @confirm="clear">
    </u-modal>
  </view>
</template>

<script>
import {
  Data
} from "./data.js"

export default {
  components: {},
  data() {
    return {
      isSetDifficulty: false,
      showClear: false,
      winRate: '暂无',
      Data,
      key: 'value',
      curNow: 0,
      difficulty: {},
      difficultyArr: [
        {
          name: '简单',
          time: 3 * 60 * 1000,
          curNow: 0,
          isTitle: true,
          isAuthor: true,
          isTitleHide: false,
          isAuthorHide: false,
          type: 'simpleness',
        },
        {
          name: '一般',
          time: 2 * 60 * 1000,
          curNow: 1,
          isTitle: false,
          isAuthor: true,
          isTitleHide: false,
          isAuthorHide: false,
          type: 'ordinary'
        },
        {
          name: '困难',
          time: 1.5 * 60 * 1000,
          curNow: 2,
          isTitle: true,
          isAuthor: false,
          isTitleHide: true,
          isAuthorHide: false,
          type: 'difficulty'
        },
        {
          name: '极限',
          time: 50 * 1000,
          curNow: 3,
          isTitle: true,
          isAuthor: true,
          isTitleHide: true,
          isAuthorHide: true,
          type: 'extremity'
        },
      ],
      rankingData: {},
      dataResult: {},
    }
  },
  watch: {
    isSetDifficulty(newValue, oldValue) {
      if (newValue) {
        let difficultyObj = uni.getStorageSync('difficulty')
        if (difficultyObj) {
          this.curNow = difficultyObj.curNow
        }
      }
    }
  },
  onLoad() {
    // 没有的话，添加难度默认值
    let difficultyObj = uni.getStorageSync('difficulty')
    if (!difficultyObj) {
      this.difficulty = this.difficultyArr[this.curNow]
      uni.setStorageSync('difficulty', this.difficultyArr[this.curNow])
    } else {
      this.difficulty = difficultyObj
    }
  },
  onShow() {
    this.getRanking()
  },
  methods: {
    // 设置难度等级
    setDifficulty() {
      this.difficulty = this.difficultyArr[this.curNow]
      uni.setStorageSync('difficulty', this.difficultyArr[this.curNow])
      uni.$u.toast('操作成功~')
      this.isSetDifficulty = false
    },
    sectionChange(index) {
      this.curNow = index;
    },
    clear() {
      this.showClear = false
      let dataResult = uni.getStorageSync('dataResult')
      let all = 0,
          write = 0,
          success = 0,
          error = 0;
      this.dataResult = {
        all,
        write,
        success,
        error,
      }
      if (dataResult) {
        all = Number(dataResult.all)
      }
      uni.setStorageSync('dataResult', {
        all,
        write,
        success,
        error,
      })
      uni.showToast({
        title: '操作成功~',
        duration: 2000
      });
    },
    getRanking() {
      let ratio = parseInt(1 / 6 * 100)
      let rankingInd = 0
      let dataResult = uni.getStorageSync('dataResult')
      let all = 0,
          write = 0,
          success = 0,
          error = 0
      if (dataResult) {
        all = Number(dataResult.all)
        write = Number(dataResult.write)
        success = Number(dataResult.success)
        error = Number(dataResult.error)
      }
      this.dataResult = {
        all,
        write,
        success,
        error,
      }
      if (write != 0) {
        this.winRate = parseInt(success / write * 100)
      }
      if (write == 0) {
        rankingInd = 0
      } else if (success == 0) {
        rankingInd = 0
      } else if (success < 20) {
        rankingInd = 1
      } else if (success > 20) {
        if (this.winRate < ratio * 2) {
          rankingInd = 1
        } else if (this.winRate < ratio * 3) {
          rankingInd = 2
        } else if (this.winRate < ratio * 4) {
          rankingInd = 3
        } else if (this.winRate < ratio * 5) {
          rankingInd = 4
        } else if (this.winRate < ratio * 6) {
          if (this.winRate < 92) {
            rankingInd = 5
          } else if (this.winRate < 96) {
            rankingInd = 6
          } else if (this.winRate < 100) {
            rankingInd = 7
          }
        }
      }
      this.rankingData = Data.nameType[rankingInd]
    }
  },
}
</script>

<style lang="scss" scoped>
page {
  background-color: #fffae8;
}

.my {
  padding: 40rpx;
  position: relative;

  .difficultyMask {
    background-color: $mask-bg;
    backdrop-filter: blur(2px);
    position: fixed;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 100%;
    z-index: 10;
    display: flex;
    padding: 0 40rpx;
    transition: all 300ms;
    overflow: hidden;

    &.show {
      bottom: 0%;
    }

    .box {
      margin-bottom: 150rpx;
      width: 100%;
      padding: 40rpx;
      background-color: #fff;
      border-radius: 10rpx;
      box-shadow: #555 0px 1px 2px 0px;

      .title {
        font-size: 32rpx;
        margin-bottom: 60rpx;
        box-shadow: #555 0px 2px 4px 1px;
      }

      .btns {
        display: flex;
        align-items: center;
        margin-top: 40rpx;
        margin-bottom: 40rpx;

        .btn {
          width: 250rpx;
        }
      }
    }
  }

  .title {
    font-size: 46px;
    text-align: center;
    border-radius: 20rpx;
    box-shadow: #555 0px 6px 6px 1px;
    color: #5ac725;
    background-color: #f5fff0;
    width: 250rpx;
    margin: 0 auto;
    margin-top: 40rpx;
    padding: 20rpx 20rpx;
  }

  .card {
    margin-top: 60rpx;
    padding: 20rpx 40rpx;
    border-radius: 10rpx;
    background-color: #effffd;
    box-shadow: #555 0px 2px 6px 0px;
    display: flex;
    justify-content: space-between;

    .item {
      text {
        margin: 0 10rpx;
      }
    }
  }

  .list {
    margin-top: 40rpx;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: #555 0px 1px 2px 0px;

    .u-slot-value-difficulty {
      //font-weight: bold;

      &.type0 {
        //color: #ffe58f;
        //color: #b7eb8f;
        //color: #ffccc7;
        //color: #6abe39;
        color: #49aa19;
      }

      &.type1 {
        //color: #ffc53d;
        //color: #49aa19;
        color: #33bcb7;
      }

      &.type2 {
        //color: #d48806;
        //color: #306317;
        //color: #3c8618;
        color: #d87a16;
      }

      &.type3 {
        //color: #874d00;
        //color: #1d3712;
        color: #d32029;
      }
    }
  }
}
</style>
