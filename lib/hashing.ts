import bcrypt from "bcryptjs";

async function hashPass(password: string) {
  return await bcrypt.hash(password, 10);
}

async function checkPass(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
export { checkPass, hashPass };
