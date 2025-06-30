import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Upload, Download } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold">SAM2 Video Annotator</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">AI-Powered Video Annotation</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload videos, click to segment objects with SAM2, and automatically track them across frames. Export
          annotations in multiple formats for your computer vision projects.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/auth/register">
            <Button size="lg" className="px-8">
              Start Annotating
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8 bg-transparent">
            View Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Upload className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Easy Upload</CardTitle>
              <CardDescription>Drag and drop videos with chunked upload support for large files</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Multiple video formats supported</li>
                <li>• Progress tracking</li>
                <li>• Metadata extraction</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Play className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Smart Segmentation</CardTitle>
              <CardDescription>Click anywhere to segment objects with SAM2 AI model</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• One-click segmentation</li>
                <li>• Automatic tracking</li>
                <li>• Real-time visualization</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Download className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle>Multiple Exports</CardTitle>
              <CardDescription>Export annotations in COCO JSON, CSV, and image formats</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• COCO JSON format</li>
                <li>• Bounding box CSV</li>
                <li>• Mask images (PNG)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Annotating?</h3>
          <p className="text-blue-100 mb-8">
            Join researchers and developers using SAM2 Video Annotator for their computer vision projects.
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="px-8">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 SAM2 Video Annotator. Built with Next.js and SAM2.</p>
        </div>
      </footer>
    </div>
  )
}
