import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const rootDir = process.cwd()
const distDir = path.join(rootDir, 'dist')
const supportDistDir = path.join(distDir, 'support')

console.log('🚀 Building Customer Support Operations Platform (Monorepo)...')

// 1. Clean root dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true })
}
fs.mkdirSync(distDir, { recursive: true })
fs.mkdirSync(supportDistDir, { recursive: true })

// 2. Build Customer Portal (React)
console.log('\n📦 [1/2] Building Customer Portal (React 18 + Vite)...')
console.log('Installing React dependencies...')
execSync('npm --prefix customer-portal install', { stdio: 'inherit' })
console.log('Compiling React application...')
execSync('npm --prefix customer-portal run build', { stdio: 'inherit' })

// Copy React build to root dist
const reactDist = path.join(rootDir, 'customer-portal', 'dist')
fs.cpSync(reactDist, distDir, { recursive: true })

// 3. Build Support Workspace (Angular 17/18)
console.log('\n📦 [2/2] Building Support Workspace (Angular 17+ Signals)...')
console.log('Installing Angular dependencies...')
execSync('npm --prefix support-workspace install --legacy-peer-deps', { stdio: 'inherit' })
console.log('Compiling Angular application...')
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
