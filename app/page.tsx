'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Disc3,
  FolderOpen,
  Heart,
  Home,
  ListMusic,
  Menu,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  Volume2,
  X,
  Loader2,
} from 'lucide-react'

interface Track {
  id?: string
  title: string
  artist: string
  time: string
  color: string
  tag: string
  url?: string
}

const initialTracks: Track[] = [
  { title: 'Midnight City', artist: 'M83', time: '4:03', color: 'from-fuchsia-500 via-purple-500 to-indigo-700', tag: 'Synthwave' },
  { title: 'Sunset Lover', artist: 'Petit Biscuit', time: '3:58', color: 'from-orange-400 via-pink-500 to-violet-600', tag: 'Electronic' },
  { title: 'Tadow', artist: 'Masego & FKJ', time: '5:04', color: 'from-emerald-400 via-teal-500 to-blue-700', tag: 'Chill' },
  { title: 'Space Song', artist: 'Beach House', time: '5:20', color: 'from-blue-400 via-indigo-500 to-violet-700', tag: 'Dream pop' },
  { title: 'The Less I Know The Better', artist: 'Tame Impala', time: '3:36', color: 'from-yellow-300 via-orange-500 to-red-600', tag: 'Indie' },
]

export default function Page() {
  const [tracks, setTracks] = useState<Track[]>(initialTracks)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [liked, setLiked] = useState(false)
  const [volume, setVolume] = useState(72)
  const [search, setSearch] = useState('')
  const [showDrive, setShowDrive] = useState(false)
  const [loadingDrive, setLoadingDrive] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000'
    const scope = encodeURIComponent('https://www.googleapis.com/auth/drive.readonly')

    if (!clientId) {
      alert('.env.local ফাইলে NEXT_PUBLIC_GOOGLE_CLIENT_ID পাওয়া যায়নি!')
      return
    }

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`
    window.location.href = authUrl
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (code) {
      setLoadingDrive(true)
      window.history.replaceState({}, document.title, window.location.pathname)

      fetch('/api/drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.files && data.files.length > 0) {
            const driveTracks: Track[] = data.files.map((file: any) => ({
              id: file.id,
              title: file.name.replace(/\.[^/.]+$/, ''),
              artist: 'Google Drive',
              time: 'Cloud',
              color: 'from-amber-500 to-emerald-700',
              tag: 'Drive',
              url: `/api/stream?fileId=${file.id}`,
            }))
            setTracks([...driveTracks, ...initialTracks])
            alert(`${driveTracks.length}টি গান ড্রাইভ থেকে লোড হয়েছে!`)
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoadingDrive(false))
    }
  }, [])

  const visibleTracks = useMemo(() => {
    const query = search.toLowerCase()
    return tracks.filter((t) => `${t.title} ${t.artist}`.toLowerCase().includes(query))
  }, [search, tracks])

  const currentTrack = tracks[current] || tracks[0]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current && currentTrack?.url) {
      audioRef.current.load()
      if (playing) {
        audioRef.current.play().catch((e) => console.error('Playback error:', e))
      }
    }
  }, [current, currentTrack?.url])

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack?.url) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch((e) => console.error(e))
    }
  }

  const selectTrack = (index: number) => {
    setCurrent(index)
    setPlaying(true)
  }

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-white selection:bg-amber-300 selection:text-black">
      {/* Hidden Audio Element - খালি থাকলে রেন্ডার হবে না */}
      {currentTrack?.url && (
        <audio
          ref={audioRef}
          src={currentTrack.url}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
          onEnded={() => setPlaying(false)}
        />
      )}

      <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col px-3 pb-28 md:flex-row md:gap-4 md:px-5 md:pb-24">
        <aside className="hidden w-[230px] shrink-0 flex-col py-7 md:flex">
          <div className="mb-12 flex items-center gap-3 px-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300 text-black"><Disc3 size={19} /></div>
            <span className="text-lg font-semibold tracking-tight">sonora</span>
          </div>
          <nav className="space-y-2 text-sm text-zinc-400">
            <button className="flex w-full items-center gap-3 rounded-xl bg-white/8 px-3 py-3 text-white"><Home size={18} /> Home</button>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/5 hover:text-white"><Search size={18} /> Discover</button>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/5 hover:text-white"><ListMusic size={18} /> Your library</button>
          </nav>
          <div className="mt-auto rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <Cloud className="mb-4 text-amber-300" size={21} />
            <p className="text-sm font-medium">Your music, everywhere</p>
            <p className="mt-1 text-xs leading-5 text-zinc-500">Connect Google Drive to play your cloud library.</p>
            <button onClick={() => setShowDrive(true)} className="mt-4 text-xs font-semibold text-amber-300 hover:text-amber-200">Connect Drive ↗</button>
          </div>
        </aside>

        <section className="min-w-0 flex-1 py-4 md:py-7">
          <header className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button className="hidden rounded-full bg-white/5 p-2 text-zinc-400 hover:text-white md:block"><ChevronLeft size={17} /></button>
              <button className="hidden rounded-full bg-white/5 p-2 text-zinc-400 hover:text-white md:block"><ChevronRight size={17} /></button>
              <button className="rounded-full p-2 text-zinc-400 md:hidden"><Menu size={21} /></button>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden rounded-full p-2 text-zinc-400 hover:text-white sm:block"><SlidersHorizontal size={18} /></button>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 text-xs font-medium text-zinc-200">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-orange-600 text-[10px] font-bold text-black">JD</span>
                <span className="hidden sm:block">User</span>
              </div>
            </div>
          </header>

          <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-amber-300">Cloud Library</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Now Playing</h1>
            </div>
            <label className="flex h-10 w-full max-w-[250px] items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 text-zinc-500 focus-within:border-amber-300/60">
              <Search size={16} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your music" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600" />
            </label>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="relative min-h-[290px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#e6b86b] via-[#b55b3f] to-[#321d33] p-6 sm:p-8">
              <div className="relative flex h-full flex-col justify-between">
                <span className="rounded-full bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 w-fit">Now playing</span>
                <div>
                  <p className="text-sm text-white/70">{currentTrack?.tag}</p>
                  <h2 className="mt-1 max-w-sm truncate text-4xl font-semibold tracking-tight sm:text-5xl">{currentTrack?.title}</h2>
                  <p className="mt-2 text-sm text-white/75">{currentTrack?.artist}</p>
                  <div className="mt-7 flex items-center gap-3">
                    <button onClick={togglePlay} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:scale-105">
                      {playing ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
                    </button>
                    <button onClick={() => setLiked(!liked)} className={`rounded-full p-3 transition ${liked ? 'text-rose-300' : 'text-white/70 hover:text-white'}`}>
                      <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/8 bg-[#111319] p-6">
              <h3 className="text-lg font-medium">All Songs</h3>
              <div className="mt-5 space-y-1 max-h-[220px] overflow-y-auto">
                {visibleTracks.map((item, index) => (
                  <button key={item.title + index} onClick={() => selectTrack(tracks.indexOf(item))} className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/5">
                    <span className={`h-11 w-11 shrink-0 rounded-lg bg-gradient-to-br ${item.color}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-zinc-200">{item.title}</span>
                      <span className="mt-1 block text-xs text-zinc-500">{item.artist}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Player Bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#0d0f14]/95 px-4 py-3 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center gap-4">
          <div className="hidden min-w-0 items-center gap-3 sm:flex sm:w-[24%]">
            <span className={`h-11 w-11 shrink-0 rounded-lg bg-gradient-to-br ${currentTrack?.color}`} />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{currentTrack?.title}</span>
              <span className="block truncate text-xs text-zinc-500">{currentTrack?.artist}</span>
            </span>
          </div>

          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="flex items-center gap-5 text-zinc-400">
              <button onClick={() => selectTrack((current - 1 + tracks.length) % tracks.length)} className="hover:text-white"><SkipBack size={17} fill="currentColor" /></button>
              <button onClick={togglePlay} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:scale-105">
                {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
              </button>
              <button onClick={() => selectTrack((current + 1) % tracks.length)} className="hover:text-white"><SkipForward size={17} fill="currentColor" /></button>
            </div>
            <div className="flex w-full max-w-[480px] items-center gap-3 text-[10px] text-zinc-600">
              <span>{formatTime(currentTime)}</span>
              <div className="h-1 flex-1 rounded-full bg-white/10 relative">
                <div className="h-full rounded-full bg-amber-300" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="hidden w-[24%] items-center justify-end gap-3 text-zinc-500 sm:flex">
            <Volume2 size={16} />
            <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-20 accent-amber-300" />
          </div>
        </div>
      </div>

      {/* Connect Modal */}
      {showDrive && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#161920] p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-300 text-black"><FolderOpen size={21} /></div>
              <button onClick={() => setShowDrive(false)} className="text-zinc-500 hover:text-white"><X size={19} /></button>
            </div>
            <h2 className="mt-6 text-2xl font-semibold">Connect Google Drive</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Bring your MP3s from Google Drive directly into the player.</p>
            <button onClick={handleGoogleLogin} disabled={loadingDrive} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black hover:bg-zinc-200 transition">
              {loadingDrive ? <Loader2 size={18} className="animate-spin text-black" /> : <span className="text-lg font-bold text-blue-500">G</span>}
              Continue with Google
            </button>
          </div>
        </div>
      )}
    </main>
  )
}