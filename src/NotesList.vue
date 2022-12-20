<template>
  <div class="note-list">
    <ul>
      <li v-for="note in notesSortedByDate" :key="note.key">
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
      </li>
    </ul>

    <EditNoteModal v-if="showEditNoteModal" @close="cancelEditNote">
      <template #header>
        <h3>Edit note</h3>
      </template>

      <template #body>
        <form
          id="edit-note-form"
          @submit.prevent="$emit('editNotePush', editNoteValues)">
          <p>Note Title</p>
          <input
            v-model="editNote.title"
            type="text"
            placeholder="Title"
            required />
          <p>Note Text</p>
          <textarea
            v-model="editNote.text"
            placeholder="Your note..."
            required></textarea>
        </form>
      </template>

      <template #footer>
        <button form="edit-note-form">Edit Note</button>
      </template>
    </EditNoteModal>

    <ReadNoteModal v-if="showReadNoteModal" @close="showReadNoteModal = false">
      <template #header>
        <h3>{{ readNoteValues.title }}</h3>
      </template>

      <template #body>
        <p>{{ readNoteValues.text }}</p>
      </template>
    </ReadNoteModal>

    <RemoveNoteModal
      v-if="showRemoveNoteModal"
      @close="showRemoveNoteModal = false">
      <template #header>
        <h3>Remove this note?</h3>
      </template>

      <template #body>
        <p>{{ confirmRemoveNoteLink.title }}</p>
      </template>

      <template #footer>
        <button
          @click="
            $emit('removeNote', confirmRemoveNoteLink.key);
            showRemoveNoteModal = false;
          ">
          Yes
        </button>
        <button @click="showRemoveNoteModal = false">No</button>
      </template>
    </RemoveNoteModal>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';

import EditNoteModal from './EditNoteModal.vue';
import ReadNoteModal from './ReadNoteModal.vue';
import RemoveNoteModal from './RemoveNoteModal.vue';
import IntlService from './services/internationalization/intlService';

type Note = {title: string; text: string; date: string}; // TODO move type declaration to storage section

type ComponentData = {
  showEditNoteModal: boolean;
  showReadNoteModal: boolean;
  showRemoveNoteModal: boolean;
  editNoteValues: Note;
  currentReadNote: null | Note;
  confirmRemoveNoteLink: null | Note;
};

export default defineComponent({
  components: {EditNoteModal, ReadNoteModal, RemoveNoteModal},
  props: {
    notes: {type: Array as PropType<Note[]>, required: true},
    editNoteLink: {type: Object as PropType<Note>, required: true},
  },
  emits: ['editNoteSetLink', 'editNotePush', 'removeNote'],
  setup() {
    const dateFormatter = IntlService.defaultLocaleDateFormatter({
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });

    return {dateFormatter};
  },
  data: function (): ComponentData {
    return {
      showEditNoteModal: false,
      showReadNoteModal: false,
      showRemoveNoteModal: false,
      editNoteValues: {title: '', text: '', date: ''},
      currentReadNote: null,
      confirmRemoveNoteLink: null,
    };
  },
  computed: {
    searchValue: function () {
      return this.$store.state.searchInputValue;
    },
    filteredNotes: function () {
      return this.notes.filter(note =>
        note.title.toLowerCase().includes(this.searchValue),
      );
    },
    readNoteValues: function () {
      return this.currentReadNote;
    },
    editNote: function () {
      if (this.editNoteLink) {
        this.editNoteValues.title = this.editNoteLink.title;
        this.editNoteValues.text = this.editNoteLink.text;
        return this.editNoteValues;
      } else {
        return this.editNoteValues;
      }
    },
    notesSortedByDate: function () {
      const sortedNotes = [...this.filteredNotes];

      if (this.$store.state.notesOrderByDate == 'decrease') {
        sortedNotes.sort(function (a, b) {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);

          if (aDate > bDate) {
            return -1;
          }
          if (aDate < bDate) {
            return 1;
          }

          return 0;
        });
      }

      if (this.$store.state.notesOrderByDate == 'increase') {
        sortedNotes.sort(function (a, b) {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);

          if (aDate > bDate) {
            return 1;
          }
          if (aDate < bDate) {
            return -1;
          }

          return 0;
        });
      }

      return sortedNotes;
    },
  },
  methods: {
    readNote: function (note: Note) {
      this.showReadNoteModal = true;
      this.currentReadNote = note;
    },
    confirmRemoveNote: function (note: Note) {
      this.showRemoveNoteModal = true;
      this.confirmRemoveNoteLink = note;
    },
    cancelEditNote: function () {
      this.editNoteValues.title = this.editNoteLink?.title || '';
      this.editNoteValues.text = this.editNoteLink?.text || '';
      this.showEditNoteModal = false;
    },
    formatDate: function (date: string) {
      return this.dateFormatter.format(new Date(date));
    },
  },
});
</script>

<style lang="sass">
.note-list
	font-family: arial
	border: 1px solid gray
	width: 50%
	background: white
	padding: 0px 20px
	ul
		padding: 0px
		width: 100%
		li
			width: 100%
			padding: 20px 0px
			margin-bottom: 20px
			list-style-type: none
		li:not(:first-child)
			border-top: 1px solid gray
	.note
		width: 95%
		display: flex
		justify-content: space-between
		.note-header
			width: 80%
			display: flex
			justify-content: space-between
			.note-date
				text-align: right
		.note-header:hover
			cursor: pointer
		.edit-note-button:hover, .remove-note-button:hover
			cursor: pointer
@media screen and (max-width: 600px)
	.note-list
		width: 80%
		font-size: 14px
		.note
			width: 100%
			.note-header
				width: 75%
			.edit-note-button, .remove-note-button
				font-size: 18px
@media screen and (max-width: 900px)
	.note-list
		width: 70%
</style>
