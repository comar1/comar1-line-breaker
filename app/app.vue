<script setup>
import { ref } from "vue"

const input = ref("")
const output = ref("")

function formatLines() {
  output.value = input.value
    .split("\n")
    .map(line => line.trim())
    .filter(line => line !== "")
    .join("\n\n")
}

async function copyOutput() {
  await navigator.clipboard.writeText(output.value)
}
</script>

<template>
  <h1 class="flex justify-center">ProPresenter Line Formatter</h1>
  <div class="wrapper flex flex-row gap-[1rem] h-full w-full space-x-[2rem]">

    <textarea
      v-model="input"
      placeholder="Paste lyrics here..."
    />

    <div class="buttons">
      <button @click="formatLines">Format</button>
      <button @click="copyOutput">Copy</button>
    </div>

    <textarea
      v-model="output"
      readonly
      placeholder="Formatted output..."
    />
  </div>
</template>

<style>
body{
  font-family: sans-serif;
  background:#111;
  color:white;
}

.wrapper{
  /* max-width:900px; */

  margin:auto;
  padding:40px;
}

textarea{
  width:50rem;
  height:42rem;
  margin-top:15px;
  padding:10px;
  color: #111;
}

.buttons{
  margin-top:15px;
  display:flex;
  gap:10px;
}

button{
  padding:8px 16px;
  cursor:pointer;
}
</style>