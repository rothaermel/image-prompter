<template>
  <div class="min-vh-100">
    <div class="container-fluid px-4 py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-10">
          <!-- Header -->
          <header class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h1 class="h2 mb-0 fw-semibold">
              <i class="bi bi-gear me-2"></i>Settings
            </h1>
            <div class="d-flex align-items-center gap-3">
              <!-- Back Button -->
              <button 
                type="button" 
                class="btn btn-outline-secondary"
                @click="goBack"
              >
                <i class="bi bi-arrow-left me-2"></i>Back
              </button>
            </div>
          </header>

          <!-- Settings Content -->
          <div class="prompt-builder p-4">
            <h3 class="h5 mb-4">Default Field Values</h3>
            <p class="text-muted mb-4">Manage default values for form fields. Default values cannot be deleted, but you can add custom ones.</p>

            <!-- Settings Categories -->
            <div v-for="(fieldName, index) in fieldNames" :key="index" class="mb-4">
              <div class="settings-field">
                <h4 class="h6 mb-3">
                  <i :class="getIconForField(fieldName) + ' me-2'"></i>
                  {{ formatFieldName(fieldName) }}
                </h4>
                
                <div class="values-container">
                  <!-- Default Values -->
                  <div v-if="defaultValues[fieldName]" class="mb-2">
                    <label class="form-label text-muted small">Default Values</label>
                    <div class="d-flex flex-wrap gap-2 mb-2">
                      <span 
                        v-for="value in defaultValues[fieldName]" 
                        :key="value" 
                        class="badge bg-secondary text-dark"
                      >
                        {{ value }}
                      </span>
                    </div>
                  </div>

                  <!-- Custom Values -->
                  <div>
                    <label class="form-label text-muted small">Custom Values</label>
                    <div class="d-flex flex-wrap gap-2 mb-2">
                      <span 
                        v-for="(value, valueIndex) in customValues[fieldName]" 
                        :key="valueIndex" 
                        class="badge bg-primary"
                      >
                        {{ value }}
                        <button 
                          type="button" 
                          class="btn-close btn-close-white ms-2"
                          style="font-size: 0.6rem;"
                          @click="removeCustomValue(fieldName, valueIndex)"
                          title="Remove custom value"
                        ></button>
                      </span>
                    </div>
                    
                    <!-- Add New Value -->
                    <div class="input-group mb-2">
                      <input 
                        v-model="newValueInputs[fieldName]"
                        type="text" 
                        class="form-control form-control-sm" 
                        :placeholder="`Add new ${formatFieldName(fieldName)} value`"
                        @keyup.enter="addCustomValue(fieldName)"
                      >
                      <button 
                        class="btn btn-primary btn-sm" 
                        type="button"
                        @click="addCustomValue(fieldName)"
                      >
                        <i class="bi bi-plus"></i> Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr v-if="index < fieldNames.length - 1" class="mt-4">
            </div>

            <!-- Save Status -->
            <div v-if="saveStatus" class="alert alert-success mt-4" role="alert">
              <i class="bi bi-check-circle me-2"></i>{{ saveStatus }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { promptOptions } from '../utils/promptUtils'

export default {
  name: 'Settings',
  emits: ['back'],
  setup(props, { emit }) {
    const defaultValues = reactive({ ...promptOptions })
    const customValues = reactive({})
    const newValueInputs = reactive({})
    const saveStatus = ref('')

    // Field names in order
    const fieldNames = [
      'photographyType',
      'place',
      'weather',
      'timeOfDay',
      'month',
      'geographicalLocation',
      'artStyle',
      'colors',
      'materials',
      'patterns',
      'decorElements',
      'photographyAngle',
      'lightConditions'
    ]

    // Initialize custom values for each field
    fieldNames.forEach(field => {
      if (!customValues[field]) {
        customValues[field] = []
      }
    })

    // Load custom values from localStorage
    const loadCustomValues = () => {
      const saved = localStorage.getItem('customValues')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          fieldNames.forEach(field => {
            if (parsed[field]) {
              customValues[field] = parsed[field]
            }
          })
        } catch (err) {
          console.error('Failed to load custom values:', err)
        }
      }
    }

    // Save custom values to localStorage
    const saveCustomValues = () => {
      try {
        localStorage.setItem('customValues', JSON.stringify(customValues))
        saveStatus.value = 'Settings saved successfully!'
        setTimeout(() => {
          saveStatus.value = ''
        }, 3000)
      } catch (err) {
        console.error('Failed to save custom values:', err)
        saveStatus.value = 'Failed to save settings'
      }
    }

    // Add custom value
    const addCustomValue = (fieldName) => {
      const value = newValueInputs[fieldName]?.trim()
      if (value && value.length > 0) {
        // Check if value already exists
        const exists = customValues[fieldName].includes(value)
        if (!exists) {
          customValues[fieldName].push(value)
          newValueInputs[fieldName] = ''
          saveCustomValues()
        }
      }
    }

    // Remove custom value
    const removeCustomValue = (fieldName, index) => {
      customValues[fieldName].splice(index, 1)
      saveCustomValues()
    }

    // Format field name for display
    const formatFieldName = (fieldName) => {
      return fieldName
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
    }

    // Get icon for field
    const getIconForField = (fieldName) => {
      const iconMap = {
        photographyType: 'bi-camera-fill',
        place: 'bi-geo-alt-fill',
        weather: 'bi-cloud-fill',
        timeOfDay: 'bi-clock-fill',
        month: 'bi-calendar-fill',
        geographicalLocation: 'bi-globe',
        artStyle: 'bi-palette-fill',
        colors: 'bi-rainbow',
        materials: 'bi-box-seam-fill',
        patterns: 'bi-grid-3x3-gap-fill',
        decorElements: 'bi-star-fill',
        photographyAngle: 'bi-eye-fill',
        lightConditions: 'bi-lightbulb-fill'
      }
      return iconMap[fieldName] || 'bi-tag-fill'
    }

    // Go back to main view
    const goBack = () => {
      emit('back')
    }

    onMounted(() => {
      loadCustomValues()
      // Initialize new value inputs
      fieldNames.forEach(field => {
        newValueInputs[field] = ''
      })
    })

    return {
      defaultValues,
      customValues,
      newValueInputs,
      saveStatus,
      fieldNames,
      addCustomValue,
      removeCustomValue,
      formatFieldName,
      getIconForField,
      goBack
    }
  }
}
</script>

<style scoped>
.settings-field {
  margin-bottom: 1.5rem;
}

.values-container {
  padding: 1rem;
  background: var(--bg-tertiary);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
}

.badge {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
}

.input-group {
  margin-top: 0.5rem;
}

.alert {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

