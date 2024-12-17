import { openDB } from 'idb';
import type { Todo } from '../types/todo';

const DB_NAME = 'todolist-offline';
const STORE_NAME = 'todos';

export async function initOfflineDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    },
  });
}

export async function saveTodoOffline(todo: Todo) {
  const db = await initOfflineDb();
  await db.put(STORE_NAME, todo);
}

export async function getAllOfflineTodos() {
  const db = await initOfflineDb();
  return db.getAll(STORE_NAME);
}

export async function deleteOfflineTodo(id: string) {
  const db = await initOfflineDb();
  await db.delete(STORE_NAME, id);
}

export async function clearOfflineDb() {
  const db = await initOfflineDb();
  await db.clear(STORE_NAME);
}