import {User} from './model';

const database = initDB();

function makeErrorHandler(reject: (err: any) => void) {
    return (event: Event) => {
        console.error(event);
        reject(event);
    };
}

function initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const onError = makeErrorHandler(reject);

        const request = indexedDB.open('react-store-app', 1);
        request.onsuccess = (event: Event) => {
            const db: IDBDatabase = (event.target as IDBRequest).result;
            resolve(db);
        };
        request.onerror = onError;
        request.onupgradeneeded = (event: Event) => {
            const db: IDBDatabase = (event.target as IDBRequest).result;

            if (db.objectStoreNames.contains('users')) {
                resolve(db);
            } else {
                const users = db.createObjectStore('users', {
                    autoIncrement: true,
                    keyPath: 'id',
                });
                users.createIndex('email', 'email', {unique: true});
                users.transaction.oncomplete = () => resolve(db);
                users.transaction.onabort = onError;
                users.transaction.onerror = onError;
            }
        };
    });
}

async function accessUserStorage(mode?: IDBTransactionMode): Promise<IDBObjectStore> {
    const db = await database;
    const transaction = db.transaction('users', mode);
    return transaction.objectStore('users');
}

async function createUser(email: string, password: string): Promise<IDBValidKey> {
    const users = await accessUserStorage('readwrite');
    return new Promise((resolve, reject) => {
        const request = users.add({
            email,
            password,
        });
        request.onerror = makeErrorHandler(reject);
        request.onsuccess = event => resolve(request.result);
    });
}

async function retrieveUser(email: string): Promise<User | undefined> {
    const users = await accessUserStorage('readonly');
    return new Promise((resolve, reject) => {
        const request = users.index('email').get(email);
        request.onerror = makeErrorHandler(reject);
        request.onsuccess = event => resolve(request.result);
    });
}

export {createUser, retrieveUser};
