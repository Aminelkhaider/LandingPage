const Vuex = require('vuex');
const entities = require('./entity'); // Import your entities store module

const createStore = () => {
  return new Vuex.Store({
    modules: {
      entities,
    },
  });
};

module.exports = createStore;