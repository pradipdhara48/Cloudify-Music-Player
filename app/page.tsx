'use client'

import { useMemo, useState } from 'react'
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
} from 'lucide-react'

const tracks = [
  { title: 'Midnight City', artist: 'M83', time: '4:03', color: 'from-fuchsia-500 via-purple-500 to-indigo-700', tag: 'Synthwave' },
  { title: 'Sunset Lover', artist: 'Petit Biscuit', time: '3:58', color: 'from-orange-400 via-pink-500 to-violet-600', tag: 'Electronic' },
  { title: 'Tadow', artist: 'Masego & FKJ', time: '5:04', color: 'from-emerald-400 via-teal-500 to-blue-700', tag: 'Chill' },
  { title: 'Space Song', artist: 'Beach House', time: '5:20', color: 'from-blue-400 via-indigo-500 to-violet-700', tag: 'Dream pop' },
  { title: 'The Less I Know The Better', artist: 'Tame Impala', time: '3:36', color: 'from-yellow-300 via-orange-500 to-red-600', tag: 'Indie' },
]

const playlists = [
  { title: 'Late night drive', count: 24, color: 'from-amber-200 to-orange-600' },
  { title: 'Focus flow', count: 18, color: 'from-cyan-300 to-blue-700' },
  { title: 'Weekend energy', count: 31, color: 'from-lime-300 to-emerald-700' },
]

