// @flow
import { handleError } from "utils/helpers";
import type { DbProfile, PlaylistsDetail } from "shared/types/spotify.types";
import { db } from "config/firebase";

class DatabaseService {
  static instance: DatabaseService;
  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async getProfile(email: string): Promise<?DbProfile> {
    try {
      let response: DbProfile;

      const users = await db.collection("users").get();

      users.forEach(function(doc) {
        if (doc.data().email === email) {
          response = doc.data();
        }
      });
      return response;
    } catch (error) {
      handleError("spa:backendService:getProfileFromDB", error);
    }
  }

  async getPlaylists(uid: string): Promise<?PlaylistsDetail> {
    try {
      let response: PlaylistsDetail;

      await db
        .collection("playlists")
        .doc(uid)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            response = doc.data();
          }
        });
      return response;
    } catch (error) {
      handleError("spa:backendService:getPlaylistsFromDB", error);
    }
  }

  saveProfile(data: DbProfile, uid: string) {
    db.collection("users")
      .doc(uid)
      .set(data)
      .catch(function(error) {
        console.error("spa:backendService:saveProfileOnDB", error);
      });
  }

  savePlaylists(playlistsDetail: PlaylistsDetail, uid: string) {
    const data = {
      genres: playlistsDetail.genres,
      items: playlistsDetail.items,
      total: playlistsDetail.items.length,
    };

    db.collection("playlists")
      .doc(uid)
      .set(data)
      .catch(function(error) {
        console.error("spa:backendService:savePlaylistsOnDB", error);
      });
  }

  updateProfile(key: string, value: string, uid: string) {
    db.collection("users")
      .doc(uid)
      .update({ [key]: value })
      .catch(function(error) {
        console.error("spa:backendService:updateProfileOnDB ", error);
      });
  }
}
export default DatabaseService;
