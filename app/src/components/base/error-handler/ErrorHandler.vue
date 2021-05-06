<template>
  <template v-if="violations.length > 0">
    <div
      v-for="violation in violations"
      class="error"
    >
      {{ capitalize(violation.propertyPath) }}: {{ violation.title }}
    </div>
  </template>

  <div v-if="message" class="error">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { capitalize } from "@/utils/capitalize"

export default defineComponent({
  name: "ErrorHandler",
  props: {
    violations: {
      // TODO: Interface
      type: Array,
      required: false,
      default: () => []
    },
    message: {
      type: String,
      required: false,
      default: null
    }
  },
  setup() {
    return {
      capitalize
    }
  }
})
</script>

<style lang="stylus" scoped>
.error
  margin-bottom .8rem

  color error-color
</style>
