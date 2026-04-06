import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  Sun, Moon, LogOut, Dumbbell, Video, Plus, UserMinus, Upload,
  X, Film, Zap, ChevronRight, Users, Search, Check, LayoutDashboard,
} from 'lucide-react';
import { API_BASE_URL } from '../config/api';

type Athlete = { uid: string; firstname: string; email: string };
type VideoItem = { id: string; name: string };
type Exercise = { eid: string; name: string; duration_minutes?: number };
type Tab = 'overview' | 'athletes' | 'exercises' | 'videos';
type ModalType = 'exercise' | 'videoUpload' | 'videoAssign' | 'kick' | null;

function Spinner() {
  return (
    <div className="w-10 h-10 rounded-full border-4 border-[#F97316]/20 border-t-[#F97316] animate-[spin_0.8s_linear_infinite]" />
  );
}

function Modal({ visible, onClose, children }: {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}) {
  if (!visible) return null;
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-200 px-0 sm:px-4"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full sm:max-w-md">
        {children}
      </div>
    </div>
  );
}

const modalCard = 'bg-white dark:bg-[#1E293B] rounded-t-2xl sm:rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-xl';
const primaryBtn = 'inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-500 text-white font-semibold py-2.5 px-5 rounded-xl border-0 cursor-pointer transition-colors text-sm';
const ghostBtn = 'inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-[#1E3A8A] dark:text-white font-semibold py-2.5 px-5 rounded-xl border-0 cursor-pointer transition-colors text-sm';

const LEVEL_COLORS: Record<string, string> = {
  Profi: 'bg-[#F97316]/10 text-[#F97316]',
  Fortgeschritten: 'bg-blue-50 dark:bg-blue-500/10 text-blue-500',
  Anfänger: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
};

