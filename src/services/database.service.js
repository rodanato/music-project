// @flow
class DatabaseService {
  static instance: DatabaseService;
  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }

    return DatabaseService.instance;
  }

  createDB() {
    if (!("indexedDB" in window)) {
      console.log("This browser doesn't support IndexedDB");
      return;
    }

    const DB_NAME = "localSpotifyDB";
    const DB_VERSION = 1;
    const DB_STORE_NAME = "localSpotify";

    let openRequest = indexedDB.open(DB_NAME, DB_VERSION);

    openRequest.onupgradeneeded = function() {
      let db = openRequest.result;
      if (!db.objectStoreNames.contains("profile")) {
        db.createObjectStore("profile", { keyPath: "id" });
      }
    };

    openRequest.onerror = function() {
      console.error("Error", openRequest.error);
    };

    openRequest.onsuccess = function() {
      let db = openRequest.result;
      // continue working with database using db object
    };
  }

  getProfileData() {
    /*
      if (indexedDB) return profileData
      if not firestore.getProfileData
      sync both DBs
      return profileData
    */
  }

  getUserPlaylists() {
    /*
      if (indexedDB) return UserPlaylists
      if not firestore.getUserPlaylists
      sync both DBs
      return UserPlaylists
    */
  }
}
export default DatabaseService;
