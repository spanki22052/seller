import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminLogin = "cheatAdmin";
  const adminPassword = "cheat777";

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { login: adminLogin },
  });

  if (existingAdmin) {
    console.log(`Admin with login "${adminLogin}" already exists. Skipping seed.`);
    return;
  }

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

  // Create admin
  const admin = await prisma.admin.create({
    data: {
      login: adminLogin,
      password: hashedPassword,
    },
  });

  console.log(`Admin created successfully:`, {
    id: admin.id,
    login: admin.login,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
