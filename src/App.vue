<template>
  <div class="min-vh-100">
    <!-- Settings View -->
    <Settings v-if="currentView === 'settings'" @back="goToMainView" />
    
    <!-- Main View -->
    <div v-else class="container-fluid px-4 py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
          <!-- Header -->
          <header class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h1 class="h2 mb-0 fw-semibold">Image Prompt Builder</h1>
            <div class="d-flex align-items-center gap-3">
              <!-- Settings Button -->
              <button 
                type="button" 
                class="btn btn-outline-secondary btn-sm"
                @click="goToSettings"
                title="Open Settings"
              >
                <i class="bi bi-gear me-1"></i>Settings
              </button>
              
              <!-- Theme Toggle -->
              <button 
                type="button" 
                class="btn btn-outline-secondary btn-sm theme-toggle"
                @click="toggleTheme"
                :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
              >
                <i :class="isDarkMode ? 'bi bi-sun' : 'bi bi-moon'"></i>
                <span class="ms-1">{{ isDarkMode ? 'Light' : 'Dark' }}</span>
              </button>
              
              <!-- Action Buttons -->
              <div class="btn-group" role="group">
              <button 
                type="button" 
                class="btn btn-primary"
                @click="randomizeFields"
                title="Randomize all unlocked fields"
              >
                <i class="bi bi-shuffle me-2"></i>Randomize
              </button>
              <button 
                type="button" 
                class="btn btn-success"
                @click="harmonizeFields"
                title="Remix unlocked fields with harmonious choices"
              >
                <i class="bi bi-magic me-2"></i>Harmonize
              </button>
              <button 
                type="button" 
                class="btn btn-secondary"
                @click="resetFields"
                title="Reset all fields"
              >
                <i class="bi bi-arrow-clockwise me-2"></i>Reset
              </button>
              </div>
            </div>
          </header>

          <!-- Main Content -->
          <div class="row g-4">
            <!-- Form Section -->
            <div class="col-12 col-lg-8">
              <div class="prompt-builder p-4">
                <PromptForm 
                  :formData="formData"
                  :locked-fields="lockedFields"
                  :merged-options="mergedOptions"
                  @update:formData="updateFormData"
                />
              </div>
            </div>

            <!-- Output Section -->
            <div class="col-12 col-lg-4">
            <PromptOutput 
              :prompt="generatedPrompt"
              :is-valid="isFormValid"
              @copy="copyPrompt"
              @select="selectPrompt"
              @chatgpt="openChatGPT"
            />
            </div>
          </div>

          <!-- Footer -->
          <footer class="mt-5 text-muted small">
            Built for image generation · Tip: Use <code>Harmonize</code> for coherent combos, <code>Randomize</code> for exploration.
            <br>
          <!-- INSERT_YOUR_CODE -->
          <a href="https://github.com/rothaermel/image-prompter.git" target="_blank">Project GitHub Repository</a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'
import PromptForm from './components/PromptForm.vue'
import PromptOutput from './components/PromptOutput.vue'
import Settings from './components/Settings.vue'
import { promptOptions, generatePrompt, randomizeFormData, harmonizeFormData } from './utils/promptUtils'

