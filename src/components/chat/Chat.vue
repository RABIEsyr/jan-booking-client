<template>
  <div>
    <p>Chat works</p>
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  methods: {
    sendMessage() {
      this.$store.dispatch('socketOnConnection', {msg: 'sosa', id: '5fdf3939a083b610dcf547f9'})
    }
  }
}
</script>

<style>

</style>