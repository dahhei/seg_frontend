import { create } from "zustand"

interface User {
  id: string
  email: string
  name: string
}

interface Project {
  id: string
  name: string
  videoName: string
  videoUrl: string
  duration: string
  createdAt: string
  status: "processing" | "ready" | "annotating"
  annotationCount: number
}

interface Annotation {
  id: string
  projectId: string
  frameNumber: number
  x: number
  y: number
  width: number
  height: number
  label: string
  color: string
  maskUrl?: string
}

interface AppState {
  // Auth
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setAuthenticated: (authenticated: boolean) => void

  // Projects
  projects: Project[]
  currentProject: Project | null
  setProjects: (projects: Project[]) => void
  setCurrentProject: (project: Project | null) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void

  // Annotations
  annotations: Annotation[]
  setAnnotations: (annotations: Annotation[]) => void
  addAnnotation: (annotation: Annotation) => void
  removeAnnotation: (id: string) => void
  updateAnnotation: (id: string, updates: Partial<Annotation>) => void
  getAnnotationsByProject: (projectId: string) => Annotation[]
  getAnnotationsByFrame: (projectId: string, frameNumber: number) => Annotation[]
}

export const useAppStore = create<AppState>((set, get) => ({
  // Auth state
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),

  // Projects state
  projects: [],
  currentProject: null,
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project }),
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      currentProject: state.currentProject?.id === id ? { ...state.currentProject, ...updates } : state.currentProject,
    })),

  // Annotations state
  annotations: [],
  setAnnotations: (annotations) => set({ annotations }),
  addAnnotation: (annotation) =>
    set((state) => ({
      annotations: [...state.annotations, annotation],
    })),
  removeAnnotation: (id) =>
    set((state) => ({
      annotations: state.annotations.filter((a) => a.id !== id),
    })),
  updateAnnotation: (id, updates) =>
    set((state) => ({
      annotations: state.annotations.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    })),
  getAnnotationsByProject: (projectId) => {
    return get().annotations.filter((a) => a.projectId === projectId)
  },
  getAnnotationsByFrame: (projectId, frameNumber) => {
    return get().annotations.filter((a) => a.projectId === projectId && a.frameNumber === frameNumber)
  },
}))
