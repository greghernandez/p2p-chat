<template>
  <div class="flex flex-center window-height" >
    <q-card v-if="connection === null" class="my-card text-center">
      <q-card-section>
        <div class="text-h5 text-primary text-bold">Crear Chat</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1 q-py-sm">Comparte el ID de tu chat</div>

        <div class="q-px-md q-py-md">
          <q-input filled dense :value="myPeerId" readonly>

            <template v-slot:prepend>
              <q-icon name="eva-lock-outline" />
            </template>

            <template v-slot:after>
              <q-btn round color="primary" icon="eva-copy-outline" @click="coppyChatId(myPeerId)" />
            </template>
          </q-input>
        </div>

        <div v-if="waiting">
          <div>
            <q-spinner color="primary" size="2em" />
          </div>
          <div>Esperando una conexión</div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Chat View-->
    <chat
      v-if="connection != null"
      :chatId="myPeerId"
      :messages="messages"
      @sendMessage="sendMessage"
      @disconnectChat="disconnectChat"
    />

  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
import Chat from 'components/Chat.vue'

export default {
  name: 'CreateChatPage',
  components: {
    Chat
  },
  data () {
    return {
      myPeerId: null,
      myPeer: null,
      connection: null,
      waiting: true,
      messages: []
    }
  },
  created () {
    this.myPeerId = 'Generando ID...'
    // Create Peer
    this.myPeer = new this.$Peer(null, {
      debug: 3,
      host: 'localhost',
      port: 9000,
      path: '/',
      config: {
        iceServers: [
          { url: 'stun:stun.l.google.com:19302' },
          { url: 'turn:numb.viagenie.ca', username: 'gregoryarthur13@gmail.com', credential: 'C6z@sG4MZ5fuduU' }
        ]
      }
    })

    // On peer open
    this.myPeer.on('open', (id) => {
      this.myPeerId = id
      this.myPeer.on('data', function (data) {
        console.log('Received', data)
      })
    })

    // On p2 connection
    this.myPeer.on('connection', conn => {
      // set connection
      this.connection = conn
      console.log('- Connection:', this.connection)
      // Notify message
      this.$q.notify({
        message: 'Conectado',
        color: 'positive',
        icon: 'eva-checkmark-circle-outline'
      })
      // change waiting value
      this.waiting = false
      // Receiving Data
      this.connection.on('data', (data) => {
        console.log(data)
        var element = {}
        element.received = data
        this.messages.push(element)
      })

      // Disconnect handler
      this.connection.on('disconnected', () => {
        this.waiting = true
        this.connection = null
        console.log('-----Desconectado-----')
      })
      // On connection close handler
      this.connection.on('close', () => {
        this.waiting = true
        console.log('-----Close-----')
        this.connection = null
      })
    })

    // On error handler
    this.myPeer.on('error', (err) => {
      console.log('-- Error', err)
      this.waiting = true
      this.connection = null
    })

    this.myPeer.on('disconnected', (err) => {
      console.log('-- disconected', err)
      this.waiting = true
      this.connection = null
    })
  },
  methods: {
    // Copy chat ID
    coppyChatId (chatId) {
      copyToClipboard(chatId)
        .then(() => {
          this.$q.notify({
            message: 'ID copiado',
            color: 'positive',
            icon: 'eva-copy-outline'
          })
        })
    },
    sendMessage (msg) {
      console.log(msg)
      this.messages.push(msg)
      this.connection.send(msg)
    },
    // Disconnect Chat
    disconnectChat () {
      this.connection.close()
    }
  },
  // Close sesion before leave route
  beforeRouteLeave (to, from, next) {
    if (this.connection) {
      this.connection.close()
    }
    next()
  }
}
</script>
