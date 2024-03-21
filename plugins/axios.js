

export default function ({ store, app: { $axios }, redirect }) {
    $axios.onRequest((config) => {
      if (config.baseURL === process.env.appApi) {
        config.headers.common['Content-Type'] = 'application/json';
        config.headers.common['Accept'] = 'application/json';
        config.headers.common['X-WDV-AccessToken'] = process.env.appToken;
        config.headers.common['X-WDV-Locale'] = 'en'; // Change to 'fr' if needed
  
        if (store.state.auth.token && config.headers.Authorization !== 'none') {
          config.headers.Authorization = 'Bearer ' + store.state.auth.token;
        }
      }
      return config;
    });
  }
  