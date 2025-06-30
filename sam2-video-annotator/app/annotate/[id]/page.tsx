"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ArrowLeft,
  Download,
  MousePointer,
  Eye,
  EyeOff,
  Trash2,
  Save,
} from "lucide-react"
import Link from "next/link"

interface Annotation {
  id: string
  frameNumber: number
  x: number
  y: number
  width: number
  height: number
  label: string
  color: string
}

export default function AnnotatePage({ params }: { params: { id: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [totalFrames, setTotalFrames] = useState(0)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [isSegmenting, setIsSegmenting] = useState(false)
  const [isTracking, setIsTracking] = useState(false)

  // Mock video URL - in real app, this would come from your backend
  const videoUrl = "/placeholder.svg?height=480&width=854"

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      // Assuming 30 FPS for frame calculation
      setTotalFrames(Math.floor(video.duration * 30))
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setCurrentFrame(Math.floor(video.currentTime * 30))
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [])

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newTime = (value[0] / 100) * duration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleFrameSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newFrame = value[0]
    const newTime = newFrame / 30 // Assuming 30 FPS
    video.currentTime = newTime
    setCurrentFrame(newFrame)
  }

  const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isSegmenting || isTracking) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsSegmenting(true)

    try {
      // Mock SAM2 segmentation API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create mock annotation
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        frameNumber: currentFrame,
        x: x - 50,
        y: y - 50,
        width: 100,
        height: 100,
        label: `Object ${annotations.length + 1}`,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      }

      setAnnotations((prev) => [...prev, newAnnotation])
    } catch (error) {
      console.error("Segmentation failed:", error)
    } finally {
      setIsSegmenting(false)
    }
  }

  const handleTrackObject = async (annotationId: string) => {
    setIsTracking(true)

    try {
      // Mock tracking API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock: Add tracking annotations for next 10 frames
      const baseAnnotation = annotations.find((a) => a.id === annotationId)
      if (!baseAnnotation) return

      const trackingAnnotations: Annotation[] = []
      for (let i = 1; i <= 10; i++) {
        trackingAnnotations.push({
          ...baseAnnotation,
          id: `${annotationId}_track_${i}`,
          frameNumber: baseAnnotation.frameNumber + i,
          x: baseAnnotation.x + Math.random() * 20 - 10,
          y: baseAnnotation.y + Math.random() * 20 - 10,
        })
      }

      setAnnotations((prev) => [...prev, ...trackingAnnotations])
    } catch (error) {
      console.error("Tracking failed:", error)
    } finally {
      setIsTracking(false)
    }
  }

  const deleteAnnotation = (id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id))
  }

  const currentFrameAnnotations = annotations.filter((a) => a.frameNumber === currentFrame)

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Video Annotator</h1>
            <Badge variant="outline">Project {params.id}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                <div className="relative bg-black rounded-t-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-auto"
                    poster="/placeholder.svg?height=480&width=854"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Canvas Overlay for Annotations */}
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full cursor-crosshair"
                    onClick={handleCanvasClick}
                    style={{
                      display: showAnnotations ? "block" : "none",
                      pointerEvents: isSegmenting || isTracking ? "none" : "auto",
                    }}
                  />

                  {/* Segmentation Indicator */}
                  {isSegmenting && (
                    <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                      <div className="bg-white rounded-lg p-4 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span>Segmenting object...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tracking Indicator */}
                  {isTracking && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <div className="bg-white rounded-lg p-4 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                          <span>Tracking object across frames...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Controls */}
                <div className="p-4 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const video = videoRef.current
                        if (video) video.currentTime = Math.max(0, video.currentTime - 10)
                      }}
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>

                    <Button onClick={togglePlayPause}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const video = videoRef.current
                        if (video) video.currentTime = Math.min(duration, video.currentTime + 10)
                      }}
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>

                    <div className="flex-1 flex items-center space-x-2">
                      <span className="text-sm text-gray-600 min-w-[4rem]">{formatTime(currentTime)}</span>
                      <Slider
                        value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
                        onValueChange={handleSeek}
                        max={100}
                        step={0.1}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600 min-w-[4rem]">{formatTime(duration)}</span>
                    </div>

                    <Button variant="outline" size="sm" onClick={() => setShowAnnotations(!showAnnotations)}>
                      {showAnnotations ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                  </div>

                  {/* Frame-by-frame Control */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Frame: {currentFrame}</span>
                      <span>Total: {totalFrames}</span>
                    </div>
                    <Slider
                      value={[currentFrame]}
                      onValueChange={handleFrameSeek}
                      max={totalFrames}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <MousePointer className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">How to Annotate</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Click anywhere on the video to segment objects with SAM2. Once segmented, you can track the object
                      across frames automatically.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Annotations Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Frame Annotations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentFrameAnnotations.length === 0 ? (
                  <p className="text-sm text-gray-600 text-center py-4">
                    No annotations on this frame. Click on the video to segment objects.
                  </p>
                ) : (
                  currentFrameAnnotations.map((annotation) => (
                    <div key={annotation.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: annotation.color }} />
                        <span className="text-sm font-medium">{annotation.label}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTrackObject(annotation.id)}
                          disabled={isTracking}
                        >
                          Track
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteAnnotation(annotation.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Annotations:</span>
                  <span className="text-sm font-medium">{annotations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Unique Objects:</span>
                  <span className="text-sm font-medium">{new Set(annotations.map((a) => a.label)).size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Frames Annotated:</span>
                  <span className="text-sm font-medium">{new Set(annotations.map((a) => a.frameNumber)).size}</span>
                </div>
                <Separator />
                <Button className="w-full bg-transparent" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Annotations
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