export default function Page() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [liked, setLiked] = useState(false)
  const [volume, setVolume] = useState(72)
  const [search, setSearch] = useState('')
  const [showDrive, setShowDrive] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)

  const visibleTracks = useMemo(() => {
    const query = search.toLowerCase()
    return tracks.filter((track) => `${track.title} ${track.artist}`.toLowerCase().includes(query))
  }, [search])
  const track = tracks[current]

  function selectTrack(index: number) {
    setCurrent(index)
    setPlaying(true)
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-white selection:bg-amber-300 selection:text-black">
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
          <div className="mt-12 flex items-center justify-between px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600"><span>Playlists</span><button aria-label="Create playlist" onClick={() => setShowPlaylist(true)} className="text-zinc-400 hover:text-white"><Plus size={16} /></button></div>
          <div className="mt-4 space-y-1 text-sm text-zinc-500">
            {playlists.map((playlist) => <button key={playlist.title} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-white/5 hover:text-zinc-200"><span>{playlist.title}</span><span className="text-xs text-zinc-700">{playlist.count}</span></button>)}
          </div>
          <div className="mt-auto rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <Cloud className="mb-4 text-amber-300" size={21} />
            <p className="text-sm font-medium">Your music, everywhere</p>
            <p className="mt-1 text-xs leading-5 text-zinc-500">Connect Google Drive to play your cloud library.</p>
            <button onClick={() => setShowDrive(true)} className="mt-4 text-xs font-semibold text-amber-300 hover:text-amber-200">Connect Drive <span aria-hidden="true">↗</span></button>
          </div>
        </aside>

        <section className="min-w-0 flex-1 py-4 md:py-7">
          <header className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2"><button className="hidden rounded-full bg-white/5 p-2 text-zinc-400 hover:text-white md:block"><ChevronLeft size={17} /></button><button className="hidden rounded-full bg-white/5 p-2 text-zinc-400 hover:text-white md:block"><ChevronRight size={17} /></button><button className="rounded-full p-2 text-zinc-400 md:hidden" aria-label="Open menu"><Menu size={21} /></button></div>
            <div className="flex items-center gap-2"><button className="hidden rounded-full p-2 text-zinc-400 hover:text-white sm:block" aria-label="Settings"><SlidersHorizontal size={18} /></button><button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 text-xs font-medium text-zinc-200"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-orange-600 text-[10px] font-bold text-black">JD</span><span className="hidden sm:block">Jordan Davis</span><ChevronDown size={14} className="text-zinc-500" /></button></div>
          </header>

          <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-amber-300">Friday, September 25</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Good evening, Jordan</h1></div><label className="flex h-10 w-full max-w-[250px] items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 text-zinc-500 focus-within:border-amber-300/60"><Search size={16} /><input aria-label="Search your music" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your music" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600" /></label></div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="relative min-h-[290px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#e6b86b] via-[#b55b3f] to-[#321d33] p-6 sm:p-8"><div className="absolute -right-12 -top-20 h-72 w-72 rounded-full border-[42px] border-white/10" /><div className="absolute bottom-[-65px] right-[18%] h-44 w-44 rounded-full border-[28px] border-black/15" /><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="rounded-full bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">Now playing</span><button aria-label="More options" className="text-white/70 hover:text-white"><MoreHorizontal size={21} /></button></div><div><p className="text-sm text-white/70">{track.tag}</p><h2 className="mt-1 max-w-sm text-4xl font-semibold tracking-tight sm:text-5xl">{track.title}</h2><p className="mt-2 text-sm text-white/75">{track.artist}</p><div className="mt-7 flex items-center gap-3"><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:scale-105">{playing ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}</button><button onClick={() => setLiked(!liked)} aria-label={liked ? 'Unlike' : 'Like'} className={`rounded-full p-3 transition ${liked ? 'text-rose-300' : 'text-white/70 hover:text-white'}`}><Heart size={20} fill={liked ? 'currentColor' : 'none'} /></button></div></div></div></div>
            <div className="rounded-3xl border border-white/8 bg-[#111319] p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Up next</p><h3 className="mt-2 text-lg font-medium">From your rotation</h3></div><button className="text-xs font-medium text-amber-300 hover:text-amber-200">See all</button></div><div className="mt-5 space-y-1">{tracks.slice(1, 4).map((item, index) => <button key={item.title} onClick={() => selectTrack(index + 1)} className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/5"><span className={`h-11 w-11 shrink-0 rounded-lg bg-gradient-to-br ${item.color}`} /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-zinc-200">{item.title}</span><span className="mt-1 block text-xs text-zinc-500">{item.artist}</span></span><span className="text-xs text-zinc-600">{item.time}</span></button>)}</div></div>
          </div>

          <div className="mt-10 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Made for you</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Keep the vibe going</h2></div><button onClick={() => setShowPlaylist(true)} className="hidden items-center gap-2 text-sm text-zinc-400 hover:text-white sm:flex"><Plus size={16} /> New playlist</button></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{visibleTracks.slice(0, 3).map((item) => <button key={item.title} onClick={() => selectTrack(tracks.indexOf(item))} className="group rounded-2xl border border-white/8 bg-[#111319] p-3 text-left transition hover:-translate-y-0.5 hover:border-white/15"><span className={`block aspect-[1.7/1] rounded-xl bg-gradient-to-br ${item.color} p-4`}><span className="flex h-full items-end justify-between"><span className="rounded-full bg-black/20 px-2 py-1 text-[9px] uppercase tracking-widest text-white/75">{item.tag}</span><Play className="opacity-0 transition group-hover:opacity-100" size={18} fill="currentColor" /></span></span><span className="mt-3 block text-sm font-medium text-zinc-200">{item.title}</span><span className="mt-1 block text-xs text-zinc-500">{item.artist}</span></button>)}</div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#0d0f14]/95 px-4 py-3 backdrop-blur-xl md:px-8"><div className="mx-auto flex max-w-[1500px] items-center gap-4"><div className="hidden min-w-0 items-center gap-3 sm:flex sm:w-[24%]"><span className={`h-11 w-11 shrink-0 rounded-lg bg-gradient-to-br ${track.color}`} /><span className="min-w-0"><span className="block truncate text-sm font-medium">{track.title}</span><span className="block truncate text-xs text-zinc-500">{track.artist}</span></span><button onClick={() => setLiked(!liked)} className={liked ? 'text-rose-300' : 'text-zinc-500 hover:text-white'} aria-label="Like song"><Heart size={16} fill={liked ? 'currentColor' : 'none'} /></button></div><div className="flex flex-1 flex-col items-center gap-2"><div className="flex items-center gap-5 text-zinc-400"><button aria-label="Previous track" className="hover:text-white"><SkipBack size={17} fill="currentColor" /></button><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:scale-105">{playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}</button><button aria-label="Next track" className="hover:text-white"><SkipForward size={17} fill="currentColor" /></button></div><div className="flex w-full max-w-[480px] items-center gap-3 text-[10px] text-zinc-600"><span>1:24</span><div className="h-1 flex-1 rounded-full bg-white/10"><div className="h-full w-[34%] rounded-full bg-amber-300" /></div><span>{track.time}</span></div></div><div className="hidden w-[24%] items-center justify-end gap-3 text-zinc-500 sm:flex"><Volume2 size={16} /><input aria-label="Volume" type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="volume-slider h-24 w-1 appearance-none bg-white/15 [writing-mode:vertical-lr]" /></div></div></div>

      <div className="fixed bottom-[76px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-8 rounded-full border border-white/10 bg-[#111319]/95 px-5 py-3 shadow-2xl backdrop-blur md:hidden"><button className="text-amber-300"><Home size={19} /></button><button className="text-zinc-500"><Search size={19} /></button><button onClick={() => setShowPlaylist(true)} className="text-zinc-500"><ListMusic size={19} /></button><button onClick={() => setShowDrive(true)} className="text-zinc-500"><Cloud size={19} /></button></div>

      {showDrive && <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#161920] p-6 shadow-2xl"><div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-300 text-black"><FolderOpen size={21} /></div><button onClick={() => setShowDrive(false)} aria-label="Close dialog" className="text-zinc-500 hover:text-white"><X size={19} /></button></div><h2 className="mt-6 text-2xl font-semibold">Connect Google Drive</h2><p className="mt-2 text-sm leading-6 text-zinc-400">Bring your MP3s, WAVs, and FLACs into Sonora. Your files stay in Drive and play securely from the cloud.</p><button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black hover:bg-zinc-200"><span className="text-lg font-bold text-blue-500">G</span> Continue with Google</button><p className="mt-4 text-center text-[11px] text-zinc-600">Google Drive access will be requested only after you continue.</p></div></div>}
      {showPlaylist && <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#161920] p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-semibold">New playlist</h2><button onClick={() => setShowPlaylist(false)} aria-label="Close dialog" className="text-zinc-500 hover:text-white"><X size={19} /></button></div><label className="mt-6 block text-xs font-medium text-zinc-400">Playlist name<input autoFocus placeholder="e.g. Sunday morning" className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-amber-300" /></label><button onClick={() => setShowPlaylist(false)} className="mt-5 w-full rounded-xl bg-amber-300 py-3 text-sm font-semibold text-black hover:bg-amber-200">Create playlist</button></div></div>}
    </main>
  )
}
