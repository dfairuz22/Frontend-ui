export default {
  mode: 'spa',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#fff' },

  css: [],

  plugins: [],

  buildModules: [],

  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: 'http://localhost:8000'
  },

  build: {
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules = config.module.rules.filter(
          rule => rule.loader !== 'eslint-loader'
        )
      }
    }
  }
}