<template>
	<div id="app">
		<img id="logo-image" src="./assets/logo.png">
		<control-panel @addNewNote="addNewNote"></control-panel>
		<notes-list @removeNote="removeNote" @editNoteSetLink="editNoteSetLink" @editNotePush="editNotePush" v-bind:notes = "this.notes" v-bind:editNoteLink = "this.editNoteLink"></notes-list>
	</div>
</template>

<script>
	import {firebaseDB} from './DataBase.js';
  import { ref, onValue } from 'firebase/database'


  import NotesList from './NotesList.vue';
	import ControlPanel from './ControlPanel.vue';
	
	//make query to firebase and get Notes node
  const notesRef = ref(firebaseDB, 'notes')

  let notes = [];

  onValue(notesRef, snap => {
    notes = Object.values(snap.exportVal());
  })

  export default {
		name: 'app',
		components: { NotesList, ControlPanel },
		data : function() {
			return {
				editNoteLink: null,
        notes
			}
		},
		methods : {
			addNewNote : function(newNote) {
				newNote.date = new Date().toLocaleString();
				notesRef.push(newNote);
				newNote.title = '';
				newNote.text = '';
				newNote.date = '';
				this.$store.commit('closeAddNewNoteModal');
			},
			removeNote : function(note) {
				notesRef.child(note['.key']).remove();
			},
			editNoteSetLink : function(note) {
				this.editNoteLink = note;
			},
			editNotePush : function(editNoteValues) {
				var editNoteRef = db.ref('notes/' + this.editNoteLink['.key'])
				editNoteRef.set({
					title: editNoteValues.title,
					text: editNoteValues.text,
					date: new Date().toLocaleString()
				});
			}
		}
	}
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
