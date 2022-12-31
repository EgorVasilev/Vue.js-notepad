<template>
  <div class="note">
    <div class="note-header" @click="readNote(note)">
      <span class="note-title">{{ note.title }}</span>
      <span class="note-date">{{ formatDate(note.date) }}</span>
    </div>
    <span
      class="edit-note-button"
      @click="$emit('editNoteSetLink', note), (showEditNoteModal = true)"
      ><i class="fa fa-pencil"></i
    ></span>
    <span class="remove-note-button" @click="confirmRemoveNote(note)"
      ><i class="fa fa-trash-o"></i
    ></span>
  </div>
</template>

<script>
export default {
  name: 'NoteItem',
};
</script>

<style scoped></style>
