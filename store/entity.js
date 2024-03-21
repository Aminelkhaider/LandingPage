const { modules } = require("..");

const state = () => ([]);

const mutations = {
  list(state, payload) {
    state = [
      ...state,
      payload
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
      Name: "fdsfbgdg",
      Created: new Date().toString(),
      Email: "nb@fg.fr",
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

module.exports=actions ;
