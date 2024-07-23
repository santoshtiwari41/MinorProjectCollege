import { useQuery } from '@tanstack/react-query';
import { getAllStudents, getBatchs } from './api';



export const useGetBatch = () => {
  return useQuery({
    queryKey: ['batches'],
    queryFn: getBatchs,
  });
};

export const useGetAllStudents = (batchId: string) => {
  return useQuery({
    queryKey: ['students', batchId],
    queryFn: () => getAllStudents(batchId as string),
    enabled: !!batchId,
  });
};

