<script setup lang="ts">
import type { Props } from './index.server'
import { Form, useForm } from '@void/vue'
import { connect } from 'void/ws'
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<Props>()
const form = useForm('/chat', { message: '' })

let socket: ReturnType<typeof connect<'/ws/chat'>> | undefined
const memo = ref('')
const messages = ref<string[]>([])

onMounted(() => {
  console.log('on mounted')
  socket = connect('/ws/chat')

  socket.on('message', (event) => {
    console.log('on message')
    messages.value.push(event.message)
  })
})

onUnmounted(() => {
  console.log('on UNmounted')
  socket?.close()
})

function sendMessage() {
  console.log('SEND')
  socket?.send({
    message: memo.value,
  })
}
</script>

<template>
  <main>
    <h1>Chat</h1>
    <form @submit.prevent="sendMessage()">
      <label>Message <input v-model="memo" /></label>
      <button :disabled="memo.length === 0">メッセージ送信</button>
    </form>
    <pre>
      {{ messages }}
    </pre>
  </main>
</template>
