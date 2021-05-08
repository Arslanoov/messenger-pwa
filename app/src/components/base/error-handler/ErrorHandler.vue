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
import {defineComponent, PropType} from "vue"

import { ViolationInterface } from "@/types/violation"

import { capitalize } from "@/utils/capitalize"

export default defineComponent({
  name: "ErrorHandler",
  props: {
    violations: {
      type: Array as PropType<ViolationInterface[]>,
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
  margin-bottom 1.3rem

  color error-color
</style>
