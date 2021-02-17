export const handleError = (e: any, where: string) => {
  // throw new Error(e);

  if (e.response && e.response.data) {
    console.log(
      e.response.data.error.status,
      e.response.data.error.message,
      where
    );
  } else {
    console.log(e.message, where);
  }
};
