"use client";

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{marginTop:"-200px"}}>

      {/* Glow Effects */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute right-20 top-40 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-20" style={{marginLeft:"66px"}}>

        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-slate-300 backdrop-blur-xl" style={{marginLeft:"95px"}}>
            🚀 Video Calls • Chat • Gaming • Sketching
          </div>
        </div>

        {/* Heading */}
        <div className="text-center " style={{marginLeft:"120px"}}>

          <h1 className="mx-auto max-w-5xl text-5xl font-black leading-tight md:text-7xl">

            Collaborate.

            <span className="bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Create.
            </span>

            Play Together.

          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 md:text-xl" style={{marginLeft:"146px",marginTop:"20px"}}>
            DURA brings video meetings, live chat,
            collaborative sketching and gaming rooms
            into one seamless workspace.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{marginTop:"20px"}}>

            <button className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-500/30">
              Start a Room
            </button>

            <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg text-slate-300 backdrop-blur-xl">
              Watch Demo
            </button>

          </div>
        </div>

        {/* Product Preview */}
        <div className="mt-20" style={{marginTop:"70px"}}>

          <div className="rounded-[32px] border border-white/10 bg-black/30 p-6 backdrop-blur-2xl">

            <div className="grid gap-6 lg:grid-cols-3">

              {/* Video */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-transparent p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                <div className="flex h-56 items-center justify-center rounded-2xl bg-slate-900">
                  🎥 Video Room
                </div>
              </div>

              {/* Sketch */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-4">
                <div className="flex h-56 items-center justify-center rounded-2xl bg-slate-900">
                  🎨 Sketch Board
                </div>
              </div>

              {/* Chat */}
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/10 to-transparent p-4">
                <div className="flex h-56 items-center justify-center rounded-2xl bg-slate-900">
                  💬 Live Chat
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}