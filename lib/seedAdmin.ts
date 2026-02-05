import { hashPass } from "./hashing";
import { prisma } from "./prisma";

const adminUsername = process.env.ADMIN_USERNAME;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

function validateAdminEnv() {
  if (!adminUsername) {
    throw new Error("ADMIN_USERNAME environment variable is required");
  }
  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL environment variable is required");
  }
  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD environment variable is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(adminEmail)) {
    throw new Error("ADMIN_EMAIL must be a valid email address");
  }

  if (adminPassword.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters long");
  }
}

async function seedAdmin() {
  try {
    validateAdminEnv();
    console.log("Admin credentials validated successfully");
    const existAdmin = await prisma.admin.findFirst({
      where: { email: adminEmail },
    });
    if (existAdmin) {
      console.log("Admin already exists with the email");
      return;
    }
    await prisma.admin.create({
      data: {
        email: adminEmail as string,
        username: adminUsername as string,
        password: await hashPass(adminPassword as string),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error seeding admin:", error.message);
    } else {
      console.error("Error seeding admin: Unknown error occurred");
    }
    process.exit(1);
  }
}

seedAdmin();
