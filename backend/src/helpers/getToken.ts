import prisma from "../configs/database";

interface GetTokensParams {
  departmentId?: number;
  batchId?: number;
}

type FcmToken = string;

export const getTokens = async ({ departmentId, batchId }: GetTokensParams): Promise<FcmToken[]> => {
  let students: { fcmToken: FcmToken | null }[] = [];

  try {
    if (departmentId) {
   
      students = await prisma.student.findMany({
        where: {
          batch: {
            departmentId: departmentId,
          },
        },
        select: { fcmToken: true },
      });
    } else if (batchId) {
    
      students = await prisma.student.findMany({
        where: {
          batchId: batchId,
        },
        select: { fcmToken: true },
      });
    } else {
     
      students = await prisma.student.findMany({
        select: { fcmToken: true },
      });
    }
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }

  
  return students
    .map(student => student.fcmToken)
    .filter((token): token is FcmToken => token !== null);
};
