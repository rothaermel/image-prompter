<template>
  <div class="row g-3">
    <!-- Photography Type -->
    <div class="col-12 col-md-6">
      <label class="form-label">
        Photography Type 
        <span class="lock-icon">🔒</span>
      </label>
      <select 
        :value="formData.photographyType"
        @change="updateField('photographyType', $event.target.value)"
        class="form-select"
        :disabled="lockedFields.includes('photographyType')"
      >
        <option value="">Choose Photography Type…</option>
        <option 
          v-for="option in effectiveOptions.photographyType" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Focal Point -->
    <div class="col-12">
      <label class="form-label">Focal Point</label>
      <textarea 
        :value="formData.focalPoint"
        @input="updateField('focalPoint', $event.target.value)"
        class="form-control" 
        rows="3"
        placeholder="e.g., vintage espresso machine with chrome details"
      ></textarea>
    </div>

    <!-- Place -->
    <div class="col-12 col-md-6">
      <label class="form-label">
        Place 
        <span class="lock-icon">🔒</span>
      </label>
      <select 
        :value="formData.place"
        @change="updateField('place', $event.target.value)"
        class="form-select"
        :disabled="lockedFields.includes('place')"
      >
        <option value="">Choose Place…</option>
        <option 
          v-for="option in effectiveOptions.place" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Weather -->
    <div class="col-12 col-md-6">
      <label class="form-label">
        Weather 
        <span class="lock-icon">🔒</span>
      </label>
      <select 
        :value="formData.weather"
        @change="updateField('weather', $event.target.value)"
        class="form-select"
        :disabled="lockedFields.includes('weather')"
      >
        <option value="">Choose Weather…</option>
        <option 
          v-for="option in effectiveOptions.weather" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Time of Day -->
    <div class="col-12 col-md-6">
      <label class="form-label">
        Time of Day 
        <span class="lock-icon">🔒</span>
      </label>
      <select 
        :value="formData.timeOfDay"
        @change="updateField('timeOfDay', $event.target.value)"
        class="form-select"
        :disabled="lockedFields.includes('timeOfDay')"
      >
        <option value="">Choose Time of Day…</option>
        <option 
          v-for="option in effectiveOptions.timeOfDay" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Month -->
    <div class="col-12 col-md-6">
      <label class="form-label">
        Month 
        <span class="lock-icon">🔒</span>
      </label>
      <select 
        :value="formData.month"
        @change="updateField('month', $event.target.value)"
        class="form-select"
        :disabled="lockedFields.includes('month')"
      >
        <option value="">Choose Month…</option>
        <option 
          v-for="option in effectiveOptions.month" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Geographical Location -->
    <div class="col-12 col-md-6">
      <label class="form-label">
        Geographical Location 
        <span class="lock-icon">🔒</span>
      </label>
      <select 
        :value="formData.geographicalLocation"
        @change="updateField('geographicalLocation', $event.target.value)"
        class="form-select"
        :disabled="lockedFields.includes('geographicalLocation')"
      >
        <option value="">Choose Geographical Location…</option>
        <option 
          v-for="option in effectiveOptions.geographicalLocation" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Art Style -->
    <div class="col-12 col-md-6">
      <label class="form-label">Art Style</label>
      <select :value="formData.artStyle" @change="updateField('artStyle', $event.target.value)" class="form-select">
        <option value="">Choose Art Style…</option>
        <option 
          v-for="option in effectiveOptions.artStyle" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Colors -->
    <div class="col-12 col-md-4">
      <label class="form-label">Color 1</label>
      <select :value="formData.color1" @change="updateField('color1', $event.target.value)" class="form-select">
        <option value="">Choose Color 1…</option>
        <option 
          v-for="option in effectiveOptions.colors" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <div class="col-12 col-md-4">
      <label class="form-label">Color 2</label>
      <select :value="formData.color2" @change="updateField('color2', $event.target.value)" class="form-select">
        <option value="">Choose Color 2…</option>
        <option 
          v-for="option in effectiveOptions.colors" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <div class="col-12 col-md-4">
      <label class="form-label">Color 3</label>
      <select :value="formData.color3" @change="updateField('color3', $event.target.value)" class="form-select">
        <option value="">Choose Color 3…</option>
        <option 
          v-for="option in effectiveOptions.colors" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Material -->
    <div class="col-12 col-md-6">
      <label class="form-label">Material 1</label>
      <select :value="formData.material1" @change="updateField('material1', $event.target.value)" class="form-select">
        <option value="">Choose Material 1…</option>
        <option 
          v-for="option in effectiveOptions.materials" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Pattern Description -->
    <div class="col-12 col-md-6">
      <label class="form-label">Pattern Description</label>
      <select :value="formData.patternDescription" @change="updateField('patternDescription', $event.target.value)" class="form-select">
        <option value="">Choose Pattern Description…</option>
        <option 
          v-for="option in effectiveOptions.patterns" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Decor Element -->
    <div class="col-12 col-md-6">
      <label class="form-label">Decor Element</label>
      <select :value="formData.decorElement" @change="updateField('decorElement', $event.target.value)" class="form-select">
        <option value="">Choose Decor Element…</option>
        <option 
          v-for="option in effectiveOptions.decorElements" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Photography Angle -->
    <div class="col-12 col-md-6">
      <label class="form-label">
        Photography Angle 
        <span class="lock-icon">🔒</span>
      </label>
      <select 
        :value="formData.photographyAngle"
        @change="updateField('photographyAngle', $event.target.value)"
        class="form-select"
        :disabled="lockedFields.includes('photographyAngle')"
      >
        <option value="">Choose Photography Angle…</option>
        <option 
          v-for="option in effectiveOptions.photographyAngle" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Light Conditions -->
    <div class="col-12">
      <label class="form-label">
        Light Conditions 
        <span class="lock-icon">🔒</span>
      </label>
      <select 
        :value="formData.lightConditions"
        @change="updateField('lightConditions', $event.target.value)"
        class="form-select"
        :disabled="lockedFields.includes('lightConditions')"
      >
        <option value="">Choose Light Conditions…</option>
        <option 
          v-for="option in effectiveOptions.lightConditions" 
          :key="option" 
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { promptOptions } from '../utils/promptUtils'

export default {
  name: 'PromptForm',
  props: {
    formData: {
      type: Object,
      required: true
    },
    lockedFields: {
      type: Array,
      default: () => []
    },
    mergedOptions: {
      type: Object,
      default: () => promptOptions
    }
  },
  emits: ['update:formData'],
  computed: {
    localFormData: {
      get() {
        return this.formData
      },
      set(value) {
        this.$emit('update:formData', value)
      }
    },
    effectiveOptions() {
      const maybeRef = this.mergedOptions
      const value = maybeRef && typeof maybeRef === 'object' && 'value' in maybeRef
        ? maybeRef.value
        : maybeRef
      return value || promptOptions
    }
  },
  methods: {
    updateField(field, value) {
      const newData = { ...this.formData }
      newData[field] = value
      this.$emit('update:formData', newData)
    }
  },
  data() {
    return {
      promptOptions
    }
  },
  watch: {
    mergedOptions: {
      handler(newVal) {
        console.log('PromptForm mergedOptions changed:', newVal)
        console.log('PromptForm new photographyType:', newVal?.photographyType)
      },
      deep: true
    }
  }
}
</script>
