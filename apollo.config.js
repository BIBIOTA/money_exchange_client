module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      url: process.env.VUE_APP_API_URL,
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}
