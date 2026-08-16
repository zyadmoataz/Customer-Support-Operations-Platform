import type { SupportTicket } from '../../types'
import { Inbox, Clock, CheckCircle2 } from "lucide-react";

interface StatsCardsProps {
  tickets: SupportTicket[];
}

export function StatsCards({ tickets }: StatsCardsProps) {
  const total = tickets.length;
  const openCount = tickets.filter(
    (t) => t.status === "open" || t.status === "in_progress",
  ).length;
  const resolvedTickets = tickets.filter(
    (t) => t.status === "resolved",
  );
  const resolvedCount = resolvedTickets.length;

  const stats = [
    {
      label: "Total Inquiries",
      value: total,
      subtext: "Lifetime submitted requests",
      icon: <Inbox className='w-5 h-5 text-indigo-400' />,
      accentBorder: "hover:border-indigo-500/40",
    },
    {
      label: "Active In Triage",
      value: openCount,
      subtext: openCount === 0 ? "All caught up" : "Under active investigation",
      icon: <Clock className='w-5 h-5 text-sky-400' />,
      accentBorder: "hover:border-sky-500/40",
    },
    {
      label: "Resolved Issues",
      value: resolvedCount,
      subtext: "Verified with resolution report",
      icon: <CheckCircle2 className='w-5 h-5 text-emerald-400' />,
      accentBorder: "hover:border-emerald-500/40",
    }
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 ${stat.accentBorder} hover:shadow-glow flex flex-col justify-between`}
        >
          <div className='flex items-center justify-between mb-3'>
            <span className='text-xs font-bold uppercase tracking-wider text-slate-400'>
              {stat.label}
            </span>
            <div className='p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80'>
              {stat.icon}
            </div>
          </div>
          <div>
            <span className='text-3xl font-extrabold text-white tracking-tight block'>
              {stat.value}
            </span>
            <span className='text-xs text-slate-400 font-medium mt-1 block'>
              {stat.subtext}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
