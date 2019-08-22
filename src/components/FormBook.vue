<template>
  <b-form @submit.prevent>
    <b-form-row class="mb-3">
      <b-col md="3" class="col-form-label text-md-right">
        Название
        <span class="text-danger">*</span>
      </b-col>
      <b-col>
        <input-text
            v-model="_book.title"
            :validness="validness.title"
            help="Не более 30 символов"
        />
      </b-col>
    </b-form-row>

    <b-form-row class="mb-3">
      <b-col md="3" class="col-form-label text-md-right">
        Автор
        <span class="text-danger">*</span>
      </b-col>
      <b-col>
        <b-form-row>
          <b-col md="6">
            <input-text
                v-model="_book.authorFirstName"
                :validness="validness.authorFirstName"
                placeholder="Имя"
                help="Имя автора, не более 20 символов"
            />
          </b-col>
          <b-col md="6" class="mt-1 mt-md-0">
            <input-text
                v-model="_book.authorLastName"
                :validness="validness.authorLastName"
                placeholder="Фамилия"
                help="Фамилия автора, не более 20 символов"
            />
          </b-col>
        </b-form-row>
      </b-col>
    </b-form-row>

    <b-form-row class="mb-3">
      <b-col md="3" class="col-form-label text-md-right">Издательство</b-col>
      <b-col>
        <input-text
            v-model="_book.publisher"
            :validness="validness.publisher"
            help="Не более 30 символов"
        />
      </b-col>
    </b-form-row>

    <b-form-row class="mb-3">
      <b-col md="3"></b-col>
      <b-col md="3">
        <label>
          Кол-во страниц
          <span class="text-danger">*</span>
        </label>
        <input-number
            v-model="_book.pages"
            :validness="validness.pages"
            help="0 > страниц >= 10 000"
        />
      </b-col>
      <b-col md="3">
        <label>Год публикации</label>
        <input-number
            v-model="_book.year"
            :validness="validness.year"
            help="Не ранее 1800 г."
        />
      </b-col>
      <b-col md="3">
        <label>Дата выхода в тираж</label>
        <input-date
            v-model="_book.date"
            :validness="validness.date"
            help="Не ранее 01.01.1800"
        />
      </b-col>
    </b-form-row>

    <b-form-row class="mb-3">
      <b-col md="3" class="col-form-label text-md-right">Картинка</b-col>
      <b-col>
        <input-image v-model="_book.cover" />
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col v-if="_book.id" cols="auto">
        <b-button @click="remove" variant="outline-danger">
          Удалить книгу
        </b-button>
      </b-col>
      <b-col class="text-right">
        <b-link
            :to="{name: 'home'}"
            class="btn btn-outline-secondary mb-1"
        >
          Отмена
        </b-link>
        <b-button
            :disabled="!formValid"
            @click="submit"
            variant="primary"
            class="ml-1 mb-1"
        >
          {{ saveButtonLabel }}
        </b-button>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
import InputNumber from '@/components/InputNumber'
import InputDate from '@/components/InputDate'
import InputText from '@/components/InputText'
import InputImage from '@/components/InputImage'

export default {
  name: 'FormBook',
  components: {InputImage, InputText, InputDate, InputNumber},
  props: {
    book: {
      required: true,
      validator: prop => typeof prop === 'object' || prop === null
    },
    saveButtonLabel: {type: String, default: 'Сохранить'}
  },
  computed: {
    _book () {
      return this.book || {}
    },
    validness () {
      return {
        title: this.validateText(this._book.title, 30, true),
        authorFirstName: this.validateText(
          this._book.authorFirstName,
          20,
          true
        ),
        authorLastName: this.validateText(
          this._book.authorLastName,
          20,
          true
        ),
        pages: this.validateNumber(this._book.pages, 0, 10000, true),
        publisher: this.validateText(this._book.publisher, 30),
        year: this.validateNumber(
          this._book.year,
          1799,
          Number.MAX_SAFE_INTEGER
        ),
        date: this.validateDate(this._book.date, new Date('1800-01-01'))
      }
    },
    formValid () {
      return Object.keys(this.validness).reduce((acc, key) => {
        let v = this.validness[key] === null ? true : this.validness[key]
        return acc && v
      }, true)
    }
  },
  methods: {
    validateText (value, maxSymbols, required = false) {
      if (required) {
        if (value && value.trim().length <= maxSymbols) return true
        return false
      } else if (value && value.trim().length > maxSymbols) {
        return false
      }
      return null
    },
    validateNumber (value, min, max, required = false) {
      if (required) {
        if (value === null || value === '') return false
        if (value <= max && value > min) return true
        return false
      } else {
        if (value === null || value === '') return null
        if (value > max || value <= min) return false
      }
      return null
    },
    validateDate (value, min) {
      if (!value) return null

      let date
      if (value.includes('.')) {
        // Дата в формате 31.12.1900
        let [day, month, year] = value.split('.')
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      } else {
        // Дата в формате 1900-12-31
        date = new Date(value)
      }

      if (isNaN(date) || date.getTime() < min.getTime()) return false
      return null
    },
    submit () {
      if (this.formValid) this.$emit('submit')
    },
    remove () {
      this.$emit('remove')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
