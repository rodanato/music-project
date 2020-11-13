export const handleError = (e: any, where: string) => {
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
