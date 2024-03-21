const { mapActions } = require('vuex');


const createStore = require('./store');
const store = createStore(); 

// Nuxt config
module.exports = {
    env: {
      appUrl: process.env.APP_URL,
      appApi: process.env.APP_WDV_API,
      appToken: process.env.APP_WDV_TOKEN,
    },
    modules: ['@nuxtjs/axios'],
    // Other Nuxt config options
  };
  
  // Axios plugin
  const Config = function ({ store, app: { $axios }, redirect }) {
    $axios.onRequest((config) => {
      if (config.baseURL === process.env.appApi) {
        config.headers.common['Content-Type'] = 'application/json';
        config.headers.common['Accept'] = 'application/json';
        config.headers.common['X-WDV-AccessToken'] = process.env.appToken;
        config.headers.common['X-WDV-Locale'] = 'en'; // Change 'en' to 'fr' for French
  
        if (store.state.auth.token && config.headers.Authorization !== 'none') {
          config.headers.Authorization = 'Bearer ' + store.state.auth.token;
        }
      }
      return config;
    });
  };
  
  const state = () => ([]);
  
const mutations = {
    list(state, payload) {
      state = [
        ...state,
        payload,
      ];
    },
  };
  
   const initParams = {
    limit: 10,
    page: 1,
    sort_column: 'created_at',
    sort_direction: 'desc',
  };
  
   const actions = {
    async list({ commit, dispatch }, { entity_name, params = {} }) {
      const { data: payload } = await this.$axios.get(
        '/items/' + entity_name,
        { params: { ...initParams, ...params } }
      );
      return payload;
    },
  
    async show({ commit, dispatch }, { entity_name, id }) {
      const { data: payload } = await this.$axios.get(
        '/items/' + entity_name + '/' + id,
      );
      return payload;
    },
  
    async create({ commit, dispatch }) {
      const params = {
        Name: 'fdsfbgdg',
        Created: new Date().toString(),
        Email: 'nb@fg.fr',
      };
      const { data: payload } = await this.$axios.post(
        '/items/landing',
        params
      );
      return payload;
    },
  
    async update({ commit, dispatch }, { entity_name, id, params }) {
      const { data: payload } = await this.$axios.patch(
        '/items/' + entity_name + '/' + id,
        params
      );
      return payload;
    },
  
    async delete({ commit, dispatch }, { entity_name, id }) {
      const { data: payload } = await this.$axios.delete(
        '/items/' + entity_name,
        { params: { ids: id } }
      );
      return payload;
    },
  };
  
  // Import the Vuex store and the createEntity action
    const details = {
        name: 'EntityList',
        computed: {
          entities() {
            return this.$store.state.entities;
          },
        },
        async asyncData({ store }) {
          const entity_name = 'Orders';
          const params = {};
          await store.dispatch('list', { entity_name, params });
        },
        methods: {
          ...mapActions('entities', ['create']), // Use 'entities' module name for mapActions
          async submitForm() {
            // Handle the form submission
            const email = 'dsgfsfdgse@fdgds.fr';
            if (email.includes('@')) {
              console.log('Formulaire envoyé avec succès');
              const data = {
                Name: 'fdsfbgdg',
                Created: new Date().toString(),
                Email: 'dsgfsfdgse@fdgds.fr',
              };
              const entity_name = 'landing';
              try {
                const response = await this.create(data); // Use the 'create' action from the mapped actions
                console.log(response); // This will log the data returned by the API
              } catch (error) {
                console.error(error); // Handle any error that may occur during the request
              }
            } else {
              alert('Veuillez entrer une adresse e-mail valide');
            }
          },
        },
      };
  

  details.methods.create();
