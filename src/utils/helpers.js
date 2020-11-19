// @flow
export const persistState = (name: string, value: string): void => {
  persistOnLocalStorage(name, value);
};

export const getIfExistOnStorage = (item: string): mixed => {
  const value: ?string = localStorage.getItem(item);
  return value ? JSON.parse(value) : false;
};

export const persistOnLocalStorage = (name: string, value: string): void => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (e) {
    handleError(e, "on localstorage setItem");
  }
};

export const getChildrenStateName = (state: any, parent: string): string => {
  return state.toStrings()[1].replace(`${parent}.`, "");
};

export const handleError = (e: any, where: string): void => {
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
