<template>
  <div
      class="d-flex align-items-center justify-content-center p-3 bg-light dropzone"
      @dragover.prevent
      @drop.stop.prevent="onDrop"
  >
    <div v-if="image" class="text-center">
      <b-img :src="image" alt="Каринка" class="mb-3" fluid />
      <br>
      <b-button variant="danger" @click="remove">Убрать картинку</b-button>
    </div>
    <div v-else class="file-input-wrap">
      <b-form-file @change="onDrop" placeholder="Выберите картинку" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputImage',
  props: {
    value: {
      required: true,
      validator: prop => {
        return ['string', 'undefined'].includes(typeof prop) || prop === null
      }
    }
  },
  data () {
    return {
      image: this.value
    }
  },
  methods: {
    onDrop (e) {
      let files = e.dataTransfer ? e.dataTransfer.files : e.target.files
      this.createFile(files[0])
    },
    createFile (file) {
      if (!file.type.match('image.*')) {
        alert('Сюда можно кидать только картинки')
        return
      }
      let reader = new FileReader()
      reader.onload = e => {
        this.image = e.target.result
        this.$emit('input', this.image)
      }
      reader.readAsDataURL(file)
    },
    remove () {
      this.image = null
      this.$emit('input', this.image)
    }
  }
}
</script>

<style lang="scss" scoped>
  .dropzone {
    width: 100%;
    min-height: 10rem;
  }

  .file-input-wrap {
    max-width: 50%;
  }
</style>
