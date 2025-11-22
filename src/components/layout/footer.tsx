export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 text-slate-700 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 text-center text-sm sm:text-left">
          <div className="flex flex-col gap-4 text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500 sm:text-sm">
              © {new Date().getFullYear()} Make My Contract. Trusted contracts for modern operators.
            </p>
            <nav className="flex flex-wrap justify-center gap-3 sm:justify-end">
              <a href="/about" className="text-slate-700 hover:text-slate-900">
                About
              </a>
              <a href="/draft" className="text-slate-700 hover:text-slate-900">
                Start contract
              </a>
              <a href="/pricing" className="text-slate-700 hover:text-slate-900">
                Pricing
              </a>
              <a href="/login" className="text-slate-700 hover:text-slate-900">
                Login
              </a>
              <a href="mailto:hello@makemycontract.com" className="text-slate-700 hover:text-slate-900">
                Talk to sales
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
