const database = initDB();

function initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const onError = (event: Event) => {
            console.error(event);
            reject(event);
        };

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

async function createUser(email: string, password: string): Promise<void> {
    const db = await database;
    const transaction = db.transaction('users', 'readwrite');

    await new Promise((resolve, reject) => {
        transaction.oncomplete = event => resolve();
        transaction.onabort = event => reject(event);
        transaction.onerror = event => {
            console.error(event);
            reject(event);
        };

        const users = transaction.objectStore('users');
        users.add({
            email,
            password,
        });
    });
}

export {createUser};

// @ts-ignore
window.createUser = createUser;
