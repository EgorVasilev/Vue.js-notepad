<template>
  <div class="control-panel">
    <div class="control-buttons">
      <button id="add-new-note-btn" @click="openAddNewNoteModal">
        Add New Note
      </button>
      <div class="order-panel">
        <span>Order by Date</span>
        <button @click="orderByDateDecrease">
          <i class="fa fa-arrow-down"></i>
        </button>
        <button @click="orderByDateIncrease">
          <i class="fa fa-arrow-up"></i>
        </button>
      </div>
      <div class="search-panel">
        <input v-model="searchInput" type="text" placeholder="search note" />
        <span><i class="fa fa-search"></i></span>
      </div>
    </div>

    <AddNewNoteModal v-if="showAddNewNoteModal" @close="closeAddNewNoteModal">
      <template #header><h3>Add new note</h3></template>

      <template #body>
        <form
          id="add-new-note-form"
          @submit.prevent="$emit('addNewNote', newNote)">
          <p>Note Title</p>
          <input
            v-model="newNote.title"
            type="text"
            placeholder="Title"
            required />
          <p>Note Text</p>
          <textarea
            v-model="newNote.text"
            placeholder="Your note..."
            required></textarea>
        </form>
      </template>

      <template #footer
        ><button form="add-new-note-form">Add Note</button>
      </template>
    </AddNewNoteModal>
  </div>
</template>

<script>
import AddNewNoteModal from './AddNewNoteModal.vue';

export default {
  components: {AddNewNoteModal},
  emits: ['addNewNote'],
  data: function () {
    return {
      newNote: {title: '', text: '', date: ''},
      searchInput: '',
    };
  },
  computed: {
    showAddNewNoteModal: function () {
      return this.$store.state.showAddNewNoteModal;
    },
  },
  watch: {
    searchInput: function (inputValue) {
      this.$store.commit('setSearchInputValue', inputValue);
    },
  },
  methods: {
    orderByDateDecrease: function () {
      this.$store.commit('orderByDateDecrease');
    },
    orderByDateIncrease: function () {
      this.$store.commit('orderByDateIncrease');
    },
    closeAddNewNoteModal: function () {
      this.$store.commit('closeAddNewNoteModal');
    },
    openAddNewNoteModal: function () {
      this.$store.commit('openAddNewNoteModal');
    },
  },
};
</script>

<style lang="sass">
.control-panel
	width: 50%
	margin: 40px 0px
	.control-buttons
		display: flex
		justify-content: space-around
		.search-panel
			span
				position: relative
				right: 30px
				color: gray
		.order-panel
			color: white
			font-family: arial
@media screen and (max-width: 600px)
	.control-panel
		width: 90%
		.control-buttons
			flex-direction: column
			align-items: center
			#add-new-note-btn, .order-panel, .search-panel
				margin: 10px 0px
				font-size: 20px
			.search-panel
				input
					min-height: 24px


@media screen and (max-width: 900px)
	.control-panel
		width: 80%
</style>
