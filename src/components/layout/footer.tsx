export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-slate-700">© {new Date().getFullYear()} Make My Contract. Trusted contracts for modern operators.</p>
        <div className="flex flex-wrap gap-4">
          <a href="/pricing" className="text-slate-700 hover:text-slate-900">
            View pricing
          </a>
          <a href="/login" className="text-slate-700 hover:text-slate-900">
            Client login
          </a>
          <a href="/signup" className="text-slate-700 hover:text-slate-900">
            Create account
          </a>
          <a href="mailto:hello@makemycontract.com" className="text-slate-700 hover:text-slate-900">
            Talk to sales
          </a>
        </div>
      </div>
    </footer>
  );
}
