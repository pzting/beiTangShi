<template>
	<view class="my">
		<view class="title">{{rankingData.name}}</view>
		<view class="card">
			<view class="item">背诵数<text>{{dataResult.write}}</text></view>
			<view class="item">成功数<text>{{dataResult.success}}</text></view>
			<view class="item">失败数<text>{{dataResult.error}}</text></view>
		</view>
		<view class="list">
			<u-cell-group>
				<u-cell title="胜率" :value="winRate+'%'"></u-cell>
				<u-cell @click="clear" clickable title="数据" value="清空" :isLink="true"></u-cell>
			</u-cell-group>
		</view>
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
				winRate: '暂无',
				Data,
				key: 'value',
				rankingData: {},
				dataResult: {},
			}
		},
		onShow() {
			this.getRanking()
		},
		methods: {
			clear() {
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
				} else if (write < 20) {
					rankingInd = 1
				} else if (write > 20) {
					if (this.winRate < ratio * 2) {
						rankingInd = 1
					} else if (this.winRate < ratio * 3) {
						rankingInd = 2
					} else if (this.winRate < ratio * 4) {
						rankingInd = 3
					} else if (this.winRate < ratio * 5) {
						rankingInd = 4
					} else if (this.winRate < ratio * 6) {
						console.log(this.winRate, '66666', ratio * 6);
						if (this.winRate < 92) {
							rankingInd = 5
						} else if (this.winRate < 96) {
							rankingInd = 6
						} else if (this.winRate < 100) {
							rankingInd = 7
						}
					}
				}
				console.log(rankingInd);
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
			background-color: #fff;
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
		}
	}
</style>