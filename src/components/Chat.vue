<template>
  <div class="WAL position-relative" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-6" container>
      <q-header elevated>
        <q-toolbar class="bg-white text-black">

          <span class="q-subtitle-1 q-pl-md">
            # {{ chatId }}
          </span>

          <q-space/>

          <q-btn round flat icon="eva-video-outline" />
          <q-btn round flat>
            <q-icon name="eva-mic-outline" />
          </q-btn>
          <q-btn round flat icon="eva-close" @click="disconnectChat" />
        </q-toolbar>
      </q-header>

      <q-page-container id="scrollChat" class="bg-grey-2 q-layout-padding q-my-sm scroll overflow-hidden" style="min-height: 100vh">
        <div class="q-ma-md">
          <div v-for="(msg, index) in messages" :key="index">
            <!-- Received message -->
            <div v-if="msg.received">
              <div v-if="(typeof msg.received) === 'object'" class="q-py-sm">
                <q-chat-message>
                  <img :src="imgLink(msg.received.blob)" @click="viewPhoto(msg.received)" style="max-width: 38vw">
                </q-chat-message>
              </div>
              <q-chat-message v-else :text="[msg.received]" />
            </div>
            <!-- send Message -->
            <div v-else>
              <div v-if="(typeof msg) === 'object'" class="q-py-sm">
                <q-chat-message sent>
                  <img :src="imgLink(msg.blob)" @click="viewPhoto(msg)" style="max-width: 38vw">
                </q-chat-message>
              </div>
              <q-chat-message v-else :text="[msg]" sent />
            </div>
          </div>
        </div>
      </q-page-container>

      <q-footer>
        <q-toolbar class="bg-white text-black q-py-sm row justify-center items-center">
          <q-btn round flat icon="eva-attach" class="q-mr-xs" @click="shareFile"/>
          <q-input
            rounded
            outlined
            dense
            class="WAL__field q-mr-sm col-md-grow"
            bg-color="grey-3"
            v-model="message"
            placeholder="Escribe un mensaje..."
            @keydown.enter.prevent="sendMessage"
          />
          <q-btn round color="primary" icon="eva-paper-plane-outline" @click="sendMessage"/>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import ShareFileDialog from 'components/ShareFileDialog.vue'
import ImageViewerDialog from 'components/ImgViewer.vue'

export default {
  name: 'ChatLayout',
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      message: '',
      currentConversationIndex: 0
    }
  },
  props: {
    chatId: {
      type: String,
      required: true
    },
    messages: {
      type: Array
    }
  },
  methods: {
    sendMessage () {
      if (this.message) {
        this.$emit('sendMessage', this.message)
        this.message = undefined
      }
      this.scrollToElement()
    },
    disconnectChat () {
      this.$emit('disconnectChat')
    },
    shareFile () {
      this.$q.dialog({
        component: ShareFileDialog
      }).onOk((file) => {
        var blob = new Blob([file, { name: file.name, type: file.type }])
        blob = new File([blob], file.name)
        console.log('Blob:', blob)
        this.$emit('sendMessage', { blob, name: file.name })
        this.scrollToElement()
      })
    },
    imgLink (blob) {
      blob = new Blob([blob], { type: blob.type })
      return window.URL.createObjectURL(blob)
    },
    viewPhoto (image) {
      this.$q.dialog({
        component: ImageViewerDialog,
        image: this.imgLink(image.blob),
        imgData: image
      }).onOk(() => {
      })
    },
    scrollToElement () {
      // takes an element object
      const container = this.$el.querySelector('#scrollChat')
      // const container = this.$refs.scrollChat
      container.scrollIntoView({ block: 'end' })
    }
  },
  computed: {
    style () {
      return {
        height: this.$q.screen.height + 'px'
      }
    }
  }
}
</script>

<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px
  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    // background-color: #009688
  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: .7em
  &__field.q-field--outlined .q-field__control:before
    border: none
  .q-drawer--standard
    .WAL__drawer-close
      display: none
@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0
@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none
.conversation__summary
  margin-top: 4px
.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
