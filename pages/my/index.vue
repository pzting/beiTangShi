<template>
	<view class="my">
		<view class="title">{{rankingData.name}}</view>
		<view class="card">
			<view class="item">背诵数<text>{{dataResult.write}}</text></view>
			<view class="item">成功数<text>{{dataResult.success}}</text></view>
			<view class="item">失败数<text>{{dataResult.error}}</text></view>
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
			getRanking() {
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
				if (write < all) {
					rankingInd = 0
				}
				if (write == all) {
					rankingInd = 1
				}
				if (write > all) {
					if (success / write > 1 / 6 * 1) {
						rankingInd = 1
					} else if (success / write > 1 / 6 * 2) {
						rankingInd = 2
					} else if (success / write > 1 / 6 * 3) {
						rankingInd = 3
					} else if (success / write > 1 / 6 * 4) {
						rankingInd = 4
					} else if (success / write > 1 / 6 * 5) {
						if (success / write > 0.9) {
							rankingInd = 5
						} else if (success / write > 0.95) {
							rankingInd = 6
						} else if (success / write > 0.98) {
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

		.title {
			font-size: 46px;
			text-align: center;
			border-radius: 20rpx;
			box-shadow: #555 0px 2px 6px 0px;
			color: #5ac725;
			background-color: #f5fff0;
			width: 250rpx;
			margin: 0 auto;
			margin-top: 40rpx;
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
	}
</style>