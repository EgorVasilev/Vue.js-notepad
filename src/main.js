import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueFire)

const store = new Vuex.Store({
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

new Vue({
	el: '#app',
	store,
	template: '<App/>',
	components: { App }
})
