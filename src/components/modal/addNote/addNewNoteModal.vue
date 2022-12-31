<template>
  <Modal :is-open="isOpen" @close="onClose">
    <template #header><h3>Add new note</h3></template>

    <template #body>
      <AddNewNoteForm />
    </template>

    <template #footer
      ><button form="add-new-note-form">Add Note</button>
    </template>
  </Modal>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({name: 'AddNoteModal'});
</script>

<script setup lang="ts">
import {defineEmits, computed} from 'vue';
import {useStore} from 'vuex';

import Modal from 'components/modal/modal.vue';
import AddNewNoteForm from 'components/addNewNoteForm/addNewNoteForm.vue';
import {storeKey} from '../../../main'; // TODO add absolute path

defineEmits([]);

const store = useStore(storeKey);
const isOpen = computed(() => store.state.isAddNewNoteModalActive);

function onClose() {
  store.commit('closeAddNewNoteModal');
}
</script>
