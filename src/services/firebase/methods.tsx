import { auth } from './config';

export const doSignOut = () => auth.signOut();

export const getToken = () => auth.currentUser?.getIdToken(true);