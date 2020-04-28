<template>
    <div>
      <q-card class="my-card text-center">
        <q-card-section>
          Create
        </q-card-section>
        <q-card-section>
          Mi id es {{ myPeerId }}
        </q-card-section>
      </q-card>
    </div>
</template>

<script>

export default {
  name: 'CreateChatPage',
  data () {
    return {
      myPeerId: null,
      myPeer: null
    }
  },
  created () {
    this.myPeer = new this.$Peer(null, {
      debug: 3
    })
    this.myPeer.on('open', (id) => {
      this.myPeerId = id
      this.myPeer.on('data', function (data) {
        console.log('Received', data)
      })
    })
    console.log(this.myPeer)
    this.myPeer.on('connection', conn => {
      console.log('Conn', conn)
      conn.on('data', (data) => {
        console.log(data)
      })
    })
  },
  beforeDestroy () {
    this.myPeer.disconnect()
  }
}
</script>
