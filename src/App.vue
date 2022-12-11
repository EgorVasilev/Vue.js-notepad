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
import {onValue} from 'firebase/database';

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
    onValue(NotesService.getAll(), snapshot => {
      this.notes = Object.values(snapshot.val());
    });
  },
  methods: {
    addNewNote: function (newNote) {
      newNote.date = new Date().toLocaleString();
      notesRef.push(newNote);
      newNote.title = '1';
      newNote.text = '';
      newNote.date = '';
      this.$store.commit('closeAddNewNoteModal');
    },
    removeNote: function (note) {
      notesRef.child(note['.key']).remove();
    },
    editNoteSetLink: function (note) {
      this.editNoteLink = note;
    },
    editNotePush: function (editNoteValues) {
      var editNoteRef = db.ref('notes/' + this.editNoteLink['.key']);
      editNoteRef.set({
        title: editNoteValues.title,
        text: editNoteValues.text,
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
