<template>
  <view class="poemList">

    <view :class="{show:isWrite}" class="formMask">
      <view class="form">
        <view class="title">添加唐诗</view>
        <u--form ref="uForm" :model="modelForm" :rules="rules" labelPosition="left">
          <u-form-item ref="title" borderBottom label="标题" prop="poem.title">
            <u--input v-model="modelForm.poem.title" border="none" placeholder="请输入"></u--input>
          </u-form-item>
          <u-form-item ref="author" borderBottom label="作者" prop="poem.author">
            <u--input v-model="modelForm.poem.author" border="none" placeholder="请输入"></u--input>
          </u-form-item>
          <u-form-item ref="poemWord" borderBottom label="内容" prop="poem.poemWord">
            <u--textarea v-model="modelForm.poem.poemWord" autoHeight border="none"
                         placeholder="请输入内容，需要填写完整的标点符号"></u--textarea>
          </u-form-item>
        </u--form>
        <view class="btns">
          <u-button class="btn" customStyle="width:250rpx" plain text="取消" type="error"
                    @click="isWrite=false"></u-button>
          <u-button class="btn" customStyle="width:250rpx" plain type="primary" @click="submit">保存</u-button>
        </view>
      </view>
    </view>

    <view v-if="poemList.length===0" class="tip">
      <u-alert :description="description" title="提示" type="primary"></u-alert>
    </view>

    <u-button class="add" plain type="primary" @click="isWrite=true">添加唐诗</u-button>
    <view v-if="poemList.length>0" class="list">
      <u-cell-group>
        <u-cell v-for="(item,ind) in poemList" :isLink="true" :title="item.title" clickable value="修改"
                @click="edit(item,ind)"></u-cell>
      </u-cell-group>
    </view>
    <u-empty v-else marginTop="40px" mode="list">
    </u-empty>

  </view>
</template>

<script>
import {Data} from "../index/data";

export default {
  data() {
    return {
      description: '还没有添加过唐诗，快来添加吧~',
      isWrite: false,
      showSex: false,
      poemList: uni.getStorageSync('poemList') || [],
      modelForm: {
        poem: {
          title: '',
          author: '',
          poemWord: '',
        },
      },
      rules: {
        'poem.title': {
          type: 'string',
          required: true,
          message: '请输入',
          trigger: ['blur', 'change']
        },
        'poem.author': {
          type: 'string',
          required: true,
          message: '请输入',
          trigger: ['blur', 'change']
        },
        'poem.poemWord': {
          type: 'string',
          required: true,
          message: '请输入，需要填写完整的标点符号',
          trigger: ['blur', 'change']
        },
      },
    }
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    // this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    reset() {
      const validateList = ['poem.title', 'poem.author', 'poem.poemWord',]
      this.$refs.uForm.resetFields()
      this.$refs.uForm.clearValidate()
      setTimeout(() => {
        this.modelForm.poem = {}
        this.$refs.uForm.clearValidate(validateList)
        // 或者使用 this.$refs.form1.clearValidate()
      }, 10)
    },
    submit() {
      this.$refs.uForm.validate().then(res => {


        let poemWord = this.modelForm.poem.poemWord
        poemWord = poemWord.replace(/,/g, '，')
        poemWord = poemWord.replace(/\?|\？/g, '，')
        console.log(poemWord);
        poemWord = poemWord.replace(/\./g, '。')
        console.log(poemWord);
        if (poemWord.match(/\。/g).length < 2 && poemWord.match(/\。/g).length % 2 != 0) {
          uni.$u.toast('请检查标点符号是否完整~')
          return
        }
        this.modelForm.poem.poemWord = poemWord

        let title = this.modelForm.poem.title
        title = title.replace(/\《|》|\<|\>/g, '')
        this.modelForm.poem.title = `《${title}》`

        if (this.modelForm.poem.id) {
          this.editPoem(this.modelForm.poem)
        } else {
          this.addPoem({
            ...this.modelForm.poem,
            id: uni.$u.guid(8)
          })
        }
        this.isWrite = false
        this.reset()
        // uni.$u.toast('校验通过')
      }).catch(errors => {
        // uni.$u.toast('校验失败')
      })
    },
    addPoem(poem) {
      let poemList = uni.getStorageSync('poemList')
      if (!poemList) {
        poemList = []
      }
      let arr = [poem, ...poemList];
      arr = [...new Map(arr.map(obj => [obj.title, obj])).values()]
      poemList = [...arr]
      this.poemList = poemList
      uni.setStorageSync('poemList', poemList)
    },
    editPoem(poem) {
      // let poemList = uni.getStorageSync('poemList')
      // if (!poemList) {
      // 	poemList = []
      // }
      // poemList = [poem, ...poemList]
      this.poemList = this.poemList.map(item => {
        if (item.id === poem.id) {
          item = {
            ...poem
          }
        }
        return item
      })
      uni.setStorageSync('poemList', this.poemList)
    },
    edit(poem, ind) {
      this.isWrite = true
      this.modelForm.poem = {
        ...poem
      }
      // let poemList = uni.getStorageSync('poemList')
      // if (!poemList) {
      // 	poemList = []
      // }
      // poemList = [poem, ...poemList]
      // this.poemList = poemList
      // uni.setStorageSync('poemList', poemList)
    }
  },
}
</script>

<style lang="scss" scoped>
.poemList {
  padding: 20rpx;
  position: relative;

  .formMask {
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

    .form {
      .title {
        text-align: center;
        border-radius: 20rpx;
        box-shadow: #555 0px 2px 4px 1px;
        color: #5ac725;
        background-color: #f5fff0;
        width: 250rpx;
        margin: 0 auto;

        padding: 20rpx 20rpx;

        font-size: 32rpx;
        margin-top: 40rpx;
        margin-bottom: 60rpx;
      }

      margin-bottom: 50px;
      width: 100%;
      padding: 40rpx;
      background-color: #fff;
      border-radius: 10rpx;
      box-shadow: #555 0px 1px 2px 0px;

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

  .tip {
    margin-bottom: 20rpx;
  }

  .list {
    margin-top: 40rpx;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: #555 0px 1px 2px 0px;
  }
}
</style>
