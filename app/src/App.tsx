import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChartColumn,
  Check,
  FileText,
  Layers3,
  MessageCircle,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import clientMeeting from './assets/images/client-meeting.png'
import fin9Logo from './assets/images/fin9-logo.png'
import priyaReady from './assets/images/priya-ready.png'
import './App.css'

type JourneyStage = {
  number: number
  label: string
  title: string
  summary: string
  detail: string
  output: string
}

const stages: JourneyStage[] = [
  {
    number: 0,
    label: 'Foundation',
    title: 'Context already in place',
    summary: 'Profile · preferences · records',
    detail:
      'Advisor preferences, prior context, and connected records give Aura a starting point before Priya makes a request.',
    output: 'A scoped view of Priya’s role, preferred apps, and available client records.',
  },
  {
    number: 1,
    label: 'The ask',
    title: 'One sentence',
    summary: 'A natural language request',
    detail:
      'Priya asks Aura to prepare for tomorrow’s meeting with Mr. Sharma. The request is the only new instruction needed to begin this scenario.',
    output: 'A meeting-preparation request tied to the advisor and client context.',
  },
  {
    number: 2,
    label: 'Acknowledgement',
    title: 'Personal response',
    summary: 'Goal and timing are clear',
    detail:
      'Aura confirms the goal and gives Priya a short expectation for the preparation work.',
    output: 'A clear acknowledgement before work starts.',
  },
  {
    number: 3,
    label: 'The plan',
    title: 'Specialists assembled',
    summary: 'Six roles · visible dependencies',
    detail:
      'Priya can see the specialist roles, the work each one owns, and which tasks can begin together.',
    output: 'A dependency-aware plan that separates analysis, recommendations, and later meeting work.',
  },
  {
    number: 4,
    label: 'Parallel execution',
    title: 'Evidence work in progress',
    summary: 'Four analysis passes together',
    detail:
      'Market, portfolio, risk, and financial-planning analysis can run in parallel. Status should say what each pass is doing and what it found.',
    output: 'Four evidence streams with visible state and source boundaries.',
  },
  {
    number: 5,
    label: 'The compile',
    title: 'Connect the findings',
    summary: 'Synthesis · not aggregation',
    detail:
      'The final narrative connects market movement with portfolio performance, concentration, and the stated goal.',
    output: 'A concise explanation of what matters and why.',
  },
  {
    number: 6,
    label: 'The deliverable',
    title: 'Cited meeting brief',
    summary: 'Verdict · evidence · priorities',
    detail:
      'The brief leads with its conclusion, keeps each example claim close to a source entry, and gives Priya discussion priorities.',
    output: 'A review-ready briefing with sources and explicit illustrative-data labels.',
  },
  {
    number: 7,
    label: 'Meeting execution',
    title: 'Capture the conversation',
    summary: 'After the client meeting',
    detail:
      'Meeting Execution begins after the real conversation. Notes and decisions can then inform draft CRM updates and follow-up.',
    output: 'A meeting record plus proposed next actions for Priya to review.',
  },
  {
    number: 8,
    label: 'The next step',
    title: 'Ready for what’s next',
    summary: 'Advisor decides what proceeds',
    detail:
      'Aura can prepare a follow-up draft and reminders. Priya remains the person who reviews and decides whether to proceed.',
    output: 'An advisor-approved next step, with no automatic client message shown.',
  },
]

const specialists = [
  {
    name: 'Market Intelligence',
    description: 'Market movement and sector changes',
  },
  {
    name: 'Portfolio Intelligence',
    description: 'Returns and performance drivers',
  },
  {
    name: 'Risk Intelligence',
    description: 'Exposure, concentration, and change',
  },
  {
    name: 'Financial Planning Intelligence',
    description: 'Goal path and model assumptions',
  },
]

function MetricBars({
  label,
  max,
  rows,
}: {
  label: string
  max: number
  rows: { label: string; value: number; tone: 'dark' | 'mid' }[]
}) {
  return (
    <div className="metric-plot" role="group" aria-label={label}>
      <div className="plot-axis" aria-hidden="true">
        <span />
        <div><span>0</span><span>{max / 2}%</span><span>{max}%</span></div>
        <span />
      </div>
      <ol className="plot-rows">
        {rows.map((row) => (
          <li className="plot-row" key={row.label}>
            <span className="plot-row-label">{row.label}</span>
            <span className="plot-track" aria-hidden="true">
              <span className={`plot-fill ${row.tone}`} style={{ width: `${Math.min((row.value / max) * 100, 100)}%` }} />
            </span>
            <strong>{row.value}%</strong>
          </li>
        ))}
      </ol>
    </div>
  )
}

