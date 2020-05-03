<template>
  <div>
    <!-- Conect Card-->
    <div v-if="connection === null" class="flex flex-center window-height">
      <q-card class="my-card text-center">
        <q-card-section>
          <div class="text-h5 text-primary text-bold">Unirme a un Chat</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1 q-py-sm">Ingresa el ID del chat</div>

          <q-form @submit="connect" class="q-gutter-sm">
            <q-input rounded outlined dense clearable v-model="chatId" label="Id de Chat" icon="ion-key-outline" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Completa el campo']">
              <template v-slot:prepend>
                <q-icon name="eva-lock-outline" />
              </template>
            </q-input>
            <q-btn rounded color="primary" label="Conectar" type="submit" no-caps />
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <!-- Chat View-->
    <Chat
      v-if="connection != null"
      :chatId="chatId"
      :messages="messages"
      @sendMessage="sendMessage"
      @disconnectChat="disconnectChat"
    />

  </div>
</template>

<script>
import Peer from 'peerjs'
import Chat from 'components/Chat.vue'
export default {
  name: 'ConnectChatPage',
  components: {
    Chat
  },
  data () {
    return {
      chatId: undefined,
      message: '',
      messages: [],
      connection: null,
      myPeer: null
    }
  },
  created () {
    this.myPeer = new Peer(null, {
      debug: 3,
      // host: 'localhost',
      // path: '/',
      // port: 9000,
      config: {
        iceServers: [
          { url: 'stun:stun.l.google.com:19302' },
          { url: 'turn:numb.viagenie.ca', username: 'gregoryarthur13@gmail.com', credential: 'C6z@sG4MZ5fuduU' }
        ]
      }
    })
  },
  methods: {
    connect () {
      console.log(this.connection)
      this.connection = this.myPeer.connect(this.chatId, {
        reliable: true,
        debug: true,
        config: {
          iceServers: [{ url: 'stun:stun.l.google.com:19302' }]
        }
      })
      console.log('connection', this.connection)
      this.connection.on('open', () => {
        // Receive messages
        this.connection.on('data', (data) => {
          console.log('Received', data)
          var element = {}
          element.received = data
          this.messages.push(element)
        })
      })
      this.connection.on('close', () => {
        console.log('--Close--')
        this.connection = null
      })
    },
    sendMessage (msg) {
      console.log(msg)
      var element = {}
      element.send = msg
      this.messages.push(msg)
      this.connection.send(msg)
    },
    disconnectChat () {
      this.connection.close()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.disconnectChat()
    this.myPeer.close()
    next()
  }
}
</script>
