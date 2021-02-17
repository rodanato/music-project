// @flow
import { localUrl, testUrl, prodUrl } from "config/constants";

export const persistState = (name: string, value: string): void => {
  persistOnStorage(name, value);
};

export const getFromStorage = (item: string): mixed => {
  const value: ?string = localStorage.getItem(item);
  return typeof value === "string" ? JSON.parse(value) : null;
};

export const persistOnStorage = (name: string, value: string): void => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (e) {
    handleError(e, "spa:localstorage:setItem");
  }
};

export const getChildrenStateName = (state: any, parent: string): string => {
  return state.toStrings()[1].replace(`${parent}.`, "");
};

export const handleError = (e: any, where: string): void => {
  // throw new Error(e);

  if (e.response && e.response.data) {
    console.error(
      e.response.data.error.status,
      e.response.data.error.message,
      where
    );
    // TODO: Save somewhere as error log
  } else {
    console.error(e.message, where);
    // TODO: Save somewhere as error log
  }
};

export const isProd = (): boolean => process.env.REACT_APP_ENV === "prod";

export const returnEmptyStringIfNotAString = (
  supposedToBeAString: any
): string =>
  typeof supposedToBeAString === "string" ? supposedToBeAString : "";

export const getPublicUrl = (): string =>
  returnEmptyStringIfNotAString(process.env.PUBLIC_URL);

export const apiUrl = (): string => {
  return `${
    isProd()
      ? prodUrl
      : process.env.REACT_APP_EMUL === "true"
      ? localUrl
      : testUrl
  }/api`;
};
