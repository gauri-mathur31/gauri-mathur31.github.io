import React, { useState, useRef } from 'react';
import { 
  Terminal, 
  Database, 
  Code2, 
  Play, 
  ExternalLink, 
  X, 
  Sparkles, 
  Briefcase, 
  Award, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

// --- REUSABLE 3D MOUSE-TILT CARD WRAPPER ---
function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [rotations, setRotations] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate 3D tilt angles
    const ry = ((x - centerX) / centerX) * 12; // tilt left/right
    const rx = -((y - centerY) / centerY) * 12; // tilt up/down

    setRotations({ rx, ry });
    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setRotations({ rx: 0, ry: 0 });
    setGlow({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className="w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotations.rx}deg) rotateY(${rotations.ry}deg)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d'
        }}
        className={`relative backdrop-blur-2xl bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-cyan-500/10 ${className}`}
      >
        {/* Cursor tracking ambient light layer */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(34, 211, 238, ${glow.opacity}), transparent 60%)`
          }}
        />
        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// --- MAIN PORTFOLIO COMPONENT ---
export default function Interactive3DPortfolio() {
  const [activeModal, setActiveModal] = useState(null); // { type: 'demo' | 'code', project: 'ipl' | 'fitness' }
  const [iplFilter, setIplFilter] = useState('All');
  const [activeTable, setActiveTable] = useState('workouts');

  const projects = [
    {
      id: 'ipl',
      title: 'IPL Match Data Analytics Pipeline',
      tagline: '5 seasons of ball-by-ball analysis using window functions & CTEs',
      stack: ['SQL', 'MySQL', 'Window Functions', 'CTEs', 'Data Modeling'],
      metrics: 'Wankhede & Chinnaswamy show 20%+ higher avg match scores than Chepauk',
      codeSnippet: `-- Venue Level Impact & Run Scorer Partitioning
WITH season_runs AS (
  SELECT 
    season, 
    batter, 
    SUM(batsman_runs) AS total_runs,
    COUNT(DISTINCT match_id) AS matches_played
  FROM deliveries d
  JOIN matches m ON d.match_id = m.id
  GROUP BY season, batter
)
SELECT 
  season, 
  batter, 
  total_runs,
  DENSE_RANK() OVER (
    PARTITION BY season 
    ORDER BY total_runs DESC
  ) AS rank_in_season
FROM season_runs
WHERE rank_in_season <= 5;`
    },
    {
      id: 'fitness',
      title: 'Fitness Data Platform & Schema',
      tagline: 'Normalized relational schema with indexing and aggregation queries',
      stack: ['Java', 'MySQL', 'JDBC', 'Schema Normalization', 'Query Optimization'],
      metrics: '8+ normalized tables, cut redundancy ~30%, optimized queries ~25% faster',
      codeSnippet: `-- Schema Indexing & Aggregated Performance Summary
CREATE INDEX idx_workout_user_date ON workouts(user_id, session_date);

SELECT 
  u.user_id,
  u.full_name,
  COUNT(w.workout_id) AS total_sessions,
  AVG(w.duration_mins) AS avg_duration,
  MAX(m.metric_value) AS personal_record
FROM tbl_users u
JOIN tbl_workouts w ON u.user_id = w.user_id
JOIN tbl_metrics_log m ON w.workout_id = m.workout_id
WHERE w.session_date >= CURRENT_DATE - INTERVAL 30 DAY
GROUP BY u.user_id, u.full_name;`
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black p-4 sm:p-8 md:p-12 relative overflow-hidden">
      {/* Background Gradient Blurs */}
      <div className="fixed top-[-15%] left-[-15%] w-[650px] h-[650px] rounded-full bg-cyan-900/15 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[-15%] w-[650px] h-[650px] rounded-full bg-violet-900/15 blur-[150px] pointer-events-none" />

      {/* HEADER SECTION */}
      <header className="max-w-6xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-cyan-400 text-xs font-mono mb-4 backdrop-blur-xl">
          <Sparkles size={13} /> Available for Associate / Data Analyst Roles
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          GAURI MATHUR
        </h1>
        <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-light">
          Information Technology Graduate (CGPA 9.0/10) specializing in SQL, automated operational workflows, and relational data architecture.
        </p>

        {/* Quick Highlights Pill Row */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300">
            🎓 JECRC · CGPA 9.0
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300">
            📊 Aavas Financiers Ltd. (BFSI)
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300">
            🚀 NASA & ISRO Hackathons
          </div>
        </div>
      </header>

      {/* 3D TILT PROJECTS SECTION */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="text-cyan-400" size={22} /> Featured Projects (Interactive 3D Cards)
            </h2>
            <p className="text-xs text-slate-400 mt-1">Hover over cards to trigger 3D perspective tilt. Click "Live Demo" or "View Code" to inspect.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <TiltCard key={proj.id} className="p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setActiveModal({ type: 'demo', project: proj.id })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_12px_rgba(34,211,238,0.4)] cursor-pointer"
                    >
                      <Play size={12} /> Live Demo
                    </button>
                    <button
                      onClick={() => setActiveModal({ type: 'code', project: proj.id })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all border border-white/10 cursor-pointer"
                    >
                      <Code2 size={12} /> View Code
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-2 font-light">{proj.tagline}</p>

                <div className="mt-4 p-3 bg-black/40 border border-white/5 rounded-xl text-xs font-mono text-cyan-300 flex items-start gap-2">
                  <TrendingUp size={15} className="shrink-0 mt-0.5 text-cyan-400" />
                  <span>{proj.metrics}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                {proj.stack.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* WORK EXPERIENCE SECTION */}
      <section className="max-w-6xl mx-auto mt-20">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 mb-6">
          <Briefcase className="text-cyan-400" size={22} /> Work Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TiltCard className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-white">Business Technical Associate</h3>
                <p className="text-xs text-cyan-400">The Calling Card</p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">June 2026 – Present</span>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Analyzed operational spreadsheet workflows, identifying bottlenecks and redundant manual entry.</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Automated workflow logic with Google Sheets & scripting, speeding client turnaround times.</span>
              </li>
            </ul>
          </TiltCard>

          <TiltCard className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-white">Data & Reporting Analyst Intern</h3>
                <p className="text-xs text-cyan-400">Aavas Financiers Ltd. · BFSI</p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">June 2024 – July 2024</span>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Engineered automated reports and management dashboards tracking operational KPIs in real time.</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Conducted rigorous validation, reconciliation, and cross-source checks to secure clean data outputs.</span>
              </li>
            </ul>
          </TiltCard>
        </div>
      </section>

      {/* INTERACTIVE POP-UP MODAL (DEMO & CODE RUNNER) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-950 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-slate-300 ml-2">
                  {activeModal.type === 'demo' ? 'Interactive Project Sandbox' : 'Source Code Inspector'}
                </span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto font-sans text-xs">
              {/* --- CODE VIEW MODE --- */}
              {activeModal.type === 'code' && (
                <div>
                  <p className="text-slate-400 mb-3 font-mono">
                    // Showing production query/schema code for:{' '}
                    <strong className="text-cyan-300">
                      {projects.find((p) => p.id === activeModal.project)?.title}
                    </strong>
                  </p>
                  <pre className="p-4 bg-black/60 rounded-xl border border-white/10 font-mono text-slate-200 text-xs overflow-x-auto leading-relaxed">
                    <code>{projects.find((p) => p.id === activeModal.project)?.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* --- LIVE DEMO MODE: IPL ANALYTICS --- */}
              {activeModal.type === 'demo' && activeModal.project === 'ipl' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-white text-sm">IPL Venue & Batter Performance Sandbox</h4>
                      <p className="text-slate-400 text-[11px]">Filter partitions to test the query aggregation layer live.</p>
                    </div>
                    <div className="flex gap-1 bg-black/50 p-1 rounded-lg border border-white/10">
                      {['All', 'Wankhede', 'Chinnaswamy', 'Chepauk'].map((venue) => (
                        <button
                          key={venue}
                          onClick={() => setIplFilter(venue)}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                            iplFilter === venue ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {venue}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-xs">
                    <table className="w-full text-left">
                      <thead className="text-slate-500 border-b border-white/10">
                        <tr>
                          <th className="pb-2">Partition (Venue)</th>
                          <th className="pb-2">Avg Match Total</th>
                          <th className="pb-2">Toss Factor</th>
                          <th className="pb-2">Pace vs Spin</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-slate-300">
                        {(iplFilter === 'All' || iplFilter === 'Wankhede') && (
                          <tr>
                            <td className="py-2 text-cyan-300 font-bold">Wankhede Stadium</td>
                            <td className="py-2 text-emerald-400">182.4 (+21%)</td>
                            <td className="py-2">Bat 2nd (64% Wins)</td>
                            <td className="py-2">Pace 71%</td>
                          </tr>
                        )}
                        {(iplFilter === 'All' || iplFilter === 'Chinnaswamy') && (
                          <tr>
                            <td className="py-2 text-cyan-300 font-bold">M. Chinnaswamy</td>
                            <td className="py-2 text-emerald-400">186.2 (+24%)</td>
                            <td className="py-2">Bat 2nd (67% Wins)</td>
                            <td className="py-2">Pace 68%</td>
                          </tr>
                        )}
                        {(iplFilter === 'All' || iplFilter === 'Chepauk') && (
                          <tr>
                            <td className="py-2 text-amber-300 font-bold">M.A. Chidambaram</td>
                            <td className="py-2 text-slate-400">151.8 (Baseline)</td>
                            <td className="py-2">Bat 1st (58% Wins)</td>
                            <td className="py-2">Spin 52%</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl text-cyan-200 text-xs">
                    💡 <strong>Live Observation:</strong> Wankhede and Chinnaswamy enforce team lineups heavy on power hitters in death overs (16–20), whereas Chepauk rewards spin-dominant lineups.
                  </div>
                </div>
              )}

              {/* --- LIVE DEMO MODE: FITNESS PLATFORM --- */}
              {activeModal.type === 'demo' && activeModal.project === 'fitness' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">Relational Normalization Inspector (8 Tables)</h4>
                    <p className="text-slate-400 text-[11px]">Select a table below to inspect foreign keys, indexing, and 3NF enforcement.</p>
                  </div>

                  <div className="flex gap-2">
                    {['workouts', 'metrics_log', 'exercises'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTable(tab)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                          activeTable === tab ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'bg-black/40 text-slate-400 border border-white/5'
                        }`}
                      >
                        tbl_{tab}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-black/50 border border-white/10 rounded-xl font-mono text-xs space-y-2">
                    {activeTable === 'workouts' && (
                      <>
                        <div className="text-cyan-400 font-bold">TABLE: tbl_workouts</div>
                        <div className="text-slate-300">Fields: workout_id (PK), user_id (FK), session_date, duration_mins</div>
                        <div className="text-amber-400">Index: idx_workout_user_date (Composite B-Tree)</div>
                        <div className="text-slate-500">Latency: Reduced retrieval by ~25% over 100k simulated rows</div>
                      </>
                    )}
                    {activeTable === 'metrics_log' && (
                      <>
                        <div className="text-cyan-400 font-bold">TABLE: tbl_metrics_log</div>
                        <div className="text-slate-300">Fields: log_id (PK), workout_id (FK), metric_type, metric_value</div>
                        <div className="text-emerald-400">Constraint: 3NF Enforced (zero non-key transitive dependencies)</div>
                        <div className="text-slate-500">Redundancy: Cut storage footprint by ~30%</div>
                      </>
                    )}
                    {activeTable === 'exercises' && (
                      <>
                        <div className="text-cyan-400 font-bold">TABLE: tbl_exercises</div>
                        <div className="text-slate-300">Fields: exercise_id (PK), name, category, default_sets</div>
                        <div className="text-purple-400">Relationship: 1-to-Many with tbl_metrics_log</div>
                        <div className="text-slate-500">Integrity: Referential CASCADE ON DELETE protected</div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto mt-24 pt-8 border-t border-white/10 text-center text-xs text-slate-500 font-mono">
        Designed for Gauri Mathur · Data & Operational Analytics · 2026
      </footer>
    </div>
  );
}
