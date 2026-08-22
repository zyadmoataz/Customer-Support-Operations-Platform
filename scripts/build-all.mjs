import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// Locate the true monorepo root directory
let rootDir = process.cwd()
if (
  !fs.existsSync(path.join(rootDir, 'customer-portal')) &&
  fs.existsSync(path.join(rootDir, '..', 'customer-portal'))
) {
  rootDir = path.resolve(rootDir, '..')
}

const distDir = path.join(rootDir, 'dist')
const supportDistDir = path.join(distDir, 'support')

console.log('🚀 Building Customer Support Operations Platform (Unified Deployment)...')
console.log(`📂 Monorepo Root: ${rootDir}`)

// 1. Ensure dependencies are installed in subdirectories if missing
const reactNodeModules = path.join(rootDir, 'customer-portal', 'node_modules')
if (!fs.existsSync(reactNodeModules)) {
  console.log('\n📦 Installing Customer Portal dependencies...')
  execSync('npm --prefix customer-portal install', { cwd: rootDir, stdio: 'inherit' })
}

const angularNodeModules = path.join(rootDir, 'support-workspace', 'node_modules')
if (!fs.existsSync(angularNodeModules)) {
  console.log('\n📦 Installing Support Workspace dependencies...')
  execSync('npm --prefix support-workspace install', { cwd: rootDir, stdio: 'inherit' })
}

// 2. Clean root dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true })
}
fs.mkdirSync(distDir, { recursive: true })
fs.mkdirSync(supportDistDir, { recursive: true })

// 3. Build Customer Portal (React 19 + Vite)
console.log('\n📦 [1/2] Building Customer Portal (React)...')
execSync('npm --prefix customer-portal run build', { cwd: rootDir, stdio: 'inherit' })

// Copy React build to root dist
const reactDist = path.join(rootDir, 'customer-portal', 'dist')
fs.cpSync(reactDist, distDir, { recursive: true })

// 4. Build Support Workspace (Angular 18)
console.log('\n📦 [2/2] Building Support Workspace (Angular)...')
execSync('npm --prefix support-workspace run build', { cwd: rootDir, stdio: 'inherit' })

// Copy Angular build to root dist/support
const angularDist = path.join(rootDir, 'support-workspace', 'dist', 'support-workspace')
const angularSource = fs.existsSync(path.join(angularDist, 'browser'))
  ? path.join(angularDist, 'browser')
  : angularDist

fs.cpSync(angularSource, supportDistDir, { recursive: true })

console.log('\n✨ Build Complete! Root dist directory ready for Vercel deployment:')
console.log(' - Customer Portal (React): /')
console.log(' - Support Workspace (Angular): /support\n')
