<script setup>
import { ref, watch, onMounted } from "vue"

const inputLyrics = ref("")
const formattedLyrics = ref("")
const inputRef = ref(null)
const copyButtonText = ref("Copy to Clipboard") // <-- button label

function formatLyrics() {
  if (!inputLyrics.value) {
    formattedLyrics.value = ""
    return
  }

  const sections = ["Verse", "Chorus", "Bridge", "Pre-Chorus", "Tag"]
  const lines = inputLyrics.value.split("\n")
  const result = []

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    const isBracketed = /^\[.*\]$/.test(trimmed)
    const isSection = sections.some(section => trimmed.startsWith(section))

    if (isBracketed || isSection) {
      if (result.length > 0) result.push("")

      if (!isBracketed) {
        result.push(`[${trimmed}]`)
      } else {
        result.push(trimmed)
      }

      result.push("")
      return
    }

    if (trimmed !== "") {
      result.push(trimmed)
    }
  })

  formattedLyrics.value = result.join("\n")

  copyToClipboard()
}

// auto format on input
watch(inputLyrics, () => {
  formatLyrics()
})

// autofocus on page load
onMounted(() => {
  inputRef.value?.focus()
})

async function copyToClipboard() {
  if (!formattedLyrics.value) return

  await navigator.clipboard.writeText(formattedLyrics.value)

  // Change button text temporarily
  copyButtonText.value = "Copied!"
  setTimeout(() => {
    copyButtonText.value = "Copy to Clipboard"
  }, 1000) // revert after 2 seconds
}
</script>

<template>
  <div class="container">
    <h1 class="color-red">ProPresenter Lyrics Formatter</h1>

    <div class="flex">
      <textarea
        ref="inputRef"
        v-model="inputLyrics"
        placeholder="Paste lyrics here..."
      ></textarea>

      <div class="buttons">
        <!-- <button @click="formatLyrics">Format</button> -->
        <button @click="copyToClipboard">{{ copyButtonText }}</button>
      </div>

      <textarea
        v-model="formattedLyrics"
        placeholder="Formatted lyrics appear here"
        readonly
      ></textarea>
    </div>
  </div>
</template>

<style>
*{
  /* outline: 1px solid red; */
}
body {
  font-family: sans-serif;
  background: #111;
  color: white;
}

.container {
  height: 100vh;
  max-width: 89rem;
  margin: auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.flex{
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

textarea {
  min-height: 40vh;
  max-height: 70vh;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  font-size: 14px;
  resize: none;
  overflow-y: auto;
}

.buttons {
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  height: 4rem;
  border-radius: 0.5rem;
  margin: auto 0;
}

button {
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
}
</style>