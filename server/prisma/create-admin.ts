// Load environment variables FIRST, before any imports that need them
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Try multiple possible .env file locations
const possibleEnvPaths = [
  path.resolve(process.cwd(), ".env"),           // Current working directory (server/)
  path.resolve(process.cwd(), "../.env"),        // Parent directory
];

let envLoaded = false;
let loadedPath = "";

for (const envPath of possibleEnvPaths) {
  if (fs.existsSync(envPath)) {
    const result = dotenv.config({ path: envPath });
    if (!result.error) {
      envLoaded = true;
      loadedPath = envPath;
      break;
    }
  }
}

// Fallback: try dotenv.config() without path (uses default .env in cwd)
if (!envLoaded) {
  const result = dotenv.config();
  if (!result.error) {
    envLoaded = true;
    loadedPath = "default (.env in cwd)";
  }
}

// Verify DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
  console.error("❌ Error: DATABASE_URL environment variable is not set!");
  console.error("   Please ensure your .env file contains DATABASE_URL");
  if (envLoaded) {
    console.error(`   .env file was found at: ${loadedPath}`);
    console.error("   But DATABASE_URL was not loaded from it.");
  } else {
    console.error("   Checked paths:", possibleEnvPaths.join(", "));
  }
  process.exit(1);
}

if (envLoaded) {
  console.log(`✓ Loaded .env from: ${loadedPath}`);
}

// Now import PrismaClient after env vars are loaded
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

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

