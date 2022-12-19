<template>
  <div id="app">
    <img id="logo-image" alt="Vue logo" src="./assets/logo.png" />
    <ControlPanel @add-new-note="addNewNote"></ControlPanel>
    <NotesList
      :notes="notes"
      :edit-note-link="editNoteLink"
      @remove-note="removeNote"
      @edit-note-set-link="editNoteSetLink"
      @edit-note-push="editNotePush"></NotesList>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import NotesList from './NotesList.vue';
import ControlPanel from './ControlPanel.vue';
import {NotesService} from './services/notesService';

export default defineComponent({
  name: 'App',
  components: {NotesList, ControlPanel},
  data: function (): {editNoteLink: any; notes: any} {
    return {
      editNoteLink: null,
      notes: [],
    };
  },
  created() {
    NotesService.subscribe(
      notes =>
        (this.notes = Object.entries(notes).map(([key, value]) => ({
          ...value,
          key,
        }))),
    );
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
    editNotePush: function ({title, text}: any) {
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
