<template>
	<view class="index">
		<!-- 提示 -->
		<u-alert :title="title" type="primary" :description="description"></u-alert>
		<!-- <u-rate :count="count" v-model="value"></u-rate> -->

		<!-- <u-code-input v-model="value"></u-code-input> -->
		<!-- 倒计时 -->
		<view class="countDown">
			<view class="btns">
				<u-button v-if="type=='over'" text="重来" :plain="true" type="warning" @click="reset"></u-button>
				<u-button v-if="type=='pause'" text="开始" :plain="true" size="normal" type="primary" @click="start"></u-button>
				<u-button v-if="type=='start'" text="暂停" :plain="true" type="error" @click="pause"></u-button>
			</view>
			<view class="timeText">倒计时</view>
			<u-count-down ref="countDown" :time="time" format="mm:ss:SSS" :autoStart="false" millisecond @change="onChange"
				@finish="onFinish">
				<view class="time">
					<view class="time__custom seconds">
						<text class="time__custom__item">{{ timeData.minutes }}</text>
					</view>
					<text class="time__doc">:</text>
					<view class="time__custom seconds">
						<text class="time__custom__item">{{ timeData.seconds }}</text>
					</view>
					<text class="time__doc">:</text>
					<view class="time__custom milliseconds">
						<text class="time__custom__item">{{ timeData.milliseconds}}</text>
					</view>
				</view>
			</u-count-down>


		</view>
		<!-- 诗 -->
		<view class="poemBox">
			<view v-if="isTitle" class="title">{{ poem.title}}</view>
			<view v-else @tap="isTitle=true" class="title">点击查看标题</view>
			<view v-if="isAuthor" class="author">{{poem.author}}</view>
			<view v-else @tap="isAuthor=true" class="author">点击查看作者</view>
			<view v-for="(item,row) in poemWordWrite" class="item">
				<template v-for="(word,ind) in item">
					<view v-if="word==','||word=='，'">{{word}}</view>
					<text v-else @tap="recall(row,ind)"
						:class="{focus:focus==`${row}-${ind}`,error:poemWordWriteCla[row][ind]}">{{word}}</text>
				</template>。
			</view>
		</view>

		<view v-if="type=='over'" class="result">
			<view v-if="result.len==0" class="title success">成功</view>
			<view v-else class="title error">失败</view>
			<view class="data">
				<view class="item ">总字数<text class="all">{{ result.wordLen}}</text></view>
				<view class="item ">错误字数<text class="error">{{ result.len}}</text></view>
			</view>
			<view class="btns">
				<view class="btn">
					<u-button text="重来" :plain="true" type="warning" @click="reset"></u-button>
				</view>
				<view class="btn">
					<u-button text="换一首" :plain="true" size="normal" type="success" @click="changeOne"></u-button>
				</view>
			</view>
		</view>

		<!-- 底下文字 -->
		<view v-if="type!='over'" class="wordBox">
			<view :class="{hide:type=='start'}" class="mask">
				<u-button type="primary" @click="start" :plain="true" text="开始"></u-button>
			</view>
			<template v-for="(word,ind) in poemWordShuffle">
				<view v-if="word!==','&&word!=='，'" @tap="setPoem(word,ind)" :class="{'vanish':poemWordShuffleCla[ind]}"
					class="word">{{word}}</view>
			</template>
		</view>
	</view>
</template>

