import Login from "./Login";
import { Menu } from "lucide-react";
import './Navbar.css';

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Video", href: "/video" },
  { name: "Chat", href: "/chat" },
  { name: "Sketch", href: "/sketch" },
  { name: "Gaming", href: "/gaming" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4 md:px-6">
      <nav aria-label="Main Navigation" className="mx-auto max-w-[1500px]">
        {/* Main Navbar Wrapper */}
        <div className="flex h-20 items-center justify-between rounded-[2rem] border border-white/10 bg-black/40 px-6 backdrop-blur-2xl shadow-2xl md:px-8">
          
          {/* Logo Section */}
          <a 
            href="/" 
            className="flex flex-col items-start rounded-xl p-2 transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
          >
            <h1 className="bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-400 bg-clip-text text-3xl font-black tracking-wide text-transparent md:text-4xl drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              DURA
            </h1>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.4em] text-slate-400 md:text-[11px]">
              Connect • Create • Play
            </span>
          </a>

          {/* Center Menu - PREMIUM BOX STYLE */}
          <div className="hidden lg:flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 backdrop-blur-xl">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="
                  flex items-center justify-center rounded-xl px-6 py-2.5 
                  text-sm font-semibold text-slate-300 
                  bg-white/[0.02] border border-transparent
                  transition-all duration-300 ease-out 
                  hover:bg-white/10 hover:border-white/15 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]
                "
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Action Section */}
          <div className="flex items-center gap-5 md:gap-6">
            <button 
              type="button"
              className="hidden md:inline-flex rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-3 text-sm font-bold tracking-wide text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] cursor-pointer"
            >
              Join Room
            </button>

            {/* Login Component Area */}
            <div className="flex items-center">
              <Login />
            </div>

            {/* Mobile Menu Hamburger */}
            <button 
              type="button"
              className="flex items-center justify-center rounded-xl bg-white/[0.04] p-2.5 text-slate-300 border border-transparent hover:border-white/10 hover:bg-white/10 hover:text-white lg:hidden cursor-pointer"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>
      </nav>
    </header>
  );
}