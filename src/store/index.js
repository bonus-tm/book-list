import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'book-list'
})

Vue.use(Vuex)

const makeBookId = () => Math.random().toString().slice(-8)

const state = {
  books: []
}

const getters = {
  getBookById: state => id => {
    let i = state.books.findIndex(b => b.id === id)
    if (i !== -1) return state.books[i]
    return null
  }
}

const mutations = {
  create: (state, book) => {
    book.id = makeBookId()
    state.books.push(book)
  },
  update: (state, book) => {
    let i = state.books.findIndex(b => b.id === book.id)
    if (i !== -1) state.books.splice(i, 1, book)
  },
  remove: (state, id) => {
    let i = state.books.findIndex(b => b.id === id)
    if (i !== -1) state.books.splice(i, 1)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [vuexLocal.plugin]
})
