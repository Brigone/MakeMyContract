export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 text-slate-700 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 text-center sm:text-left">
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 text-slate-800 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-700">Ready to launch?</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Start generating contracts in the live editor.</h2>
            <p className="mt-2 text-sm text-slate-600">Edit templates publicly, then upgrade when you want unlimited PDFs and history.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
              <a
                href="/dashboard"
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200"
              >
                Try the editor now
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Make My Contract. Trusted contracts for modern operators.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
              <a href="/contracts" className="text-slate-700 hover:text-slate-900">
                Contracts
              </a>
              <a href="/login" className="text-slate-700 hover:text-slate-900">
                Login
              </a>
              <a href="/signup" className="text-slate-700 hover:text-slate-900">
                Upgrade
              </a>
              <a href="mailto:hello@makemycontract.com" className="text-slate-700 hover:text-slate-900">
                Talk to sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
