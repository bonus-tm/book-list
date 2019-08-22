<template>
  <b-container class="my-5">
    <h1 class="mb-3">Новая книга</h1>

    <form-book
        :book="book"
        @submit="create"
        save-button-label="Добавить"
    />
  </b-container>
</template>

<script>
import {mapMutations} from 'vuex'
import FormBook from '@/components/FormBook'

export default {
  name: 'create',
  components: {FormBook},
  data () {
    return {
      book: {
        id: null,
        title: null,
        authorFirstName: null,
        authorLastName: null,
        pages: null,
        publisher: null,
        year: null,
        date: null,
        cover: null
      }
    }
  },
  methods: {
    ...mapMutations({
      createBook: 'create'
    }),
    create () {
      this.createBook(this.book)
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
