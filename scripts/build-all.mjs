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

// 1. Resolve Supabase Environment Variables
const defaultUrl = 'https://knwneggzbirqrixhuuyj.supabase.co'
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud25lZ2d6YmlycXJpeGh1dXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MjI2NTUsImV4cCI6MjEwMjI5ODY1NX0.ymxdyPsuQ9F9o7YZSJ_nDB0m9G4DCW1vyN27nnrVS-8'

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || defaultUrl
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || defaultKey

// Inject environment configuration into Angular before build
const angularEnvDir = path.join(rootDir, 'support-workspace', 'src', 'environments')
if (fs.existsSync(angularEnvDir)) {
  const envContent = `export const environment = {\n  production: true,\n  supabaseUrl: '${supabaseUrl}',\n  supabaseKey: '${supabaseKey}'\n};\n`
  fs.writeFileSync(path.join(angularEnvDir, 'environment.ts'), envContent)
  fs.writeFileSync(path.join(angularEnvDir, 'environment.prod.ts'), envContent)
}

// Ensure customer-portal .env exists for Vite if missing
const reactEnvPath = path.join(rootDir, 'customer-portal', '.env')
if (!fs.existsSync(reactEnvPath)) {
  fs.writeFileSync(reactEnvPath, `VITE_SUPABASE_URL=${supabaseUrl}\nVITE_SUPABASE_ANON_KEY=${supabaseKey}\n`)
}

// 2. Ensure dependencies are installed in subdirectories if missing
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

// 3. Clean root dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true })
}
fs.mkdirSync(distDir, { recursive: true })
fs.mkdirSync(supportDistDir, { recursive: true })

// 4. Build Customer Portal (React 19 + Vite)
console.log('\n📦 [1/2] Building Customer Portal (React)...')
execSync('npm --prefix customer-portal run build', {
  cwd: rootDir,
  stdio: 'inherit',
  env: { ...process.env, VITE_SUPABASE_URL: supabaseUrl, VITE_SUPABASE_ANON_KEY: supabaseKey }
})

// Copy React build to root dist
const reactDist = path.join(rootDir, 'customer-portal', 'dist')
fs.cpSync(reactDist, distDir, { recursive: true })

// 5. Build Support Workspace (Angular 18)
console.log('\n📦 [2/2] Building Support Workspace (Angular)...')
execSync('npm --prefix support-workspace run build', { cwd: rootDir, stdio: 'inherit' })

// Copy Angular build to root dist/support
const angularDist = path.join(rootDir, 'support-workspace', 'dist')
fs.cpSync(angularDist, supportDistDir, { recursive: true })

console.log('\n✨ Build Complete! Root dist directory ready for Vercel deployment:')
console.log(' - Customer Portal (React): /')
console.log(' - Support Workspace (Angular): /support\n')
