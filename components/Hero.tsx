export default function Hero() {
  function scrollToLibrary() {
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-accent text-xs font-bold tracking-widest mb-3">WORKOUT LIBRARY</p>
          <h1 className="font-heading uppercase text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Train with intent. Log every set.
          </h1>
          <p className="text-gray-400 max-w-md mb-6">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <button
            onClick={scrollToLibrary}
            className="bg-accent text-black font-bold px-6 py-3 rounded-md flex items-center gap-2 hover:opacity-90"
          >
            BROWSE WORKOUTS →
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src="/assest/banner.png"
            alt="Workout illustration"
            className="rounded-xl max-h-[380px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}