export default {
  name: 'App',
  components: {
    PromptForm,
    PromptOutput,
    Settings
  },
  setup() {
    // View management
    const currentView = ref('main') // 'main' or 'settings'
    
    // Theme management
    const isDarkMode = ref(true) // Will be set from user or OS preference
    
    // Force reactivity trigger
    const optionsVersion = ref(0)
    
    // Load and merge custom values with default options
    const loadMergedOptions = () => {
      const saved = localStorage.getItem('customValues')
      let customValues = {}
      
      if (saved) {
        try {
          customValues = JSON.parse(saved)
        } catch (err) {
          console.error('Failed to load custom values:', err)
        }
      }
      
      // Merge custom values with default options
      const merged = { ...promptOptions }
      Object.keys(customValues).forEach(key => {
        if (merged[key] && Array.isArray(customValues[key])) {
          merged[key] = [...merged[key], ...customValues[key]]
          console.log(`Merged ${key}:`, merged[key])
        }
      })
      
      console.log('Custom values loaded:', customValues)
      console.log('Merged options photographyType:', merged.photographyType)
      
      return merged
    }
    
    // Use a computed property that updates when optionsVersion changes
    const mergedOptions = computed(() => {
      // Reference optionsVersion to make it reactive
      optionsVersion.value
      const result = loadMergedOptions()
      console.log('mergedOptions computed triggered, photographyType:', result.photographyType)
      return result
    })
    
    // Form data
    const formData = reactive({
      photographyType: '',
      focalPoint: '',
      place: '',
      weather: '',
      timeOfDay: '',
      month: '',
      geographicalLocation: '',
      artStyle: '',
      color1: '',
      color2: '',
      color3: '',
      material1: '',
      patternDescription: '',
      decorElement: '',
      photographyAngle: '',
      lightConditions: ''
    })

    // Locked fields (with lock icons)
    const lockedFields = [
      
    ]

    // Computed properties
    const isFormValid = computed(() => {
      return formData.focalPoint.trim() !== '' && 
             Object.values(formData).some(value => value !== '')
    })

    const generatedPrompt = computed(() => {
      if (!isFormValid.value) {
        return 'Fill all fields (including Focal Point) to generate your prompt…'
      }
      return generatePrompt(formData)
    })

    // (status bar removed)

    // Methods
    const updateFormData = (newData) => {
      Object.assign(formData, newData)
    }

    const randomizeFields = () => {
      const randomized = randomizeFormData(mergedOptions.value)
      Object.assign(formData, randomized)
    }

    const harmonizeFields = () => {
      const harmonized = harmonizeFormData(formData, mergedOptions.value)
      Object.assign(formData, harmonized)
    }

    const resetFields = () => {
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
    }

    const copyPrompt = async () => {
      try {
        await navigator.clipboard.writeText(generatedPrompt.value)
        // You could add a toast notification here
        console.log('Prompt copied to clipboard')
      } catch (err) {
        console.error('Failed to copy prompt:', err)
      }
    }

    const selectPrompt = () => {
      const textarea = document.getElementById('prompt-output-textarea')
      if (textarea) {
        textarea.select()
      }
    }

    const openChatGPT = () => {
      // Encode the prompt for URL
      const encodedPrompt = encodeURIComponent(generatedPrompt.value)
      // Open ChatGPT in a new window with the prompt pre-filled
      const chatGPTUrl = `https://chat.openai.com/?q=${encodedPrompt}`
      window.open(chatGPTUrl, '_blank', 'noopener,noreferrer')
    }

    const applyTheme = (mode) => {
      const isDark = mode === 'dark'
      isDarkMode.value = isDark
      if (isDark) {
        document.documentElement.classList.add('dark-theme')
        document.documentElement.classList.remove('light-theme')
      } else {
        document.documentElement.classList.add('light-theme')
        document.documentElement.classList.remove('dark-theme')
      }
    }

    const toggleTheme = () => {
      const next = isDarkMode.value ? 'light' : 'dark'
      applyTheme(next)
      localStorage.setItem('theme', next)
    }

    // Navigation methods
    const goToSettings = () => {
      currentView.value = 'settings'
    }

    const goToMainView = () => {
      currentView.value = 'main'
      // Trigger reactivity by incrementing version
      optionsVersion.value++
    }

    // Initialize theme on mount
    onMounted(() => {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'dark' || savedTheme === 'light') {
        applyTheme(savedTheme)
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        applyTheme(prefersDark ? 'dark' : 'light')
      }

      // Update to OS theme changes only if user hasn't set a preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemThemeChange = (e) => {
        const userSet = localStorage.getItem('theme')
        if (!userSet) {
          applyTheme(e.matches ? 'dark' : 'light')
        }
      }
      try {
        mediaQuery.addEventListener('change', handleSystemThemeChange)
      } catch {
        // Safari fallback
        mediaQuery.addListener(handleSystemThemeChange)
      }

      onUnmounted(() => {
        try {
          mediaQuery.removeEventListener('change', handleSystemThemeChange)
        } catch {
          mediaQuery.removeListener(handleSystemThemeChange)
        }
      })
    })

    return {
      currentView,
      mergedOptions,
      formData,
      lockedFields,
      isFormValid,
      generatedPrompt,
      isDarkMode,
      updateFormData,
      randomizeFields,
      harmonizeFields,
      resetFields,
      copyPrompt,
      selectPrompt,
      openChatGPT,
      toggleTheme,
      applyTheme,
      goToSettings,
      goToMainView
    }
  }
}
</script>
