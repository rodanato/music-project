export const persistState = (value: string) => {
  try {
    localStorage.setItem("main-state", JSON.stringify(value));
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
    console.log(e.response.data.error.status, e.response.data.error.message, where)
  } else {
    console.log(e.message, where);
  }
}
