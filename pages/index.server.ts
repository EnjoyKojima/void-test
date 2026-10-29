import { defineHandler, type InferProps } from 'void'
import { db, desc } from 'void/db'
import { messages } from '@schema'
import { createInsertSchema } from 'void/drizzle-zod'

export type Props = InferProps<typeof loader>

export const loader = defineHandler(async () => {
  const rows = await db.select().from(messages).orderBy(desc(messages.id))
  return { messages: rows }
})

export const action = defineHandler.withValidator({
  body: createInsertSchema(messages, {
    text: (schema) => schema.trim().min(1, '空ですよ').max(10, '10文字以内にしてね'),
  }).pick({ text: true }),
})(async (c, { body }) => {
  console.log('add msg')
  await db.insert(messages).values(body)
  return c.redirect('/all')
})
