<template>
  <div>
    <q-dialog ref="dialog" v-model="dialog" persistent :maximized="maximizedToggle" transition-show="slide-up"
      transition-hide="slide-down">
      <q-card class="bg-dark text-white" style="min-width: 300px">
        <q-bar>
          <q-btn rounded dense color="primary" label="Descargar" icon="eva-cloud-download-outline" @click="download()" no-caps />
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-none ">
          <div class="row justify-center item-center"><q-img :src="this.image"/></div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImageViewerDialog',
  data () {
    return {
      dialog: false,
      maximizedToggle: true
    }
  },
  props: {
    image: {
      required: true,
      type: String
    },
    imgData: {
      required: true
    }
  },
  methods: {
    download () {
      let data = new Blob([this.imgData.blob], { name: this.imgData.name, type: this.imgData.blob })
      console.log(data)
      data = window.URL.createObjectURL(data)
      const link = document.createElement('a')
      link.href = data
      link.download = this.imgData.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.show()
    },
    onHide () {
      this.$emit('hide')
    },
    onOk () {
      this.$emit('ok', this.file)
      this.hide()
    }
  }
}
</script>
