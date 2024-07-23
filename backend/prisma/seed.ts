import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// async function main() {
//   const departments = [
//     { name: "Computer Engineering", code: 22 },
//     { name: "IT Engineering", code: 47 },
//     { name: "Software Engineering", code: 59 },
//   ];

//   for (const department of departments) {
//     const createdDepartment = await prisma.department.create({
//       data: {
//         name: department.name,
//         code: department.code,
//       },
//     });

//     await prisma.batch.create({
//       data: {
//         name: "Batch 2020",
//         startYear: 2020,
//         endYear: 2024,
//         departmentId: createdDepartment.id,
//       },
//     });
//   }
// }

async function main(){
  await prisma.department.create({
    data: {
      name: "Civil",
      code: 41 ,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
