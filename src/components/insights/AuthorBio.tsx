import { User } from 'lucide-react';

export default function AuthorBio() {
  return (
    <section className="mt-12 pt-8 border-t border-navy-border">
      <div className="flex gap-4 items-start p-5 rounded-xl border border-navy-border bg-navy-card">
        <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center shrink-0">
          <User size={22} className="text-cyan" />
        </div>
        <div>
          <h3 className="font-semibold text-white text-sm mb-1">
            Rees Calder
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Rees is the founder of RegShield and CEO of Levity Leads Ltd. He
            works with small registered investment advisers to simplify SEC
            compliance, with a focus on making Regulation S-P requirements
            accessible and actionable for firms that lack dedicated compliance
            departments.
          </p>
        </div>
      </div>
    </section>
  );
}
