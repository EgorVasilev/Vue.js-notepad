<template>
  <form id="add-new-note-form" @submit.prevent="onSubmit">
    <p>Note Title</p>
    <input v-model="form.title" type="text" placeholder="Title" required />
    <p>Note Text</p>
    <textarea
      v-model="form.text"
      placeholder="Your note..."
      required></textarea>
  </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AddNewNoteForm',
});
</script>

<script lang="ts" setup>
import {defineEmits, reactive} from 'vue';

const form = reactive({title: '', text: ''});

const emit = defineEmits<{
  (emit: 'addNewNote', formData: {title: string; text: string}): void;
}>();

function onSubmit() {
  emit('addNewNote', form);
}
</script>

<style scoped></style>
