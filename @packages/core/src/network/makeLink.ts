export const PORT = 5200;

export const makeLink = (str: string) => {
  // divide str to host and path;
  if (str.startsWith("http")) {
    const url = new URL(str);
    url.hostname = "localhost";
  }
};
