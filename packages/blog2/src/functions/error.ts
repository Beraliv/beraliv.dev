export const error = (message: string) => {
  if (process.env.VERCEL_ENV === "production") {
    throw new Error(message);
  }
  console.error(message);
};