function StageTrack({
  items,
  selected,
  onSelect,
  label,
}: {
  items: JourneyStage[]
  selected: number
  onSelect: (number: number) => void
  label: string
}) {
  return (
    <div className="track-scroll" role="region" aria-label={label} tabIndex={0}>
      <ol className={`journey-track count-${items.length}`}>
        {items.map((stage, index) => (
          <li
            className={`journey-node${selected === stage.number ? ' is-active' : ''}`}
            key={stage.number}
          >
            <Button
              aria-pressed={selected === stage.number}
              className="stage-button"
              onClick={() => onSelect(stage.number)}
              size="sm"
              type="button"
              variant={selected === stage.number ? 'default' : 'outline'}
            >
              <span className="stage-number">{stage.number}</span>
              <span className="stage-button-copy">
                <span className="stage-label">{stage.label}</span>
                <span className="stage-title">{stage.title}</span>
              </span>
            </Button>
            <span className="stage-summary">{stage.summary}</span>
            {index < items.length - 1 && (
              <ArrowRight className="journey-arrow" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

function EvidenceVisual() {
  const [tab, setTab] = useState('performance')

  return (
    <Card className="evidence-card">
      <CardHeader className="evidence-heading">
        <div>
          <div className="eyebrow">Illustrative briefing data</div>
          <CardTitle>Three signals become one discussion</CardTitle>
          <CardDescription>
            Example values from the supplied story brief; underlying records were not provided.
          </CardDescription>
        </div>
        <Badge variant="outline">Illustrative values</Badge>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab} className="evidence-tabs">
          <TabsList className="evidence-tab-list" variant="line">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="risk">Concentration</TabsTrigger>
            <TabsTrigger value="goal">Goal estimate</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="evidence-chart-panel">
            <div className="chart-summary">
              <div>
                <span className="chart-kicker">Portfolio vs benchmark</span>
                <strong>+0.3 <small>pp</small></strong>
                <span className="chart-foot">Portfolio leads in this example</span>
              </div>
              <div className="legend-pair">
                <span><i className="legend-mark mark-dark" />Portfolio&nbsp; +2.8%</span>
                <span><i className="legend-mark mark-mid" />Benchmark&nbsp; +2.5%</span>
              </div>
            </div>
            <MetricBars
              label="Illustrative portfolio return of 2.8 percent compared with a 2.5 percent benchmark"
              max={3.5}
              rows={[{ label: 'Portfolio', value: 2.8, tone: 'dark' }, { label: 'Benchmark', value: 2.5, tone: 'mid' }]}
            />
          </TabsContent>

          <TabsContent value="risk" className="evidence-chart-panel">
            <div className="chart-summary">
              <div>
                <span className="chart-kicker">Financials concentration</span>
                <strong>+7 <small>pp</small></strong>
                <span className="chart-foot">Increase from prior review in this example</span>
              </div>
              <div className="legend-pair">
                <span><i className="legend-mark mark-mid" />Prior review&nbsp; 24%</span>
                <span><i className="legend-mark mark-dark" />Example review&nbsp; 31%</span>
              </div>
            </div>
            <MetricBars
              label="Illustrative Financials concentration rises from 24 percent at the prior review to 31 percent in the example"
              max={40}
              rows={[{ label: 'Prior review', value: 24, tone: 'mid' }, { label: 'Example review', value: 31, tone: 'dark' }]}
            />
          </TabsContent>

          <TabsContent value="goal" className="evidence-chart-panel">
            <div className="chart-summary">
              <div>
                <span className="chart-kicker">Education goal estimate</span>
                <strong>68 → 74<small>%</small></strong>
                <span className="chart-foot">Model assumptions need confirmation</span>
              </div>
              <div className="legend-pair">
                <span><i className="legend-mark mark-mid" />Prior estimate&nbsp; 68%</span>
                <span><i className="legend-mark mark-dark" />Example estimate&nbsp; 74%</span>
              </div>
            </div>
            <MetricBars
              label="Illustrative education goal model estimate increases from 68 percent to 74 percent"
              max={100}
              rows={[{ label: 'Prior estimate', value: 68, tone: 'mid' }, { label: 'Example estimate', value: 74, tone: 'dark' }]}
            />
          </TabsContent>
        </Tabs>
        <Separator className="evidence-separator" />
        <div className="evidence-caveat">
          <BookOpen size={16} aria-hidden="true" />
          <p>Illustrative scenario only. Source files for market performance, holdings, and goal assumptions were not attached.</p>
        </div>
      </CardContent>
    </Card>
  )
}

function App() {
  const [selectedStage, setSelectedStage] = useState(1)
  const activeStage = stages.find((stage) => stage.number === selectedStage) ?? stages[1]

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="page-width topbar-inner">
          <a className="brand-lockup" href="#top" aria-label="Fin9 by C3aLabs, back to top">
            <img src={fin9Logo} alt="Fin9" />
            <span className="brand-divider" />
            <span className="brand-name"><strong>Fin9</strong><small>by C3aLabs</small></span>
          </a>
          <nav className="top-nav" aria-label="Report sections">
            <a href="#journey">Experience</a>
            <a href="#orchestration">Workflow</a>
            <a href="#evidence">Evidence</a>
            <a href="#follow-through">Follow-through</a>
          </nav>
          <Badge variant="outline" className="review-badge">Stakeholder concept</Badge>
        </div>
      </header>

      <main id="top" className="page-width">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-rule" />THE AURA EXPERIENCE</div>
            <h1 id="hero-title">One sentence becomes a cited meeting brief.</h1>
            <p className="hero-deck">
              Aura prepares the work around Priya’s meeting, connects the evidence, and leaves the next action in her hands.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <a href="#journey">Explore the journey <ArrowRight size={16} aria-hidden="true" /></a>
              </Button>
              <a className="text-link" href="#orchestration">See how the work connects</a>
            </div>
            <div className="hero-meta">
              <span><strong>0–8</strong> experience stages</span>
              <span><strong>4</strong> parallel evidence passes</span>
              <span><strong>1</strong> advisor owns the decision</span>
            </div>
          </div>
          <figure className="hero-visual">
            <img src={priyaReady} alt="Illustrative grayscale scene of an advisor preparing a client meeting" />
            <figcaption>
              <span className="figure-index">01 / THE MOMENT</span>
              <span>Prepared before the meeting. In control throughout.</span>
            </figcaption>
          </figure>
        </section>

        <section className="intro-strip" aria-label="Experience summary">
          <div className="intro-strip-label"><span className="eyebrow">THE EXPERIENCE</span><span>From context to follow-through</span></div>
          <p>“Prepare me for tomorrow’s meeting with Mr. Sharma.”</p>
          <div className="intro-strip-end"><MessageCircle size={17} aria-hidden="true" /><span>One clear ask</span><ArrowRight size={15} aria-hidden="true" /><span>A complete, reviewable story</span></div>
        </section>

        <section id="journey" className="content-section journey-section" aria-labelledby="journey-heading">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="section-index">01</span>THE JOURNEY</div>
              <h2 id="journey-heading">Nine moments. One continuous experience.</h2>
            </div>
            <p>The supplied storyboard informs this sequence. Select any stage to see its purpose and output.</p>
          </div>

          <div className="journey-panel">
            <div className="journey-phase-head"><span>00—04</span><strong>Prepare the brief</strong><span className="phase-line" /><span>Context → parallel work</span></div>
            <StageTrack
              items={stages.slice(0, 5)}
              selected={selectedStage}
              onSelect={setSelectedStage}
              label="Stages zero through four: foundation, ask, acknowledgement, plan, and parallel execution"
            />
            <Separator className="journey-separator" />
            <div className="journey-phase-head"><span>05—08</span><strong>Deliver and continue</strong><span className="phase-line" /><span>Synthesis → next step</span></div>
            <StageTrack
              items={stages.slice(5)}
              selected={selectedStage}
              onSelect={setSelectedStage}
              label="Stages five through eight: compile, deliverable, meeting execution, and next step"
            />
          </div>

          <Card className="stage-detail-card" aria-live="polite">
            <div className="stage-detail-number">{String(activeStage.number).padStart(2, '0')}</div>
            <div className="stage-detail-body">
              <div className="stage-detail-label"><Badge variant="secondary">{activeStage.label}</Badge><span>Stage {activeStage.number}</span></div>
              <h3>{activeStage.title}</h3>
              <p>{activeStage.detail}</p>
              <div className="stage-output"><Check size={15} aria-hidden="true" /><span><strong>Visible outcome</strong>{activeStage.output}</span></div>
            </div>
            <div className="stage-detail-image"><img src={activeStage.number >= 7 ? clientMeeting : priyaReady} alt="" /></div>
          </Card>

          <div className="foundation-band">
            <div className="foundation-title"><Layers3 size={17} aria-hidden="true" /><span>Stage 0 inputs</span></div>
            <div><strong>Advisor profile</strong><span>Role, firm, preferred apps</span></div>
            <div><strong>Memory and lessons</strong><span>Prior context, as described in the brief</span></div>
            <div><strong>Connected records</strong><span>Portfolio, CRM, and documents</span></div>
          </div>
        </section>

        <section id="orchestration" className="content-section" aria-labelledby="orchestration-heading">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="section-index">02</span>THE OPERATING MODEL</div>
              <h2 id="orchestration-heading">Four evidence streams feed one connected brief.</h2>
            </div>
            <p>Parallel analysis stays separate until the findings are ready to inform advisor recommendations.</p>
          </div>

          <Card className="orchestration-card">
            <CardHeader className="diagram-title-row">
              <div><CardTitle>How the request becomes a cited report</CardTitle><CardDescription>Primary preparation path · sequence follows the supplied brief</CardDescription></div>
              <Badge variant="outline">Preparation path</Badge>
            </CardHeader>
            <CardContent>
              <div className="system-flow" role="group" aria-label="Advisor request and context flow to four parallel analyses, then recommendations and a cited meeting brief">
                <div className="flow-node context-node">
                  <div className="flow-icon"><UserRound size={17} aria-hidden="true" /></div>
                  <span className="flow-overline">SOURCE</span>
                  <strong>Priya’s request + context</strong>
                  <small>Profile · preferences · connected records</small>
                </div>
                <div className="flow-link"><span>PLAN</span><i /></div>
                <div className="parallel-zone">
                  <div className="parallel-heading"><div><span className="flow-overline">PARALLEL ANALYSIS</span><strong>Four evidence passes</strong></div><span>01—04</span></div>
                  <div className="specialist-list">
                    {specialists.map((specialist, index) => (
                      <div className="specialist-row" key={specialist.name}>
                        <span className="specialist-id">0{index + 1}</span>
                        <div><strong>{specialist.name}</strong><small>{specialist.description}</small></div>
                      </div>
                    ))}
                  </div>
                  <div className="parallel-note">Four analyses shown; the brief describes concurrency of up to five tasks. <a href="#sources">[5]</a></div>
                </div>
                <div className="flow-link"><span>SYNTHESIZE</span><i /></div>
                <div className="flow-output-column">
                  <div className="flow-node recommendation-node">
                    <div className="flow-icon"><BriefcaseBusiness size={17} aria-hidden="true" /></div>
                    <span className="flow-overline">AFTER EVIDENCE</span>
                    <strong>Advisor recommendations</strong>
                    <small>Prioritized discussion points</small>
                  </div>
                  <div className="flow-link vertical"><span>COMPILE</span><i /></div>
                  <div className="flow-node focal-node">
                    <div className="flow-icon"><FileText size={17} aria-hidden="true" /></div>
                    <span className="flow-overline">VISIBLE OUTPUT</span>
                    <strong>Cited meeting brief</strong>
                    <small>Verdict · evidence · sources</small>
                  </div>
                </div>
              </div>
              <div className="flow-footnote"><ShieldCheck size={16} aria-hidden="true" /><span>Meeting Execution is downstream: it begins after the conversation and uses advisor-reviewed drafts.</span></div>
            </CardContent>
          </Card>

          <div className="role-summary" aria-label="Six roles in the example plan">
            <div><span className="role-count">06</span><span><strong>Roles in the plan</strong><small>Four parallel analyses, then Advisor Recommendations and Meeting Execution</small></span></div>
            <a className="text-link" href="#follow-through">See the meeting handoff <ArrowRight size={14} aria-hidden="true" /></a>
          </div>
        </section>

        <section id="evidence" className="content-section evidence-section" aria-labelledby="evidence-heading">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="section-index">03</span>THE BRIEFING EVIDENCE</div>
              <h2 id="evidence-heading">The numbers become useful when their relationship is clear.</h2>
            </div>
            <p>Explore the three example signals the briefing connects. These values are illustrative, not client or live market records.</p>
          </div>
          <div className="evidence-layout">
            <EvidenceVisual />
            <aside className="evidence-aside">
              <div className="readout-label"><ChartColumn size={16} aria-hidden="true" />EXAMPLE READOUT</div>
              <h3>Lead with the goal and the exposure change.</h3>
              <p>The sample portfolio is slightly ahead of its benchmark. Financials concentration has increased. Confirm the goal assumptions before discussing whether an action is appropriate.</p>
              <div className="readout-points">
                <div><span>01</span><strong>Compare</strong><small>Portfolio vs benchmark</small></div>
                <div><span>02</span><strong>Explain</strong><small>Concentration change</small></div>
                <div><span>03</span><strong>Confirm</strong><small>Goal model assumptions</small></div>
              </div>
              <div className="aside-note"><BookOpen size={15} aria-hidden="true" /><span>Source entries <a href="#sources">[2] [3] [4]</a> refer to example values in the supplied brief.</span></div>
            </aside>
          </div>
        </section>

        <section id="follow-through" className="content-section follow-section" aria-labelledby="follow-heading">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="section-index">04</span>MEETING AND FOLLOW-THROUGH</div>
              <h2 id="follow-heading">The client conversation stays in the advisor’s hands.</h2>
            </div>
            <p>Meeting work happens after the real discussion. Proposed CRM and follow-up actions remain drafts for Priya.</p>
          </div>

          <div className="follow-layout">
            <Card className="follow-card">
              <CardHeader className="follow-card-heading">
                <div><CardTitle>After the meeting</CardTitle><CardDescription>Capture first. Draft next. Advisor decides.</CardDescription></div>
                <Badge variant="secondary">Sequential</Badge>
              </CardHeader>
              <CardContent>
                <ol className="follow-steps">
                  <li><span className="follow-step-number">01</span><div><strong>Client conversation</strong><small>The real meeting finishes before Meeting Execution begins.</small></div><CalendarDays size={17} aria-hidden="true" /></li>
                  <li><span className="follow-step-number">02</span><div><strong>Capture discussion</strong><small>Record the key points, decisions, and open questions.</small></div><MessageCircle size={17} aria-hidden="true" /></li>
                  <li><span className="follow-step-number">03</span><div><strong>Prepare draft updates</strong><small>CRM notes, follow-up email, and next-step tasks.</small></div><FileText size={17} aria-hidden="true" /></li>
                  <li className="review-step"><span className="follow-step-number">04</span><div><strong>Priya reviews and decides</strong><small>Approve, edit, or leave each proposed action in draft.</small></div><ShieldCheck size={17} aria-hidden="true" /></li>
                </ol>
              </CardContent>
            </Card>
            <figure className="meeting-image">
              <img src={clientMeeting} alt="Illustrative grayscale scene of an advisor and client in a meeting" />
              <figcaption><span>MEETING EXECUTION</span><span>Records the conversation; Priya owns the next action.</span></figcaption>
            </figure>
          </div>

          <div className="control-banner">
            <div className="control-icon"><ShieldCheck size={20} aria-hidden="true" /></div>
            <div><span className="eyebrow">VISIBLE CONTROL BOUNDARY</span><strong>No client message or CRM change is shown as automatically sent or saved.</strong></div>
            <Badge>Advisor review</Badge>
          </div>
        </section>

        <section id="sources" className="source-section" aria-labelledby="sources-heading">
          <div className="source-heading">
            <div><div className="eyebrow"><span className="section-index">05</span>CLAIM AND SOURCE NOTES</div><h2 id="sources-heading">What is evidence, and what still needs validation.</h2></div>
            <p>The story brief describes an intended experience. It does not independently verify live product behavior or sample financial results.</p>
          </div>
          <div className="source-grid">
            <div className="source-row"><span className="source-id">[1]</span><div><strong>Aura experience brief</strong><small>Source for the story sequence, client context, roles, control behavior, and scenario values.</small></div><Badge variant="outline">Source brief</Badge></div>
            <div className="source-row"><span className="source-id">[2]</span><div><strong>Portfolio +2.8% / benchmark +2.5%</strong><small>Example comparison only; no holdings or performance export was attached.</small></div><Badge variant="outline">Illustrative</Badge></div>
            <div className="source-row"><span className="source-id">[3]</span><div><strong>Financials concentration 31% / 24%</strong><small>Example current and prior values; no portfolio snapshot was attached.</small></div><Badge variant="outline">Illustrative</Badge></div>
            <div className="source-row"><span className="source-id">[4]</span><div><strong>Education goal estimate 68% → 74%</strong><small>Model assumptions and goal data need confirmation.</small></div><Badge variant="outline">Illustrative</Badge></div>
            <div className="source-row"><span className="source-id">[5]</span><div><strong>Concurrency, streaming, stop behavior</strong><small>Mechanics described in the brief; verify product status before presenting as live.</small></div><Badge variant="outline">Validate</Badge></div>
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <a className="brand-lockup footer-brand" href="#top" aria-label="Fin9 by C3aLabs, back to top"><img src={fin9Logo} alt="Fin9" /><span className="brand-divider" /><span className="brand-name"><strong>Fin9</strong><small>by C3aLabs</small></span></a>
        <span>Aura experience · internal stakeholder concept</span>
        <a href="#top" className="back-top">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default App
