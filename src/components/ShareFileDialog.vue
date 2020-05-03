<template>
  <q-dialog ref="dialog" v-model="open">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Compartir una imagen</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-file use-chips filled accept=".jpg, image/*" v-model="file" label="Selecciona una imagen">
          <template v-slot:prepend>
            <q-icon name="eva-attach" />
        </template>
        </q-file>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn rounded label="OK" color="primary" @click="onOk" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ShareFileDialog',
  data () {
    return {
      open: false,
      file: null
    }
  },
  methods: {
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