function getLevel(email: string) {
  const parts = email.split(' • ');
  return parts.length === 2 ? { level: parts[0], name: parts[1] } : { level: '', name: email };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [athleteSearch, setAthleteSearch] = useState('');

  const [athletes] = useState<Athlete[]>([
    { uid: '1', firstname: 'Max', email: 'Profi • Mustermann' },
    { uid: '2', firstname: 'Anna', email: 'Fortgeschritten • Schmidt' },
    { uid: '3', firstname: 'Lukas', email: 'Anfänger • Weber' },
  ]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([{ id: 'v1', name: 'Basic Dribbling Tutorial.mp4' }]);
  const [isLoading, setIsLoading] = useState(true);
  const [athleteList, setAthleteList] = useState(athletes);

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedAthleteIds, setSelectedAthleteIds] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('trainerToken');
    if (!token) { navigate('/login', { replace: true }); return; }
    fetchExercises(token);
  }, []);

  const fetchExercises = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/exercises?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setExercises(data?.exercises || []);
    } catch (error) {
      console.error('Fehler:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => { localStorage.clear(); navigate('/login', { replace: true }); };

  const confirmKick = () => {
    if (!selectedAthlete) return;
    setAthleteList(athleteList.filter((a) => a.uid !== selectedAthlete.uid));
    setActiveModal(null);
  };

  const pickFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/mp4,video/webm,video/avi';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files?.[0]) setSelectedFile(target.files[0]);
    };
    input.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert('Wähle ein Video aus!');
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      await fetch(`${API_BASE_URL}/media`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('trainerToken')}` },
        body: formData,
      });
    } catch { /* continue */ } finally {
      setVideos([{ id: Math.random().toString(), name: selectedFile.name }, ...videos]);
      setIsUploading(false);
      setSelectedFile(null);
      setActiveModal(null);
    }
  };

  const toggleAthleteSelection = (uid: string) => {
    setSelectedAthleteIds((prev) =>
      prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
    );
  };

  const filteredAthletes = athleteList.filter((a) =>
    a.firstname.toLowerCase().includes(athleteSearch.toLowerCase()) ||
    a.email.toLowerCase().includes(athleteSearch.toLowerCase())
  );

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Übersicht', icon: LayoutDashboard },
    { id: 'athletes', label: 'Athleten', icon: Users },
    { id: 'exercises', label: 'Übungen', icon: Dumbbell },
    { id: 'videos', label: 'Videos', icon: Film },
  ];

  if (isLoading) {
    return (
      <div className="bg-[#f8fafc] dark:bg-[#0F172A] min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] dark:bg-[#0F172A] min-h-screen flex flex-col">

      {/* Dashboard Topbar */}
      <div className="bg-white dark:bg-[#1E293B] border-b border-slate-100 dark:border-slate-700 h-14 flex items-center justify-between px-5 md:px-8 sticky top-16 z-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#F97316]/10 flex items-center justify-center">
            <Dumbbell size={14} className="text-[#F97316]" />
          </div>
          <span className="text-sm font-semibold text-[#1E3A8A] dark:text-white">Trainer Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border-0 cursor-pointer text-[#64748b] dark:text-slate-400 transition-colors"
          >
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 font-semibold text-xs px-3 py-2 rounded-lg border-0 cursor-pointer transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-[#1E293B] border-b border-slate-100 dark:border-slate-700 sticky top-30 z-40">
        <div className="max-w-275 mx-auto px-5 md:px-10 flex gap-1 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-semibold border-0 cursor-pointer transition-colors whitespace-nowrap border-b-2 -mb-px bg-transparent ${
                activeTab === id
                  ? 'text-[#F97316] border-[#F97316]'
                  : 'text-[#64748b] dark:text-[#94A3B8] border-transparent hover:text-[#1E3A8A] dark:hover:text-white'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-275 mx-auto w-full px-5 md:px-10 py-8 flex flex-col gap-6">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            <div>
              <h1 className="text-2xl font-bold text-[#1E3A8A] dark:text-white mb-1">Willkommen zurück</h1>
              <p className="text-sm text-[#64748b] dark:text-[#94A3B8]">
                Hier ist eine Übersicht über dein Team und deine Inhalte.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Users, value: athleteList.length, label: 'Athleten', tab: 'athletes' as Tab, color: 'text-[#1E3A8A] dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
                { icon: Dumbbell, value: exercises.length, label: 'Übungen', tab: 'exercises' as Tab, color: 'text-[#F97316]', bg: 'bg-[#F97316]/10' },
                { icon: Film, value: videos.length, label: 'Videos', tab: 'videos' as Tab, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
              ].map(({ icon: Icon, value, label, tab, color, bg }) => (
                <button
                  key={label}
                  onClick={() => setActiveTab(tab)}
                  className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 p-5 flex flex-col gap-3 text-left hover:border-slate-200 dark:hover:border-slate-600 transition-colors cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon size={16} className={color} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#1E3A8A] dark:text-white">{value}</p>
                    <p className="text-xs text-[#64748b] dark:text-[#94A3B8] mt-0.5">{label}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <p className="text-xs font-semibold text-[#64748b] dark:text-[#94A3B8] uppercase tracking-wider mb-3">Schnellzugriff</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 p-4 flex items-center gap-4 text-left hover:border-[#F97316]/30 dark:hover:border-[#F97316]/30 transition-colors cursor-pointer group"
                  onClick={() => setActiveModal('videoUpload')}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
                    <Film size={18} className="text-[#F97316]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1E3A8A] dark:text-white">Video hochladen</p>
                    <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">{videos.length} Videos in der Bibliothek</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-[#F97316] transition-colors" />
                </button>
                <button
                  className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 p-4 flex items-center gap-4 text-left hover:border-[#F97316]/30 dark:hover:border-[#F97316]/30 transition-colors cursor-pointer group"
                  onClick={() => setActiveTab('athletes')}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Users size={18} className="text-[#1E3A8A] dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1E3A8A] dark:text-white">Athleten verwalten</p>
                    <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">{athleteList.length} aktive Athleten</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-[#F97316] transition-colors" />
                </button>
              </div>
            </div>

            {/* Recent Athletes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-[#64748b] dark:text-[#94A3B8] uppercase tracking-wider">Athleten</p>
                <button
                  className="text-xs text-[#F97316] font-semibold bg-transparent border-0 cursor-pointer hover:underline"
                  onClick={() => setActiveTab('athletes')}
                >
                  Alle anzeigen
                </button>
              </div>
              <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                {athleteList.slice(0, 3).map((athlete, i) => {
                  const { level, name } = getLevel(athlete.email);
                  return (
                    <div
                      key={athlete.uid}
                      className={`flex items-center gap-4 px-5 py-3.5 ${i !== Math.min(2, athleteList.length - 1) ? 'border-b border-slate-100 dark:border-slate-700' : ''}`}
                    >
                      <div className="w-9 h-9 rounded-full bg-[#F97316] flex items-center justify-center shrink-0">
                        <span className="text-white text-sm font-bold">{athlete.firstname[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1E3A8A] dark:text-white">{athlete.firstname} {name}</p>
                        {level && (
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${LEVEL_COLORS[level] ?? 'bg-slate-100 dark:bg-slate-700 text-[#64748b]'}`}>
                            {level}
                          </span>
                        )}
                      </div>
                      <button
                        className="p-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg border-0 cursor-pointer transition-colors"
                        onClick={() => { setSelectedAthlete(athlete); setActiveModal('exercise'); }}
                        title="Übung zuweisen"
                      >
                        <Plus size={14} className="text-[#1E3A8A] dark:text-white" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ATHLETES TAB */}
        {activeTab === 'athletes' && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1E3A8A] dark:text-white">Athleten</h2>
                <p className="text-sm text-[#64748b] dark:text-[#94A3B8] mt-0.5">{athleteList.length} Athleten in deinem Team</p>
              </div>
            </div>

            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Athleten suchen…"
                value={athleteSearch}
                onChange={(e) => setAthleteSearch(e.target.value)}
                className="w-full bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#1E3A8A] dark:text-white placeholder:text-slate-400 outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 transition-colors"
              />
            </div>

            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
              {filteredAthletes.length === 0 ? (
                <div className="py-12 text-center">
                  <Users size={28} className="text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-[#64748b] dark:text-[#94A3B8]">Keine Athleten gefunden</p>
                </div>
              ) : filteredAthletes.map((athlete, i) => {
                const { level, name } = getLevel(athlete.email);
                return (
                  <div
                    key={athlete.uid}
                    className={`flex items-center gap-4 px-5 py-4 ${i !== filteredAthletes.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F97316] flex items-center justify-center shrink-0">
                      <span className="text-white text-sm font-bold">{athlete.firstname[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1E3A8A] dark:text-white">{athlete.firstname} {name}</p>
                      {level && (
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-0.5 ${LEVEL_COLORS[level] ?? 'bg-slate-100 dark:bg-slate-700 text-[#64748b]'}`}>
                          {level}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-[#1E3A8A] dark:text-white text-xs font-semibold px-3 py-2 rounded-lg border-0 cursor-pointer transition-colors"
                        onClick={() => { setSelectedAthlete(athlete); setActiveModal('exercise'); }}
                      >
                        <Plus size={13} />
                        <span className="hidden sm:inline">Übung</span>
                      </button>
                      <button
                        className="p-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg border-0 cursor-pointer transition-colors"
                        onClick={() => { setSelectedAthlete(athlete); setActiveModal('kick'); }}
                        title="Athlet entfernen"
                      >
                        <UserMinus size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* EXERCISES TAB */}
        {activeTab === 'exercises' && (
          <>
            <div>
              <h2 className="text-2xl font-bold text-[#1E3A8A] dark:text-white">Übungen</h2>
              <p className="text-sm text-[#64748b] dark:text-[#94A3B8] mt-0.5">{exercises.length} Übungen verfügbar</p>
            </div>

            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
              {exercises.length === 0 ? (
                <div className="py-12 text-center">
                  <Dumbbell size={28} className="text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-[#64748b] dark:text-[#94A3B8]">Keine Übungen gefunden</p>
                </div>
              ) : exercises.map((exercise, i) => (
                <div
                  key={exercise.eid}
                  className={`flex items-center gap-4 px-5 py-4 ${i !== exercises.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
                    <Zap size={15} className="text-[#F97316]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1E3A8A] dark:text-white">{exercise.name}</p>
                    {exercise.duration_minutes && (
                      <p className="text-xs text-[#64748b] dark:text-[#94A3B8] mt-0.5">{exercise.duration_minutes} Min.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1E3A8A] dark:text-white">Videos</h2>
                <p className="text-sm text-[#64748b] dark:text-[#94A3B8] mt-0.5">{videos.length} Videos in deiner Bibliothek</p>
              </div>
              <button className={primaryBtn} onClick={() => setActiveModal('videoUpload')}>
                <Upload size={14} />
                <span className="hidden sm:inline">Hochladen</span>
              </button>
            </div>

            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
              {videos.length === 0 ? (
                <div className="py-12 text-center">
                  <Film size={28} className="text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-[#64748b] dark:text-[#94A3B8]">Noch keine Videos hochgeladen</p>
                </div>
              ) : videos.map((video, i) => (
                <button
                  key={video.id}
                  className={`flex items-center gap-4 px-5 py-4 w-full text-left bg-transparent border-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${i !== videos.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''}`}
                  onClick={() => { setSelectedVideo(video); setSelectedAthleteIds([]); setActiveModal('videoAssign'); }}
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Video size={15} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium text-[#1E3A8A] dark:text-white flex-1 truncate">{video.name}</span>
                  <ChevronRight size={15} className="text-slate-400 shrink-0" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MODAL: Exercise */}
      <Modal visible={activeModal === 'exercise'} onClose={() => setActiveModal(null)}>
        <div className={modalCard}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-base font-bold text-[#1E3A8A] dark:text-white">Übung zuweisen</p>
              <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">für {selectedAthlete?.firstname}</p>
            </div>
            <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 border-0 cursor-pointer" onClick={() => setActiveModal(null)}>
              <X size={14} className="text-[#64748b] dark:text-slate-400" />
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
            {exercises.length === 0 ? (
              <p className="text-sm text-[#64748b] dark:text-[#94A3B8] py-4 text-center">Keine Übungen gefunden.</p>
            ) : exercises.map((exercise) => (
              <button
                key={exercise.eid}
                className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl p-3 border border-slate-100 dark:border-slate-700 cursor-pointer text-left w-full transition-colors"
                onClick={() => { alert('Übung zugewiesen!'); setActiveModal(null); }}
              >
                <Zap size={14} className="text-[#F97316] shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#1E3A8A] dark:text-white">{exercise.name}</p>
                  <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">
                    {exercise.duration_minutes ? `${exercise.duration_minutes} Min.` : 'Tippen zum Auswählen'}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <button className={`${ghostBtn} w-full mt-4`} onClick={() => setActiveModal(null)}>Abbrechen</button>
        </div>
      </Modal>

      {/* MODAL: Video Upload */}
      <Modal visible={activeModal === 'videoUpload'} onClose={() => setActiveModal(null)}>
        <div className={modalCard}>
          <div className="flex items-center justify-between mb-5">
            <p className="text-base font-bold text-[#1E3A8A] dark:text-white">Video hochladen</p>
            <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 border-0 cursor-pointer" onClick={() => setActiveModal(null)}>
              <X size={14} className="text-[#64748b] dark:text-slate-400" />
            </button>
          </div>
          <button
            className="w-full border-2 border-dashed border-slate-200 dark:border-slate-600 hover:border-[#F97316] dark:hover:border-[#F97316] rounded-xl p-8 cursor-pointer bg-transparent transition-colors flex flex-col items-center gap-2"
            onClick={pickFile}
          >
            <Upload size={22} className={selectedFile ? 'text-[#F97316]' : 'text-slate-400'} />
            <span className="text-sm font-medium text-[#64748b] dark:text-[#94A3B8]">
              {selectedFile ? selectedFile.name : 'Datei auswählen (MP4, AVI…)'}
            </span>
          </button>
          <div className="flex gap-3 mt-4">
            <button className={`${ghostBtn} flex-1`} onClick={() => setActiveModal(null)}>Abbrechen</button>
            <button
              className={`${primaryBtn} flex-1 ${isUploading ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading
                ? <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-[spin_0.8s_linear_infinite]" />
                : 'Hochladen'}
            </button>
          </div>
        </div>
      </Modal>

      {/* MODAL: Video Assign */}
      <Modal visible={activeModal === 'videoAssign'} onClose={() => setActiveModal(null)}>
        <div className={modalCard}>
          <div className="flex items-center justify-between mb-1">
            <p className="text-base font-bold text-[#1E3A8A] dark:text-white">Video verteilen</p>
            <button className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 border-0 cursor-pointer" onClick={() => setActiveModal(null)}>
              <X size={14} className="text-[#64748b] dark:text-slate-400" />
            </button>
          </div>
          <p className="text-xs text-[#F97316] font-medium mb-4 truncate">{selectedVideo?.name}</p>
          <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
            {athleteList.map((athlete) => {
              const isSelected = selectedAthleteIds.includes(athlete.uid);
              return (
                <button
                  key={athlete.uid}
                  className={`flex items-center gap-3 rounded-xl p-3 border cursor-pointer text-left w-full transition-colors ${isSelected ? 'bg-[#F97316]/10 border-[#F97316]/30' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                  onClick={() => toggleAthleteSelection(athlete.uid)}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-[#F97316] border-[#F97316]' : 'border-slate-300 dark:border-slate-600'}`}>
                    {isSelected && <Check size={11} className="text-white" strokeWidth={3} />}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">{athlete.firstname[0]}</span>
                  </div>
                  <span className={`text-sm font-medium ${isSelected ? 'text-[#F97316]' : 'text-[#1E3A8A] dark:text-white'}`}>
                    {athlete.firstname}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex gap-3 mt-4">
            <button className={`${ghostBtn} flex-1`} onClick={() => setActiveModal(null)}>Abbrechen</button>
            <button
              className={`${primaryBtn} flex-1`}
              onClick={() => {
                if (selectedAthleteIds.length === 0) return alert('Bitte Athleten auswählen!');
                alert('Video gesendet!');
                setSelectedAthleteIds([]);
                setActiveModal(null);
              }}
            >
              Senden
            </button>
          </div>
        </div>
      </Modal>

      {/* MODAL: Kick */}
      <Modal visible={activeModal === 'kick'} onClose={() => setActiveModal(null)}>
        <div className={modalCard}>
          <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
            <UserMinus size={20} className="text-red-500" />
          </div>
          <p className="text-base font-bold text-[#1E3A8A] dark:text-white mb-1">Athlet entfernen</p>
          <p className="text-sm text-[#64748b] dark:text-[#94A3B8] mb-6">
            Bist du sicher, dass du{' '}
            <span className="font-semibold text-[#1E3A8A] dark:text-white">{selectedAthlete?.firstname}</span>{' '}
            aus deinem Team entfernen möchtest?
          </p>
          <div className="flex gap-3">
            <button className={`${ghostBtn} flex-1`} onClick={() => setActiveModal(null)}>Abbrechen</button>
            <button
              className="flex-1 inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-5 rounded-xl border-0 cursor-pointer transition-colors text-sm"
              onClick={confirmKick}
            >
              Ja, entfernen
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
