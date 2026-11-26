import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Building2,
  Users,
  UserRound,
  ClipboardList,
  Camera,
  ShieldCheck,
  CircleCheck,
  RotateCcw,
  Calendar,
  Bell,
  FileText,
  ChartNoAxesCombined,
  MessageSquare,
  Layers,
  Settings,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Grid,
  Sparkles,
  Check,
  X,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  Wifi,
  WifiOff,
  Sliders,
  Star,
  AlertTriangle,
  Download,
  Search,
  Plus,
  Compass,
  BrainCircuit,
  Smartphone,
  CheckSquare,
  Square,
  Clock,
  RefreshCw,
  Award,
  Activity
} from 'lucide-react';

// ============================================================================
// BRAND TOKENS & SHARED DEMONSTRATION SCENARIO
// ============================================================================
// Deep Plum: #3A1150 | Primary Plum: #6B2A7F | Orchid: #8E3B9E
// Soft Pink: #D07BDA | Lavender: #E9DDF5 | Pastel Blue: #DFE8FA
// Pastel Pink: #F8E4F1 | Off-white: #FAF8FC

const INITIAL_DEMO_STATE = {
  provider: 'Prime Facility Services',
  opsHead: 'Arjun',
  client: 'Northstar Coworking',
  facility: 'Northstar Business Centre',
  floor: 'Floor 2',
  area: 'Pantry',
  fm: 'Priya',
  supervisor: 'Karthik',
  taskId: 'FF-1042',
  taskTitle: 'Pantry Cleaning and Sanitization',
  dueTime: '10:00 AM',
  status: 'Assigned', // Assigned -> Acknowledged -> In Progress -> Awaiting Review -> Rework Required -> Resubmitted -> Approved
  checklist: [
    { id: 'c1', label: 'Remove waste', done: true },
    { id: 'c2', label: 'Clean countertop', done: true },
    { id: 'c3', label: 'Clean sink', done: true },
    { id: 'c4', label: 'Mop floor', done: true },
    { id: 'c5', label: 'Refill consumables', done: true }
  ],
  reworkReason: 'Visible stain remains near the pantry sink.',
  reworkInstruction: 'Clean the affected area and submit revised photographic evidence.',
  selectedBuilding: 'C1',
  selectedFloor: 2,
  selectedArea: 'Pantry',
  newClientAdded: false,
  karthikAllocated: true,
  wizardStep: 1,
  reliabilityCase: 'WEAK_CONN',
  inspectionScore: 94,
  auditItems: [
    { id: 'a1', label: 'Floor dry & slip-free', pass: true },
    { id: 'a2', label: 'Sink & faucet sanitized', pass: true },
    { id: 'a3', label: 'Soap & tissue stocked', pass: true },
    { id: 'a4', label: 'Waste bin liner replaced', pass: true }
  ],
  complaintSubmitted: true,
  directiveSent: true,
  evalRating: 5,
  evalNote: 'Prompt rework turnaround and transparent photographic proof across Floor 2.'
};

const SLIDES_META = [
  { num: 1, title: 'Product Introduction', category: 'Overview', group: 'intro' },
  { num: 2, title: 'The Business Problem', category: 'Context', group: 'intro' },
  { num: 3, title: 'Connected Service Ecosystem', category: 'Architecture', group: 'intro' },
  { num: 4, title: 'Splash & Onboarding', category: 'Onboarding', group: 'intro' },
  { num: 5, title: 'Common Login & Role-Based Access', category: 'Access', group: 'intro' },
  { num: 6, title: 'Operations Head Dashboard', category: 'Operations Head', group: 'ops' },
  { num: 7, title: 'Client Management & Onboarding', category: 'Operations Head', group: 'ops' },
  { num: 8, title: 'Supervisor Management & Allocation', category: 'Operations Head', group: 'ops' },
  { num: 9, title: 'Facility Manager Dashboard', category: 'Facility Manager', group: 'fm' },
  { num: 10, title: 'Facility Configuration Wizard', category: 'Facility Config', group: 'config' },
  { num: 11, title: 'Interactive 3D Facility View', category: 'Facility Config', group: 'config' },
  { num: 12, title: 'Task Creation & Assignment', category: 'Task Workflow', group: 'workflow' },
  { num: 13, title: 'Supervisor Dashboard', category: 'Supervisor', group: 'sup' },
  { num: 14, title: 'Task Acknowledgment & Execution', category: 'Task Workflow', group: 'workflow' },
  { num: 15, title: 'Digital Checklists', category: 'Task Workflow', group: 'workflow' },
  { num: 16, title: 'Photographic Evidence', category: 'Evidence & Rework', group: 'evidence' },
  { num: 17, title: 'Submission for Review', category: 'Task Workflow', group: 'workflow' },
  { num: 18, title: 'Facility Manager Evidence Review', category: 'Evidence & Rework', group: 'evidence' },
  { num: 19, title: 'Rework Request', category: 'Evidence & Rework', group: 'evidence' },
  { num: 20, title: 'Correction & Resubmission', category: 'Evidence & Rework', group: 'evidence' },
  { num: 21, title: 'Final Approval', category: 'Evidence & Rework', group: 'evidence' },
  { num: 22, title: 'Complete Task Lifecycle', category: 'Task Workflow', group: 'workflow' },
  { num: 23, title: 'Daily Operational Logs', category: 'Operations', group: 'sup' },
  { num: 24, title: 'Audits & Inspections', category: 'Governance', group: 'fm' },
  { num: 25, title: 'Complaints & Corrective Actions', category: 'Governance', group: 'ops' },
  { num: 26, title: 'Notifications & Communication', category: 'Collaboration', group: 'workflow' },
  { num: 27, title: 'Operations Head Monitoring', category: 'Operations Head', group: 'ops' },
  { num: 28, title: 'Performance Analytics', category: 'Analytics', group: 'analytics' },
  { num: 29, title: 'Service Provider Evaluation', category: 'Analytics', group: 'analytics' },
  { num: 30, title: 'Reports & Operational History', category: 'Reports', group: 'reports' },
  { num: 31, title: 'Profile, Settings & Secure Access', category: 'Security', group: 'ops' },
  { num: 32, title: 'Mobile Reliability', category: 'Resilience', group: 'sup' },
  { num: 33, title: 'Future Intelligence (Roadmap)', category: 'Roadmap', group: 'analytics' },
  { num: 34, title: 'Complete Application Overview', category: 'Summary', group: 'intro' },
  { num: 35, title: 'Closing', category: 'Finale', group: 'intro' }
];

// ============================================================================
// REUSABLE 3D ISOMETRIC & PANTRY EVIDENCE SVG GRAPHICS
// ============================================================================

