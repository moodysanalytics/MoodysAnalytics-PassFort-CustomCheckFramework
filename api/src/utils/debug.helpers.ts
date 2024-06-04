import 'dotenv/config';
export const signAndVerify = () => {
  return !JSON.parse(process.env.DEBUG.toLowerCase());
};
