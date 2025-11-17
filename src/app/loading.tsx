import { LoadingDots } from "@/components/ui/loading-dots";

export default function RootLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-slate-600">
      <LoadingDots />
      <p className="mt-3 text-sm">Preparing Make My Rental...</p>
    </div>
  );
}
