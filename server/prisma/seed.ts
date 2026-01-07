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

  // Create sample FAQs
  const faqs = [
    {
      question: "Какие способы оплаты вы принимаете?",
      answer: "Мы принимаем различные способы оплаты, включая кредитные карты, PayPal и криптовалюту. Все платежи обрабатываются безопасно через зашифрованные каналы.",
      sortOrder: 1,
    },
    {
      question: "Могу ли я получить возврат средств, если не удовлетворён?",
      answer: "Возвраты обрабатываются согласно нашей политике возвратов. Пожалуйста, ознакомьтесь с условиями и положениями перед покупкой. Цифровые продукты обычно не подлежат возврату, если нет технической проблемы с нашей стороны.",
      sortOrder: 2,
    },
    {
      question: "Как скачать и установить продукты?",
      answer: "После успешной оплаты вы получите ссылки для скачивания и подробные инструкции по установке по электронной почте. Наша служба поддержки доступна 24/7 для помощи с любыми техническими проблемами.",
      sortOrder: 3,
    },
    {
      question: "Предоставляете ли вы техническую поддержку?",
      answer: "Да, мы предоставляем всестороннюю техническую поддержку для всех наших продуктов. Наша экспертная команда доступна через различные каналы, включая живой чат, электронную почту и систему тикетов для помощи с любыми проблемами или вопросами.",
      sortOrder: 4,
    },
  ];

  for (const faq of faqs) {
    const createdFaq = await prisma.faq.create({
      data: faq,
    });
    console.log(`FAQ created: ${createdFaq.question}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
