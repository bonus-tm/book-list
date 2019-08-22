<template>
  <b-container class="my-5">
    <h1 class="mb-3">Редактор свойств книги</h1>

    <form-book
        v-if="book"
        :book="book"
        @submit="update"
        @remove="remove"
        save-button-label="Сохранить"
    />
    <div v-else>
      <b-alert variant="danger" show>Книга не найдена в списке</b-alert>
      <p>
        <b-link :to="{name: 'home'}">Вернуться к списку книг</b-link>
      </p>
    </div>
  </b-container>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
import FormBook from '@/components/FormBook'

export default {
  name: 'edit',
  components: {FormBook},
  computed: {
    ...mapState(['init']),
    ...mapGetters(['getBookById']),
    book () {
      return this.getBookById(this.$route.params.id)
    }
  },
  methods: {
    ...mapMutations({
      updateBook: 'update',
      removeBook: 'remove'
    }),
    update () {
      this.updateBook(this.book)
      this.$router.push({name: 'home'})
    },
    remove () {
      this.removeBook(this.book.id)
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
