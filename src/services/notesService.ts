import {ref, Database} from 'firebase/database';
import {firebaseDB} from '../dataBase';

function createNotesService({database}: {database: Database}) {
  const getAll = () => {
    return ref(database, 'notes');
  };

  // const create = (tutorial) => {
  //     return database.push(tutorial);
  // }
  //
  // const update = (key, value) => {
  //     return database.child(key).update(value);
  // }
  //
  // const deleteOne = (key) => {
  //     return database.child(key).remove();
  // }

  // const deleteAll = () => {
  //     return database.remove();
  // }

  return Object.freeze({
    getAll,
    // create,
    // update,
    // deleteOne,
    // deleteAll
  });
}

export const NotesService = createNotesService({database: firebaseDB});
