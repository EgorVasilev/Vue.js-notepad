<template>
  <div id="app">
    <img id="logo-image" src="./assets/logo.png" />
    <ControlPanel @addNewNote="addNewNote"></ControlPanel>
    <NotesList
      :notes="notes"
      :edit-note-link="editNoteLink"
      @removeNote="removeNote"
      @editNoteSetLink="editNoteSetLink"
      @editNotePush="editNotePush"></NotesList>
  </div>
</template>

<script>
import NotesList from './NotesList.vue';
import ControlPanel from './ControlPanel.vue';
import {NotesService} from './services/notesService';

export default {
  name: 'App',
  components: {NotesList, ControlPanel},
  data: function () {
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
    addNewNote: function (newNote) {
      NotesService.create({...newNote, date: new Date().toLocaleString()});

      this.$store.commit('closeAddNewNoteModal');
    },
    removeNote: function (key) {
      NotesService.deleteOne(key);
    },
    editNoteSetLink: function (note) {
      this.editNoteLink = note;
    },
    editNotePush: function ({title, text}) {
      NotesService.set(this.editNoteLink.key, {
        title,
        text,
        date: new Date().toLocaleString(),
      });
    },
  },
};
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
