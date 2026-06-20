export default function AboutSection() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center" style={{marginLeft: "70px"}}>

          {/* Left Content */}
          <div>

            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
              Why DURA?
            </div>

            <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              One Platform.
              <span className="bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Infinite Collaboration.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              DURA combines video meetings, real-time chat,
              collaborative sketch boards and gaming rooms into
              a single seamless experience.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-400">
              Stop switching between multiple tools. Meet,
              brainstorm, create and play together in one space.
            </p>

          </div>

          {/* Right Side Cards */}
          <div className="grid gap-5">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h3 className="text-xl font-bold">🎥 Video Collaboration</h3>
              <p className="mt-3 text-slate-400">
                High-quality video rooms for teams, friends and communities.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h3 className="text-xl font-bold">🎨 Live Sketch Board</h3>
              <p className="mt-3 text-slate-400">
                Draw, explain ideas and brainstorm together in real-time.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <h3 className="text-xl font-bold">💬 Instant Communication</h3>
              <p className="mt-3 text-slate-400">
                Fast real-time messaging integrated directly into your rooms.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}