function IsometricTowersSVG({ activeBuilding = 'C1', onSelectBuilding, reducedMotion }) {
  const towers = [
    { id: 'C2', label: 'C2 Horizon', x: 75, y: 78, h: 46, rate: '92%' },
    { id: 'C1', label: 'C1 Northstar', x: 180, y: 52, h: 68, rate: '96%' },
    { id: 'C3', label: 'C3 Meridian', x: 285, y: 82, h: 42, rate: '81%' },
    { id: 'C4', label: 'C4 Vertex', x: 180, y: 112, h: 38, rate: '98%' }
  ];

  return (
    <svg viewBox="0 0 360 175" className="w-full h-full select-none">
      <defs>
        <linearGradient id="isoL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8E3B9E" />
          <stop offset="100%" stopColor="#3A1150" />
        </linearGradient>
        <linearGradient id="isoR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D07BDA" />
          <stop offset="100%" stopColor="#6B2A7F" />
        </linearGradient>
        <linearGradient id="isoTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8E4F1" />
          <stop offset="100%" stopColor="#E9DDF5" />
        </linearGradient>
      </defs>

      {/* Orbital Rings */}
      <ellipse cx="180" cy="128" rx="158" ry="30" fill="#E9DDF5" opacity="0.22" />
      <ellipse
        cx="180"
        cy="128"
        rx="132"
        ry="22"
        fill="none"
        stroke="#D07BDA"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />

      {/* Animated Connection Arcs */}
      <path d="M75 88 Q128 50 180 65" fill="none" stroke="#8E3B9E" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M285 90 Q232 50 180 65" fill="none" stroke="#8E3B9E" strokeWidth="1.5" strokeDasharray="3 3" />
      {!reducedMotion && (
        <circle r="3.5" fill="#D07BDA">
          <animateMotion dur="3s" repeatCount="indefinite" path="M75 88 Q128 50 180 65" />
        </circle>
      )}

      {towers.map((t) => {
        const isSel = activeBuilding === t.id;
        const w = 26;
        const topY = t.y;
        const botY = t.y + t.h;
        return (
          <g
            key={t.id}
            onClick={() => onSelectBuilding && onSelectBuilding(t.id)}
            className={onSelectBuilding ? 'cursor-pointer' : ''}
          >
            <polygon
              points={`${t.x},${topY - 12} ${t.x + w},${topY} ${t.x},${topY + 12} ${t.x - w},${topY}`}
              fill={isSel ? '#FFFFFF' : 'url(#isoTop)'}
              stroke={isSel ? '#3A1150' : 'none'}
              strokeWidth="1.5"
            />
            <polygon
              points={`${t.x - w},${topY} ${t.x},${topY + 12} ${t.x},${botY + 12} ${t.x - w},${botY}`}
              fill="url(#isoL)"
              opacity={isSel ? 1 : 0.85}
            />
            <polygon
              points={`${t.x},${topY + 12} ${t.x + w},${topY} ${t.x + w},${botY} ${t.x},${botY + 12}`}
              fill="url(#isoR)"
              opacity={isSel ? 1 : 0.85}
            />
            <rect
              x={t.x - 32}
              y={topY - 28}
              width="64"
              height="14"
              rx="7"
              fill={isSel ? '#3A1150' : '#FFFFFF'}
              stroke="#D07BDA"
              strokeWidth="1"
            />
            <text
              x={t.x}
              y={topY - 18.5}
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              fill={isSel ? '#FFFFFF' : '#3A1150'}
            >
              {t.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function PantryEvidenceIllustration({ variant = 'AFTER_V2', label, timestamp }) {
  // variant: 'BEFORE' | 'AFTER_V1_STAIN' | 'AFTER_V2'
  return (
    <div className="rounded-xl overflow-hidden border border-[#E9DDF5] bg-white">
      <div className="relative h-24 w-full bg-[#FAF8FC]">
        <svg viewBox="0 0 260 96" className="w-full h-full">
          {/* Wall & Tile Backsplash */}
          <rect
            width="260"
            height="96"
            fill={variant === 'BEFORE' ? '#EDE6F5' : '#DFE8FA'}
            opacity="0.55"
          />
          {/* Upper Cabinets */}
          <rect x="16" y="8" width="95" height="26" rx="4" fill="#FFFFFF" stroke="#8E3B9E" strokeWidth="1.2" />
          <rect x="148" y="8" width="95" height="26" rx="4" fill="#FFFFFF" stroke="#8E3B9E" strokeWidth="1.2" />

          {/* Countertop */}
          <rect x="10" y="54" width="240" height="8" rx="3" fill="#3A1150" />
          {/* Lower Cabinetry */}
          <rect x="14" y="62" width="232" height="30" rx="4" fill="#E9DDF5" />

          {/* Pantry Sink & Faucet */}
          <rect x="146" y="50" width="52" height="5" rx="2" fill="#94A3B8" />
          <path d="M172 50 L172 39 Q172 35 177 35 L181 35" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

          {/* Coffee Machine & Soap Dispenser */}
          <rect x="30" y="34" width="24" height="20" rx="4" fill="#6B2A7F" />
          <rect x="210" y="41" width="10" height="13" rx="3" fill="#8E3B9E" />

          {/* BEFORE: Clutter, spilled coffee & overflowing bin */}
          {variant === 'BEFORE' && (
            <>
              <ellipse cx="92" cy="53" rx="16" ry="3" fill="#78350F" opacity="0.65" />
              <rect x="64" y="45" width="9" height="9" rx="1.5" fill="#D97706" />
              <ellipse cx="136" cy="53" rx="12" ry="2.5" fill="#92400E" opacity="0.6" />
              <circle cx="118" cy="78" r="9" fill="#B45309" opacity="0.35" />
            </>
          )}

          {/* AFTER V1: Clean overall, but visible stain near sink */}
          {variant === 'AFTER_V1_STAIN' && (
            <>
              <ellipse cx="136" cy="53" rx="11" ry="2.6" fill="#B45309" opacity="0.85" />
              <circle
                cx="136"
                cy="52"
                r="14"
                fill="none"
                stroke="#EF4444"
                strokeWidth="1.6"
                strokeDasharray="3 2"
              />
              <text x="115" y="44" fontSize="7.5" fontWeight="700" fill="#DC2626">
                Stain near sink
              </text>
            </>
          )}

          {/* AFTER V2: Spotless with shine sparkles */}
          {variant === 'AFTER_V2' && (
            <>
              <path
                d="M135 41 L137 46 L142 48 L137 50 L135 55 L133 50 L128 48 L133 46 Z"
                fill="#10B981"
              />
              <path
                d="M84 42 L85.5 45.5 L89 47 L85.5 48.5 L84 52 L82.5 48.5 L79 47 L82.5 45.5 Z"
                fill="#8E3B9E"
              />
            </>
          )}
        </svg>

        <span
          className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase text-white ${
            variant === 'BEFORE'
              ? 'bg-[#3A1150]'
              : variant === 'AFTER_V1_STAIN'
              ? 'bg-rose-600'
              : 'bg-emerald-600'
          }`}
        >
          {label}
        </span>
      </div>
      {timestamp && (
        <div className="px-2.5 py-1 text-[10px] text-slate-600 flex items-center justify-between bg-white border-t border-[#E9DDF5]">
          <span>{timestamp}</span>
          <Camera className="w-3 h-3 text-[#6B2A7F]" />
        </div>
      )}
    </div>
  );
}

function InteractiveBeforeAfterSlider({ v1Stain = true }) {
  const [pos, setPos] = useState(48);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[9px] font-semibold text-slate-500">
        <span>Drag slider to inspect Before vs After</span>
        <span className="text-[#6B2A7F]">{pos}%</span>
      </div>
      <div className="relative h-24 w-full rounded-xl overflow-hidden border border-[#E9DDF5] select-none bg-[#FAF8FC]">
        {/* Base Layer: AFTER */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 260 96" className="w-full h-full">
            <rect width="260" height="96" fill="#DFE8FA" opacity="0.65" />
            <rect x="10" y="54" width="240" height="8" rx="3" fill="#3A1150" />
            <rect x="14" y="62" width="232" height="30" rx="4" fill="#E9DDF5" />
            <rect x="146" y="50" width="52" height="5" rx="2" fill="#94A3B8" />
            <rect x="30" y="34" width="24" height="20" rx="4" fill="#6B2A7F" />
            {v1Stain ? (
              <>
                <ellipse cx="136" cy="53" rx="11" ry="2.6" fill="#B45309" opacity="0.85" />
                <circle cx="136" cy="52" r="13" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 2" />
              </>
            ) : (
              <path d="M135 41 L137 46 L142 48 L137 50 L135 55 L133 50 L128 48 L133 46 Z" fill="#10B981" />
            )}
          </svg>
          <span
            className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold text-white ${
              v1Stain ? 'bg-rose-600' : 'bg-emerald-600'
            }`}
          >
            {v1Stain ? 'AFTER v1' : 'AFTER v2'}
          </span>
        </div>

        {/* Clipped Layer: BEFORE */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <svg viewBox="0 0 260 96" className="w-full h-full">
            <rect width="260" height="96" fill="#EDE6F5" />
            <rect x="10" y="54" width="240" height="8" rx="3" fill="#3A1150" />
            <rect x="14" y="62" width="232" height="30" rx="4" fill="#D8C9EA" />
            <ellipse cx="92" cy="53" rx="16" ry="3" fill="#78350F" opacity="0.65" />
            <ellipse cx="136" cy="53" rx="12" ry="2.5" fill="#92400E" opacity="0.65" />
            <rect x="30" y="34" width="24" height="20" rx="4" fill="#6B2A7F" />
          </svg>
          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#3A1150] text-[8px] font-bold text-white">
            BEFORE
          </span>
        </div>

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#3A1150] pointer-events-none"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#3A1150] text-white flex items-center justify-center shadow">
            <Sliders className="w-2.5 h-2.5" />
          </div>
        </div>

        <input
          type="range"
          min={8}
          max={92}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare Before and After pantry images"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
    </div>
  );
}

// ============================================================================
// REALISTIC MOBILE SMARTPHONE SHELL (PORTRAIT 390x844 PROPORTIONS)
// ============================================================================

function PhoneFrame({
  roleBadge,
  headerTitle,
  headerSub,
  navRole, // 'OPS' | 'FM' | 'SUP' | null
  activeNav,
  onSelectNav,
  size = 'md', // 'sm' | 'md' | 'lg'
  tilt = 'none', // 'none' | 'left' | 'right'
  highlightRing = false,
  children
}) {
  const dimensions =
    size === 'sm'
      ? 'w-[218px] h-[448px]'
      : size === 'lg'
      ? 'w-[274px] h-[545px]'
      : 'w-[248px] h-[505px]';

  const tiltStyle =
    tilt === 'left'
      ? { transform: 'perspective(900px) rotateY(10deg) rotateZ(-1.5deg)' }
      : tilt === 'right'
      ? { transform: 'perspective(900px) rotateY(-10deg) rotateZ(1.5deg)' }
      : undefined;

  const navItems =
    navRole === 'OPS'
      ? [
          { id: 'Home', icon: Building2 },
          { id: 'Clients', icon: Users },
          { id: 'Tasks', icon: ClipboardList },
          { id: 'Insights', icon: ChartNoAxesCombined },
          { id: 'More', icon: Settings }
        ]
      : navRole === 'FM'
      ? [
          { id: 'Home', icon: Building2 },
          { id: 'Tasks', icon: ClipboardList },
          { id: 'Review', icon: Camera },
          { id: 'Facility', icon: Layers },
          { id: 'More', icon: Settings }
        ]
      : navRole === 'SUP'
      ? [
          { id: 'Home', icon: Building2 },
          { id: 'My Tasks', icon: ClipboardList },
          { id: 'Logs', icon: FileText },
          { id: 'Alerts', icon: Bell },
          { id: 'More', icon: UserRound }
        ]
      : [];

  return (
    <div
      style={tiltStyle}
      className={`${dimensions} shrink-0 rounded-[32px] border-[5px] border-[#240933] bg-[#FAF8FC] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
        highlightRing ? 'ring-4 ring-[#D07BDA]/70' : ''
      }`}
    >
      {/* Mobile Status Bar */}
      <div className="px-4 pt-1.5 pb-1 bg-[#3A1150] text-white flex items-center justify-between text-[9px] font-semibold shrink-0">
        <span>9:41</span>
        <div className="w-14 h-2.5 bg-black/50 rounded-full" />
        <div className="flex items-center gap-1">
          <Wifi className="w-2.5 h-2.5 text-emerald-300" />
          <span>100%</span>
        </div>
      </div>

      {/* App Header */}
      {headerTitle && (
        <div className="px-3 py-2 bg-white border-b border-[#E9DDF5] flex items-center justify-between shrink-0">
          <div className="min-w-0">
            {roleBadge && (
              <div className="text-[8px] font-bold uppercase tracking-wider text-[#6B2A7F] truncate">
                {roleBadge}
              </div>
            )}
            <div
              className="text-[11px] font-bold text-[#3A1150] truncate"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {headerTitle}
            </div>
            {headerSub && <div className="text-[9px] text-slate-500 truncate">{headerSub}</div>}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-5 h-5 rounded-lg bg-[#FAF8FC] border border-[#E9DDF5] flex items-center justify-center text-[#3A1150]">
              <Bell className="w-2.5 h-2.5" />
            </span>
            <span className="w-5 h-5 rounded-lg bg-[#3A1150] text-white text-[9px] font-bold flex items-center justify-center">
              {headerTitle.charAt(0)}
            </span>
          </div>
        </div>
      )}

      {/* Screen Content */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2 text-left">{children}</div>

      {/* Bottom Navigation */}
      {navItems.length > 0 && (
        <div className="px-1 py-1.5 bg-white border-t border-[#E9DDF5] grid grid-cols-5 shrink-0">
          {navItems.map((it) => {
            const Icon = it.icon;
            const isAct = activeNav === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => onSelectNav && onSelectNav(it.id)}
                className={`flex flex-col items-center justify-center py-0.5 rounded-lg cursor-pointer ${
                  isAct ? 'text-[#3A1150]' : 'text-slate-400'
                }`}
              >
                <span className={`px-2 py-0.5 rounded-full ${isAct ? 'bg-[#F8E4F1]' : ''}`}>
                  <Icon className="w-3 h-3" />
                </span>
                <span className={`text-[8px] mt-0.5 leading-none ${isAct ? 'font-bold' : 'font-medium'}`}>
                  {it.id}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SLIDE RENDERER (ALL 35 SLIDES)
// ============================================================================

function SlideStage({
  slideNum,
  demo,
  setDemo,
  onGoToSlide,
  reducedMotion,
  onResetDemo
}) {
  const [onboardingIdx, setOnboardingIdx] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [floorViewType, setFloorViewType] = useState('3D'); // '3D' | 'LIST'
  const [cameraFlash, setCameraFlash] = useState(false);
  const [uploadPct, setUploadPct] = useState(100);
  const [lifecycleNode, setLifecycleNode] = useState(6);
  const [analyticsClient, setAnalyticsClient] = useState('ALL');
  const [reportPreview, setReportPreview] = useState('Task Completion & SLA Summary');

  const triggerShutter = () => {
    setCameraFlash(true);
    setUploadPct(35);
    setTimeout(() => setCameraFlash(false), 260);
    setTimeout(() => setUploadPct(78), 320);
    setTimeout(() => setUploadPct(100), 650);
  };

  // --------------------------------------------------------------------------
  // SLIDE 1 — PRODUCT INTRODUCTION
  // --------------------------------------------------------------------------
  if (slideNum === 1) {
    return (
      <div className="h-full w-full grid grid-cols-12 gap-6 items-center px-8 py-4">
        <div className="col-span-5 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#D07BDA]/50 shadow-xs">
            <div className="w-6 h-6 rounded-lg bg-[#3A1150] text-white flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold tracking-wide text-[#3A1150]">FACILITY FLOW</span>
          </div>

          <h1
            className="text-4xl xl:text-5xl font-bold text-[#3A1150] leading-[1.12] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Every Task.
            <br />
            Every Space.
            <br />
            <span className="text-[#6B2A7F]">In Sync.</span>
          </h1>

          <p className="text-sm xl:text-base text-slate-700 leading-relaxed max-w-md">
            Connecting housekeeping operations, service quality and accountability.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => onGoToSlide(2)}
              className="px-6 py-3.5 rounded-2xl text-white font-semibold text-sm flex items-center gap-2 shadow-lg hover:opacity-95 transition cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #3A1150 0%, #6B2A7F 100%)' }}
            >
              Start Demonstration
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onGoToSlide(12)}
              className="px-4 py-3.5 rounded-2xl bg-white/85 border border-[#E9DDF5] text-[#3A1150] font-semibold text-xs hover:bg-white transition cursor-pointer"
            >
              Jump to FF-1042 Workflow
            </button>
          </div>
        </div>

        {/* Right: Cinematic 3D Architectural Scene + 3 Floating Phones */}
        <div className="col-span-7 relative h-full flex items-center justify-center">
          <div className="absolute inset-4 rounded-[36px] bg-gradient-to-br from-[#3A1150]/10 via-[#D07BDA]/15 to-[#DFE8FA]/40 border border-white/60 backdrop-blur-xs" />
          <div className="absolute top-3 w-72 opacity-90 pointer-events-none">
            <IsometricTowersSVG reducedMotion={reducedMotion} />
          </div>

          <div className="relative z-10 flex items-center justify-center gap-3 mt-16">
            <PhoneFrame
              size="sm"
              tilt="left"
              roleBadge="Operations Head"
              headerTitle="Prime Facility"
              navRole="OPS"
              activeNav="Home"
            >
              <div className="p-2.5 rounded-xl bg-[#3A1150] text-white space-y-1">
                <div className="text-[9px] text-[#E9DDF5]">Multi-Site Approval</div>
                <div className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  94.2%
                </div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E9DDF5] text-[10px] space-y-1">
                <div className="font-bold text-[#3A1150]">4 Active Clients</div>
                <div className="text-slate-500">Northstar • Horizon • Meridian • Vertex</div>
              </div>
            </PhoneFrame>

            <PhoneFrame
              size="md"
              highlightRing
              roleBadge="Facility Manager"
              headerTitle="Northstar Coworking"
              headerSub="Northstar Business Centre"
              navRole="FM"
              activeNav="Review"
            >
              <div className="p-2 rounded-xl bg-[#F8E4F1] border border-[#D07BDA]/40">
                <div className="text-[9px] font-bold text-[#6B2A7F]">FF-1042 • Floor 2 Pantry</div>
                <div className="text-[10px] font-bold text-[#3A1150]">Verified Before & After</div>
              </div>
              <PantryEvidenceIllustration variant="AFTER_V2" label="Verified Clean" timestamp="09:15 AM" />
              <div className="py-1.5 rounded-lg bg-emerald-600 text-white text-center text-[10px] font-bold">
                Approved • 5.0 ★
              </div>
            </PhoneFrame>

            <PhoneFrame
              size="sm"
              tilt="right"
              roleBadge="Supervisor"
              headerTitle="Karthik • Floor 2"
              navRole="SUP"
              activeNav="My Tasks"
            >
              <div className="p-2 rounded-xl bg-white border border-[#E9DDF5] space-y-1.5">
                <div className="text-[9px] font-bold text-[#6B2A7F]">FF-1042 • Due 10:00 AM</div>
                <div className="text-[10px] font-bold text-slate-900">Pantry Sanitization</div>
                <div className="h-1.5 rounded-full bg-[#E9DDF5] overflow-hidden">
                  <div className="h-full w-full bg-emerald-500" />
                </div>
                <div className="text-[9px] text-emerald-700 font-semibold">5/5 Checklist Complete</div>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 2 — THE BUSINESS PROBLEM
  // --------------------------------------------------------------------------
  if (slideNum === 2) {
    return (
      <div className="h-full flex flex-col justify-center px-10 py-4 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Operational Transformation</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Disconnected operations. Limited visibility.
          </h2>
        </div>

        <div className="grid grid-cols-11 gap-4 items-center max-w-5xl mx-auto w-full">
          {/* Left: Fragmented Legacy Chaos */}
          <div className="col-span-5 p-6 rounded-3xl bg-white/75 border border-rose-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Fragmented Manual Workflow</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700">High Risk</span>
            </div>
            {[
              { icon: FileText, title: 'Paper registers & Excel sheets', sub: 'Delayed end-of-month consolidation' },
              { icon: MessageSquare, title: 'Scattered WhatsApp messages', sub: 'Lost instructions & unverified chats' },
              { icon: ClipboardList, title: 'Manual checklists', sub: 'No timestamp or completion accountability' },
              { icon: Camera, title: 'Unorganized gallery photos', sub: 'No Before/After pairing or audit trail' },
              { icon: RefreshCw, title: 'Repeated phone follow-ups', sub: 'Reactive firefighting across client sites' }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white text-rose-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-500">{item.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Animated Sync Bridge */}
          <div className="col-span-1 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-[#3A1150] text-white flex items-center justify-center shadow-lg">
              <ArrowRight className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-[#6B2A7F] uppercase">Sync</span>
          </div>

          {/* Right: Unified Facility Flow */}
          <div
            className="col-span-5 p-6 rounded-3xl text-white shadow-xl space-y-3"
            style={{ background: 'linear-gradient(145deg, #3A1150 0%, #6B2A7F 100%)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F8E4F1]">One Connected Platform</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-200">
                Facility Flow
              </span>
            </div>
            {[
              { icon: ClipboardList, title: 'Organized digital tasks', sub: 'Clear priorities, floors, areas & deadlines' },
              { icon: Camera, title: 'Traceable evidence history', sub: 'Timestamped Before & After proof per task' },
              { icon: ShieldCheck, title: 'Independent client approval', sub: 'Structured sign-off & rework tracking' },
              { icon: FileText, title: 'Centralized supervisor logs', sub: 'Real-time shift visibility across all sites' },
              { icon: ChartNoAxesCombined, title: 'Actionable SLA insights', sub: 'Data-backed service quality & retention' }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-3 rounded-2xl bg-white/12 border border-white/15 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F8E4F1] text-[#3A1150] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.title}</div>
                    <div className="text-[11px] text-[#E9DDF5]">{item.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 3 — CONNECTED SERVICE ECOSYSTEM
  // --------------------------------------------------------------------------
  if (slideNum === 3) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Organizational Boundaries</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            One provider. Multiple clients. Complete visibility.
          </h2>
        </div>

        <div className="max-w-5xl mx-auto w-full bg-white/85 backdrop-blur-md rounded-3xl border border-[#E9DDF5] p-5 shadow-lg">
          <svg viewBox="0 0 820 310" className="w-full h-[300px]">
            {/* Provider Workspace Boundary */}
            <rect x="20" y="14" width="780" height="118" rx="20" fill="#F8E4F1" opacity="0.55" stroke="#8E3B9E" strokeWidth="1.5" />
            <text x="40" y="36" fontSize="11" fontWeight="700" fill="#3A1150">
              PRIME FACILITY SERVICES (Third-Party Service Provider Workspace)
            </text>

            {/* Operations Head Node */}
            <rect x="315" y="24" width="190" height="44" rx="12" fill="#3A1150" />
            <text x="410" y="43" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFFFFF">
              Operations Head • Arjun
            </text>
            <text x="410" y="57" textAnchor="middle" fontSize="9" fill="#F8E4F1">
              Monitors all authorized client sites
            </text>

            {/* 4 Client Organizations & Allocated Supervisors */}
            {[
              { id: 'C1', client: 'Northstar Coworking', fm: 'FM1 • Priya', sup: 'S1 • Karthik', x: 110 },
              { id: 'C2', client: 'Horizon Corporate', fm: 'FM2 • Meera', sup: 'S2 • Suresh', x: 310 },
              { id: 'C3', client: 'Meridian Park', fm: 'FM3 • Vikram', sup: 'S3 • Deepa', x: 510 },
              { id: 'C4', client: 'Vertex Tower', fm: 'FM4 • Ananya', sup: 'S4 • Manoj', x: 710 }
            ].map((node) => (
              <g key={node.id}>
                {/* Solid Provider Reporting Line: Ops Head -> Supervisor */}
                <line
                  x1="410"
                  y1="68"
                  x2={node.x}
                  y2="86"
                  stroke="#3A1150"
                  strokeWidth="2"
                />

                {/* Supervisor Node (Inside Provider Boundary) */}
                <rect x={node.x - 65} y="86" width="130" height="36" rx="10" fill="#6B2A7F" />
                <text x={node.x} y="102" textAnchor="middle" fontSize="10" fontWeight="700" fill="#FFFFFF">
                  {node.sup}
                </text>
                <text x={node.x} y="114" textAnchor="middle" fontSize="8" fill="#E9DDF5">
                  Provider Employee
                </text>

                {/* Dashed Bidirectional Operational Line: Supervisor <-> Client FM */}
                <line
                  x1={node.x}
                  y1="122"
                  x2={node.x}
                  y2="178"
                  stroke="#8E3B9E"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                />
                {!reducedMotion && (
                  <circle r="3.5" fill="#D07BDA">
                    <animateMotion
                      dur="2.4s"
                      repeatCount="indefinite"
                      path={`M${node.x} 178 L${node.x} 122 L${node.x} 178`}
                    />
                  </circle>
                )}

                {/* Independent Client Building Box */}
                <rect
                  x={node.x - 82}
                  y="178"
                  width="164"
                  height="112"
                  rx="16"
                  fill="#DFE8FA"
                  opacity="0.6"
                  stroke="#6B2A7F"
                  strokeWidth="1.2"
                />
                <text x={node.x} y="198" textAnchor="middle" fontSize="9" fontWeight="700" fill="#6B2A7F">
                  INDEPENDENT CLIENT {node.id}
                </text>
                <text x={node.x} y="214" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#3A1150">
                  {node.client}
                </text>

                {/* Client Facility Manager Node */}
                <rect x={node.x - 66} y="226" width="132" height="48" rx="10" fill="#FFFFFF" stroke="#8E3B9E" strokeWidth="1" />
                <text x={node.x} y="245" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3A1150">
                  {node.fm}
                </text>
                <text x={node.x} y="259" textAnchor="middle" fontSize="8" fill="#475569">
                  Client Employee • Assigns & Verifies
                </text>
              </g>
            ))}
          </svg>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-1 text-xs text-slate-700">
            <span className="inline-flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#3A1150] inline-block" /> Solid Line: Provider Employment & Monitoring
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-6 h-0.5 border-t-2 border-dashed border-[#8E3B9E] inline-block" /> Dashed Line: Task Assignment & Evidence Verification
            </span>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 4 — SPLASH AND ONBOARDING
  // --------------------------------------------------------------------------
  if (slideNum === 4) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-4">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">First-Time Experience</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            A seamless first experience.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-6">
          {/* Phone 1: Animated Splash */}
          <PhoneFrame size="md">
            <div
              className="h-full -m-2.5 p-4 text-white flex flex-col items-center justify-between text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(155deg, #3A1150 0%, #6B2A7F 60%, #8E3B9E 100%)' }}
            >
              <span className="text-[9px] uppercase tracking-widest text-[#F8E4F1]/80">Facility Flow</span>
              <div className="space-y-3 my-auto">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center mx-auto">
                  <Layers className="w-6 h-6 text-[#F8E4F1]" />
                </div>
                <div className="h-24">
                  <IsometricTowersSVG reducedMotion={reducedMotion} />
                </div>
                <div>
                  <div className="text-base font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Facility Flow
                  </div>
                  <div className="text-[10px] text-[#F8E4F1]">Every Task. Every Space. In Sync.</div>
                </div>
              </div>
              <div className="w-24 h-1 rounded-full bg-white/30 overflow-hidden">
                <div className="h-full w-4/5 bg-[#F8E4F1]" />
              </div>
            </div>
          </PhoneFrame>

          {/* Phone 2: Onboarding 1 — Every Space. Connected. */}
          <PhoneFrame size="md" highlightRing={onboardingIdx === 0}>
            <div className="h-full flex flex-col justify-between p-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-[#3A1150]">01 / 03</span>
                <button onClick={() => onGoToSlide(5)} className="text-[#6B2A7F] font-semibold cursor-pointer">
                  Skip
                </button>
              </div>
              <div className="rounded-2xl p-2 bg-gradient-to-br from-[#F8E4F1] to-[#DFE8FA]">
                <IsometricTowersSVG reducedMotion={reducedMotion} />
              </div>
              <div className="text-center space-y-1">
                <div className="text-sm font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Every space. Connected.
                </div>
                <p className="text-[10px] text-slate-600">
                  Manage housekeeping operations across multiple client locations.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center gap-1.5">
                  <span className="w-5 h-1.5 rounded-full bg-[#6B2A7F]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D07BDA]/40" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D07BDA]/40" />
                </div>
                <button
                  onClick={() => setOnboardingIdx(1)}
                  className="w-full py-2 rounded-xl bg-[#3A1150] text-white text-[11px] font-semibold cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </PhoneFrame>

          {/* Phone 3: Onboarding 2 — Every Task. Verified. */}
          <PhoneFrame size="md" highlightRing={onboardingIdx === 1}>
            <div className="h-full flex flex-col justify-between p-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-[#3A1150]">02 / 03</span>
                <button onClick={() => onGoToSlide(5)} className="text-[#6B2A7F] font-semibold cursor-pointer">
                  Skip
                </button>
              </div>
              <div className="space-y-1.5">
                <PantryEvidenceIllustration variant="AFTER_V2" label="Verified Proof" timestamp="FF-1042" />
                <div className="px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] font-semibold text-emerald-700 flex items-center gap-1.5">
                  <CircleCheck className="w-3.5 h-3.5" /> Checklist & Photo Approved
                </div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-sm font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Every task. Verified.
                </div>
                <p className="text-[10px] text-slate-600">
                  Create a traceable record from assignment to approval.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D07BDA]/40" />
                  <span className="w-5 h-1.5 rounded-full bg-[#6B2A7F]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D07BDA]/40" />
                </div>
                <button
                  onClick={() => onGoToSlide(5)}
                  className="w-full py-2 rounded-xl bg-[#6B2A7F] text-white text-[11px] font-semibold cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 5 — COMMON LOGIN AND ROLE-BASED ACCESS
  // --------------------------------------------------------------------------
  if (slideNum === 5) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Role-Based Access Control</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            One application. Three connected roles.
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-5 items-center max-w-5xl mx-auto w-full">
          {/* Common Login Phone */}
          <div className="col-span-5 flex justify-center">
            <PhoneFrame size="lg" highlightRing>
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-[#3A1150] text-white flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#3A1150]">Facility Flow</div>
                    <div className="text-[9px] text-slate-500">Unified Workspace Sign In</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-2">
                  <div>
                    <label className="text-[9px] font-semibold text-slate-500 block">Work Email</label>
                    <input
                      readOnly
                      value="priya@northstarcowork.in"
                      className="w-full px-2.5 py-1.5 text-[10px] rounded-lg bg-[#FAF8FC] border border-[#E9DDF5]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-semibold text-slate-500 block">Password</label>
                    <div className="relative">
                      <input
                        readOnly
                        type={showPassword ? 'text' : 'password'}
                        value="Northstar@2026"
                        className="w-full px-2.5 py-1.5 text-[10px] rounded-lg bg-[#FAF8FC] border border-[#E9DDF5]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between text-[9px] text-[#6B2A7F] font-semibold">
                    <span>Accept Invitation</span>
                    <span>Forgot Password?</span>
                  </div>
                  <button
                    onClick={() => onGoToSlide(6)}
                    className="w-full py-2 rounded-xl bg-[#3A1150] text-white text-[11px] font-bold cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8E4F1] border border-[#D07BDA]/40 text-[9.5px] text-[#3A1150] space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Server-Enforced Membership
                  </div>
                  <p className="text-slate-700 leading-snug">
                    In production, authenticated organizational membership determines role and tenant isolation automatically.
                  </p>
                </div>
              </div>
            </PhoneFrame>
          </div>

          {/* Emerging 3 Role Portals */}
          <div className="col-span-7 space-y-3">
            {[
              {
                role: 'Operations Head • Arjun',
                org: 'Prime Facility Services (Service Provider)',
                desc: 'Monitors all authorized client sites, allocates Supervisors, reviews trends & logs. Cannot override client approvals.',
                targetSlide: 6,
                badge: 'Multi-Client View'
              },
              {
                role: 'Facility Manager • Priya',
                org: 'Northstar Coworking (Independent Client)',
                desc: 'Configures Northstar Business Centre, assigns tasks, inspects Before/After proof, approves or requests rework.',
                targetSlide: 9,
                badge: 'Client Facility View'
              },
              {
                role: 'Supervisor • Karthik',
                org: 'Deployed at Northstar Business Centre',
                desc: 'Receives assigned tasks, completes checklists, uploads photographic proof, resolves rework & logs daily shifts.',
                targetSlide: 13,
                badge: 'On-Site Execution View'
              }
            ].map((item) => (
              <button
                key={item.role}
                onClick={() => onGoToSlide(item.targetSlide)}
                className="w-full p-4 rounded-2xl bg-white/90 hover:bg-white border border-[#E9DDF5] hover:border-[#6B2A7F] text-left flex items-center justify-between gap-4 shadow-sm transition cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#3A1150]">{item.role}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F8E4F1] text-[#6B2A7F]">
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500">{item.org}</div>
                  <p className="text-xs text-slate-600">{item.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#6B2A7F] shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 6 — OPERATIONS HEAD DASHBOARD
  // --------------------------------------------------------------------------
  if (slideNum === 6) {
    const siteStats = {
      C1: { name: 'Northstar Coworking', sup: 'Karthik', tasks: 124, approval: '96%', pending: 2, rework: 1 },
      C2: { name: 'Horizon Corporate', sup: 'Suresh', tasks: 98, approval: '92%', pending: 3, rework: 1 },
      C3: { name: 'Meridian Business Park', sup: 'Deepa', tasks: 112, approval: '81%', pending: 5, rework: 4 },
      C4: { name: 'Vertex Tower', sup: 'Manoj', tasks: 140, approval: '98%', pending: 1, rework: 0 }
    }[demo.selectedBuilding || 'C1'];

    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame
            size="lg"
            roleBadge="Operations Head • Arjun"
            headerTitle="Prime Facility Services"
            headerSub="4 Active Clients • 4 Supervisors"
            navRole="OPS"
            activeNav="Home"
          >
            <div className="p-2.5 rounded-2xl bg-[#3A1150] text-white space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-[#F8E4F1] font-bold">Tap Building to Inspect</span>
                <span className="text-[10px] font-bold text-emerald-300">{siteStats.approval} SLA</span>
              </div>
              <div className="h-24">
                <IsometricTowersSVG
                  activeBuilding={demo.selectedBuilding}
                  onSelectBuilding={(b) => setDemo({ ...demo, selectedBuilding: b })}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="p-2 rounded-xl bg-white border border-[#E9DDF5]">
                <div className="text-xs font-bold text-[#3A1150]">{siteStats.tasks}</div>
                <div className="text-[8px] text-slate-500">Assigned</div>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-xs font-bold text-amber-700">{siteStats.pending}</div>
                <div className="text-[8px] text-amber-800">In Review</div>
              </div>
              <div className="p-2 rounded-xl bg-rose-50 border border-rose-200">
                <div className="text-xs font-bold text-rose-700">{siteStats.rework}</div>
                <div className="text-[8px] text-rose-800">Rework</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1">
              <div className="text-[10px] font-bold text-[#3A1150]">{siteStats.name}</div>
              <div className="text-[9px] text-slate-600">Allocated Supervisor: {siteStats.sup}</div>
              <div className="text-[9px] text-emerald-700 font-semibold">
                Recent: FF-1042 Pantry Cleaning ({demo.status})
              </div>
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Operations Head Portal</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            See every site. Stay in control.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Arjun monitors live task throughput, pending client verifications, rework rates, and Supervisor logs across all four client locations in one command view.
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-lg">
            {[
              { label: 'Active Client Sites', val: '4 Organizations' },
              { label: 'Allocated Supervisors', val: '4 Field Leads' },
              { label: 'Cross-Site Approval Rate', val: '91.8%' },
              { label: 'Priority Site Alert', val: 'C3 Meridian (81%)' }
            ].map((k) => (
              <div key={k.label} className="p-3.5 rounded-2xl bg-white/90 border border-[#E9DDF5]">
                <div className="text-[11px] text-slate-500">{k.label}</div>
                <div className="text-base font-bold text-[#3A1150] mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {k.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 7 — CLIENT MANAGEMENT AND ONBOARDING
  // --------------------------------------------------------------------------
  if (slideNum === 7) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Operations Head • Clients</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Manage every client relationship.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-6">
          {/* Phone 1: Client Organization List */}
          <PhoneFrame size="md" roleBadge="Operations Head" headerTitle="Client Directory" navRole="OPS" activeNav="Clients">
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white border border-[#E9DDF5] text-[9px] text-slate-400">
              <Search className="w-3 h-3" /> Search client organizations...
            </div>
            {['Northstar Coworking', 'Horizon Corporate', 'Meridian Business Park', 'Vertex Tower'].map((c, i) => (
              <div key={c} className="p-2 rounded-xl bg-white border border-[#E9DDF5] flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-bold text-slate-900">{c}</div>
                  <div className="text-[8px] text-slate-500">Client C{i + 1} • Active SLA</div>
                </div>
                <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-emerald-50 text-emerald-700">Active</span>
              </div>
            ))}
            {demo.newClientAdded && (
              <div className="p-2 rounded-xl bg-[#F8E4F1] border border-[#6B2A7F] flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-bold text-[#3A1150]">Solstice Tech Park</div>
                  <div className="text-[8px] text-[#6B2A7F]">Client C5 • Newly Onboarded</div>
                </div>
                <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold bg-[#3A1150] text-white">New</span>
              </div>
            )}
          </PhoneFrame>

          {/* Phone 2: Add Client & Invite FM */}
          <PhoneFrame size="md" highlightRing roleBadge="Operations Head" headerTitle="Onboard Client" navRole="OPS" activeNav="Clients">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-2 text-[9px]">
              <div className="font-bold text-[#3A1150]">Service Engagement Details</div>
              <div className="p-1.5 rounded bg-[#FAF8FC] border border-[#E9DDF5]">Org: Solstice Tech Park</div>
              <div className="p-1.5 rounded bg-[#FAF8FC] border border-[#E9DDF5]">Facility: Solstice Tower B</div>
              <div className="p-1.5 rounded bg-[#FAF8FC] border border-[#E9DDF5]">Invite FM: kavita@solstice.in</div>
              <button
                onClick={() => setDemo({ ...demo, newClientAdded: true })}
                className="w-full py-2 rounded-xl bg-[#3A1150] text-white text-[10px] font-bold cursor-pointer"
              >
                {demo.newClientAdded ? '✓ Client Added & Invite Sent' : '+ Create Client & Send Invite'}
              </button>
            </div>
            {demo.newClientAdded && (
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[9px] text-emerald-800 font-semibold">
                Success: Solstice Tech Park added to portfolio.
              </div>
            )}
          </PhoneFrame>

          {/* Phone 3: Client Profile */}
          <PhoneFrame size="md" roleBadge="Client Profile" headerTitle="Northstar Coworking" navRole="OPS" activeNav="Clients">
            <div className="h-20 rounded-xl bg-gradient-to-br from-[#F8E4F1] to-[#DFE8FA] p-1">
              <IsometricTowersSVG activeBuilding="C1" reducedMotion={reducedMotion} />
            </div>
            <div className="p-2 rounded-xl bg-white border border-[#E9DDF5] text-[9px] space-y-1">
              <div className="font-bold text-[#3A1150]">Northstar Business Centre</div>
              <div className="text-slate-600">Facility Manager: Priya (Client)</div>
              <div className="text-slate-600">Allocated Supervisor: Karthik (Prime)</div>
              <div className="text-emerald-700 font-bold">Engagement Status: Active • 96% SLA</div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 8 — SUPERVISOR MANAGEMENT AND ALLOCATION
  // --------------------------------------------------------------------------
  if (slideNum === 8) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Workforce Deployment</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The right Supervisor. The right facility.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-6">
          {/* Phone 1: Supervisor Directory */}
          <PhoneFrame size="md" roleBadge="Provider Staff" headerTitle="Supervisors" navRole="OPS" activeNav="More">
            {[
              { name: 'Karthik', site: 'Northstar Business Centre', status: 'Allocated' },
              { name: 'Suresh', site: 'Horizon Corporate Centre', status: 'Allocated' },
              { name: 'Deepa', site: 'Meridian Business Park', status: 'Allocated' },
              { name: 'Manoj', site: 'Vertex Commercial Tower', status: 'Allocated' }
            ].map((s) => (
              <div key={s.name} className="p-2 rounded-xl bg-white border border-[#E9DDF5] flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-bold text-[#3A1150]">{s.name}</div>
                  <div className="text-[8px] text-slate-500">{s.site}</div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-[#F8E4F1] text-[#6B2A7F] text-[8px] font-bold">
                  {s.status}
                </span>
              </div>
            ))}
          </PhoneFrame>

          {/* Phone 2: Allocation Form */}
          <PhoneFrame size="md" highlightRing roleBadge="Allocation" headerTitle="Assign Site Lead" navRole="OPS" activeNav="More">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-2 text-[9px]">
              <div>
                <span className="text-slate-400 block">Client Organization</span>
                <div className="p-1.5 rounded bg-[#FAF8FC] border border-[#E9DDF5] font-bold">Northstar Coworking</div>
              </div>
              <div>
                <span className="text-slate-400 block">Facility</span>
                <div className="p-1.5 rounded bg-[#FAF8FC] border border-[#E9DDF5] font-bold">Northstar Business Centre</div>
              </div>
              <div>
                <span className="text-slate-400 block">Supervisor (Prime Employee)</span>
                <div className="p-1.5 rounded bg-[#F8E4F1] border border-[#D07BDA] font-bold text-[#3A1150]">Karthik</div>
              </div>
              <button
                onClick={() => setDemo({ ...demo, karthikAllocated: true })}
                className="w-full py-2 rounded-xl bg-[#3A1150] text-white text-[10px] font-bold cursor-pointer"
              >
                Confirm Site Allocation
              </button>
            </div>
          </PhoneFrame>

          {/* Phone 3: Allocation History & Employment Boundary */}
          <PhoneFrame size="md" roleBadge="Audit Record" headerTitle="Allocation History" navRole="OPS" activeNav="More">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[9px] text-emerald-900 space-y-1">
              <div className="font-bold">✓ Karthik → Northstar Business Centre</div>
              <div>Effective: 01 Nov 2026 • Active</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] text-[9px] text-slate-600 space-y-1">
              <div className="font-bold text-[#3A1150]">Employment Relationship</div>
              <p>
                Karthik remains employed by <strong>Prime Facility Services</strong> and is deployed on-site to execute tasks assigned by Northstar's Facility Manager.
              </p>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 9 — FACILITY MANAGER DASHBOARD
  // --------------------------------------------------------------------------
  if (slideNum === 9) {
    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame
            size="lg"
            roleBadge="Facility Manager • Priya"
            headerTitle="Northstar Coworking"
            headerSub="Northstar Business Centre"
            navRole="FM"
            activeNav="Home"
          >
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-[#3A1150] to-[#6B2A7F] text-white flex justify-between items-center">
              <div>
                <div className="text-[9px] text-[#F8E4F1]">Today's Facility Health</div>
                <div className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  96% Approved
                </div>
              </div>
              <Building2 className="w-7 h-7 text-[#F8E4F1]" />
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="p-2 rounded-xl bg-white border border-[#E9DDF5]">
                <div className="text-xs font-bold text-[#3A1150]">18</div>
                <div className="text-[8px] text-slate-500">Scheduled</div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-700">15</div>
                <div className="text-[8px] text-emerald-800">Completed</div>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-xs font-bold text-amber-700">2</div>
                <div className="text-[8px] text-amber-800">In Review</div>
              </div>
            </div>

            {/* 4 Quick Actions */}
            <div className="grid grid-cols-2 gap-1.5 text-[9px] font-bold">
              <button
                onClick={() => onGoToSlide(12)}
                className="p-2 rounded-xl bg-[#3A1150] text-white text-left cursor-pointer"
              >
                + Create Task
              </button>
              <button
                onClick={() => onGoToSlide(18)}
                className="p-2 rounded-xl bg-[#F8E4F1] text-[#3A1150] text-left cursor-pointer"
              >
                Review Evidence
              </button>
              <button
                onClick={() => onGoToSlide(24)}
                className="p-2 rounded-xl bg-white border border-[#E9DDF5] text-[#3A1150] text-left cursor-pointer"
              >
                Conduct Inspection
              </button>
              <button
                onClick={() => onGoToSlide(25)}
                className="p-2 rounded-xl bg-white border border-[#E9DDF5] text-rose-700 text-left cursor-pointer"
              >
                Raise Complaint
              </button>
            </div>

            <div className="p-2 rounded-xl bg-white border border-[#E9DDF5] text-[9px]">
              <span className="font-bold text-[#6B2A7F]">FF-1042:</span> Pantry Cleaning and Sanitization ({demo.status})
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Client Facility Manager Portal</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Verify quality. Build confidence.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Priya manages Northstar Business Centre exclusively—creating housekeeping tasks, inspecting timestamped photographic evidence, conducting audits, and holding the service provider accountable.
          </p>
          <div className="p-4 rounded-2xl bg-white/90 border border-[#E9DDF5] max-w-lg flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#6B2A7F] shrink-0" />
            <div className="text-xs text-slate-700">
              <strong>Strict Tenant Isolation:</strong> Priya only sees Northstar Coworking records and never accesses other client organizations or Prime Facility Services' private internal directives.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 10 — FACILITY CONFIGURATION (6-STEP WIZARD + GROWING ISOMETRIC BUILDING)
  // --------------------------------------------------------------------------
  if (slideNum === 10) {
    const steps = [
      '1. Building Information',
      '2. Floor Configuration',
      '3. Area Configuration',
      '4. Allocated Supervisors',
      '5. Activities & Schedules',
      '6. Checklists & Evidence'
    ];
    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame
            size="lg"
            roleBadge="Facility Setup Wizard"
            headerTitle="Northstar Business Centre"
            headerSub={`Step ${demo.wizardStep} of 6`}
            navRole="FM"
            activeNav="Facility"
          >
            <div className="h-1.5 rounded-full bg-[#E9DDF5] overflow-hidden">
              <div
                className="h-full bg-[#6B2A7F] transition-all"
                style={{ width: `${(demo.wizardStep / 6) * 100}%` }}
              />
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1.5 text-[9.5px]">
              <div className="font-bold text-[#3A1150]">{steps[demo.wizardStep - 1]}</div>
              {demo.wizardStep === 1 && (
                <div className="text-slate-600">Building: Northstar Business Centre • Commercial Coworking Hub</div>
              )}
              {demo.wizardStep === 2 && (
                <div className="text-slate-600">Configured Floors: Ground Lobby, Floor 1, Floor 2, Floor 3</div>
              )}
              {demo.wizardStep === 3 && (
                <div className="flex flex-wrap gap-1">
                  {['Reception', 'Pantry', 'Washrooms', 'Meeting Rooms', 'Workstations', 'Corridors'].map((a) => (
                    <span key={a} className="px-1.5 py-0.5 rounded bg-[#F8E4F1] text-[#3A1150] font-semibold">
                      {a}
                    </span>
                  ))}
                </div>
              )}
              {demo.wizardStep === 4 && (
                <div className="text-slate-600">
                  Allocated Supervisor: <strong>Karthik</strong> (Assigned by Prime Facility Services)
                </div>
              )}
              {demo.wizardStep === 5 && (
                <div className="text-slate-600">Pantry Cleaning and Sanitization • Daily 10:00 AM</div>
              )}
              {demo.wizardStep === 6 && (
                <div className="text-emerald-700 font-semibold">
                  ✓ 5-Item Checklist + Mandatory Before & After Photos
                </div>
              )}
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={() => setDemo({ ...demo, wizardStep: Math.max(1, demo.wizardStep - 1) })}
                className="flex-1 py-1.5 rounded-xl border border-[#E9DDF5] text-[10px] font-semibold cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setDemo({ ...demo, wizardStep: demo.wizardStep < 6 ? demo.wizardStep + 1 : 1 })}
                className="flex-1 py-1.5 rounded-xl bg-[#3A1150] text-white text-[10px] font-semibold cursor-pointer"
              >
                {demo.wizardStep < 6 ? 'Next Step' : 'Restart Wizard'}
              </button>
            </div>
          </PhoneFrame>
        </div>

        {/* Right: Animated Isometric Floor Stacking Visualization */}
        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Structured Onboarding</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Configure the way your facility operates.
          </h2>
          <div className="p-5 rounded-3xl bg-white/90 border border-[#E9DDF5] space-y-3 max-w-lg">
            <div className="text-xs font-bold text-[#3A1150]">Click any wizard step to preview building setup:</div>
            <div className="grid grid-cols-2 gap-2">
              {steps.map((st, idx) => (
                <button
                  key={st}
                  onClick={() => setDemo({ ...demo, wizardStep: idx + 1 })}
                  className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition cursor-pointer ${
                    demo.wizardStep === idx + 1
                      ? 'bg-[#3A1150] text-white border-[#3A1150]'
                      : 'bg-[#FAF8FC] text-slate-700 border-[#E9DDF5]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 11 — INTERACTIVE 3D FACILITY VIEW
  // --------------------------------------------------------------------------
  if (slideNum === 11) {
    const floorAreas =
      demo.selectedFloor === 2
        ? [
            { name: 'Pantry', status: 'Pending / Active', color: 'amber', task: 'FF-1042 • Due 10:00 AM' },
            { name: 'Workstations', status: 'Approved', color: 'green', task: 'FF-1039 • Completed' },
            { name: 'Washrooms', status: 'Rework', color: 'red', task: 'FF-1040 • Mirror wipe' },
            { name: 'Meeting Rooms', status: 'Approved', color: 'green', task: 'FF-1038 • Completed' }
          ]
        : [
            { name: 'Reception', status: 'Approved', color: 'green', task: 'FF-1035 • Completed' },
            { name: 'Corridors', status: 'Approved', color: 'green', task: 'FF-1036 • Completed' }
          ];

    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame
            size="lg"
            roleBadge="Proposed Visual Enhancement"
            headerTitle="Northstar Business Centre"
            headerSub="Exploded 3D Floor Explorer"
            navRole="FM"
            activeNav="Facility"
          >
            <div className="flex gap-1 bg-white p-1 rounded-xl border border-[#E9DDF5] text-[9px] font-bold">
              <button
                onClick={() => setFloorViewType('3D')}
                className={`flex-1 py-1 rounded-lg cursor-pointer ${
                  floorViewType === '3D' ? 'bg-[#3A1150] text-white' : 'text-slate-600'
                }`}
              >
                3D Isometric Layers
              </button>
              <button
                onClick={() => setFloorViewType('LIST')}
                className={`flex-1 py-1 rounded-lg cursor-pointer ${
                  floorViewType === 'LIST' ? 'bg-[#3A1150] text-white' : 'text-slate-600'
                }`}
              >
                List View
              </button>
            </div>

            {floorViewType === '3D' ? (
              <div className="p-2.5 rounded-2xl bg-[#3A1150] text-white space-y-1.5">
                {[3, 2, 1].map((fl) => (
                  <button
                    key={fl}
                    onClick={() => setDemo({ ...demo, selectedFloor: fl })}
                    className={`w-full p-2 rounded-xl border text-left flex justify-between items-center text-[10px] transition cursor-pointer ${
                      demo.selectedFloor === fl
                        ? 'bg-[#8E3B9E] border-white font-bold shadow'
                        : 'bg-white/10 border-white/20 opacity-80'
                    }`}
                  >
                    <span>Floor {fl} {fl === 2 ? '• Pantry & Pods' : ''}</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/20">
                      {fl === 2 ? '4 Areas' : '2 Areas'}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}

            <div className="space-y-1.5">
              <div className="text-[9px] font-bold text-[#3A1150]">Floor {demo.selectedFloor} Areas</div>
              {floorAreas.map((ar) => (
                <button
                  key={ar.name}
                  onClick={() => setDemo({ ...demo, selectedArea: ar.name })}
                  className={`w-full p-2 rounded-xl border text-left flex items-center justify-between text-[9.5px] cursor-pointer ${
                    demo.selectedArea === ar.name ? 'border-[#3A1150] bg-[#F8E4F1]/50' : 'border-[#E9DDF5] bg-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-900">{ar.name}</div>
                    <div className="text-[8px] text-slate-500">{ar.task}</div>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold ${
                      ar.color === 'green'
                        ? 'bg-emerald-50 text-emerald-700'
                        : ar.color === 'amber'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {ar.status}
                  </span>
                </button>
              ))}
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            Proposed Visual Enhancement (Post-Core Scope)
          </span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Every floor. Every area. One view.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Facility Managers can visually drill into any floor layer to inspect real-time housekeeping statuses—Green for approved, Amber for pending/in progress, and Red for rework—or toggle instantly to a standard list view.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 12 — TASK CREATION AND ASSIGNMENT (FF-1042 TRANSFER)
  // --------------------------------------------------------------------------
  if (slideNum === 12) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Step 1 • Task Assignment</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Assign work with complete clarity.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-6">
          {/* Facility Manager Phone */}
          <PhoneFrame size="lg" roleBadge="Facility Manager • Priya" headerTitle="Create Task" navRole="FM" activeNav="Tasks">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1.5 text-[9.5px]">
              <div className="flex justify-between">
                <span className="font-bold text-[#6B2A7F]">Task ID: FF-1042</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-bold">High Priority</span>
              </div>
              <div className="font-bold text-slate-900">Pantry Cleaning and Sanitization</div>
              <div className="text-slate-600">Northstar Business Centre • Floor 2 • Pantry</div>
              <div className="text-slate-600">Supervisor: <strong>Karthik</strong> • Due: <strong>10:00 AM</strong></div>
              <div className="p-1.5 rounded bg-[#FAF8FC] border border-[#E9DDF5] text-[8.5px] text-slate-600">
                Checklist: 5 mandatory items • Before & After Photos Required
              </div>
              <button
                onClick={() => {
                  setDemo({ ...demo, status: 'Assigned' });
                  onGoToSlide(13);
                }}
                className="w-full py-2 rounded-xl bg-[#3A1150] text-white text-[10px] font-bold cursor-pointer"
              >
                Assign Task to Karthik →
              </button>
            </div>
          </PhoneFrame>

          {/* Animated Transfer Connector */}
          <div className="flex flex-col items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-[#3A1150] text-white text-xs font-bold shadow">
              FF-1042 Synced
            </div>
            <div className="w-28 h-1 bg-[#D07BDA]/40 rounded-full relative overflow-hidden">
              <div className="w-10 h-full bg-[#6B2A7F] rounded-full animate-pulse" />
            </div>
            <span className="text-[11px] font-semibold text-[#6B2A7F]">Instant In-App Push</span>
          </div>

          {/* Supervisor Phone Receiving Notification */}
          <PhoneFrame size="lg" roleBadge="Supervisor • Karthik" headerTitle="Northstar Business Centre" navRole="SUP" activeNav="Home">
            <div className="p-2.5 rounded-xl bg-[#F8E4F1] border border-[#6B2A7F] space-y-1.5 animate-pulse">
              <div className="flex items-center justify-between text-[9px] font-bold text-[#3A1150]">
                <span className="flex items-center gap-1"><Bell className="w-3 h-3" /> New Task Assigned</span>
                <span>08:00 AM</span>
              </div>
              <div className="text-[10px] font-bold text-slate-900">FF-1042: Pantry Cleaning and Sanitization</div>
              <div className="text-[9px] text-slate-600">Floor 2 • Pantry • Due 10:00 AM</div>
            </div>
            <div className="p-2 rounded-xl bg-white border border-[#E9DDF5] text-[9px] text-slate-500">
              5 checklist items & Before/After photos attached to task brief.
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 13 — SUPERVISOR DASHBOARD
  // --------------------------------------------------------------------------
  if (slideNum === 13) {
    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame
            size="lg"
            roleBadge="Supervisor • Karthik"
            headerTitle="Northstar Business Centre"
            headerSub="Client: Northstar Coworking"
            navRole="SUP"
            activeNav="Home"
          >
            <div className="p-2.5 rounded-2xl bg-[#3A1150] text-white space-y-2">
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="bg-white/15 rounded-lg p-1.5">
                  <div className="text-xs font-bold">6</div>
                  <div className="text-[8px]">Today</div>
                </div>
                <div className="bg-white/15 rounded-lg p-1.5">
                  <div className="text-xs font-bold text-emerald-300">4</div>
                  <div className="text-[8px]">Done</div>
                </div>
                <div className="bg-white/15 rounded-lg p-1.5">
                  <div className="text-xs font-bold text-amber-300">2</div>
                  <div className="text-[8px]">Pending</div>
                </div>
              </div>
              <button
                onClick={() => onGoToSlide(14)}
                className="w-full py-2 rounded-xl bg-white text-[#3A1150] text-[10px] font-bold cursor-pointer"
              >
                Start Next Task • FF-1042
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1">
              <div className="flex justify-between text-[9px]">
                <span className="font-bold text-[#6B2A7F]">FF-1042 • Floor 2 Pantry</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-bold">Due 10:00 AM</span>
              </div>
              <div className="text-[10px] font-bold text-slate-900">Pantry Cleaning and Sanitization</div>
              <div className="text-[9px] text-slate-500">Assigned by Priya (Facility Manager)</div>
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Supervisor Field Portal</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Know what needs to be done.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Designed for fast, practical on-site use. Karthik sees a clean mobile task queue without management clutter, starting FF-1042 in a single tap.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 14 — TASK ACKNOWLEDGMENT AND EXECUTION
  // --------------------------------------------------------------------------
  if (slideNum === 14) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Step 2 • Execution Lifecycle</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            From assignment to action.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-6">
          {/* Screen 1: Notification */}
          <PhoneFrame size="md" roleBadge="1. Notification" headerTitle="Alerts" navRole="SUP" activeNav="Alerts">
            <div className="p-2.5 rounded-xl bg-[#F8E4F1] border border-[#6B2A7F] space-y-1 text-[9.5px]">
              <div className="font-bold text-[#3A1150]">Task Assigned • 08:00 AM</div>
              <div>FF-1042: Pantry Cleaning and Sanitization</div>
              <div className="text-slate-600">Floor 2 • Pantry • Due 10:00 AM</div>
            </div>
          </PhoneFrame>

          {/* Screen 2: Acknowledge */}
          <PhoneFrame size="md" roleBadge="2. Acknowledged" headerTitle="Task Details" navRole="SUP" activeNav="My Tasks">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-2 text-[9.5px]">
              <span className="px-2 py-0.5 rounded-full bg-[#E9DDF5] text-[#3A1150] font-bold">Status: Acknowledged (08:05 AM)</span>
              <div className="font-bold text-slate-900">Pantry Cleaning and Sanitization</div>
              <div className="text-slate-600">5 mandatory checklist steps + Before/After photo proof.</div>
              <button
                onClick={() => setDemo({ ...demo, status: 'In Progress' })}
                className="w-full py-1.5 rounded-xl bg-[#6B2A7F] text-white font-bold cursor-pointer"
              >
                Start Task →
              </button>
            </div>
          </PhoneFrame>

          {/* Screen 3: In Progress */}
          <PhoneFrame size="md" highlightRing roleBadge="3. In Progress" headerTitle="Active Execution" navRole="SUP" activeNav="My Tasks">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-2 text-[9.5px]">
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold">
                Status: In Progress (08:10 AM)
              </span>
              <div className="font-bold text-slate-900">FF-1042 • Floor 2 Pantry</div>
              <div className="text-slate-600">Housekeeping team executing sanitization SOP.</div>
              <button
                onClick={() => onGoToSlide(15)}
                className="w-full py-1.5 rounded-xl bg-[#3A1150] text-white font-bold cursor-pointer"
              >
                Open Digital Checklist →
              </button>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 15 — DIGITAL CHECKLISTS (5 ITEMS + PROGRESS RING)
  // --------------------------------------------------------------------------
  if (slideNum === 15) {
    const doneCount = demo.checklist.filter((c) => c.done).length;
    const pct = Math.round((doneCount / demo.checklist.length) * 100);
    const allDone = doneCount === demo.checklist.length;

    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame
            size="lg"
            roleBadge="FF-1042 • Floor 2 Pantry"
            headerTitle="Digital Checklist"
            headerSub="All 5 items mandatory"
            navRole="SUP"
            activeNav="My Tasks"
          >
            <div className="p-2.5 rounded-xl bg-[#F8E4F1] flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-[#3A1150]">Completion Progress</div>
                <div className="text-[9px] text-slate-600">{doneCount} of 5 steps verified</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#6B2A7F] flex items-center justify-center text-[10px] font-bold text-[#3A1150]">
                {pct}%
              </div>
            </div>

            <div className="space-y-1.5">
              {demo.checklist.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setDemo({
                      ...demo,
                      checklist: demo.checklist.map((c) =>
                        c.id === item.id ? { ...c, done: !c.done } : c
                      )
                    })
                  }
                  className={`w-full p-2 rounded-xl border text-left text-[10px] flex items-center gap-2 cursor-pointer ${
                    item.done
                      ? 'bg-emerald-50/70 border-emerald-200 text-slate-900 font-semibold'
                      : 'bg-white border-[#E9DDF5] text-slate-600'
                  }`}
                >
                  {item.done ? (
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <button
              disabled={!allDone}
              onClick={() => onGoToSlide(16)}
              className="w-full py-2 rounded-xl bg-[#3A1150] disabled:opacity-40 text-white text-[10px] font-bold cursor-pointer"
            >
              {allDone ? 'Continue to Evidence →' : 'Complete All 5 Items to Proceed'}
            </button>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Standardized Execution</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Complete every required step.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Interactive mandatory checklists prevent premature task submission. Try toggling any item inside the phone screen to see the completion gate in action.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 16 — PHOTOGRAPHIC EVIDENCE (BEFORE + AFTER v1 WITH SINK STAIN)
  // --------------------------------------------------------------------------
  if (slideNum === 16) {
    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame
            size="lg"
            roleBadge="Simulated Evidence Capture"
            headerTitle="FF-1042 • Photo Proof"
            headerSub="Floor 2 • Pantry"
            navRole="SUP"
            activeNav="My Tasks"
          >
            <div className={`space-y-2 transition ${cameraFlash ? 'opacity-30' : 'opacity-100'}`}>
              <PantryEvidenceIllustration variant="BEFORE" label="Before (08:12 AM)" timestamp="Captured on-site" />
              <PantryEvidenceIllustration
                variant="AFTER_V1_STAIN"
                label="After v1 (08:33 AM)"
                timestamp="Note: Small stain near sink"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-semibold text-slate-600">
                <span>Evidence Upload Progress</span>
                <span className="text-emerald-700">{uploadPct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#E9DDF5] overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all" style={{ width: `${uploadPct}%` }} />
              </div>
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={triggerShutter}
                className="flex-1 py-1.5 rounded-xl border border-[#E9DDF5] bg-white text-[9.5px] font-bold text-[#3A1150] flex items-center justify-center gap-1 cursor-pointer"
              >
                <Camera className="w-3 h-3" /> Shutter Demo
              </button>
              <button
                onClick={() => onGoToSlide(17)}
                className="flex-1 py-1.5 rounded-xl bg-[#3A1150] text-white text-[9.5px] font-bold cursor-pointer"
              >
                Next: Summary →
              </button>
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F8E4F1] text-[#6B2A7F] text-xs font-bold">
            Simulated Camera Capture & Sample Pantry Evidence
          </span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Show the work. Prove the result.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Karthik attaches timestamped Before and After photographs of the Floor 2 Pantry. Notice that in Version 1, a small visible stain remains near the sink—setting up the client quality verification loop.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 17 — SUBMISSION FOR REVIEW
  // --------------------------------------------------------------------------
  if (slideNum === 17) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Step 3 • Verification Handoff</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Completed work. Ready for verification.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-8">
          <PhoneFrame size="lg" roleBadge="Supervisor • Karthik" headerTitle="Submission Summary" navRole="SUP" activeNav="My Tasks">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1.5 text-[9.5px]">
              <div className="font-bold text-[#3A1150]">FF-1042 • Pantry Cleaning</div>
              <div className="flex justify-between">
                <span className="text-slate-500">Checklist:</span>
                <span className="font-bold text-emerald-700">5/5 Complete</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Photos:</span>
                <span className="font-bold text-emerald-700">Before + After (v1)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Submitted At:</span>
                <span className="font-semibold">08:35 AM</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[9px] text-amber-800 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              Submission is not approval. Routed to Priya for independent sign-off.
            </div>
            <button
              onClick={() => {
                setDemo({ ...demo, status: 'Awaiting Review' });
                onGoToSlide(18);
              }}
              className="w-full py-2 rounded-xl bg-emerald-600 text-white text-[10px] font-bold cursor-pointer"
            >
              Submit for Review →
            </button>
          </PhoneFrame>

          <PhoneFrame size="lg" roleBadge="Facility Manager • Priya" headerTitle="Review Queue" navRole="FM" activeNav="Review">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 space-y-1 text-[9.5px]">
              <div className="flex justify-between">
                <span className="font-bold text-amber-900">FF-1042 • Awaiting Review</span>
                <span>08:35 AM</span>
              </div>
              <div className="font-bold text-slate-900">Pantry Cleaning and Sanitization</div>
              <div className="text-slate-600">Floor 2 • Submitted by Karthik</div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 18 — FACILITY MANAGER EVIDENCE REVIEW (BEFORE/AFTER SLIDER)
  // --------------------------------------------------------------------------
  if (slideNum === 18) {
    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame
            size="lg"
            roleBadge="Facility Manager • Priya"
            headerTitle="Evidence Inspection"
            headerSub="FF-1042 • Version 1 (08:35 AM)"
            navRole="FM"
            activeNav="Review"
          >
            <InteractiveBeforeAfterSlider v1Stain />

            <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-[9px] text-rose-800">
              <strong>Observation:</strong> Visible stain remains near the pantry sink on the right countertop edge.
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={() => onGoToSlide(19)}
                className="py-2 rounded-xl bg-rose-600 text-white text-[10px] font-bold cursor-pointer"
              >
                Request Rework
              </button>
              <button
                onClick={() => onGoToSlide(21)}
                className="py-2 rounded-xl bg-emerald-600 text-white text-[10px] font-bold cursor-pointer"
              >
                Approve
              </button>
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Independent Quality Assurance</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Quality decisions backed by evidence.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Priya uses the interactive Before/After comparison slider to inspect the Floor 2 Pantry. Spotting the remaining stain near the sink, she triggers a structured Rework Request.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 19 — REWORK REQUEST
  // --------------------------------------------------------------------------
  if (slideNum === 19) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600">Quality Enforcement Loop</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Identify issues. Request corrections.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-8">
          {/* Priya's Rework Bottom Sheet */}
          <PhoneFrame size="lg" highlightRing roleBadge="Facility Manager • Priya" headerTitle="Rework Request" navRole="FM" activeNav="Review">
            <div className="p-2.5 rounded-2xl bg-white border-2 border-rose-400 space-y-2 text-[9.5px]">
              <div className="font-bold text-rose-700">FF-1042 • Rejection Details (08:45 AM)</div>
              <div>
                <span className="text-slate-400 block">Mandatory Rejection Reason</span>
                <div className="p-1.5 rounded bg-rose-50/60 border border-rose-200 font-semibold text-slate-900">
                  Visible stain remains near the pantry sink.
                </div>
              </div>
              <div>
                <span className="text-slate-400 block">Corrective Instructions</span>
                <div className="p-1.5 rounded bg-[#FAF8FC] border border-[#E9DDF5] text-slate-700">
                  Clean the affected area and submit revised photographic evidence.
                </div>
              </div>
              <button
                onClick={() => {
                  setDemo({ ...demo, status: 'Rework Required' });
                  onGoToSlide(20);
                }}
                className="w-full py-2 rounded-xl bg-rose-600 text-white text-[10px] font-bold cursor-pointer"
              >
                Submit Rework Request →
              </button>
            </div>
          </PhoneFrame>

          {/* Karthik Receiving Rework Alert */}
          <PhoneFrame size="lg" roleBadge="Supervisor • Karthik" headerTitle="Rework Alert" navRole="SUP" activeNav="Alerts">
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-300 space-y-1.5 text-[9.5px]">
              <div className="flex justify-between font-bold text-rose-700">
                <span>Rework Required • 08:45 AM</span>
                <span>FF-1042</span>
              </div>
              <div className="font-bold text-slate-900">Visible stain remains near the pantry sink.</div>
              <p className="text-slate-600">
                Instruction: Clean the affected area and submit revised photographic evidence.
              </p>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 20 — CORRECTION AND RESUBMISSION
  // --------------------------------------------------------------------------
  if (slideNum === 20) {
    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame
            size="lg"
            roleBadge="Supervisor Rework Inbox"
            headerTitle="FF-1042 • Rework"
            headerSub="Preserving v1 Audit Trail"
            navRole="SUP"
            activeNav="My Tasks"
          >
            <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-[9px] text-rose-900">
              <strong>v1 Rejected (08:45 AM):</strong> Visible stain remains near the pantry sink.
            </div>

            <PantryEvidenceIllustration
              variant="AFTER_V2"
              label="After v2 • Stain Removed"
              timestamp="Captured 09:03 AM"
            />

            <div className="space-y-1 text-[9px]">
              <div className="flex justify-between px-2 py-1 rounded bg-[#FAF8FC] border border-[#E9DDF5]">
                <span>Version 1 (08:35 AM)</span>
                <span className="font-bold text-rose-600">Rework Required</span>
              </div>
              <div className="flex justify-between px-2 py-1 rounded bg-emerald-50 border border-emerald-200">
                <span>Version 2 (09:05 AM)</span>
                <span className="font-bold text-emerald-700">Resubmitted</span>
              </div>
            </div>

            <button
              onClick={() => {
                setDemo({ ...demo, status: 'Resubmitted' });
                onGoToSlide(21);
              }}
              className="w-full py-2 rounded-xl bg-[#3A1150] text-white text-[10px] font-bold cursor-pointer"
            >
              Resubmit v2 for Verification →
            </button>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Accountable Remediation</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Correct the issue. Preserve the history.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Karthik cleans the sink counter, uploads the revised Version 2 photograph showing the stain completely removed, and resubmits FF-1042 while keeping Version 1 permanently logged.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 21 — FINAL APPROVAL
  // --------------------------------------------------------------------------
  if (slideNum === 21) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Verified Sign-Off</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Verified work. Complete accountability.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-5">
          {/* Priya Approving v2 */}
          <PhoneFrame size="md" highlightRing roleBadge="Facility Manager • Priya" headerTitle="Verify v2 Proof" navRole="FM" activeNav="Review">
            <InteractiveBeforeAfterSlider v1Stain={false} />
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <div className="flex items-center justify-center gap-1 text-emerald-700 font-bold text-[11px]">
                <CircleCheck className="w-4 h-4" /> Approved (09:15 AM)
              </div>
              <div className="text-[8.5px] text-slate-600">Retained in Approved state (distinct from Closed)</div>
            </div>
          </PhoneFrame>

          {/* Karthik Approval Notification */}
          <PhoneFrame size="md" roleBadge="Supervisor • Karthik" headerTitle="Task Approved" navRole="SUP" activeNav="Alerts">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 text-[9.5px]">
              <div className="font-bold text-emerald-800">✓ FF-1042 Approved • 5.0 ★</div>
              <div>Priya approved your Version 2 resubmission for Floor 2 Pantry.</div>
            </div>
          </PhoneFrame>

          {/* Arjun Operations Head Live Update */}
          <PhoneFrame size="md" roleBadge="Operations Head • Arjun" headerTitle="Live Audit Log" navRole="OPS" activeNav="Tasks">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1 text-[9px]">
              <div className="font-bold text-[#3A1150]">Northstar Coworking • FF-1042</div>
              <div className="text-emerald-700 font-bold">Status: Approved (1 Rework Cycle)</div>
              <div className="text-slate-500">v1 (08:35) → Rework (08:45) → v2 Approved (09:15)</div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 22 — COMPLETE TASK LIFECYCLE
  // --------------------------------------------------------------------------
  if (slideNum === 22) {
    const timeline = [
      { time: '08:00 AM', state: 'Assigned', desc: 'Priya assigns FF-1042 to Karthik' },
      { time: '08:05 AM', state: 'Acknowledged', desc: 'Karthik confirms receipt on-site' },
      { time: '08:10 AM', state: 'In Progress', desc: 'Sanitization & 5-item checklist underway' },
      { time: '08:35 AM', state: 'Submitted', desc: 'v1 Before/After photos uploaded' },
      { time: '08:45 AM', state: 'Rework Required', desc: 'Priya flags sink stain & requests rework' },
      { time: '09:05 AM', state: 'Resubmitted', desc: 'Karthik cleans sink & uploads v2 proof' },
      { time: '09:15 AM', state: 'Approved', desc: 'Priya verifies v2 & approves FF-1042' }
    ];

    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        {/* Left: Circular Lifecycle Diagram with Rework Loop */}
        <div className="col-span-6 bg-white/90 rounded-3xl border border-[#E9DDF5] p-5 shadow-md space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#6B2A7F]">
            State Machine & Rework Loop
          </div>
          <svg viewBox="0 0 420 220" className="w-full h-48">
            {/* Main Linear Flow */}
            {[
              { label: 'Assign', x: 38, y: 65 },
              { label: 'Acknowledge', x: 112, y: 65 },
              { label: 'Execute', x: 186, y: 65 },
              { label: 'Submit', x: 256, y: 65 },
              { label: 'Verify', x: 324, y: 65 },
              { label: 'Approve', x: 388, y: 65 }
            ].map((n, idx, arr) => (
              <g key={n.label}>
                {idx < arr.length - 1 && (
                  <line x1={n.x + 22} y1={n.y} x2={arr[idx + 1].x - 22} y2={n.y} stroke="#6B2A7F" strokeWidth="2" />
                )}
                <rect
                  x={n.x - 28}
                  y={n.y - 16}
                  width="56"
                  height="32"
                  rx="10"
                  fill={n.label === 'Approve' ? '#10B981' : '#3A1150'}
                />
                <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#FFFFFF">
                  {n.label}
                </text>
              </g>
            ))}

            {/* Distinct Rework Loop */}
            <path
              d="M324 81 L324 162 L186 162 L186 83"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
            {!reducedMotion && (
              <circle r="4" fill="#EF4444">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M324 81 L324 162 L186 162 L186 83" />
              </circle>
            )}
            <rect x="205" y="146" width="102" height="28" rx="10" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1.5" />
            <text x="256" y="163" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#DC2626">
              Rework & Resubmit
            </text>
          </svg>

          {/* Supporting Lifecycle States & Overdue Legend */}
          <div className="flex flex-wrap gap-2 text-[10px] pt-1 border-t border-[#E9DDF5]">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">Draft</span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">Closed (Separate State)</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-semibold">Cancelled</span>
            <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold">Overdue = Deadline Badge</span>
          </div>
        </div>

        {/* Right: Synchronized Timeline */}
        <div className="col-span-6 space-y-2.5">
          <h2 className="text-2xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Every action. On record.
          </h2>
          <div className="bg-white/90 rounded-2xl border border-[#E9DDF5] p-3.5 space-y-1.5">
            {timeline.map((item, idx) => (
              <button
                key={item.time}
                onClick={() => setLifecycleNode(idx)}
                className={`w-full px-3 py-1.5 rounded-xl text-left flex items-center justify-between text-xs transition cursor-pointer ${
                  lifecycleNode === idx ? 'bg-[#F8E4F1] border border-[#D07BDA]' : 'hover:bg-[#FAF8FC]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-bold text-[#6B2A7F]">{item.time}</span>
                  <span className="font-bold text-slate-900">{item.state}</span>
                </div>
                <span className="text-[11px] text-slate-500 truncate max-w-[190px]">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 23 — DAILY OPERATIONAL LOGS
  // --------------------------------------------------------------------------
  if (slideNum === 23) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Shift Accountability</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Capture the details that matter.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-8">
          <PhoneFrame size="lg" roleBadge="Supervisor • Karthik" headerTitle="Daily Shift Log" navRole="SUP" activeNav="Logs">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1.5 text-[9.5px]">
              <div className="font-bold text-[#3A1150]">Northstar Business Centre • Morning Shift</div>
              <div><strong>Activities:</strong> Floor 2 Pantry & Washrooms sanitized</div>
              <div><strong>Staffing:</strong> 12/12 workers present on-site</div>
              <div><strong>Shortages:</strong> None (Dispensers stocked)</div>
              <div><strong>Observations:</strong> High pantry usage at 09:30 AM</div>
              <div className="py-1.5 rounded-lg bg-emerald-600 text-white text-center font-bold">
                ✓ Daily Log Submitted (09:40 AM)
              </div>
            </div>
          </PhoneFrame>

          <PhoneFrame size="lg" roleBadge="Operations Head • Arjun" headerTitle="Centralized Logs" navRole="OPS" activeNav="More">
            <div className="p-2.5 rounded-xl bg-[#F8E4F1] border border-[#D07BDA]/50 space-y-1 text-[9.5px]">
              <div className="flex justify-between font-bold text-[#3A1150]">
                <span>Northstar Coworking</span>
                <span>09:40 AM</span>
              </div>
              <div>Supervisor: Karthik • 12/12 Associates</div>
              <div className="text-emerald-700 font-semibold">Auto-populated: 100% FF-1042 approved</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1 text-[9px]">
              <div className="font-bold text-slate-900">Meridian Business Park • Deepa</div>
              <div className="text-amber-700">Note: 1 tissue roll box remaining in store</div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 24 — AUDITS AND INSPECTIONS
  // --------------------------------------------------------------------------
  if (slideNum === 24) {
    const passCount = demo.auditItems.filter((a) => a.pass).length;
    const score = Math.round((passCount / demo.auditItems.length) * 100);

    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame size="lg" roleBadge="Facility Manager • Priya" headerTitle="Facility Inspection" navRole="FM" activeNav="More">
            <div className="p-2.5 rounded-xl bg-[#3A1150] text-white flex items-center justify-between">
              <div>
                <div className="text-[9px] text-[#E9DDF5]">Floor 2 Pantry Audit</div>
                <div className="text-base font-bold">{score} / 100 Score</div>
              </div>
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>

            <div className="space-y-1.5">
              {demo.auditItems.map((it) => (
                <button
                  key={it.id}
                  onClick={() =>
                    setDemo({
                      ...demo,
                      auditItems: demo.auditItems.map((a) => (a.id === it.id ? { ...a, pass: !a.pass } : a))
                    })
                  }
                  className="w-full p-2 rounded-xl bg-white border border-[#E9DDF5] flex items-center justify-between text-[9.5px] cursor-pointer"
                >
                  <span className="font-medium text-slate-800">{it.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold ${
                      it.pass ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {it.pass ? 'PASS' : 'FAIL'}
                  </span>
                </button>
              ))}
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Structured Quality Audits</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Maintain consistent service standards.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Priya conducts periodic walkthrough inspections with Pass/Fail scoring, photographic documentation, and corrective action tracking visible to Arjun.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 25 — COMPLAINTS AND CORRECTIVE ACTIONS
  // --------------------------------------------------------------------------
  if (slideNum === 25) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Escalation & Privacy Boundary</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Resolve issues before they escalate.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-8">
          <PhoneFrame size="lg" roleBadge="Facility Manager • Priya" headerTitle="Raise Complaint" navRole="FM" activeNav="More">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1.5 text-[9.5px]">
              <div className="font-bold text-rose-700">CMP-104 • Floor 2 Pantry</div>
              <div><strong>Category:</strong> Consumable Replenishment</div>
              <div><strong>Priority:</strong> High</div>
              <p className="text-slate-600">Coffee station napkin dispenser empty at 09:45 AM.</p>
              <span className="inline-block px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold">
                Status: Tracking Resolution
              </span>
            </div>
          </PhoneFrame>

          <PhoneFrame size="lg" roleBadge="Operations Head • Arjun" headerTitle="Complaint & Directive" navRole="OPS" activeNav="More">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1.5 text-[9px]">
              <div className="font-bold text-[#3A1150]">Client-Visible Record: CMP-104</div>
              <div className="text-slate-600">Assigned to Karthik • SLA Target: 30 mins</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F8E4F1] border border-[#6B2A7F] space-y-1 text-[9px]">
              <div className="font-bold text-[#3A1150] flex items-center gap-1">
                <Lock className="w-3 h-3" /> Private Provider Directive
              </div>
              <p className="text-slate-700">
                Sent to Karthik only (hidden from client): Add 09:30 AM pantry stock check to shift routine.
              </p>
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 26 — NOTIFICATIONS AND COMMUNICATION
  // --------------------------------------------------------------------------
  if (slideNum === 26) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">In-App Event Sync</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Keep everyone informed.
          </h2>
        </div>

        <div className="flex items-center justify-center gap-5">
          <PhoneFrame size="md" roleBadge="Operations Head" headerTitle="Notifications (3)" navRole="OPS" activeNav="Home">
            <div className="p-2 rounded-xl bg-[#F8E4F1] text-[9px]">
              <strong>FF-1042 Approved:</strong> Northstar Pantry verified by Priya (09:15 AM).
            </div>
            <div className="p-2 rounded-xl bg-white border border-[#E9DDF5] text-[9px]">
              <strong>Daily Log Reminder:</strong> All 4 sites submitted on schedule.
            </div>
          </PhoneFrame>

          <PhoneFrame size="md" roleBadge="Facility Manager" headerTitle="Notifications (2)" navRole="FM" activeNav="Review">
            <div className="p-2 rounded-xl bg-[#F8E4F1] text-[9px]">
              <strong>v2 Resubmitted:</strong> Karthik uploaded revised Pantry sink proof.
            </div>
            <div className="p-2 rounded-xl bg-white border border-[#E9DDF5] text-[9px]">
              <strong>Upcoming Deadline:</strong> Floor 3 Boardroom prep at 11:00 AM.
            </div>
          </PhoneFrame>

          <PhoneFrame size="md" roleBadge="Supervisor" headerTitle="Notifications (4)" navRole="SUP" activeNav="Alerts">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[9px]">
              <strong>Task Approved:</strong> FF-1042 approved by Priya!
            </div>
            <div className="p-2 rounded-xl bg-[#F8E4F1] text-[9px]">
              <strong>Corrective Instruction:</strong> Pantry stock check at 09:30 AM.
            </div>
          </PhoneFrame>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 27 — OPERATIONS HEAD MONITORING (READ-ONLY ON CLIENT APPROVALS)
  // --------------------------------------------------------------------------
  if (slideNum === 27) {
    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame
            size="lg"
            roleBadge="Operations Head • Arjun"
            headerTitle="Task Audit History"
            headerSub="FF-1042 • Northstar Coworking"
            navRole="OPS"
            activeNav="Tasks"
          >
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1.5 text-[9px]">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#3A1150]">FF-1042 • Floor 2 Pantry</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">Approved</span>
              </div>
              <div>Supervisor: Karthik • Verifier: Priya</div>
              <div className="p-1.5 rounded bg-[#FAF8FC] border border-[#E9DDF5]">
                History: v1 Submitted (08:35) → Rework (08:45) → v2 Resubmitted (09:05) → Approved (09:15)
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F8E4F1] border border-[#D07BDA]/50 text-[9px] text-[#3A1150] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              Client approval decisions are immutable. No Approve/Reject override buttons exist for the service provider.
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Governance & Integrity</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Complete visibility across authorized locations.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Arjun inspects every submission version, timestamp, and client remark across all client facilities without being able to alter client sign-offs—preserving trust for both parties.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 28 — PERFORMANCE ANALYTICS
  // --------------------------------------------------------------------------
  if (slideNum === 28) {
    const kpiData =
      analyticsClient === 'C1'
        ? { fpa: '94%', rework: '4.2%', onTime: '97%', audit: '94/100', count: '124 records' }
        : { fpa: '91%', rework: '6.4%', onTime: '93%', audit: '88/100', count: '474 records' };

    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame size="lg" roleBadge="Operations Head • Arjun" headerTitle="Performance Insights" navRole="OPS" activeNav="Insights">
            <div className="flex gap-1 text-[9px] font-bold">
              {['ALL', 'C1'].map((f) => (
                <button
                  key={f}
                  onClick={() => setAnalyticsClient(f)}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                    analyticsClient === f ? 'bg-[#3A1150] text-white' : 'bg-white border border-[#E9DDF5] text-slate-600'
                  }`}
                >
                  {f === 'ALL' ? 'All 4 Sites' : 'Northstar (C1)'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-left">
              <div className="p-2 rounded-xl bg-white border border-[#E9DDF5]">
                <div className="text-[8px] text-slate-500">First-Pass Approval</div>
                <div className="text-sm font-bold text-[#3A1150]">{kpiData.fpa}</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E9DDF5]">
                <div className="text-[8px] text-slate-500">On-Time Submission</div>
                <div className="text-sm font-bold text-emerald-600">{kpiData.onTime}</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E9DDF5]">
                <div className="text-[8px] text-slate-500">Rework Rate</div>
                <div className="text-sm font-bold text-rose-600">{kpiData.rework}</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-[#E9DDF5]">
                <div className="text-[8px] text-slate-500">Audit Score Avg</div>
                <div className="text-sm font-bold text-[#6B2A7F]">{kpiData.audit}</div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-[#FAF8FC] border border-[#E9DDF5] text-[8.5px] text-slate-500">
              Sample Size: {kpiData.count} • Calculated directly from verified task logs (no composite worker score).
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Operational Intelligence</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Turn operational records into insights.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Every metric—first-pass approval, rework frequency, on-time submission, and audit trends—is computed transparently from real task records with explicit sample counts.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 29 — SERVICE PROVIDER EVALUATION
  // --------------------------------------------------------------------------
  if (slideNum === 29) {
    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame
            size="lg"
            roleBadge="Facility Manager • Priya"
            headerTitle="Vendor Scorecard"
            headerSub="Prime Facility Services"
            navRole="FM"
            activeNav="More"
          >
            <div className="p-2.5 rounded-xl bg-[#3A1150] text-white flex justify-between items-center">
              <div>
                <div className="text-[9px] text-[#E9DDF5]">Overall Service Rating</div>
                <div className="text-lg font-bold">{demo.evalRating}.0 / 5.0 ★</div>
              </div>
              <Award className="w-6 h-6 text-[#F8E4F1]" />
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1.5 text-[9px]">
              <div className="flex justify-between">
                <span>Task Completion</span>
                <span className="font-bold text-emerald-700">98.4%</span>
              </div>
              <div className="flex justify-between">
                <span>Punctuality</span>
                <span className="font-bold text-emerald-700">96.0%</span>
              </div>
              <div className="flex justify-between">
                <span>Inspection Score</span>
                <span className="font-bold text-[#3A1150]">94 / 100</span>
              </div>
              <div className="pt-1 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setDemo({ ...demo, evalRating: n })}
                    className="cursor-pointer"
                  >
                    <Star className={`w-4 h-4 ${demo.evalRating >= n ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
              <p className="text-slate-600 italic">"{demo.evalNote}"</p>
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Decision Support</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Measure service. Improve performance.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Objective historical SLA metrics empower Northstar Coworking and Prime Facility Services to hold productive contract renewal and service improvement reviews—without automated termination rules.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 30 — REPORTS AND OPERATIONAL HISTORY
  // --------------------------------------------------------------------------
  if (slideNum === 30) {
    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame size="lg" roleBadge="Simulated Export Preview" headerTitle="Reports Center" navRole="OPS" activeNav="More">
            <div className="space-y-1.5">
              {[
                'Task Completion & SLA Summary',
                'Daily Operations Shift Digest',
                'Client & Supervisor Performance',
                'Audit Results & CAPA Log'
              ].map((rep) => (
                <button
                  key={rep}
                  onClick={() => setReportPreview(rep)}
                  className={`w-full p-2 rounded-xl border text-left text-[9.5px] flex items-center justify-between cursor-pointer ${
                    reportPreview === rep ? 'bg-[#F8E4F1] border-[#6B2A7F] font-bold text-[#3A1150]' : 'bg-white border-[#E9DDF5]'
                  }`}
                >
                  <span>{rep}</span>
                  <Download className="w-3 h-3 text-[#6B2A7F]" />
                </button>
              ))}
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] text-[9px] space-y-1">
              <div className="font-bold text-[#3A1150]">Preview: {reportPreview}</div>
              <div className="text-slate-500">Northstar Business Centre • Nov 2026 • Simulated PDF/CSV Export</div>
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Audit-Ready Documentation</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Reliable records. Informed decisions.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Filter operational history by facility and date range to generate standardized PDF and spreadsheet summaries for client governance meetings.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 31 — PROFILE, SETTINGS AND SECURE ACCESS
  // --------------------------------------------------------------------------
  if (slideNum === 31) {
    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame size="lg" roleBadge="Account & Security" headerTitle="Profile & Settings" navRole="FM" activeNav="More">
            <div className="p-2.5 rounded-xl bg-white border border-[#E9DDF5] space-y-1 text-[9.5px]">
              <div className="font-bold text-[#3A1150]">Priya • Facility Manager</div>
              <div className="text-slate-500">Workspace: Northstar Coworking (C1)</div>
            </div>
            <div className="space-y-1 text-[9px]">
              {['Authorized Workspace Isolation', 'Notification Preferences', 'Help & Support', 'Sign Out'].map((item) => (
                <div key={item} className="p-2 rounded-xl bg-white border border-[#E9DDF5] font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Tenant Security Architecture</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            The right access for every role.
          </h2>
          <div className="space-y-2 max-w-lg text-xs">
            <div className="p-3 rounded-2xl bg-white/90 border border-[#E9DDF5]">
              <strong className="text-[#3A1150]">Operations Head:</strong> Multi-client monitoring & provider staffing; read-only on client sign-offs.
            </div>
            <div className="p-3 rounded-2xl bg-white/90 border border-[#E9DDF5]">
              <strong className="text-[#3A1150]">Facility Manager:</strong> Own authorized facility configuration, task assignment & independent approval.
            </div>
            <div className="p-3 rounded-2xl bg-white/90 border border-[#E9DDF5]">
              <strong className="text-[#3A1150]">Supervisor:</strong> Allocated facility execution, evidence upload & rework only.
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
              Production deployment enforces server-side RBAC, row-level tenant isolation, and encrypted evidence storage.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 32 — MOBILE RELIABILITY
  // --------------------------------------------------------------------------
  if (slideNum === 32) {
    const states = {
      WEAK_CONN: {
        title: 'Weak Connection Detected',
        badge: 'Amber Warning',
        msg: 'Signal low in basement pantry. Evidence queued safely for retry.',
        action: 'Retry Upload'
      },
      UPLOAD_RETRY: {
        title: 'Photo Upload Failed → Retried',
        badge: 'Resilient Upload',
        msg: 'Connection restored! FF-1042 After v2 photograph uploaded (100%).',
        action: 'Verified Synced'
      },
      VALIDATION: {
        title: 'Mandatory Checklist Guard',
        badge: 'Input Validation',
        msg: 'Cannot submit FF-1042 until "Refill consumables" is checked.',
        action: 'Complete Step'
      },
      OFFLINE_PROPOSED: {
        title: 'Offline Draft Storage (Proposed)',
        badge: 'Pending Scope Confirmation',
        msg: 'Proposed enhancement: cache checklist drafts locally when basement Wi-Fi drops.',
        action: 'Proposed Feature'
      }
    };
    const curr = states[demo.reliabilityCase] || states.WEAK_CONN;

    return (
      <div className="h-full grid grid-cols-12 gap-6 items-center px-10 py-3">
        <div className="col-span-5 flex justify-center">
          <PhoneFrame size="lg" roleBadge="Field Resilience" headerTitle="Connectivity & States" navRole="SUP" activeNav="My Tasks">
            <div className="p-3 rounded-2xl bg-white border border-[#E9DDF5] space-y-2 text-[9.5px]">
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold text-[8.5px]">
                {curr.badge}
              </span>
              <div className="font-bold text-[#3A1150] text-xs">{curr.title}</div>
              <p className="text-slate-600 leading-relaxed">{curr.msg}</p>
              <button
                onClick={() => setDemo({ ...demo, reliabilityCase: 'UPLOAD_RETRY' })}
                className="w-full py-2 rounded-xl bg-[#3A1150] text-white font-bold cursor-pointer"
              >
                {curr.action}
              </button>
            </div>
          </PhoneFrame>
        </div>

        <div className="col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B2A7F]">Real-World Field Conditions</span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Designed for real operational environments.
          </h2>
          <div className="grid grid-cols-2 gap-2.5 max-w-lg">
            {[
              { id: 'WEAK_CONN', label: 'Weak Basement Signal' },
              { id: 'UPLOAD_RETRY', label: 'Retry & Connection Restored' },
              { id: 'VALIDATION', label: 'Checklist Validation Guard' },
              { id: 'OFFLINE_PROPOSED', label: 'Offline Drafts (Proposed Scope)' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setDemo({ ...demo, reliabilityCase: btn.id })}
                className={`p-3 rounded-2xl border text-left text-xs font-semibold cursor-pointer ${
                  demo.reliabilityCase === btn.id
                    ? 'bg-[#3A1150] text-white border-[#3A1150]'
                    : 'bg-white border-[#E9DDF5] text-slate-800'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 33 — FUTURE INTELLIGENCE (ROADMAP)
  // --------------------------------------------------------------------------
  if (slideNum === 33) {
    return (
      <div className="h-full flex flex-col justify-center px-8 py-3 space-y-3">
        <div className="text-center space-y-1">
          <span className="inline-block px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            Future Roadmap — Not Part of the Initial Release
          </span>
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            From service accountability to intelligent operations.
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto w-full">
          {[
            {
              title: 'AI-Assisted Quality Scan',
              tag: 'Human-in-the-Loop Aid',
              desc: 'Conceptual visual overlay highlighting potential surface streaks to assist Facility Managers during photo review.'
            },
            {
              title: 'Duplicate Evidence Check',
              tag: 'Integrity Flag',
              desc: 'Flags visually similar or recycled photographs across dates for human verification.'
            },
            {
              title: 'Predictive Risk & Smart Schedules',
              tag: 'Operational Forecasting',
              desc: 'Identifies sites at elevated risk of rework or delay and suggests frequency adjustments from historical logs.'
            }
          ].map((card) => (
            <div key={card.title} className="p-4 rounded-3xl bg-white/90 border border-[#E9DDF5] space-y-2 shadow-sm">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F8E4F1] text-[#6B2A7F]">
                {card.tag}
              </span>
              <h3 className="text-base font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {card.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-600 max-w-3xl mx-auto">
          Illustrative roadmap concepts only: No trained ML model is active in the initial MVP, and future AI tools strictly assist human reviewers rather than making automated approval, employment, or contract termination decisions.
        </p>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 34 — COMPLETE APPLICATION OVERVIEW (3 PHONES SIDE BY SIDE)
  // --------------------------------------------------------------------------
  if (slideNum === 34) {
    return (
      <div className="h-full flex flex-col justify-center px-6 py-2 space-y-3">
        <div className="text-center space-y-0.5">
          <h2 className="text-3xl font-bold text-[#3A1150]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Three roles. One connected platform.
          </h2>
          <p className="text-xs font-bold text-[#6B2A7F] tracking-wide">
            Allocate → Assign → Execute → Submit → Verify → Improve
          </p>
        </div>

        <div className="flex items-center justify-center gap-5">
          <PhoneFrame size="md" roleBadge="Operations Head" headerTitle="Prime Facility" navRole="OPS" activeNav="Home">
            <div className="p-2 rounded-xl bg-[#3A1150] text-white text-[10px] font-bold">
              4 Clients • 91.8% Approval
            </div>
            <div className="p-2 rounded-xl bg-white border border-[#E9DDF5] text-[9px]">
              Allocates Supervisors & monitors cross-site logs & SLA trends.
            </div>
          </PhoneFrame>

          <ArrowRight className="w-5 h-5 text-[#6B2A7F] shrink-0" />

          <PhoneFrame size="md" highlightRing roleBadge="Facility Manager" headerTitle="Northstar Coworking" navRole="FM" activeNav="Review">
            <div className="p-2 rounded-xl bg-[#F8E4F1] text-[10px] font-bold text-[#3A1150]">
              FF-1042 Approved • 5.0 ★
            </div>
            <div className="p-2 rounded-xl bg-white border border-[#E9DDF5] text-[9px]">
              Assigns tasks, compares Before/After photos & evaluates vendor quality.
            </div>
          </PhoneFrame>

          <ArrowRight className="w-5 h-5 text-[#6B2A7F] shrink-0" />

          <PhoneFrame size="md" roleBadge="Supervisor" headerTitle="Karthik • Floor 2" navRole="SUP" activeNav="My Tasks">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-800">
              5/5 Steps + v2 Proof Verified
            </div>
            <div className="p-2 rounded-xl bg-white border border-[#E9DDF5] text-[9px]">
              Executes checklists, captures photos, resolves rework & logs shifts.
            </div>
          </PhoneFrame>
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-[11px] font-semibold text-[#3A1150]">
          {[
            'Multi-client visibility',
            'Operational accountability',
            'Evidence-based verification',
            'Corrective work tracking',
            'Measurable service performance'
          ].map((pill) => (
            <span key={pill} className="px-3 py-1 rounded-full bg-white/90 border border-[#E9DDF5]">
              ✓ {pill}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SLIDE 35 — CLOSING
  // --------------------------------------------------------------------------
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center px-8 py-4 relative overflow-hidden">
      <div className="w-80 mb-2">
        <IsometricTowersSVG reducedMotion={reducedMotion} />
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3A1150] text-white text-xs font-bold mb-2">
        <Layers className="w-3.5 h-3.5 text-[#F8E4F1]" /> Facility Flow
      </div>

      <h2
        className="text-4xl xl:text-5xl font-bold text-[#3A1150]"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Better service starts here.
      </h2>
      <p className="text-base text-slate-700 mt-2 font-medium">
        One platform. Complete visibility. • <strong className="text-[#6B2A7F]">Every Task. Every Space. In Sync.</strong>
      </p>

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={() => {
            onResetDemo();
            onGoToSlide(1);
          }}
          className="px-6 py-3 rounded-2xl text-white font-semibold text-sm flex items-center gap-2 shadow-lg cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #3A1150 0%, #6B2A7F 100%)' }}
        >
          <RotateCcw className="w-4 h-4" /> Restart Demo
        </button>

        <button
          onClick={() => onGoToSlide(6)}
          className="px-5 py-3 rounded-2xl bg-white border border-[#E9DDF5] text-[#3A1150] font-semibold text-sm hover:bg-[#F8E4F1] transition cursor-pointer"
        >
          Explore Application Screens
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN 16:9 PRESENTATION CONTROLLER
// ============================================================================

export default function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [mode, setMode] = useState('GUIDED'); // 'GUIDED' | 'EXPLORE'
  const [autoplay, setAutoplay] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [demo, setDemo] = useState(INITIAL_DEMO_STATE);

  const totalSlides = SLIDES_META.length;

  const goNext = useCallback(() => {
    setCurrentSlide((s) => (s < totalSlides ? s + 1 : 1));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentSlide((s) => (s > 1 ? s - 1 : totalSlides));
  }, [totalSlides]);

  // Keyboard Arrow & Spacebar Navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setAutoplay((a) => !a);
      } else if (e.key === 'Escape') {
        setShowOverview(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goNext, goPrev]);

  // Autoplay Timer
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setCurrentSlide((s) => (s < totalSlides ? s + 1 : 1));
    }, 5500);
    return () => clearInterval(id);
  }, [autoplay, totalSlides]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const resetDemo = () => {
    setDemo(INITIAL_DEMO_STATE);
  };

  const currentMeta = SLIDES_META[currentSlide - 1];

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-2 sm:p-4 select-none"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: 'radial-gradient(circle at top left, #3A1150 0%, #240933 100%)'
      }}
    >
      {/* 16:9 LANDSCAPE PRESENTATION CONTAINER */}
      <div
        className="w-full max-w-[1360px] aspect-video max-h-[94vh] rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex flex-col relative"
        style={{
          background: 'linear-gradient(135deg, #FAF8FC 0%, #F8E4F1 50%, #DFE8FA 100%)'
        }}
      >
        {/* TOP PRESENTATION HEADER BAR */}
        <header className="px-5 py-2.5 bg-white/85 backdrop-blur-md border-b border-[#E9DDF5] flex items-center justify-between gap-3 shrink-0 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#3A1150] text-white flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#3A1150] leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Facility Flow
              </div>
              <div className="text-[10px] text-[#6B2A7F] font-medium">
                Slide {currentSlide} of {totalSlides} • {currentMeta.title}
              </div>
            </div>
          </div>

          {/* Mode Switcher: Guided Walkthrough vs Explore Application */}
          <div className="hidden md:flex items-center gap-1.5 bg-[#FAF8FC] p-1 rounded-xl border border-[#E9DDF5]">
            <button
              onClick={() => setMode('GUIDED')}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                mode === 'GUIDED' ? 'bg-[#3A1150] text-white' : 'text-slate-600 hover:text-[#3A1150]'
              }`}
            >
              Guided Walkthrough
            </button>
            <button
              onClick={() => setMode('EXPLORE')}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                mode === 'EXPLORE' ? 'bg-[#6B2A7F] text-white' : 'text-slate-600 hover:text-[#3A1150]'
              }`}
            >
              Explore Application
            </button>
          </div>

          {/* Utility Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              title="Toggle Reduced Motion"
              className={`px-2.5 py-1.5 rounded-xl border text-[10px] font-semibold cursor-pointer ${
                reducedMotion
                  ? 'bg-[#3A1150] text-white border-[#3A1150]'
                  : 'bg-white border-[#E9DDF5] text-slate-600'
              }`}
            >
              {reducedMotion ? 'Motion: Off' : 'Motion: On'}
            </button>

            <button
              onClick={() => {
                resetDemo();
                setCurrentSlide(1);
              }}
              title="Reset Demonstration"
              className="px-2.5 py-1.5 rounded-xl bg-white border border-[#E9DDF5] text-[10px] font-semibold text-slate-700 hover:border-[#6B2A7F] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>

            <button
              onClick={() => setShowOverview(!showOverview)}
              className="px-2.5 py-1.5 rounded-xl bg-[#F8E4F1] text-[#3A1150] text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Grid className="w-3 h-3" /> All 35 Slides
            </button>

            <button
              onClick={toggleFullscreen}
              aria-label="Toggle Fullscreen"
              className="p-1.5 rounded-xl bg-white border border-[#E9DDF5] text-[#3A1150] cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </header>

        {/* EXPLORE APPLICATION QUICK JUMP STRIP */}
        {mode === 'EXPLORE' && (
          <div className="px-5 py-1.5 bg-[#3A1150] text-white flex items-center justify-center gap-2 overflow-x-auto shrink-0 text-[11px]">
            <span className="text-[#F8E4F1] font-bold text-[10px] uppercase mr-1">Jump to Module:</span>
            {[
              { label: 'Operations Head', slide: 6 },
              { label: 'Facility Manager', slide: 9 },
              { label: 'Supervisor', slide: 13 },
              { label: 'Facility Config', slide: 10 },
              { label: 'Task Workflow (FF-1042)', slide: 12 },
              { label: 'Evidence & Rework', slide: 18 },
              { label: 'Analytics', slide: 28 },
              { label: 'Reports', slide: 30 }
            ].map((q) => (
              <button
                key={q.label}
                onClick={() => setCurrentSlide(q.slide)}
                className={`px-2.5 py-0.5 rounded-full font-semibold shrink-0 transition cursor-pointer ${
                  currentSlide === q.slide ? 'bg-[#D07BDA] text-[#240933]' : 'bg-white/12 hover:bg-white/25 text-white'
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>
        )}

        {/* MAIN SLIDE CANVAS */}
        <main className="flex-1 overflow-hidden relative">
          <SlideStage
            slideNum={currentSlide}
            demo={demo}
            setDemo={setDemo}
            onGoToSlide={(s) => setCurrentSlide(s)}
            reducedMotion={reducedMotion}
            onResetDemo={resetDemo}
          />

          {/* SLIDE OVERVIEW GRID OVERLAY */}
          {showOverview && (
            <div className="absolute inset-0 z-30 bg-[#240933]/90 backdrop-blur-md p-6 overflow-y-auto">
              <div className="flex items-center justify-between text-white mb-4">
                <div>
                  <h3 className="text-base font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Complete 35-Slide Product Demonstration Index
                  </h3>
                  <p className="text-xs text-[#E9DDF5]">Select any slide to jump directly</p>
                </div>
                <button
                  onClick={() => setShowOverview(false)}
                  className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {SLIDES_META.map((s) => (
                  <button
                    key={s.num}
                    onClick={() => {
                      setCurrentSlide(s.num);
                      setShowOverview(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                      currentSlide === s.num
                        ? 'bg-[#D07BDA] text-[#240933] border-white font-bold'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                    }`}
                  >
                    <div className="text-[10px] opacity-75">
                      Slide {String(s.num).padStart(2, '0')} • {s.category}
                    </div>
                    <div className="text-xs font-semibold mt-0.5 line-clamp-1">{s.title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* BOTTOM PRESENTATION PROGRESS & CONTROLS */}
        <footer className="px-5 py-2 bg-white/90 backdrop-blur-md border-t border-[#E9DDF5] flex items-center justify-between gap-4 shrink-0 z-20">
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="px-3 py-1.5 rounded-xl bg-[#FAF8FC] hover:bg-[#F8E4F1] border border-[#E9DDF5] text-[#3A1150] text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>

            <button
              onClick={() => setAutoplay(!autoplay)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                autoplay ? 'bg-amber-500 text-white' : 'bg-[#F8E4F1] text-[#3A1150]'
              }`}
            >
              {autoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {autoplay ? 'Pause' : 'Autoplay'}
            </button>

            <button
              onClick={goNext}
              className="px-3.5 py-1.5 rounded-xl bg-[#3A1150] hover:bg-[#6B2A7F] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-[#E9DDF5] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(currentSlide / totalSlides) * 100}%`,
                  background: 'linear-gradient(90deg, #3A1150, #8E3B9E)'
                }}
              />
            </div>
            <span className="text-[11px] font-bold text-[#3A1150] tabular-nums">
              {String(currentSlide).padStart(2, '0')} / {totalSlides}
            </span>
          </div>

          <div className="hidden lg:block text-[10px] text-slate-500">
            Use <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border">←</kbd>{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border">→</kbd> keys to navigate
          </div>
        </footer>
      </div>
    </div>
  );
}