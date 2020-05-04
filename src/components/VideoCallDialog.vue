<template>
  <q-dialog ref="dialog" v-model="open">
    <q-card>
      <q-card-section>
        <div class="text-h6">Videollamada</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro.
        Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'VideoCallDialog',
  data () {
    return {
      open: false
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
      this.$emit('ok')
      this.hide()
    }
  }
}
</script>
