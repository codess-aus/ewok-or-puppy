/* eslint-disable no-console */

import { register } from 'register-service-worker'

// With Vite, we need to check for production mode differently
const isProduction = import.meta.env.PROD

if (isProduction) {
  // Use the base URL from Vite
  register(`${import.meta.env.BASE_URL}sw.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      // Optional: Add a notification to inform the user about updates
      document.dispatchEvent(
        new CustomEvent('swUpdated', { detail: registration })
      )
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
