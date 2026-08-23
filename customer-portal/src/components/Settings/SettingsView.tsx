import { useState, useEffect } from 'react'
import { User, Lock, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { authApi } from '@/api'
import { notify } from '@/lib/toast'

export function SettingsView() {
  const { profile, user } = useAuth()
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile) setFullName(profile.full_name || '')
  }, [profile])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = fullName.trim()
    if (!trimmedName || trimmedName.length < 2) {
      notify.error('Full name must be at least 2 characters')
      return
    }

    if (password) {
      if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
        notify.error('Password must be 8+ chars with uppercase, number, and special character')
        return
      }
      if (password !== confirmPassword) {
        notify.error('Passwords do not match')
        return
      }
    }

    setSaving(true)
    try {
      if (trimmedName) await authApi.updateProfile(trimmedName)
      if (password) await authApi.updatePassword(password)
      notify.success('Account preferences saved successfully!')
      setPassword('')
      setConfirmPassword('')
    } catch (err: unknown) {
      notify.error(err instanceof Error ? err.message : 'Failed to update preferences')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-3xl bg-brand-surface p-6 sm:p-8 border border-brand-border w-full">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-border">
        <div className="p-2.5 rounded-2xl bg-brand-elevated text-brand-primary border border-brand-border">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-text-primary">Account & Security Preferences</h3>
          <p className="text-xs text-text-tertiary">Update your profile display name and secure your login password</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Email Address (Read-Only)</label>
          <input type="text" disabled value={user?.email || ''} className="w-full px-4 py-2.5 rounded-xl bg-brand-bg/80 border border-brand-border text-xs text-text-tertiary cursor-not-allowed font-mono" />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Full Name *</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl bg-brand-surface/90 border border-brand-border text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
        </div>

        <div className="pt-3 border-t border-brand-border/80">
          <h4 className="text-xs font-semibold text-text-secondary mb-3 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-brand-primary" />
            <span>Change Account Password (Optional)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">New Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" className="w-full px-4 py-2.5 rounded-xl bg-brand-surface/90 border border-brand-border text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Confirm New Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter new password" className="w-full px-4 py-2.5 rounded-xl bg-brand-surface/90 border border-brand-border text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
            </div>
          </div>

          {password && (
            <div className="mt-3 p-3.5 rounded-2xl bg-brand-surface/90 border border-brand-border text-xs space-y-1 text-text-tertiary">
              <span className="font-semibold text-text-secondary block mb-1 text-[11px]">Password Complexity:</span>
              <div className={`flex items-center gap-1.5 text-[11px] ${password.length >= 8 ? 'text-state-success' : 'text-text-tertiary'}`}><CheckCircle2 className="w-3 h-3 flex-shrink-0" /><span>8+ characters</span></div>
              <div className={`flex items-center gap-1.5 text-[11px] ${/[A-Z]/.test(password) ? 'text-state-success' : 'text-text-tertiary'}`}><CheckCircle2 className="w-3 h-3 flex-shrink-0" /><span>1 uppercase (A-Z)</span></div>
              <div className={`flex items-center gap-1.5 text-[11px] ${/[0-9]/.test(password) ? 'text-state-success' : 'text-text-tertiary'}`}><CheckCircle2 className="w-3 h-3 flex-shrink-0" /><span>1 number (0-9)</span></div>
              <div className={`flex items-center gap-1.5 text-[11px] ${/[^A-Za-z0-9]/.test(password) ? 'text-state-success' : 'text-text-tertiary'}`}><CheckCircle2 className="w-3 h-3 flex-shrink-0" /><span>1 special symbol (!@#$)</span></div>
            </div>
          )}
        </div>

        <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-text-primary text-xs font-semibold shadow-md shadow-glow disabled:opacity-50 transition-all">
          {saving ? 'Saving Preferences...' : 'Save Account Settings'}
        </button>
      </form>
    </div>
  )
}
