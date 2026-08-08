import api from './api';

export const portfolioService = {
  // Public Data
  getProfile: () => api.get('/profile'),
  getSkills: () => api.get('/skills'),
  getProjects: () => api.get('/projects'),
  getThesis: () => api.get('/thesis'),
  getCourses: () => api.get('/courses'),
  getExperiences: () => api.get('/experience'),
  sendMessage: (payload) => api.post('/messages', payload),

  // Auth & Admin
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),

  // Protected Admin Actions
  updateProfile: (data) => api.put('/profile', data),
  
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),

  createSkill: (data) => api.post('/skills', data),
  updateSkill: (id, data) => api.put(`/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/skills/${id}`),

  updateThesis: (data) => api.put('/thesis', data),

  createCourse: (data) => api.post('/courses', data),
  updateCourse: async (id, data) => {
    try {
      return await api.put(`/courses/${id}`, data);
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn('PUT /courses/:id returned 404 on server. Fallback to replace course.');
        try {
          await api.delete(`/courses/${id}`);
        } catch (delErr) {
          console.warn('Failed deleting existing course during fallback:', delErr);
        }
        return await api.post('/courses', data);
      }
      throw err;
    }
  },
  deleteCourse: (id) => api.delete(`/courses/${id}`),

  createExperience: (data) => api.post('/experience', data),
  deleteExperience: (id) => api.delete(`/experience/${id}`),

  getMessages: () => api.get('/messages'),
  deleteMessage: (id) => api.delete(`/messages/${id}`),

  uploadFile: (formData) =>
    api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
