<template>
  <b-container class="my-5" fluid>
    <h1 class="mb-3">SPA список книг</h1>

    <b-row>
      <b-col>
        <b-table
            :items="books"
            :fields="fields"
            primary-key="id"
            hover
            responsive
            @row-clicked="onRowClick"
        >
          <template slot="[image]" slot-scope="data">
            <b-img
                v-if="data.item.cover"
                :src="data.item.cover"
                height="100"
                width="100"
            />
            <b-img
                v-else
                blank
                blank-color="#f8f9fa"
                height="100"
                width="100"
            />
          </template>

          <template slot="[author]" slot-scope="data">
            {{ data.item.authorFirstName }}
            {{ data.item.authorLastName }}
          </template>

          <template slot="[remove]" slot-scope="data">
            <b-button @click="remove(data.item.id)" class="close">&times;</b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="text-right">
        <b-link :to="{name: 'create'}" class="btn btn-primary">
          Добавить книгу
        </b-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      fields: [
        {key: 'image', label: 'Картинка'},
        {key: 'title', label: 'Заголовок', sortable: true},
        {key: 'author', label: 'Автор'},
        {key: 'pages', label: 'Страниц', tdClass: 'numbers text-md-right'},
        {key: 'publisher', label: 'Издательство'},
        {
          key: 'year',
          label: 'Год издания',
          sortable: true,
          tdClass: 'numbers text-md-center'
        },
        {
          key: 'date',
          label: 'Дата выхода в тираж',
          formatter: 'dateFormatter',
          tdClass: 'numbers'
        },
        {
          key: 'remove',
          label: ''
        }
      ]
    }
  },
  computed: {
    ...mapState(['books'])
  },
  methods: {
    ...mapMutations(['remove']),
    dateFormatter (dateString) {
      if (!dateString) return ''
      let date = new Date(dateString)
      let d = date.getDate()
      let m = date.getMonth() + 1
      let y = date.getFullYear()
      return `${d < 10 ? '0' : ''}${d}.${m < 10 ? '0' : ''}${m}.${y}`
    },
    onRowClick ({id}) {
      this.$router.push({name: 'edit', params: {id: id}})
    }
  }
}
</script>

<style lang="scss">
  .numbers {
    font-variant-numeric: tabular-nums;
  }
</style>
