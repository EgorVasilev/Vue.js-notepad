import {createApp} from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'

const app = createApp(App)

const store = createStore({
	state: {
		notesOrderByDate : 'decrease',
		showAddNewNoteModal : false,
		showEditNoteModal : false,
		searchInputValue : ''
	},
	mutations: {
		orderByDateDecrease (state) {
			state.notesOrderByDate = 'decrease';
		},
		orderByDateIncrease (state) {
			state.notesOrderByDate = 'increase';
		},
		closeAddNewNoteModal (state) {
			state.showAddNewNoteModal = false;
		},
		openAddNewNoteModal (state) {
			state.showAddNewNoteModal = true;
		},
		setSearchInputValue (state, payload) {
			state.searchInputValue = payload;
		}

  	}
})

app.use(store)
app.mount('#app')
