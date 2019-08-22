<template>
  <div>
    <b-form-input
        :placeholder="placeholder"
        :state="valid"
        :value="value"
        @blur.once="untouched = false"
        @input="input"
        type="date"
    />
    <b-form-text v-if="help">{{ help }}</b-form-text>
  </div>
</template>

<script>
export default {
  name: 'InputDate',
  props: {
    value: {type: String, default: ''},
    validness: {
      required: true,
      validator: prop => typeof prop === 'boolean' || prop === null
    },
    placeholder: {type: String, default: ''},
    help: {type: String, default: ''}
  },
  data () {
    return {
      untouched: true
    }
  },
  computed: {
    valid () {
      if (this.untouched) return null
      return this.validness
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
