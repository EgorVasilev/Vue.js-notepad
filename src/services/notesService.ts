import {
  ref,
  Database,
  push,
  child,
  remove,
  onValue,
  set as dbSet,
} from 'firebase/database';
import {firebaseDB} from '../dataBase';

type Note = {title: string; text: string; date: string};

function createNotesService({database}: {database: Database}) {
  const databaseRef = ref(database, 'notes');

  const getAll = () => {
    return databaseRef;
  };

  const subscribe = (cb: (notes: {[key: string]: Note}) => void) => {
    return onValue(databaseRef, snapshot => {
      cb(snapshot.val());
    });
  };

  const create = (note: Note) => {
    return push(databaseRef, note);
  };

  const set = (key: string, note: Note) => {
    return dbSet(ref(database, `notes/${key}`), note);
  };

  const deleteOne = (key: string) => {
    return remove(child(databaseRef, key));
  };

  return Object.freeze({
    getAll,
    create,
    set,
    subscribe,
    deleteOne,
  });
}

export const NotesService = createNotesService({database: firebaseDB});
