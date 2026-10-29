import { defineHandler, type InferProps } from 'void'
import * as v from 'valibot'
import { ChatRoom } from '../durable-objects/ChatRoom'

export type Props = InferProps<typeof loader>

export const loader = defineHandler(async () => {
  const room = ChatRoom.get('global')
  return room
})

export const action = defineHandler.withValidator({
  body: v.object({
    message: v.pipe(v.string(), v.minLength(1), v.maxLength(20)),
  }),
})(async (_c, { body }) => {
  const room = ChatRoom.get('global')
  await room.addMeaage(body.message)
})
