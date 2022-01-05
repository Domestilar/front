import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - front",
    title: "front",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Oswald|Libre+Baskerville&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Material+Icons",
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/plugins.js", "@/plugins/helper.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ["@/components", "@/components/shared"],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["vue-sweetalert2/nuxt", "@nuxtjs/axios", "@nuxtjs/auth-next"],


  axios: {
    baseURL: 'http://domestilar.api/api'
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    font: {
      family: "Libre Baskerville",
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 8081,
  },
  sweetalert: {
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  },
  auth: {
    strategies: {
      laravelJWT: {
        provider: "laravel/jwt",
        url: "http://domestilar.api",
        endpoints: {},
        token: {
          property: "access_token",
          maxAge: 60 * 60,
        },
        refreshToken: {
          maxAge: 20160 * 60,
        },
      },
    },
    redirect: {
      login: "/admin",
      logout: "/admin",
      callback: "/admin",
      home: "/admin/crediario",
    },
    token: {
      prefix: "token.",
    },
  },
  router: {
    middleware: ["auth"],
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/cadastro/:uuid/completar',
        components: {
          default: resolve(__dirname, 'pages/_uuid'), // or routes[index].component
        },
        chunkNames: {
          modal: 'components/modal'
        }
      })
    }
  },
};
