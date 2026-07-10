export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <main className="flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-8xl font-light tracking-wide text-white mb-12">
          NEXT<span className="text-gray-500">.JS</span>
        </h1>

        <div className="max-w-md mb-12">
          <h2 className="text-2xl font-light text-white mb-4">
            To get started, edit the page.tsx file.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Looking for a starting point or more instructions?
            <br />
            Head over to{" "}
            <a href="#" className="text-white hover:text-gray-300 font-medium">
              Templates
            </a>{" "}
            or the{" "}
            <a href="#" className="text-white hover:text-gray-300 font-medium">
              Learning
            </a>{" "}
            center.
          </p>
        </div>

        <div className="flex gap-6 items-center">
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
          >
            <span className="text-lg">▶</span>
            Deploy Now
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-300 font-medium transition-colors"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
