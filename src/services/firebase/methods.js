// @flow
import { auth } from './config';

export const doSignOut = (): Promise<void> => auth.signOut();

export const getToken = (): Promise<string> => auth.currentUser?.getIdToken(true);