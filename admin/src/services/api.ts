import axios from 'axios';

export interface StudentData {
  name: string;
  email: string;
  phone: string;
  batchId: string;
}
export interface Notification {
  title: string;
  description: string;
  scheduledDate: string;
  imageUri: string;
}
export interface BatchNotification {
  type: string;
  batchId: string;
  title: string;
  body: string;
  scheduledTime: string;
  file?: File;
}

export interface DepartmentNotification {
  type: string;
  departmentId: string;
  title: string;
  body: string;
  scheduledTime: string;
  file?: File;
}
export interface AllNotification {
  type: string;
  title: string;
  body: string;
  scheduledTime: string;
  file?: File;
}
export interface Calendar {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  holiday: boolean;
}
interface Batch {
  name: string;
  startYear: number;
  endYear: number;
  departmentId: number;
}

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

export const studentRegister = async (studentData: StudentData) => {
  return await api.post('/admin/student/register', studentData);
};

export const sendNotification = async (notification: Notification) => {
  return await api.post('/api/sendNotification', notification);
};

export const sendCalendarEvent = async (calendar: Calendar) => {
  return await api.post('/events', calendar);
};

export const createBatch = async (batch: Batch) => {
  return await api.post('/batchs', batch);
};
export const getBatchs = async () => {
  return await api.get('/batchs');
};

export const sendNotificationBatch = async (
  notification: BatchNotification,
) => {
  return await api.post('/notifications', notification);
};

export const sendNotificationDepartment = async (
  notification: DepartmentNotification,
) => {
  return await api.post('/notifications', notification);
};

export const sendNotificationAll = async (notification: AllNotification) => {
  return await api.post('/notifications', notification);
};

export const getBatchId = async (id: string) => {
  return await api.get(`/students/profile?studentId=${id}`);
};
export const getAllStudents = async (batchId: string) => {
  try {
    const response = await api.get(`/batchs/${batchId}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};


