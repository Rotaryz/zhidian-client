import APP_CONFIG from './_app-config'
if (APP_CONFIG.appKey === 'platform' && APP_CONFIG.env === 'production') {
  require('@static/sdk/ald-stat')
}
