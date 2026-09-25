/**
 * Gauri Mathur - Interactive Living Data Portfolio Engine
 * Features:
 *  1. 3D Perspective Card Tilt Physics
 *  2. Modal Controller for Live Interactive Demos & Code Inspection
 *  3. Interactive Partition Filtering for the IPL Analytics Engine
 *  4. Relational Schema Tab Inspector for the Fitness Data Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  init3DTilt();
  initModalListeners();
});

// --- 1. 3D CARD PERSPECTIVE TILT PHYSICS ---
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card, .project-card, .card');
  
  cards.forEach((card) => {
    card.style.transition = 'transform 0.15s ease-out';
    card.style.transformStyle = 'preserve-3d';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-10deg to 10deg)
      const rotateX = -((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// --- 2. PROJECT DATA REPOSITORY (DEMOS & CODE) ---
const portfolioData = {
  // IPL Analytics Project
  iplDemo: {
    title: 'IPL Match Data Analytics Pipeline — Live Engine',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <p style="color:#94a3b8; font-size:12px; margin:0;">
            Filter venue partitions to observe scoring variations:
          </p>
          <div style="display:flex; gap:6px;">
            <button onclick="window.filterIplVenue('All')" style="padding:4px 8px; font-size:11px; border-radius:6px; border:1px solid #334155; background:#0f172a; color:#38bdf8; cursor:pointer;">All</button>
            <button onclick="window.filterIplVenue('Wankhede')" style="padding:4px 8px; font-size:11px; border-radius:6px; border:1px solid #334155; background:#0f172a; color:#e2e8f0; cursor:pointer;">Wankhede</button>
            <button onclick="window.filterIplVenue('Chinnaswamy')" style="padding:4px 8px; font-size:11px; border-radius:6px; border:1px solid #334155; background:#0f172a; color:#e2e8f0; cursor:pointer;">Chinnaswamy</button>
            <button onclick="window.filterIplVenue('Chepauk')" style="padding:4px 8px; font-size:11px; border-radius:6px; border:1px solid #334155; background:#0f172a; color:#e2e8f0; cursor:pointer;">Chepauk</button>
          </div>
        </div>

        <table style="width:100%; border-collapse:collapse; font-family:monospace; font-size:12px; margin-bottom:12px; background:#050914; border-radius:8px; overflow:hidden;">
          <thead style="background:#0b1329; color:#94a3b8;">
            <tr>
              <th style="padding:8px; text-align:left;">Stadium / Venue</th>
              <th style="padding:8px; text-align:left;">Avg Total</th>
              <th style="padding:8px; text-align:left;">Chasing Win %</th>
              <th style="padding:8px; text-align:left;">Profile</th>
            </tr>
          </thead>
          <tbody id="ipl-table-body" style="color:#f8fafc;">
            <tr style="border-bottom:1px solid #1e293b;">
              <td style="padding:8px; color:#38bdf8; font-weight:bold;">Wankhede Stadium</td>
              <td style="padding:8px; color:#4ade80;">182.4 (+21%)</td>
              <td style="padding:8px;">64%</td>
              <td style="padding:8px;">Pace Dominant (71%)</td>
            </tr>
            <tr style="border-bottom:1px solid #1e293b;">
              <td style="padding:8px; color:#38bdf8; font-weight:bold;">M. Chinnaswamy</td>
              <td style="padding:8px; color:#4ade80;">186.2 (+24%)</td>
              <td style="padding:8px;">67%</td>
              <td style="padding:8px;">High Altitude / Short Boundary</td>
            </tr>
            <tr>
              <td style="padding:8px; color:#fbbf24; font-weight:bold;">M.A. Chidambaram (Chepauk)</td>
              <td style="padding:8px; color:#94a3b8;">151.8 (Baseline)</td>
              <td style="padding:8px;">42%</td>
              <td style="padding:8px;">Spin Dominant (52%)</td>
            </tr>
          </tbody>
        </table>

        <div style="padding:10px; background:rgba(6, 182, 212, 0.1); border-left:3px solid #06b6d4; border-radius:4px; font-size:12px; color:#67e8f9;">
          <strong>Aggregated Finding:</strong> Wankhede and Chinnaswamy produce 20%+ higher average scores than Chepauk, reinforcing lineup strategies prioritizing death-over power hitters.
        </div>
      </div>
    `
  },

  iplCode: {
    title: 'IPL Analysis — Production SQL Script',
    html: `
      <div>
        <p style="color:#94a3b8; font-size:12px; margin-bottom:8px; font-family:monospace;">
          -- 5-Season Multi-Table CTE & Window Aggregation Layer
        </p>
        <pre style="background:#050914; border:1px solid #1e293b; padding:14px; border-radius:8px; color:#e2e8f0; font-family:monospace; font-size:12px; line-height:1.5; overflow-x:auto;">
<span style="color:#c084fc;">WITH</span> <span style="color:#38bdf8;">season_runs</span> <span style="color:#c084fc;">AS</span> (
  <span style="color:#c084fc;">SELECT</span> 
    season, 
    batter, 
    <span style="color:#f59e0b;">SUM</span>(batsman_runs) <span style="color:#c084fc;">AS</span> total_runs,
    <span style="color:#f59e0b;">COUNT</span>(<span style="color:#c084fc;">DISTINCT</span> match_id) <span style="color:#c084fc;">AS</span> matches_played
  <span style="color:#c084fc;">FROM</span> deliveries d
  <span style="color:#c084fc;">JOIN</span> matches m <span style="color:#c084fc;">ON</span> d.match_id = m.id
  <span style="color:#c084fc;">GROUP BY</span> season, batter
)
<span style="color:#c084fc;">SELECT</span> 
  season, 
  batter, 
  total_runs,
  <span style="color:#4ade80;">DENSE_RANK</span>() <span style="color:#c084fc;">OVER</span> (
    <span style="color:#c084fc;">PARTITION BY</span> season 
    <span style="color:#c084fc;">ORDER BY</span> total_runs <span style="color:#c084fc;">DESC</span>
  ) <span style="color:#c084fc;">AS</span> rank_in_season
<span style="color:#c084fc;">FROM</span> season_runs
<span style="color:#c084fc;">WHERE</span> rank_in_season &lt;= 5;</pre>
      </div>
    `
  },

  // Fitness Data Platform Project
  fitnessDemo: {
    title: 'Fitness Data Platform — Relational Schema Inspector',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <p style="color:#94a3b8; font-size:12px; margin-bottom:10px;">
          Inspect normalized database schemas (3NF enforced) with indexing metadata:
        </p>

        <div style="display:flex; gap:6px; margin-bottom:12px;">
          <button onclick="window.switchSchemaTable('workouts')" id="tab-btn-workouts" style="padding:5px 10px; font-size:11px; font-family:monospace; border-radius:6px; border:1px solid #06b6d4; background:rgba(6,182,212,0.15); color:#67e8f9; cursor:pointer;">tbl_workouts</button>
          <button onclick="window.switchSchemaTable('metrics')" id="tab-btn-metrics" style="padding:5px 10px; font-size:11px; font-family:monospace; border-radius:6px; border:1px solid #334155; background:#0f172a; color:#94a3b8; cursor:pointer;">tbl_metrics_log</button>
          <button onclick="window.switchSchemaTable('exercises')" id="tab-btn-exercises" style="padding:5px 10px; font-size:11px; font-family:monospace; border-radius:6px; border:1px solid #334155; background:#0f172a; color:#94a3b8; cursor:pointer;">tbl_exercises</button>
        </div>

        <div id="schema-details-box" style="padding:14px; background:#050914; border:1px solid #1e293b; border-radius:8px; font-family:monospace; font-size:12px; color:#f8fafc; line-height:1.6;">
          <div style="color:#38bdf8; font-weight:bold; margin-bottom:4px;">TABLE: tbl_workouts</div>
          <div>Columns: <span style="color:#94a3b8;">workout_id (PK), user_id (FK), session_date, duration_mins</span></div>
          <div style="color:#f59e0b; margin-top:4px;">Applied Index: CREATE INDEX idx_user_date ON workouts(user_id, session_date);</div>
          <div style="color:#4ade80; margin-top:4px;">Optimization Gain: ~25% reduction in query latency on range filters.</div>
        </div>
      </div>
    `
  },

  fitnessCode: {
    title: 'Fitness Data Platform — Java & MySQL Schema Source',
    html: `
      <div>
        <pre style="background:#050914; border:1px solid #1e293b; padding:14px; border-radius:8px; color:#e2e8f0; font-family:monospace; font-size:12px; line-height:1.5; overflow-x:auto;">
<span style="color:#94a3b8;">// Optimized Aggregation Query with JDBC PreparedStatement</span>
<span style="color:#c084fc;">String</span> query = <span style="color:#4ade80;">"SELECT u.full_name, COUNT(w.workout_id) AS total_sessions, "</span> +
               <span style="color:#4ade80;">"AVG(w.duration_mins) AS avg_duration "</span> +
               <span style="color:#4ade80;">"FROM tbl_users u "</span> +
               <span style="color:#4ade80;">"JOIN tbl_workouts w ON u.user_id = w.user_id "</span> +
               <span style="color:#4ade80;">"WHERE w.session_date >= CURRENT_DATE - INTERVAL 30 DAY "</span> +
               <span style="color:#4ade80;">"GROUP BY u.user_id, u.full_name;"</span>;

<span style="color:#c084fc;">PreparedStatement</span> stmt = connection.prepareStatement(query);
<span style="color:#c084fc;">ResultSet</span> rs = stmt.executeQuery();</pre>
      </div>
    `
  }
};

// --- 3. MODAL CONTROLLER (GLOBAL SCOPE) ---
window.openModal = function (key) {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');

  if (!modal || !portfolioData[key]) return;

  modalTitle.innerText = portfolioData[key].title;
  modalContent.innerHTML = portfolioData[key].html;
  modal.style.display = 'flex';
};

window.closeModal = function () {
  const modal = document.getElementById('project-modal');
  if (modal) modal.style.display = 'none';
};

// --- 4. INTERACTIVE DEMO HANDLERS ---
window.filterIplVenue = function (venue) {
  const tbody = document.getElementById('ipl-table-body');
  if (!tbody) return;

  if (venue === 'Wankhede') {
    tbody.innerHTML = `
      <tr>
        <td style="padding:8px; color:#38bdf8; font-weight:bold;">Wankhede Stadium</td>
        <td style="padding:8px; color:#4ade80;">182.4 (+21%)</td>
        <td style="padding:8px;">64%</td>
        <td style="padding:8px;">Pace Dominant (71%)</td>
      </tr>
    `;
  } else if (venue === 'Chinnaswamy') {
    tbody.innerHTML = `
      <tr>
        <td style="padding:8px; color:#38bdf8; font-weight:bold;">M. Chinnaswamy</td>
        <td style="padding:8px; color:#4ade80;">186.2 (+24%)</td>
        <td style="padding:8px;">67%</td>
        <td style="padding:8px;">High Altitude / Short Boundary</td>
      </tr>
    `;
  } else if (venue === 'Chepauk') {
    tbody.innerHTML = `
      <tr>
        <td style="padding:8px; color:#fbbf24; font-weight:bold;">M.A. Chidambaram</td>
        <td style="padding:8px; color:#94a3b8;">151.8 (Baseline)</td>
        <td style="padding:8px;">42%</td>
        <td style="padding:8px;">Spin Dominant (52%)</td>
      </tr>
    `;
  } else {
    tbody.innerHTML = `
      <tr style="border-bottom:1px solid #1e293b;">
        <td style="padding:8px; color:#38bdf8; font-weight:bold;">Wankhede Stadium</td>
        <td style="padding:8px; color:#4ade80;">182.4 (+21%)</td>
        <td style="padding:8px;">64%</td>
        <td style="padding:8px;">Pace Dominant (71%)</td>
      </tr>
      <tr style="border-bottom:1px solid #1e293b;">
        <td style="padding:8px; color:#38bdf8; font-weight:bold;">M. Chinnaswamy</td>
        <td style="padding:8px; color:#4ade80;">186.2 (+24%)</td>
        <td style="padding:8px;">67%</td>
        <td style="padding:8px;">High Altitude / Short Boundary</td>
      </tr>
      <tr>
        <td style="padding:8px; color:#fbbf24; font-weight:bold;">M.A. Chidambaram</td>
        <td style="padding:8px; color:#94a3b8;">151.8 (Baseline)</td>
        <td style="padding:8px;">42%</td>
        <td style="padding:8px;">Spin Dominant (52%)</td>
      </tr>
    `;
  }
};

window.switchSchemaTable = function (table) {
  const box = document.getElementById('schema-details-box');
  const btnWorkouts = document.getElementById('tab-btn-workouts');
  const btnMetrics = document.getElementById('tab-btn-metrics');
  const btnExercises = document.getElementById('tab-btn-exercises');

  // Reset button highlights
  [btnWorkouts, btnMetrics, btnExercises].forEach(btn => {
    if (btn) {
      btn.style.borderColor = '#334155';
      btn.style.background = '#0f172a';
      btn.style.color = '#94a3b8';
    }
  });

  if (table === 'workouts') {
    btnWorkouts.style.borderColor = '#06b6d4';
    btnWorkouts.style.background = 'rgba(6,182,212,0.15)';
    btnWorkouts.style.color = '#67e8f9';
    box.innerHTML = `
      <div style="color:#38bdf8; font-weight:bold; margin-bottom:4px;">TABLE: tbl_workouts</div>
      <div>Columns: <span style="color:#94a3b8;">workout_id (PK), user_id (FK), session_date, duration_mins</span></div>
      <div style="color:#f59e0b; margin-top:4px;">Applied Index: CREATE INDEX idx_user_date ON workouts(user_id, session_date);</div>
      <div style="color:#4ade80; margin-top:4px;">Optimization Gain: ~25% reduction in query latency on range filters.</div>
    `;
  } else if (table === 'metrics') {
    btnMetrics.style.borderColor = '#06b6d4';
    btnMetrics.style.background = 'rgba(6,182,212,0.15)';
    btnMetrics.style.color = '#67e8f9';
    box.innerHTML = `
      <div style="color:#38bdf8; font-weight:bold; margin-bottom:4px;">TABLE: tbl_metrics_log</div>
      <div>Columns: <span style="color:#94a3b8;">log_id (PK), workout_id (FK), metric_type, metric_value</span></div>
      <div style="color:#a855f7; margin-top:4px;">Normalization: 3NF Enforced (zero non-key transitive dependencies)</div>
      <div style="color:#4ade80; margin-top:4px;">Redundancy Reduction: Cut total storage footprint by ~30%.</div>
    `;
  } else if (table === 'exercises') {
    btnExercises.style.borderColor = '#06b6d4';
    btnExercises.style.background = 'rgba(6,182,212,0.15)';
    btnExercises.style.color = '#67e8f9';
    box.innerHTML = `
      <div style="color:#38bdf8; font-weight:bold; margin-bottom:4px;">TABLE: tbl_exercises</div>
      <div>Columns: <span style="color:#94a3b8;">exercise_id (PK), name, category, default_sets</span></div>
      <div style="color:#f59e0b; margin-top:4px;">Constraint: 1-to-Many foreign key cascade to tbl_metrics_log.</div>
      <div style="color:#4ade80; margin-top:4px;">Integrity Check: Strict referential integrity enforced on delete.</div>
    `;
  }
};

// Close modal when clicking outside background overlay or pressing Escape
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
