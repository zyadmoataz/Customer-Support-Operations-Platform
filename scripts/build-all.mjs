import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')
const supportDistDir = path.join(distDir, 'support')

console.log('🚀 Building Customer Support Operations Platform (Unified Deployment)...')

// 1. Ensure dependencies are installed in subdirectories if missing
const reactNodeModules = path.join(rootDir, 'customer-portal', 'node_modules')
if (!fs.existsSync(reactNodeModules)) {
  console.log('\n📦 Installing Customer Portal dependencies...')
  execSync('npm --prefix customer-portal install', { stdio: 'inherit' })
}

const angularNodeModules = path.join(rootDir, 'support-workspace', 'node_modules')
if (!fs.existsSync(angularNodeModules)) {
  console.log('\n📦 Installing Support Workspace dependencies...')
  execSync('npm --prefix support-workspace install', { stdio: 'inherit' })
}

// 2. Clean root dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true })
}
fs.mkdirSync(distDir, { recursive: true })
fs.mkdirSync(supportDistDir, { recursive: true })

// 3. Build Customer Portal (React 19 + Vite)
console.log('\n📦 [1/2] Building Customer Portal (React)...')
execSync('npm --prefix customer-portal run build', { stdio: 'inherit' })

// Copy React build to root dist
const reactDist = path.join(rootDir, 'customer-portal', 'dist')
fs.cpSync(reactDist, distDir, { recursive: true })

// 3. Build Support Workspace (Angular 19)
console.log('\n📦 [2/2] Building Support Workspace (Angular)...')
execSync('npm --prefix support-workspace run build', { stdio: 'inherit' })

// Copy Angular build to root dist/support
const angularDist = path.join(rootDir, 'support-workspace', 'dist', 'support-workspace')
const angularSource = fs.existsSync(path.join(angularDist, 'browser')) 
  ? path.join(angularDist, 'browser') 
  : angularDist

fs.cpSync(angularSource, supportDistDir, { recursive: true })

console.log('\n✨ Build Complete! Root dist directory ready for Vercel deployment:')
console.log(' - Customer Portal (React): /')
console.log(' - Support Workspace (Angular): /support\n')
