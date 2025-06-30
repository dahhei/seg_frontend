# sam2-video-annotator
 
A Next.js-based video annotation tool leveraging Radix UI, Tailwind CSS, and modern React libraries.

## Features
- Video annotation interface
- Modern UI with Radix UI components
- State management with Zustand
- Form handling with React Hook Form
- Type safety with TypeScript

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm (v9 or later)

### Installation
```bash
npm install
```

### Development
Start the development server:
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Deployment

This project is set up for seamless deployment on [Vercel](https://vercel.com/):
- Connect your repository to Vercel.
- Every push to any branch will trigger a Preview Deployment.
- Merges to the main branch will trigger a Production Deployment.

No extra configuration is needed for standard Next.js deployments.

## Dependency Notes
- Some dependencies are pinned to specific versions for stability.
- Avoid using `"latest"` in production dependencies; pin to tested versions.
- Main libraries: Next.js, React, Radix UI, Tailwind CSS, Zustand, React Hook Form, Zod.

## Folder Structure
- `pages/` – Next.js pages/routes
- `components/` – Reusable UI components
- `styles/` – Tailwind and global styles
- `public/` – Static assets

## License
This project is for internal or research use. Add your license as needed. 