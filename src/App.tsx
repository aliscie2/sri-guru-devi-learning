import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Check, CheckCircle2, ChevronLeft, ChevronRight, Clock3, Mail, Menu, Play, Search, X } from 'lucide-react';
import { courses, getCourse, type Course, type Lesson } from './courses';
import { STORAGE_KEY, parseProgress, visitLesson, completeLesson, completionPercent, type Progress } from './progress';

const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
const coursePath = (course: Course) => `#/learn/${course.id}`;
const lessonPath = (course: Course, id: string) => `${coursePath(course)}/${id}`;
const official = 'https://www.srigurudevifoundation.org';

function Brand() {
  return <a className="brand" href="#/" aria-label="Sri Gurudevi Foundation home"><img src={img('yantra.jpg')} alt="" width="40" height="40" /><span>Sri Gurudevi<span className="brand-sub">FOUNDATION</span></span></a>;
}
function ButtonLink({ href, children, secondary = false, external = false }: { href: string; children: React.ReactNode; secondary?: boolean; external?: boolean }) {
  return <a className={`button ${secondary ? 'button-secondary' : ''}`} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}{external ? <ArrowUpRight size={18} /> : <ArrowRight size={18} />}</a>;
}
export default function App() {
  const [route, setRoute] = useState(location.hash.slice(1) || '/');
  const [menu, setMenu] = useState(false);
  const [progress, setProgress] = useState<Progress>(() => { try { return parseProgress(localStorage.getItem(STORAGE_KEY)); } catch { return {}; } });
  const [storageError, setStorageError] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const navigate = () => { setRoute(location.hash.slice(1) || '/'); setMenu(false); window.scrollTo(0, 0); requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true })); };
    const sync = (e: StorageEvent) => { if (e.key === STORAGE_KEY) setProgress(parseProgress(e.newValue)); };
    window.addEventListener('hashchange', navigate); window.addEventListener('storage', sync);
    return () => { window.removeEventListener('hashchange', navigate); window.removeEventListener('storage', sync); };
  }, []);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); setStorageError(false); } catch { setStorageError(true); } }, [progress]);
  const [, page, courseId, lessonId] = route.split('/');
  const course = getCourse(courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  useEffect(() => {
    if (course && lesson) setProgress(p => visitLesson(p, course.id, lesson.id));
  }, [course?.id, lesson?.id]);
  useEffect(() => {
    const title = lesson?.title || course?.title || ({ learn: 'Course catalogue', about: 'Who is Swami?', 'my-learning': 'My learning', contact: 'Contact', privacy: 'Privacy', account: 'Student registration' } as Record<string, string>)[page] || 'Online Learning Platform';
    document.title = `${title} · Sri Gurudevi Foundation`;
  }, [route]);
  const active = page === 'learn' ? 'learn' : page;
  let content: React.ReactNode;
  if (!page) content = <Home />;
  else if (page === 'learn' && !courseId) content = <Catalogue />;
  else if (page === 'learn' && course && !lessonId) content = <CourseDetail course={course} progress={progress} />;
  else if (page === 'learn' && course && lesson) content = <LessonView key={`${course.id}/${lesson.id}`} course={course} lesson={lesson} progress={progress} onComplete={() => setProgress(p => completeLesson(p, course.id, lesson.id))} />;
  else if (page === 'my-learning') content = <Dashboard progress={progress} />;
  else if (page === 'about') content = <About />;
  else if (page === 'contact') content = <Contact />;
  else if (page === 'privacy') content = <Privacy />;
  else if (page === 'account') content = <Account />;
  else content = <section className="container narrow page-section"><h1>Page not found</h1><ButtonLink href="#/learn">Course catalogue</ButtonLink></section>;
  return <div className={`site-shell${!page ? ' is-home' : ''}`}>
    <a className="skip-link" href="#main" onClick={e => { e.preventDefault(); mainRef.current?.focus(); }}>Skip to content</a>
    <header className="site-header"><div className="container header-inner"><Brand /><nav aria-label="Main navigation" className="desktop-nav"><a className={active === 'learn' ? 'active' : ''} href="#/learn" aria-current={active === 'learn' ? 'page' : undefined}>Learn</a><a className={active === 'about' ? 'active' : ''} href="#/about" aria-current={active === 'about' ? 'page' : undefined}>About</a><a className={`nav-learning ${active === 'my-learning' ? 'active' : ''}`} href="#/my-learning" aria-current={active === 'my-learning' ? 'page' : undefined}>My learning</a></nav><button className="menu-toggle icon-button" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button></div>{menu && <nav id="mobile-nav" aria-label="Mobile navigation"><a href="#/learn">Learn</a><a href="#/about">About</a><a href="#/my-learning">My learning</a></nav>}</header>
    {storageError && <div role="status" className="storage-notice">Your browser can’t save progress right now. You can still read every lesson.</div>}
    <main id="main" tabIndex={-1} ref={mainRef}>{content}</main>
    <footer><div className="container footer-main"><Brand /><p>Online Learning Platform</p><nav aria-label="Footer navigation"><a href="#/contact">Contact</a><a href="#/privacy">Privacy</a><a href={official} target="_blank" rel="noopener noreferrer">Foundation website <ArrowUpRight size={14} /></a></nav></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Sri Gurudevi Foundation</span><span>Learning platform preview</span></div></footer>
  </div>;
}
function Home() {
  return <>
    <section className="home-hero" aria-labelledby="home-title">
      <img className="home-landscape" src={img('stillness-dawn.jpg')} alt="" width="1717" height="916" fetchPriority="high" />
      <div className="container home-hero-content">
        <h1 id="home-title">Walk With<br /><em>Sri Swami Sai Krsna</em></h1>
        <p>Advaita Kshama is the way.</p>
        <ButtonLink href="#/learn">Browse available courses</ButtonLink>
      </div>
    </section>
    <section className="home-learning" aria-labelledby="home-learning-title">
      <div className="container home-index">
        <h2 id="home-learning-title">Course<br />{' '}catalogue</h2>
        {courses.map((course, index) => <a className="home-index-item" key={course.id} href={coursePath(course)}>
          <span className="index-number" aria-hidden="true">0{index + 1}</span>
          <h3>{course.title}</h3>
          <p>{course.externalUrl ? 'Online course · Free' : 'Website excerpts'}</p>
        </a>)}
      </div>
    </section>
    <section className="container about-strip">
      <div><p className="eyebrow">THE SRI GURUDEVI FOUNDATION</p><h2>Who is Swami?</h2></div>
      <div><p>Sri Swami Sai Krsna</p><a className="text-link" href="#/about">Learn More About Swami <ArrowRight size={18} /></a></div>
    </section>
  </>;
}
function CourseCard({ course }: { course: Course }) {
  return <a href={coursePath(course)} className={`course-card card-${course.id}`}>
    <div className="course-image"><img src={img(course.image)} alt={course.imageAlt} loading="lazy" width="600" height="450" /></div>
    <div className="course-card-body"><p className="course-kind">{course.label}</p><div className="course-title"><h3>{course.title}</h3><ArrowRight size={20} aria-hidden="true" /></div><p className="course-duration">{course.duration}</p></div>
  </a>;
}
function Catalogue() {
  const [query, setQuery] = useState('');
  const results = courses.filter(c => `${c.title} ${c.category} ${c.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <section className="container page-section"><p className="eyebrow">ONLINE LEARNING PLATFORM</p><h1>Course catalogue</h1><p className="page-intro">Browse available courses.</p><div className="catalogue-tools"><label className="search-box"><Search size={19} /><span className="sr-only">Search learning library</span><input type="search" placeholder="Find a course or practice" value={query} onChange={e => setQuery(e.target.value)} /></label><p role="status">{results.length} {results.length === 1 ? 'offering' : 'offerings'}</p></div>{results.length ? <div className="course-grid">{results.map(c => <CourseCard key={c.id} course={c} />)}</div> : <div className="empty-state"><Search size={30} /><h2>No matches yet.</h2><p>Try “breath”, “forgiveness”, or “Song of Life”.</p><button className="text-link" onClick={() => setQuery('')}>Show all learning <ArrowRight size={17} /></button></div>}<p className="preview-note">Practice readings are excerpts from the foundation’s website. They are not a course syllabus.</p></section>;
}
function CourseDetail({ course, progress }: { course: Course; progress: Progress }) {
  const percent = completionPercent(progress, course.id);
  const resume = progress[course.id]?.lastLesson || course.lessons[0]?.id;
  return <section className="container page-section"><a className="back-link" href="#/learn"><ChevronLeft size={16} /> Course catalogue</a><div className="course-detail"><div><p className="eyebrow">{course.label} · {course.category}</p><h1>{course.title}</h1><p className="page-intro">{course.description}</p><p className="detail-meta"><BookOpen size={18} /> {course.duration}</p>{course.externalUrl ? <><ButtonLink href={course.externalUrl} external>Open the free course</ButtonLink><p className="small-copy">Opens on Teachable, the foundation’s current course platform. Registration and course progress are managed there.</p></> : <><ButtonLink href={lessonPath(course, resume)}>{progress[course.id] ? 'Continue reading' : 'Start reading'}</ButtonLink><p className="small-copy">No account needed. Progress stays on this browser.</p>{progress[course.id] && <ProgressBar percent={percent} />}</>}</div><div className={`detail-image detail-${course.id}`}><img src={img(course.image)} alt={course.imageAlt} width="600" height="450" /></div></div>{course.lessons.length > 0 && <div className="curriculum"><div><p className="eyebrow">SRI GURUDEVI PRACTICES</p><h2>Website excerpts</h2></div><ol className="lesson-list">{course.lessons.map((l, i) => <li key={l.id}><a href={lessonPath(course, l.id)}><span className={`lesson-number ${progress[course.id]?.completed[l.id] ? 'is-complete' : ''}`}>{progress[course.id]?.completed[l.id] ? <Check size={18} /> : `0${i + 1}`}</span><span><strong>{l.title}</strong><small>{l.minutes} min read</small></span><ChevronRight size={19} /></a></li>)}</ol></div>}<p className="source-note">{course.externalUrl ? 'Course information' : 'Excerpts from Sri Gurudevi Practices'}. <a href={course.sourceUrl} target="_blank" rel="noopener noreferrer">Read the original <ArrowUpRight size={13} /></a></p></section>;
}
function ProgressBar({ percent }: { percent: number }) {
  return <div className="progress-block"><div><span>Your progress</span><strong>{percent}%</strong></div><div role="progressbar" aria-label="Course completion" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} className="progress-track"><span style={{ width: `${percent}%` }} /></div></div>;
}
function LessonView({ course, lesson, progress, onComplete }: { course: Course; lesson: Lesson; progress: Progress; onComplete: () => void }) {
  const [loadVideo, setLoadVideo] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const markComplete = () => { onComplete(); requestAnimationFrame(() => actionsRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()); };
  const index = course.lessons.findIndex(l => l.id === lesson.id);
  const done = !!progress[course.id]?.completed[lesson.id];
  const next = course.lessons[index + 1];
  const percent = completionPercent(progress, course.id);
  return <div className="container page-section lesson-layout"><aside className="lesson-sidebar"><a className="back-link" href={coursePath(course)}><ChevronLeft size={16} /> Overview</a><p className="eyebrow">SRI GURUDEVI PRACTICES</p><h2>{course.title}</h2><ProgressBar percent={percent} /><nav aria-label="Lessons"><ol>{course.lessons.map((l, i) => <li key={l.id}><a href={lessonPath(course, l.id)} className={l.id === lesson.id ? 'selected' : ''} aria-current={l.id === lesson.id ? 'step' : undefined}><span>{progress[course.id]?.completed[l.id] ? <CheckCircle2 size={18} /> : `0${i + 1}`}</span>{l.title}</a></li>)}</ol></nav><p className="small-copy">Saved on this browser.</p></aside><article className="lesson-content"><p className="eyebrow">LESSON {index + 1} OF {course.lessons.length} <span className="reading-time"><Clock3 size={14} /> {lesson.minutes} MIN READ</span></p><h1>{lesson.title}</h1>{lesson.youtubeId && <div className="video-player">{loadVideo ? <iframe title={lesson.title} src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(lesson.youtubeId)}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <button onClick={() => setLoadVideo(true)}><Play size={32} /><span>Load lesson video</span><small>Connects to YouTube</small></button>}</div>}<div className="lesson-reading">{lesson.paragraphs.map(p => <p key={p}>{p}</p>)}</div><div className="lesson-actions" ref={actionsRef}>{!done ? <button className="button" onClick={markComplete}>Mark as complete <Check size={18} /></button> : <><p className="completed-message" role="status"><CheckCircle2 size={19} /> Lesson complete</p>{next ? <ButtonLink href={lessonPath(course, next.id)}>Next lesson</ButtonLink> : <ButtonLink href="#/my-learning">Back to my learning</ButtonLink>}</>}</div><p className="source-note">Excerpt from Sri Gurudevi Practices. <a href={course.sourceUrl} target="_blank" rel="noopener noreferrer">Original teaching <ArrowUpRight size={13} /></a></p></article></div>;
}
function Dashboard({ progress }: { progress: Progress }) {
  const started = courses.filter(c => progress[c.id]);
  return <section className="container page-section dashboard"><p className="eyebrow">STUDENT DASHBOARD</p><h1>My learning</h1><p className="page-intro">Resume where you left off.</p>{started.length ? <div className="learning-list">{started.map(c => <article className="learning-row" key={c.id}><img src={img(c.image)} alt="" width="160" height="120" /><div><p className="category">{completionPercent(progress, c.id) === 100 ? 'Completed' : 'In progress'}</p><h2>{c.title}</h2><ProgressBar percent={completionPercent(progress, c.id)} /></div><a href={lessonPath(c, progress[c.id].lastLesson)} className="button button-secondary">{completionPercent(progress, c.id) === 100 ? 'Revisit' : 'Continue'}<ArrowRight size={17} /></a></article>)}</div> : <div className="empty-state"><BookOpen size={34} /><h2>Browse available courses.</h2><ButtonLink href="#/learn">Course catalogue</ButtonLink></div>}<div className="dashboard-note"><span>Progress is saved on this browser. No account needed.</span><a className="text-link" href="#/account">About accounts <ArrowRight size={15} /></a></div></section>;
}
function About() {
  return <section className="container page-section"><div className="about-page"><div><p className="eyebrow">THE SRI GURUDEVI FOUNDATION</p><h1>Who is Swami?</h1><p className="page-intro">Sri Swami Sai Krsna</p><p>Swami Sri Guru Brahmananda Nirvananath, Sri Swami Sai Krsna but simply called, “Swami”, is a direct disciple of Sri Guru Mahavatar Babaji and part of the Shiva Yoga Sampradaya (Tradition).</p><a className="text-link" href={`${official}/swami`} target="_blank" rel="noopener noreferrer">Learn More About Swami <ArrowUpRight size={18} /></a></div><img src={img('swami.jpg')} alt="Sri Swami Sai Krsna walking alongside a devotee" width="1000" height="1112" /></div><div className="about-details"><h2>Sri Gurudevi Practices</h2><div className="accordion"><details><summary>Kshama Kriya &amp; Shivanapanasati <span>+</span></summary><p>The Act of Forgiving (Kshama) + Breath Awareness (Shivanapanasati) = Kshama Kriya.</p><a className="text-link" href={`${official}/practices`} target="_blank" rel="noopener noreferrer">Practices <ArrowUpRight size={16} /></a></details><details><summary>Works of Swami <span>+</span></summary><a className="text-link" href={`${official}/media`} target="_blank" rel="noopener noreferrer">Works of Swami <ArrowUpRight size={16} /></a></details><details><summary>Upcoming Programs and Events <span>+</span></summary><a className="text-link" href={`${official}/events`} target="_blank" rel="noopener noreferrer">Upcoming Programs and Events <ArrowUpRight size={16} /></a></details></div></div></section>;
}
function Contact() {
  return <section className="container narrow page-section contact-page"><p className="eyebrow">THE SRI GURUDEVI FOUNDATION</p><h1>Contact Us</h1><p className="page-intro">Questions, Comments, Concerns?</p><a className="contact-email" href="mailto:srigurudevifoundation@gmail.com"><Mail size={21} /><span>srigurudevifoundation@gmail.com</span><ArrowUpRight size={18} /></a><p className="small-copy"><a href="tel:+15105098557">+1 (510) 509-8557</a></p></section>;
}
function Privacy() {
  return <section className="container narrow page-section"><p className="eyebrow">ONLINE LEARNING PLATFORM</p><h1>Privacy</h1><div className="prose"><h2>Your learning progress</h2><p>This preview stores lesson completion and your last visited lesson in your browser’s local storage. It does not send that progress to a server. Clearing this website’s stored data removes it.</p><h2>No account required</h2><p>This preview does not collect names, email addresses, or passwords. There are no analytics trackers or advertising cookies added by this site.</p><h2>External services</h2><p>The official course opens on Teachable. Foundation links and email links open their respective services, which have their own privacy policies. Video lessons, when available, connect to YouTube only after you choose to load them.</p><h2>Questions</h2><p><a href="#/contact">Contact Us</a></p></div></section>;
}
function Account() {
  return <section className="container narrow page-section"><p className="eyebrow">ONLINE LEARNING PLATFORM</p><h1>Student registration</h1><p className="page-intro">Registration is not available in this preview. Progress is saved on this browser.</p><div className="quiet-panel"><h2>Student accounts</h2><p>Cross-device progress, email verification, and password reset are not available in this preview. The official Song of Life course has its own registration on Teachable.</p></div><ButtonLink href="#/learn">Course catalogue</ButtonLink></section>;
}

