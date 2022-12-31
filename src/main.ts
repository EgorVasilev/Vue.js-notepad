import {createApp, InjectionKey} from 'vue';
import App from './App.vue';
import {createStore, Store} from 'vuex';

const app = createApp(App);

type State = {
  notesOrderByDate: 'decrease' | 'increase';
  isAddNewNoteModalActive: boolean;
  showEditNoteModal: boolean;
  searchInputValue: string;
};

export const storeKey: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state: {
    notesOrderByDate: 'decrease',
    isAddNewNoteModalActive: false,
    showEditNoteModal: false,
    searchInputValue: '',
  },
  mutations: {
    orderByDateDecrease(state) {
      state.notesOrderByDate = 'decrease';
    },
    orderByDateIncrease(state) {
      state.notesOrderByDate = 'increase';
    },
    closeAddNewNoteModal(state) {
      state.isAddNewNoteModalActive = false;
    },
    openAddNewNoteModal(state) {
      state.isAddNewNoteModalActive = true;
    },
    setSearchInputValue(state, payload) {
      state.searchInputValue = payload;
    },
  },
});

app.use(store, storeKey);
app.mount('#app');
