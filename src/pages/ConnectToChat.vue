<template>
  <div container style="min-width: 400px">
    <q-card class="my-card text-center">
      <q-card-section>
        Connect to chat
      </q-card-section>

      <q-card-section>
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

      <q-card-section>
        <div>Mensaje:</div>
        <q-input rounded outlined dense clearable v-model="message" label="Escribe un mensaje" icon="ion-key-outline" lazy-rules
            :rules="[ val => val && val.length > 0 || 'Completa el campo']">
          </q-input>
          <q-btn rounded color="primary" label="Conectar" no-caps @click="sendMessage" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Peer from 'peerjs'
export default {
  name: 'ConnectChatPage',
  data () {
    return {
      chatId: undefined,
      message: '',
      connection: null,
      myPeer: null
    }
  },
  created () {
    this.myPeer = new Peer(null, {
      debug: 3
    })
  },
  methods: {
    connect () {
      console.log(this.connection)
      this.connection = this.myPeer.connect(this.chatId, {
        reliable: true
      })
      console.log('connectionX', this.connection)
      this.connection.on('open', function () {
      })
      this.connection.send('Hi')
    },
    sendMessage () {
      console.log(this.message)
      this.connection.send(this.message)
    }
  }
}
</script>
