export const persistState = (value: string) => {
  persistOnLocalStorage("main-state", value);
}

export const existOnStorage = (item: string) => {
  const value: string | null = localStorage.getItem(item);
  return value !== null;
}

export const persistOnLocalStorage = (name: string, value: string) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (e) {
    handleError(e, 'on localstorage setItem')
  }
}

export const getChildrenStateName = (state: any, parent: string) => {
  return state
    .toStrings()[1]
    .replace(`${parent}.`, "");
}

export const handleError = (e: any, where: string) => {
  if (e.response && e.response.data) {
    console.error(e.response.data.error.status, e.response.data.error.message, where);
    // TODO: Save somewhere as error log
  } else {
    console.error(e.message, where);
    // TODO: Save somewhere as error log
  }
}

export const isProd = () => process.env.REACT_APP_ENV === 'prod';
