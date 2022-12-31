<template>
  <div id="app">
    <img id="logo-image" alt="Vue logo" src="./assets/logo.png" />
    <ControlPanel @add-new-note="addNewNote" />
    <NotesList
      :notes="notesList"
      :edit-note-link="editNoteLink"
      @remove-note="removeNote"
      @edit-note-set-link="editNoteSetLink"
      @edit-note-push="editNote" />
  </div>
  <AddNoteModal />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import NotesList from './NotesList.vue';
import ControlPanel from './ControlPanel.vue';
import {NotesService} from './services/notesService';
import AddNoteModal from 'components/modal/addNote/addNewNoteModal.vue';
import {Note} from 'types/note';

export default defineComponent({
  name: 'App',
  components: {NotesList, ControlPanel, AddNoteModal},
  data: function (): {
    editNoteLink: Note | null;
    notes: Record<string, Omit<Note, 'key'>>;
    currentPopup: '' | 'editNote' | 'newNote' | 'readNote' | 'removeNote';
  } {
    return {
      editNoteLink: null,
      notes: {},
      currentPopup: '',
    };
  },
  computed: {
    notesList: function () {
      return Object.entries(this.notes).map(([key, value]) => ({
        ...value,
        key,
      }));
    },
  },
  created() {
    NotesService.subscribe(notes => {
      this.notes = notes;
    });
  },
  methods: {
    addNewNote: function (newNote: any) {
      NotesService.create({...newNote, date: new Date().toISOString()});

      this.$store.commit('closeAddNewNoteModal');
    },
    removeNote: function (key: any) {
      NotesService.deleteOne(key);
    },
    editNoteSetLink: function (note: any) {
      this.editNoteLink = note;
    },
    editNote: function ({title, text}: any) {
      if (!this.editNoteLink) {
        return;
      }

      NotesService.set(this.editNoteLink.key, {
        title,
        text,
        date: new Date().toISOString(),
      });
    },
  },
});
</script>

<style lang="sass">
body
  padding: 0px
  margin: 0px
  background: linear-gradient(to right, #F29492, #114357)

#app
  display: flex
  flex-direction: column
  align-items: center
  margin: 40px 0px

@media screen and (max-width: 600px)
  #logo-image
    width: 40%
</style>
