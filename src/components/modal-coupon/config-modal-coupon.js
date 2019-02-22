const config = [
  ['freshCTM', {
    title: '新人优惠券',
    buttonText: '马上领取',
    takeExplain: '',
    isShowTakeExplain: false,
    submitFn: '_takeCoupon'
  }],
  ['useFreshCTM', {
    title: '领取成功',
    buttonText: '立即使用',
    takeExplain: '已存入您的优惠券',
    isShowTakeExplain: true,
    submitFn: '_navTo'
  }],
  ['chatMsg', {
    title: '领取优惠券',
    buttonText: '马上领取',
    takeExplain: '',
    isShowTakeExplain: false,
    submitFn: 'getCoupon'
  }]
]
export default new Map(config)
