import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Inicializa o cliente Prisma
const prisma = new PrismaClient();

async function main() {

    const adminEmail : string = process.env.DEFAULT_ADMIN_USER || 'admin@admin.com';
    const adminPassword : string = process.env.DEFAULT_ADMIN_PASSWORD || 'admin';
  // Verifique se já existe um admin para não criar duplicados
  const adminExists = await prisma.user.findFirst({
    where: {
      email: adminEmail,
    },
  });

  if (!adminExists) {
    // Hash da senha antes de armazenar
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // Cria o usuário admin
    const admin = await prisma.user.create({
      data: {
        name: 'admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN', // Certifique-se de que este valor corresponde ao enum definido no seu schema
      },
    });
    
    console.log('Usuário admin criado:', admin.email);
  } else {
    console.log('Usuário admin já existe, pulando criação');
  }
}

// Executa o seed e trata erros
main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Fecha a conexão do Prisma quando terminar
    await prisma.$disconnect();
  });