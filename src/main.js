import { createApp, h } from 'vue'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import './assets/tailwind.css'

const app = createApp({
  render: () => h(App),
});

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_API_URL,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  uri: process.env.VUE_APP_API_URL,
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

app.use(apolloClient);

app.use(apolloProvider)

app.mount('#app')
