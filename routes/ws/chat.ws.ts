import { defineRoom } from 'void/ws'
import * as v from 'valibot'

export default defineRoom({
  messages: {
    client: v.object({
      message: v.string(),
    }),
    server: v.object({
      message: v.string(),
    }),
  },
  async onMessage(ctx, event) {
    const id = crypto.randomUUID()
    await ctx.storage.put(id, event.message)
    await ctx.room.broadcast(event)
  },
})
