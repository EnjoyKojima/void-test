import { defineDurableState } from 'void/durable'

export const ChatRoom = defineDurableState({
  initialState: {
    wakeups: 0,
    messages: [] as string[],
  },
  methods: {
    addMeaage: (context, message: string) => {
      context.state.messages.push(message)
    },
  },
  fetch: (context) => {
    console.log('Messages: fetch()')
    return Response.json(context.state)
  },
  alarm: async (context) => {
    console.log('Messages: alarm()')
    context.state.wakeups += 1
    await context.setAlarm(Date.now() + 60_000)
  },
})

export default ChatRoom
