<script>
  import { resolvePageDetail, checkIsTabPage, resolveQrCode } from 'common/js/util'

  export default {
    created() {
      console.log('created')
    },
    onLaunch() {
      console.log('onlaunch')
    },
    onShow(options) {
      console.log('onshow', options)
      console.log(this.$entryType(options))
      console.log(resolvePageDetail(options.path), checkIsTabPage, resolveQrCode)
    },
    onReady() {
      console.log('onready')
    },
    mounted() {
      console.log('mounted')
    },
    onHide() {
      console.log('onHide')
    },
    update() {
      console.log('update')
    },
    methods: {

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
</style>
