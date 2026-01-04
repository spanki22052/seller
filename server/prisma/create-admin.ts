import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env file
// dotenv-cli will also load it, but this is a backup
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

const prisma = new PrismaClient();

async function createAdmin(login: string, password: string) {
  try {
    // Validate inputs
    if (!login || !password) {
      console.error("Error: Login and password are required");
      process.exit(1);
    }

    if (login.length < 3) {
      console.error("Error: Login must be at least 3 characters long");
      process.exit(1);
    }

    if (password.length < 6) {
      console.error("Error: Password must be at least 6 characters long");
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst({
      where: { login, deletedAt: null },
    });

    if (existingAdmin) {
      console.error(`Error: Admin with login "${login}" already exists`);
      process.exit(1);
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        login,
        password: hashedPassword,
      },
    });

    console.log("✅ Admin created successfully!");
    console.log(`   ID: ${admin.id}`);
    console.log(`   Login: ${admin.login}`);
    console.log(`   Created at: ${admin.createdAt.toISOString()}`);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Get arguments from command line
const [, , login, password] = process.argv;

if (!login || !password) {
  console.error("Usage: ts-node create-admin.ts <login> <password>");
  process.exit(1);
}

createAdmin(login, password);

