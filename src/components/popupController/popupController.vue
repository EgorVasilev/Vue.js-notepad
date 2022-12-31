<template>
  <slot v-if="isOpen" :close="close" />

  <button @click="toggle">open</button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'PopupController',
  props: {
    isOpen: Boolean,
  },
  methods: {},
});
</script>

<style scoped></style>
