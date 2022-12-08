<template>
	<div class="note-list">

		<ul>
			<li v-for = "note in orderNotesByNews">
				<div class="note">
					<div @click="readNote(note)" class="note-header">
						<span class="note-title">{{ note.title }}</span>
						<span class="note-date">{{ note.date }}</span>						
					</div>
					<span class="edit-note-button" @click="$emit('editNoteSetLink', note), showEditNoteModal = true"><i class="fa fa-pencil"></i></span>
					<span class="remove-note-button" @click="confirmRemoveNote(note)"><i class="fa fa-trash-o"></i></span>
				</div>
			</li>
		</ul>

		<edit-note-modal v-if="showEditNoteModal" @close="cancelEditNote">
			<h3 slot="header">Edit note</h3>
			<form v-on:submit.prevent="$emit('editNotePush', editNoteValues)" slot="body" id="edit-note-form">
				<p>Note Title</p>
				<input v-model="editNote.title"  type="text"  placeholder="Title" required>
				<p>Note Text</p>
				<textarea v-model="editNote.text"  placeholder="Your note..." required></textarea>
			</form>
			<div slot="footer">
				<button form="edit-note-form"> Edit Note </button>
			</div>
		</edit-note-modal>

		<read-note-modal v-if="showReadNoteModal" @close="showReadNoteModal = false">
			<h3 slot="header">{{ readNoteValues.title }}</h3>
			<p slot="body"> {{ readNoteValues.text }} </p>
		</read-note-modal>

		<remove-note-modal v-if="showRemoveNoteModal" @close="showRemoveNoteModal = false">
			<h3 slot="header">Remove this note?</h3>
			<p slot="body"> {{ confirmRemoveNoteLink.title}}</p>
			<div slot=footer>
				<button @click="$emit('removeNote', confirmRemoveNoteLink); showRemoveNoteModal = false">Yes</button>
				<button @click="showRemoveNoteModal = false">No</button>
			</div>
		</remove-note-modal>
	</div>
</template>

<script>
	import EditNoteModal from './EditNoteModal.vue';
	import ReadNoteModal from './ReadNoteModal.vue';
	import RemoveNoteModal from './RemoveNoteModal.vue';

	export default {
		components : { EditNoteModal, ReadNoteModal, RemoveNoteModal },
		props: ['notes', 'editNoteLink'],
		data : function() {
			return {
				showEditNoteModal : false,
				showReadNoteModal : false,
				showRemoveNoteModal : false,
				editNoteValues : { title : '', text : '', date : ''},
				currentReadNote : '',
				confirmRemoveNoteLink : null
			}
		},
		computed : {
			searchValue : function() {
				return this.$store.state.searchInputValue;
			},
			filteredNotes : function() {
				var self=this;
				return this.notes.filter(function(note){return note.title.toLowerCase().indexOf(self.searchValue.toLowerCase())>=0;});
			},
			readNoteValues : function(note) {
				return this.currentReadNote;
			},
			editNote : function() {
				if (this.editNoteLink) {
					this.editNoteValues.title = this.editNoteLink.title;
					this.editNoteValues.text = this.editNoteLink.text;
					return this.editNoteValues;
				}
				else {
					return this.editNoteValues;
				}
			},
			orderState : function() {
				return this.$store.state.notesOrderByDate;
			},
			orderNotesByNews : function() {
				if (this.orderState == 'decrease') {
					var arr = this.filteredNotes.sort(function (a, b) {
						if (a.date > b.date) {
							return -1;
						}
						if (a.date < b.date) {
							return 1;
						}
					// if a == b
					return 0;
					});
					return arr;
				}
				if (this.orderState == 'increase') {
					var arr = this.filteredNotes.sort(function (a, b) {
						if (a.date > b.date) {
							return 1;
						}
						if (a.date < b.date) {
							return -1;
						}
					// if a == b
					return 0;
					});
					return arr;
				}
			}
		},
		methods : {
			readNote : function(note) {
				this.showReadNoteModal = true;
				this.currentReadNote = note;
			},
			confirmRemoveNote : function(note) {
				this.showRemoveNoteModal = true;
				this.confirmRemoveNoteLink = note;
			},
			cancelEditNote : function() {
				this.editNoteValues.title = this.editNoteLink.title;
				this.editNoteValues.text = this.editNoteLink.text;
				this.showEditNoteModal = false
			}
		}
	}
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