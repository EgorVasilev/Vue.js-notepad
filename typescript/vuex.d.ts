import {Store} from 'vuex';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    notesOrderByDate: 'decrease' | 'increase';
    isAddNewNoteModalActive: boolean;
    showEditNoteModal: boolean;
    searchInputValue: string;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
