document.addEventListener('DOMContentLoaded', () => {
  init3DTilt();
  initModalListeners();
});

// --- 1. 3D CARD PERSPECTIVE TILT PHYSICS ---
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card, .project-card, section > div > div');
  
  cards.forEach((card) => {
    card.style.transition = 'transform 0.15s ease-out';
    card.style.transformStyle = 'preserve-3d';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// --- 2. MODAL & DEMO REPOSITORY ---
const portfolioData = {
  iplDemo: {
    title: 'IPL Match Data Analytics Pipeline — Live Engine',
    html: `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <p style="color:#94a3b8; font-size:12px; margin:0;">Filter venue partitions live:</p>
          <div style="display:flex; gap:6px;">
            <button onclick="window.filterIplVenue('All')" style="padding:4px 8px; font-size:11px; border-radius:6px; border:1px solid #334155; background:#0f172a; color:#38bdf8; cursor:pointer;">All</button>
            <button onclick="window.filterIplVenue('Wankhede')" style="padding:4px 8px; font-size:11px; border-radius:6px; border:1px solid #334155; background:#0f172a; color:#e2e8f0; cursor:pointer;">Wankhede</button>
            <button onclick="window.filterIplVenue('Chinnaswamy')" style="padding:4px 8px; font-size:11px; border-radius:6px; border:1px solid #334155; background:#0f172a; color:#e2e8f0; cursor:pointer;">Chinnaswamy</button>
            <button onclick="window.filterIplVenue('Chepauk')" style="padding:4px 8px; font-size:11px; border-radius:6px; border:1px solid #334155; background:#0f172a; color:#e2e8f0; cursor:pointer;">Chepauk</button>
          </div>
        </div>
        <table style="width:100%; border-collapse:collapse; font-family:monospace; font-size:12px; margin-bottom:12px; background:#050914; border-radius:8px;">
          <thead style="background:#0b1329; color:#94a3b8;">
            <tr>
              <th style="padding:8px; text-align:left;">Venue</th>
              <th style="padding:8px; text-align:left;">Avg Total</th>
              <th style="padding:8px; text-align:left;">Chasing Win %</th>
            </tr>
          </thead>
          <tbody id="ipl-table-body" style="color:#f8fafc;">
            <tr style="border-bottom:1px solid #1e293b;">
              <td style="padding:8px; color:#38bdf8; font-weight:bold;">Wankhede Stadium</td>
              <td style="padding:8px; color:#4ade80;">182.4 (+21%)</td>
              <td style="padding:8px;">64%</td>
            </tr>
            <tr style="border-bottom:1px solid #1e293b;">
              <td style="padding:8px; color:#38bdf8; font-weight:bold;">M. Chinnaswamy</td>
              <td style="padding:8px; color:#4ade80;">186.2 (+24%)</td>
              <td style="padding:8px;">67%</td>
            </tr>
            <tr>
              <td style="padding:8px; color:#fbbf24; font-weight:bold;">M.A. Chidambaram</td>
              <td style="padding:8px; color:#94a3b8;">151.8 (Baseline)</td>
              <td style="padding:8px;">42%</td>
            </tr>
          </tbody>
        </table>
        <div style="padding:10px; background:rgba(6,182,212,0.1); border-left:3px solid #06b6d4; border-radius:4px; font-size:12px; color:#67e8f9;">
          <strong>Insight:</strong> Wankhede & Chinnaswamy produce 20%+ higher avg scores than Chepauk.
        </div>
      </div>
    `
  },
  iplCode: {
    title: 'IPL Analysis — Production SQL Query',
    html: `
      <pre style="background:#050914; border:1px solid #1e293b; padding:14px; border-radius:8px; color:#e2e8f0; font-family:monospace; font-size:12px; overflow-x:auto;">
<span style="color:#c084fc;">WITH</span> <span style="color:#38bdf8;">season_runs</span> <span style="color:#c084fc;">AS</span> (
  <span style="color:#c084fc;">SELECT</span> season, batter, <span style="color:#f59e0b;">SUM</span>(batsman_runs) <span style="color:#c084fc;">AS</span> total_runs
  <span style="color:#c084fc;">FROM</span> deliveries d <span style="color:#c084fc;">JOIN</span> matches m <span style="color:#c084fc;">ON</span> d.match_id = m.id
  <span style="color:#c084fc;">GROUP BY</span> season, batter
)
<span style="color:#c084fc;">SELECT</span> season, batter, total_runs,
  <span style="color:#4ade80;">DENSE_RANK</span>() <span style="color:#c084fc;">OVER</span> (<span style="color:#c084fc;">PARTITION BY</span> season <span style="color:#c084fc;">ORDER BY</span> total_runs <span style="color:#c084fc;">DESC</span>) <span style="color:#c084fc;">AS</span> rank_in_season
<span style="color:#c084fc;">FROM</span> season_runs <span style="color:#c084fc;">WHERE</span> rank_in_season &lt;= 5;</pre>
    `
  },
  fitnessDemo: {
    title: 'Fitness Data Platform — Relational Schema Inspector',
    html: `
      <div>
        <p style="color:#94a3b8; font-size:12px; margin-bottom:10px;">Normalized database schema (3NF enforced):</p>
        <div style="display:flex; gap:6px; margin-bottom:12px;">
          <button onclick="window.switchSchemaTable('workouts')" id="tab-workouts" style="padding:5px 10px; font-size:11px; border-radius:6px; border:1px solid #06b6d4; background:rgba(6,182,212,0.15); color:#67e8f9; cursor:pointer;">tbl_workouts</button>
          <button onclick="window.switchSchemaTable('metrics')" id="tab-metrics" style="padding:5px 10px; font-size:11px; border-radius:6px; border:1px solid #334155; background:#0f172a; color:#94a3b8; cursor:pointer;">tbl_metrics_log</button>
        </div>
        <div id="schema-box" style="padding:14px; background:#050914; border:1px solid #1e293b; border-radius:8px; font-family:monospace; font-size:12px; color:#f8fafc;">
          <div style="color:#38bdf8; font-weight:bold;">TABLE: tbl_workouts</div>
          <div>Columns: workout_id (PK), user_id (FK), session_date, duration_mins</div>
          <div style="color:#f59e0b; margin-top:4px;">Applied Index: CREATE INDEX idx_user_date ON workouts(user_id, session_date);</div>
          <div style="color:#4ade80; margin-top:4px;">Gain: ~25% reduction in query latency on range filters.</div>
        </div>
      </div>
    `
  },
  fitnessCode: {
    title: 'Fitness Platform — Java & MySQL Query',
    html: `
      <pre style="background:#050914; border:1px solid #1e293b; padding:14px; border-radius:8px; color:#e2e8f0; font-family:monospace; font-size:12px; overflow-x:auto;">
String query = "SELECT u.full_name, COUNT(w.workout_id) AS total_sessions, " +
               "AVG(w.duration_mins) AS avg_duration " +
               "FROM tbl_users u JOIN tbl_workouts w ON u.user_id = w.user_id " +
               "WHERE w.session_date >= CURRENT_DATE - INTERVAL 30 DAY " +
               "GROUP BY u.user_id, u.full_name;";
PreparedStatement stmt = connection.prepareStatement(query);
ResultSet rs = stmt.executeQuery();</pre>
    `
  }
};

// --- 3. MODAL CONTROLS ---
window.openModal = function(key) {
  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-title');
  const content = document.getElementById('modal-content');
  if (!modal || !portfolioData[key]) return;

  title.innerText = portfolioData[key].title;
  content.innerHTML = portfolioData[key].html;
  modal.style.display = 'flex';
};

window.closeModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.style.display = 'none';
};

window.filterIplVenue = function(venue) {
  const tbody = document.getElementById('ipl-table-body');
  if (!tbody) return;
  if (venue === 'Wankhede') {
    tbody.innerHTML = '<tr><td style="padding:8px; color:#38bdf8; font-weight:bold;">Wankhede Stadium</td><td style="padding:8px; color:#4ade80;">182.4 (+21%)</td><td style="padding:8px;">64%</td></tr>';
  } else if (venue === 'Chinnaswamy') {
    tbody.innerHTML = '<tr><td style="padding:8px; color:#38bdf8; font-weight:bold;">M. Chinnaswamy</td><td style="padding:8px; color:#4ade80;">186.2 (+24%)</td><td style="padding:8px;">67%</td></tr>';
  } else if (venue === 'Chepauk') {
    tbody.innerHTML = '<tr><td style="padding:8px; color:#fbbf24; font-weight:bold;">M.A. Chidambaram</td><td style="padding:8px; color:#94a3b8;">151.8 (Baseline)</td><td style="padding:8px;">42%</td></tr>';
  } else {
    tbody.innerHTML = `
      <tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px; color:#38bdf8; font-weight:bold;">Wankhede Stadium</td><td style="padding:8px; color:#4ade80;">182.4 (+21%)</td><td style="padding:8px;">64%</td></tr>
      <tr style="border-bottom:1px solid #1e293b;"><td style="padding:8px; color:#38bdf8; font-weight:bold;">M. Chinnaswamy</td><td style="padding:8px; color:#4ade80;">186.2 (+24%)</td><td style="padding:8px;">67%</td></tr>
      <tr><td style="padding:8px; color:#fbbf24; font-weight:bold;">M.A. Chidambaram</td><td style="padding:8px; color:#94a3b8;">151.8 (Baseline)</td><td style="padding:8px;">42%</td></tr>
    `;
  }
};

window.switchSchemaTable = function(table) {
  const box = document.getElementById('schema-box');
  const btnW = document.getElementById('tab-workouts');
  const btnM = document.getElementById('tab-metrics');
  if (table === 'workouts') {
    btnW.style.borderColor = '#06b6d4'; btnW.style.background = 'rgba(6,182,212,0.15)'; btnW.style.color = '#67e8f9';
    btnM.style.borderColor = '#334155'; btnM.style.background = '#0f172a'; btnM.style.color = '#94a3b8';
    box.innerHTML = '<div style="color:#38bdf8; font-weight:bold;">TABLE: tbl_workouts</div><div>Columns: workout_id (PK), user_id (FK), session_date, duration_mins</div><div style="color:#f59e0b; margin-top:4px;">Applied Index: CREATE INDEX idx_user_date ON workouts(user_id, session_date);</div><div style="color:#4ade80; margin-top:4px;">Gain: ~25% reduction in query latency.</div>';
  } else {
    btnM.style.borderColor = '#06b6d4'; btnM.style.background = 'rgba(6,182,212,0.15)'; btnM.style.color = '#67e8f9';
    btnW.style.borderColor = '#334155'; btnW.style.background = '#0f172a'; btnW.style.color = '#94a3b8';
    box.innerHTML = '<div style="color:#38bdf8; font-weight:bold;">TABLE: tbl_metrics_log</div><div>Columns: log_id (PK), workout_id (FK), metric_type, metric_value</div><div style="color:#a855f7; margin-top:4px;">Normalization: 3NF Enforced</div><div style="color:#4ade80; margin-top:4px;">Redundancy Reduction: Cut storage footprint by ~30%.</div>';
  }
};

function initModalListeners() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) window.closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeModal();
  });
}
