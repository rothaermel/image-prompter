<template>
  <div class="prompt-builder p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="h5 mb-0">Generated Prompt</h2>
      <div class="btn-group" role="group">
        <button 
          type="button" 
          class="btn btn-sm btn-secondary"
          :disabled="!isValid"
          @click="$emit('copy')"
          title="Copy prompt to clipboard"
        >
          <i class="bi bi-clipboard me-1"></i>Copy
        </button>
        <button 
          type="button" 
          class="btn btn-sm btn-secondary"
          :disabled="!isValid"
          @click="$emit('select')"
          title="Select text for manual copy"
        >
          <i class="bi bi-cursor-text me-1"></i>Select
        </button>
        <button 
          type="button" 
          class="btn btn-sm btn-primary"
          :disabled="!isValid"
          @click="$emit('chatgpt')"
          title="Open ChatGPT with this prompt"
        >
          <i class="bi bi-chat-dots me-1"></i>ChatGPT
        </button>
      </div>
    </div>

    <textarea 
      id="prompt-output-textarea"
      :value="prompt"
      class="prompt-output form-control mb-3"
      rows="12"
      readonly
    ></textarea>

    <div class="prompt-format">
      <strong>Format:</strong>
      <code class="d-block mt-2">
        [Photography Type] of a [Focal Point] inside of a [Place] on a [Weather] [Time of Day] in [Month] in [Geographical Location]. The [Art Style]-inspired [Place] features [Color 1] walls with [Color 2] [Pattern Description] details, complemented by [Color 3] accents and decorated with [Decor Element]. The composition emphasizes a [Focal Point]. Captured with [Photography Angle] under [Light Conditions]. [Photography Type], [Color 1], [Color 2], [Color 3], [Art-Style], [Material 1], [Photography Angle], [Light Conditions]
      </code>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromptOutput',
  props: {
    prompt: {
      type: String,
      required: true
    },
    isValid: {
      type: Boolean,
      default: false
    }
  },
  emits: ['copy', 'select', 'chatgpt']
}
</script>
