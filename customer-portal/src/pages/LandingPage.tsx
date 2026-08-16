import { LandingNav } from '@/components/Landing/LandingNav'
import { HeroSection } from '@/components/Landing/HeroSection'
import { PlatformPreview } from '@/components/Landing/PlatformPreview'
import { FeatureBento } from '@/components/Landing/FeatureBento'
import { LiveMetrics } from '@/components/Landing/LiveMetrics'
import { TestimonialsSection } from '@/components/Landing/TestimonialsSection'
import { PricingSection } from '@/components/Landing/PricingSection'
import { FaqSection } from '@/components/Landing/FaqSection'
import { CtaBanner } from '@/components/Landing/CtaBanner'
import { LandingFooter } from '@/components/Landing/LandingFooter'

export function LandingPage() {
  return (
    <div className="relative min-h-screen bg-brand-bg text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">
      <LandingNav />
      <main>
        <HeroSection />
        <PlatformPreview />
        <FeatureBento />
        <LiveMetrics />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaBanner />
      </main>
      <LandingFooter />
    </div>
  )
}
