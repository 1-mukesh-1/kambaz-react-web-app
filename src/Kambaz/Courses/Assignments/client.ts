import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const createAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.post(ASSIGNMENTS_API, assignment);
  return data;
};

export const findAssignmentById = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};

export const findAllAssignments = async () => {
  const { data } = await axiosWithCredentials.get(ASSIGNMENTS_API);
  return data;
};

export const updateAssignment = async (assignmentId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignmentId}`, updates);
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${courseId}/assignments`);
  return response.data;
};