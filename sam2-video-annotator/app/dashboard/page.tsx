"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Upload, Plus, Calendar, Clock, Download, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  name: string
  videoName: string
  duration: string
  createdAt: string
  status: "processing" | "ready" | "annotating"
  annotationCount: number
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [userEmail, setUserEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("isAuthenticated")
    const email = localStorage.getItem("userEmail")

    if (!isAuth) {
      router.push("/auth/login")
      return
    }

    setUserEmail(email || "")

    // Mock projects data
    setProjects([
      {
        id: "1",
        name: "Traffic Analysis",
        videoName: "traffic_video.mp4",
        duration: "2:34",
        createdAt: "2024-01-15",
        status: "ready",
        annotationCount: 12,
      },
      {
        id: "2",
        name: "Sports Tracking",
        videoName: "soccer_match.mp4",
        duration: "5:42",
        createdAt: "2024-01-14",
        status: "annotating",
        annotationCount: 8,
      },
      {
        id: "3",
        name: "Wildlife Study",
        videoName: "animals.mp4",
        duration: "1:23",
        createdAt: "2024-01-13",
        status: "processing",
        annotationCount: 0,
      },
    ])
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "annotating":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold">SAM2 Video Annotator</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{userEmail}</span>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Manage your video annotation projects</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg">Upload Video</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>Start a new annotation project by uploading a video file</CardDescription>
              <Link href="/upload">
                <Button className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">{projects.length}</div>
              <CardDescription>Active annotation projects</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Annotations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {projects.reduce((sum, p) => sum + p.annotationCount, 0)}
              </div>
              <CardDescription>Total objects annotated</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Recent Projects</h3>
            <Button variant="outline">View All</Button>
          </div>

          {projects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-4">Upload your first video to get started with annotation</p>
                <Link href="/upload">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-medium">{project.name}</h4>
                          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Play className="w-4 h-4 mr-1" />
                            {project.videoName}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {project.duration}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {project.createdAt}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm text-gray-600">{project.annotationCount} annotations</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {project.status === "ready" && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        )}
                        <Link href={`/annotate/${project.id}`}>
                          <Button size="sm">{project.status === "ready" ? "Annotate" : "View"}</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
