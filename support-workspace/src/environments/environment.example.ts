/**
 * Environment configuration template for the Support Workspace.
 *
 * SETUP:
 * 1. Copy this file: cp environment.example.ts environment.ts
 * 2. Replace the placeholder values with your Supabase project credentials.
 * 3. Never commit environment.ts — it is excluded via .gitignore.
 */
export const environment = {
  production: false,
  supabaseUrl: 'https://your-project-id.supabase.co',
  supabaseKey: 'your-anon-publishable-key'
};
