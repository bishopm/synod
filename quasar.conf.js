// Configuration for your app
var version = JSON.stringify('0.1.7')
var vnotes = JSON.stringify('Add synod docs, agenda')

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'axios',
      'firebase'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      // 'roboto-font',
      // 'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5'
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QBadge',
        'QDate',
        'QField',
        'QLayout',
        'QHeader',
        'QExpansionItem',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QPopupProxy',
        'QSelect',
        'QSeparator',
        'QTab',
        'QTabs',
        'QTabPanel',
        'QTabPanels',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QInput',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QUploader'
      ],

      directives: [
        'Ripple'
      ],

      // Quasar plugins
      plugins: [
        'Dialog',
        'Notify',
        'Loading'
      ],
      config: {
        notify: {
          color: 'black'
        }
      },
      iconSet: 'fontawesome-v5'
      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      env: ctx.dev
        ? { // so on dev we'll have
          API: JSON.stringify('http://localhost/churchnet/public/api'),
          WEB: JSON.stringify('http://localhost/churchnet/public'),
          VNOTES: vnotes,
          VERSION: version
        }
        : { // and on build (production):
          API: JSON.stringify('https://church.net.za/api'),
          WEB: JSON.stringify('https://church.net.za'),
          VNOTES: vnotes,
          VERSION: version
        },
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
