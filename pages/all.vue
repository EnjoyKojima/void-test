<script setup lang="ts">
import type { Props } from "./index.server";
import { Link } from "@void/vue";

defineProps<Props>();
</script>

<template>
  <main>
    <h1>All Messages</h1>
    <Link>Top</Link>
    <p v-if="messages.length === 0">
      No messages yet. Run <code>void db seed</code> to load the sample row from
      <code>db/seed.ts</code>.
    </p>
    <ul v-else>
      <li v-for="message in messages" :key="message.id">
        <strong>{{ message.text }}</strong>
        <br />
        <small>{{ String(message.createdAt) }}</small>
      </li>
    </ul>
  </main>
</template>

<style>
h1 {
  color: blueviolet;
}
</style>