<script>
	import {
		Data,
		poemStr,
		setPoemObj
	} from "./data.js"
	export default {
		components: {},
		data() {
			return {
				Data,
				poemStr,
				poemList: uni.getStorageSync('poemList') || [],
				time: 2 * 60 * 1000,
				// time: 2 * 1000,
				type: 'pause',
				isTitle: true,
				isAuthor: true,
				isOver: false,
				isSetWord: false,
				poem: {},
				arrEmpty: [],
				poemShuffle: [],
				poemWordCorrect: [],
				poemWordWrite: [],
				poemWordWriteCla: [],
				poemWordShuffle: [],
				poemWordShuffleCla: [],
				poemWordError: [],
				result: {
					len: '-'
				},
				word: '',
				wordLen: 0,
				focus: '0-0',
				count: 5,
				value: 2,
				timeData: {},
				title: '规则',
				description: '规定时间内点击下面文字将唐诗补充完整'
			};
		},
		onLoad() {
			// function setPoemObj(str) {
			// 	let poemArr = str.split(/\s/g)
			// 	let title = `《${poemArr[0]}》`
			// 	let author = poemArr[1]
			// 	let poemWord = poemArr[2]
			// 	return {
			// 		title,
			// 		author,
			// 		poemWord
			// 	}
			// }
			let poemArr = poemStr.map(item => setPoemObj(item))
			Data.poem = [...Data.poem, ...this.poemList, ...poemArr]

		},
		onReady() {
			this.init()
		},
		onShow() {
			// Data.poem = [...Data.poem, this.poemList]


		},
		watch: {
			type(newValue, oldValue) {
				if (newValue == 'over') {
					this.addResult()
				}
			}
		},
		methods: {
			//初始化
			init() {
				console.log('init');
				this.isTitle = true;
				this.isAuthor = true;
				// 随机
				let shuffle = this.shufflePoem()
				this.poem = Data.poem[shuffle]
				let poemWord = this.poem.poemWord

				let {
					arr,
					arrEmpty,
					arrError,
					arrCla
				} = this.setArr(poemWord)

				this.arrEmpty = this.deepClone2DArray(arrEmpty)
				this.poemWordCorrect = arr
				this.poemWordWrite = this.deepClone2DArray(arrEmpty)
				this.poemWordError = arrError
				this.poemWordWriteCla = arrCla
				this.shuffleWord()
			},
			// 随机诗
			shufflePoem() {
				let shuffle = uni.$u.random(0, Data.poem.length - 1)

				if (this.poemShuffle.length == Data.poem.length) {
					this.poemShuffle = []
				}
				while (true) {
					if (this.poemShuffle.includes(shuffle)) {
						shuffle = uni.$u.random(0, Data.poem.length - 1)
					} else {
						break
					}
				}
				this.poemShuffle.push(shuffle)
				return shuffle
			},
			deepClone2DArray(arr) {
				return arr.map(subArray => {
					return [...subArray];
				});
			},
			// 随机文字
			shuffleWord() {
				this.poemWordWrite = this.deepClone2DArray(this.arrEmpty)
				this.focus = '0-0'
				let wordArr = this.poemWordCorrect + ''
				wordArr = wordArr.split(',');
				wordArr = wordArr.filter(item => item != '，');
				this.poemWordShuffle = this.shuffleArray(wordArr)
				this.poemWordShuffleCla = new Array(this.poemWordShuffle.length).fill(false)
			},
			// 随机
			shuffleArray(arr) {
				for (let i = arr.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[arr[i], arr[j]] = [arr[j], arr[i]];
				}
				return arr;
			},
			// 格式化
			setArr(str) {
				let arr = []
				let arrEmpty = []
				let arrError = []
				let arrCla = []
				// 去除所以空白字符
				str = str.replace(/\s/g, "");
				let len = str.match(/。/g).length
				this.result = {}
				this.result.wordLen = str.match(/([^。，])/g).length
				for (let i = 0; i < len; i++) {
					arr.push([])
					arrEmpty.push([])
					arrError.push([])
					arrCla.push([])
				}
				let row = 0
				for (let i = 0; i < str.length; i++) {
					let word = str[i]
					if (word == '，' || word == ',') {
						arr[row].push(word)
						arrEmpty[row].push(word)
						arrError[row].push('')
						arrCla[row].push(false)

					} else if (word == '。' || word == '.') {
						row++
					} else {
						word && arr[row].push(word)
						word && arrEmpty[row].push('')
						word && arrError[row].push('')
						word && arrCla[row].push(false)
					}
				}
				return {
					arr,
					arrEmpty,
					arrError,
					arrCla
				}
			},
			// 点击诗，撤回
			recall(row, ind) {
				if (this.isSetWord) {
					return
				}
				this.focus = `${row}-${ind}`;
				if (this.poemWordWrite[row][ind]) {
					// 清空当前点击诗的文字
					let word = this.poemWordWrite[row][ind]
					this.poemWordWrite[row][ind] = ''
					// 将底部文字显示出来
					let wordInd = this.poemWordShuffle.indexOf(word)
					this.poemWordShuffleCla[wordInd] = false
				}
			},
			// 点击下面文字
			setPoem(word, wordInd) {
				if (this.poemWordShuffleCla[wordInd]) {
					return
				}
				if (this.isSetWord) {
					this.isSetWord = true
					return
				}
				let claLen = this.poemWordShuffleCla.filter(item => !item)
				if (claLen.length <= 2) {
					if (this.type != 'over') {
						this.pause()
						this.type = 'over'
					}
					return
				}
				let ind = this.focus.split('-')

				let row = Number(ind[0])
				let col = Number(ind[1])
				let rowOld = row
				let colOld = col
				let len = this.poemWordCorrect[0].length
				// 最后一行
				if (row == this.poemWordCorrect.length - 1) {
					if (col == len - 1) {
						if (this.type != 'over') {
							this.pause()
							this.type = 'over'
						}
					}
					if (col == len) {
						return
					}
				}
				this.isOver = false
				this.poemWordShuffleCla[wordInd] = true
				this.poemWordWrite[rowOld][colOld] = word
				if (this.poemWordCorrect[rowOld][colOld] != this.poemWordWrite[rowOld][colOld]) {
					this.poemWordWriteCla[rowOld][colOld] = true
					this.poemWordError[rowOld][colOld] = ({
						word: this.poemWordCorrect[rowOld][colOld],
						wordError: word,
						ind: this.focus
					})
					// 错误
				} else {
					this.poemWordWriteCla[rowOld][colOld] = false
					this.poemWordError[rowOld][colOld] = ('')
				}
				let resultArr = this.poemWordError.flat(2)
				resultArr = resultArr.filter(item => item).map(item => item.word)
				let resultErrorArr = this.poemWordError.flat(2)
				resultErrorArr = resultErrorArr.filter(item => item).map(item => item.wordError)
				this.result = {
					...this.result,
					word: resultArr,
					len: resultErrorArr.length,
					wordError: resultErrorArr,
				}
				if (col < len) {
					col += 1
					if (this.poemWordCorrect[row][col] == ',' || this.poemWordCorrect[row][col] == '，') {
						col += 1
					}
				}
				if (col == len && row < this.poemWordCorrect.length - 1) {
					row += 1
					col = 0
				}




				this.focus = row + '-' + col
				this.isSetWord = false
			},
			//开始
			start() {
				this.$refs.countDown.start();
				this.type = 'start'
			},
			// 暂停
			pause() {
				this.$refs.countDown.pause();
				this.type = 'pause'
			},
			// 重置
			reset() {
				this.$refs.countDown.reset();
				this.result = {
					wordLen: this.result.wordLen
				}

				this.start()
				this.shuffleWord()
			},
			// 换一首
			changeOne() {
				this.$refs.countDown.reset();
				this.init()
				this.start()
			},
			onChange(e) {
				this.timeData = e
			},
			onFinish() {
				this.type = 'over'
			},
			// 最终结果统计
			addResult() {
				let dataResult = uni.getStorageSync('dataResult')
				let all = Data.poem.length,
					write = 0,
					success = 0,
					error = 0
				if (dataResult) {
					write = Number(dataResult.write)
					success = Number(dataResult.success)
					error = Number(dataResult.error)
				}

				if (this.result.len == 0) {
					// 成功
					success += 1
				} else {
					// error += 1
				}
				write += 1
				error = write - success
				uni.setStorageSync('dataResult', {
					all,
					write,
					success,
					error
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */

	/* 	.index ::v-deep .u-popup {
		position: relative !important;
		z-index: 100000000 !important;
	} */


	.index {

		box-sizing: border-box;
		margin: 20rpx;

		.poemBox {
			display: flex;
			flex-direction: column;
			align-items: center;

			.title {
				// text-align: center;
				font-size: 24px;
				margin-top: 5rpx;
				margin-bottom: 20rpx;
				color: $poemTitle;
			}

			.author {
				// text-align: center;
				font-size: 16px;
				margin-bottom: 20rpx;
				color: $poemAuthor;
			}

			.item {
				display: flex;
				font-size: 16px;
				margin-bottom: 40rpx;
				color: $poemItem;

				text {
					padding: 5rpx 5rpx;
					border-radius: 10rpx;
					width: 32rpx;
					height: 40rpx;
					margin-left: 2rpx;
					// background-color: $poemWord-bg;
					border: 1px solid transparent;
					border-bottom: 1px solid $poemWord-border;

					&.focus {
						animation: flicker 1000ms infinite;
					}

					&.error {
						color: darkred;
					}
				}
			}
		}

		.countDown {
			display: flex;
			align-items: center;
			margin-top: 10rpx;

			.time {
				display: flex;
				font-size: 30px;
				align-items: center;
				justify-content: center;
				color: #555;

				&__custom {
					// text-align: right;

					&__item {}

					&.seconds {
						// width: 70rpx;
					}

					&.milliseconds {
						// width: 110rpx;
					}
				}

				&__doc {
					color: $u-primary;
					padding: 4px 4px;
				}

			}

			.btns {
				display: flex;
				margin-right: 60rpx;
			}

			.timeText {
				margin-right: 20rpx;
			}
		}

		.result {
			.title {
				font-size: 28px;
				text-align: center;
				border-radius: 20rpx;
				box-shadow: #555 0px 2px 6px 0px;
				margin-bottom: 20rpx;
				padding: 10rpx;

				&.success {
					color: #5ac725;
					background-color: #f5fff0;
				}

				&.error {
					color: #dc2d00;
					background-color: #fef0f0;
				}
			}

			.data {
				display: flex;
				font-size: 16px;
				text-align: center;
				border-radius: 20rpx;
				background: #fff;
				box-shadow: #d8d3d3 0px 2px 3px 0px;
				margin-bottom: 60rpx;
				padding: 10rpx;

				.item {
					margin: 0 20rpx;

					text {
						font-size: 20px;
						margin: 0 10rpx;

						&.all {}

						&.error {
							color: #dc2d00;
						}
					}



				}
			}

			.btns {
				display: flex;
				justify-content: space-around;

				.btn {
					width: 250rpx;
				}
			}
		}

		@keyframes flicker {
			0% {
				border: 1px solid $poemItemWordFocus;
			}

			100% {
				border: 1px solid transparent;
				border-bottom: 1px solid $poemWord-border;
			}
		}

		@keyframes vanish {
			50% {
				transform: rotate(180deg) scale(0.5);
			}

			100% {
				transform: rotate(360deg) scale(0);
			}
		}

		@keyframes maskHide {
			50% {
				top: 50%;
			}

			100% {
				top: 1500%;

				display: none;
			}
		}

		.wordBox {
			display: flex;
			position: fixed;
			bottom: 0px;
			margin-bottom: 20rpx;
			flex-wrap: wrap;
			max-height: 450rpx;
			overflow-y: auto;
			/*  #ifdef   WEB */
			margin-bottom: 60px;

			/*  #endif  */
			.mask {
				position: absolute;
				left: 0;
				right: 20rpx;
				bottom: 0;
				height: 100%;
				border-radius: 20rpx;
				background-color: $mask-bg;
				display: flex;
				align-items: center;
				transition: all 300ms;
				overflow: hidden;

				backdrop-filter: blur(3px);

				&.hide {
					// animation: maskHide 500ms ease 1 forwards;
					height: 0;
				}
			}

			.word {
				font-size: 40rpx;
				padding: 10rpx 15rpx;
				margin: 10rpx;
				margin-bottom: 10rpx;
				border-radius: 10rpx;
				background-color: $poemWord-bg;
				// border: 1px solid $poemWord-border;
				box-shadow: #9398a7 0px 2px 2px 0px;

				&.vanish {
					animation: vanish 400ms ease 1 forwards;
				}
			}
		}
	}
</style>