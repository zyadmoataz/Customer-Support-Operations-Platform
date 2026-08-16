import { Star, Quote } from 'lucide-react'

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Optima transformed our tier-1 engineering triage. We reduced average ticket resolution time from 4 hours to under 35 minutes in our first month.",
      author: "Sarah Lin",
      role: "VP of Customer Experience",
      company: "NovaPay Global",
      rating: 5
    },
    {
      quote: "The unified architecture between our customer portal and our support workspace is flawless. Our agents love the zero-collision triage queue.",
      author: "Marcus Zhao",
      role: "Head of Support Operations",
      company: "CloudScale Infrastructure",
      rating: 5
    },
    {
      quote: "The built-in manager 5-star QA review loop gives leadership total clarity on quality. Our customers consistently praise the detailed resolution reports.",
      author: "David Koenig",
      role: "Director of Technical Support",
      company: "DevFlow HQ",
      rating: 5
    }
  ]

  return (
    <section className="w-full max-w-6xl mx-auto my-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Trusted by World-Class Support Leaders
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Discover how modern organizations elevate customer satisfaction with Optima.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-glow flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-700" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                {t.author.charAt(0)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{t.author}</h4>
                <p className="text-[11px] text-slate-400">{t.role} • <span className="text-indigo-400 font-medium">{t.company}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
