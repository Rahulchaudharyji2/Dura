import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">

      <div className="mx-auto max-w-7xl px-6 py-16" style={{marginLeft: "70px"}}>

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-400 bg-clip-text text-4xl font-black text-transparent">
              DURA
            </h2>

            <p className="mt-4 text-slate-400">
              Connect. Create. Play.
            </p>

            <p className="mt-2 text-slate-500">
              Real-time collaboration platform for teams,
              creators and gamers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-white">Product</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link href="/video" className="text-slate-400 hover:text-white">
                Video Rooms
              </Link>

              <Link href="/chat" className="text-slate-400 hover:text-white">
                Chat
              </Link>

              <Link href="/sketch" className="text-slate-400 hover:text-white">
                Sketch Board
              </Link>

              <Link href="/gaming" className="text-slate-400 hover:text-white">
                Gaming
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-white">Resources</h3>

            <div className="mt-4 flex flex-col gap-3">
              <Link href="/" className="text-slate-400 hover:text-white">
                Documentation
              </Link>

              <Link href="/" className="text-slate-400 hover:text-white">
                Support
              </Link>

              <Link href="/" className="text-slate-400 hover:text-white">
                Privacy
              </Link>

              <Link href="/" className="text-slate-400 hover:text-white">
                Terms
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-white">Community</h3>

            <div className="mt-4 flex flex-col gap-3">
              <a href="#" className="text-slate-400 hover:text-white">
                Discord
              </a>

              <a href="#" className="text-slate-400 hover:text-white">
                GitHub
              </a>

              <a href="#" className="text-slate-400 hover:text-white">
                Twitter
              </a>

              <a href="#" className="text-slate-400 hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-slate-500">
          © 2026 DURA. All rights reserved.
        </div>

      </div>
    </footer>
  );
}