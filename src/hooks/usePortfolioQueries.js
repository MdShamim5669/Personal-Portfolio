import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioService } from '../services/portfolioService';

// Query Keys Constant
export const QUERY_KEYS = {
  profile: ['profile'],
  projects: ['projects'],
  skills: ['skills'],
  thesis: ['thesis'],
  courses: ['courses'],
  experiences: ['experiences'],
  messages: ['messages'],
};

// ---------------- Public Queries ---------------- //

export function useProfileQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.profile,
    queryFn: async () => {
      const res = await portfolioService.getProfile();
      return res.data?.data || res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

export function useProjectsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.projects,
    queryFn: async () => {
      const res = await portfolioService.getProjects();
      return res.data?.data || res.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useSkillsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.skills,
    queryFn: async () => {
      const res = await portfolioService.getSkills();
      return res.data?.data || res.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useThesisQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.thesis,
    queryFn: async () => {
      const res = await portfolioService.getThesis();
      return res.data?.data || res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useCoursesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.courses,
    queryFn: async () => {
      const res = await portfolioService.getCourses();
      return res.data?.data || res.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useExperiencesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.experiences,
    queryFn: async () => {
      const res = await portfolioService.getExperiences();
      return res.data?.data || res.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useMessagesQuery(enabled = false) {
  return useQuery({
    queryKey: QUERY_KEYS.messages,
    queryFn: async () => {
      const res = await portfolioService.getMessages();
      return res.data?.data || res.data || [];
    },
    enabled,
  });
}

// ---------------- Public Mutations ---------------- //

export function useSendMessageMutation() {
  return useMutation({
    mutationFn: (payload) => portfolioService.sendMessage(payload),
  });
}

// ---------------- Admin Mutations ---------------- //

export function useAdminMutations() {
  const queryClient = useQueryClient();

  const invalidate = (key) => {
    queryClient.invalidateQueries({ queryKey: key });
  };

  const updateProfile = useMutation({
    mutationFn: (data) => portfolioService.updateProfile(data),
    onSuccess: () => invalidate(QUERY_KEYS.profile),
  });

  const createProject = useMutation({
    mutationFn: (data) => portfolioService.createProject(data),
    onSuccess: () => invalidate(QUERY_KEYS.projects),
  });

  const updateProject = useMutation({
    mutationFn: ({ id, data }) => portfolioService.updateProject(id, data),
    onSuccess: () => invalidate(QUERY_KEYS.projects),
  });

  const deleteProject = useMutation({
    mutationFn: (id) => portfolioService.deleteProject(id),
    onSuccess: () => invalidate(QUERY_KEYS.projects),
  });

  const createSkill = useMutation({
    mutationFn: (data) => portfolioService.createSkill(data),
    onSuccess: () => invalidate(QUERY_KEYS.skills),
  });

  const deleteSkill = useMutation({
    mutationFn: (id) => portfolioService.deleteSkill(id),
    onSuccess: () => invalidate(QUERY_KEYS.skills),
  });

  const updateThesis = useMutation({
    mutationFn: (data) => portfolioService.updateThesis(data),
    onSuccess: () => invalidate(QUERY_KEYS.thesis),
  });

  const createCourse = useMutation({
    mutationFn: (data) => portfolioService.createCourse(data),
    onSuccess: () => invalidate(QUERY_KEYS.courses),
  });

  const updateCourse = useMutation({
    mutationFn: ({ id, data }) => portfolioService.updateCourse(id, data),
    onSuccess: () => invalidate(QUERY_KEYS.courses),
  });

  const deleteCourse = useMutation({
    mutationFn: (id) => portfolioService.deleteCourse(id),
    onSuccess: () => invalidate(QUERY_KEYS.courses),
  });

  const createExperience = useMutation({
    mutationFn: (data) => portfolioService.createExperience(data),
    onSuccess: () => invalidate(QUERY_KEYS.experiences),
  });

  const deleteExperience = useMutation({
    mutationFn: (id) => portfolioService.deleteExperience(id),
    onSuccess: () => invalidate(QUERY_KEYS.experiences),
  });

  const deleteMessage = useMutation({
    mutationFn: (id) => portfolioService.deleteMessage(id),
    onSuccess: () => invalidate(QUERY_KEYS.messages),
  });

  return {
    updateProfile,
    createProject,
    updateProject,
    deleteProject,
    createSkill,
    deleteSkill,
    updateThesis,
    createCourse,
    updateCourse,
    deleteCourse,
    createExperience,
    deleteExperience,
    deleteMessage,
  };
}
