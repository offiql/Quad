
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          quad<span className="text-[#0057FF]">.</span>
        </Link>

        <Link
          href="/login"
          className="rounded-xl bg-[#0057FF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Login <span aria-hidden="true">→</span>
        </Link>
      </nav>

      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-16 sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs font-semibold text-[#0057FF] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#0057FF]" />
            Your workspace, simplified
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Work smarter.
            <span className="block text-[#0057FF]">Achieve more.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            A smarter, simpler workspace to manage your work, streamline
            everyday tasks, and keep everything organized.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 min-[400px]:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#0057FF] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Get Started <span aria-hidden="true">→</span>
            </Link>

            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
            >
              Explore Quad
            </a>
          </div>

          <div
            id="features"
            className="mt-14 grid grid-cols-1 gap-3 text-left sm:grid-cols-3 sm:gap-4"
          >
            {[
              {
                title: "Stay Organized",
                description: "Keep your work in one place.",
                icon: "01",
              },
              {
                title: "Work Efficiently",
                description: "Simplify your daily workflows.",
                icon: "02",
              },
              {
                title: "Move Forward",
                description: "Focus on what matters most.",
                icon: "03",
              },
            ].map((feature) => (
              <div
                key={feature.icon}
                className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <span className="text-xs font-bold text-[#0057FF]">
                  {feature.icon}
                </span>
                <h2 className="mt-3 font-bold text-slate-900">
                  {feature.title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 px-5 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Quad. All rights reserved.
      </footer>
    </main>
  );
}
