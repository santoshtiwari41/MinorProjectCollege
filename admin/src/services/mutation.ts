import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBatch, sendNotificationAll, sendNotificationBatch, sendNotificationDepartment, studentRegister } from './api';

export const useCreateBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches'] });
    },
    onError: () => {
      console.log('error occurs while creating batch...');
    },
  });
};

export const useRegisterStudents=()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: () => {
      console.log('error occurs while registering students...');
    },
  });
}

export const useNotificationBatch=()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendNotificationBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: () => {
      console.log('error occurs while sending notification batch...');
    },
  });
}
export const useNotificationDepartment=() => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendNotificationDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: () => {
      console.log('error occurs while sending notification department...');
    },
  });
}

export const useNotificationAll=()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendNotificationAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: () => {
      console.log('error occurs while sending notification all...');
    },
  });
}
