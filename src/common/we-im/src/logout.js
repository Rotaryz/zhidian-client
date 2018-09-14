export default function() {
  const self = this
  const { webim } = self
  // 登出
  self._sdkLogout = () => {
    return new Promise((resolve, reject) => {
      webim.logout(res => resolve(res), err => reject(err))
    })
  }
  self.sdkLogout = async () => {
    try {
      if (self.loginInfo) {
        await self._sdkLogout()
        console.warn('登出成功')
      } else {
        console.warn('登出失败')
      }
    } catch (e) {
      self.handleException(e)
    }
  }
}
