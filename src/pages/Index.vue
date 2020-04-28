<template>
  <div class="flex flex-center gradient-background window-height">
    <q-card class="my-card text-center">
      <q-card-section>
        <div class="text-h5 text-bold">Chat P2P</div>
        <div class="text-h6">¿Que quieres hacer?</div>
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-sm">
          <q-btn to="/chat/create" unelevated rounded color="primary" label="Crear Chat" no-caps />
          <q-btn to="/chat/connect" unelevated rounded color="secondary" label="Conectarme" no-caps />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
