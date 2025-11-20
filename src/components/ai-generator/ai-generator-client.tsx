"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { AiDraft } from "@/types/contracts";
import Link from "next/link";

interface AiGeneratorClientProps {
  initialDrafts: AiDraft[];
}

interface SessionVersion {
  id: string;
  label: string;
  content: string;
}

export function AiGeneratorClient({ initialDrafts }: AiGeneratorClientProps) {
  const [prompt, setPrompt] = useState("");
  const [refineInput, setRefineInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<AiDraft[]>(initialDrafts);
  const [saving, setSaving] = useState(false);
  const [versions, setVersions] = useState<SessionVersion[]>([]);

  const somethingToRender = Boolean(output);

  const addVersion = (content: string, label: string) => {
    const newVersion: SessionVersion = {
      id: crypto.randomUUID(),
      label,
      content,
    };
    setVersions((prev) => [...prev, newVersion]);
  };

  const callAi = async (body: Record<string, string>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai-contract-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "Unable to generate a contract.");
      }
      const data = await response.json();
      const contract = (data?.contract ?? "").trim();
      if (!contract) {
        throw new Error("We couldn't generate your contract. Try again.");
      }
      setOutput(contract);
      addVersion(contract, body.existingContract ? "Refined" : "Generated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    if (!prompt.trim()) {
      setError("Describe the contract you need.");
      return;
    }
    callAi({ prompt: prompt.trim() });
  };

  const handleRefine = () => {
    if (!output.trim()) {
      setError("Generate a contract first.");
      return;
    }
    if (!refineInput.trim()) {
      setError("Tell us how you want to improve it.");
      return;
    }
    callAi({ prompt: prompt.trim(), refine: refineInput.trim(), existingContract: output });
    setRefineInput("");
  };

  const handleCopy = async () => {
    if (!output.trim()) return;
    await navigator.clipboard.writeText(output);
  };

  const handleSave = async () => {
    if (!output.trim() || !prompt.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/ai-contract-gemini/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, output }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "Unable to save this draft.");
      }
      const data = await response.json();
      if (data?.draft) {
        setHistory((prev) => [data.draft as AiDraft, ...prev]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saving failed. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePdf = async () => {
    if (!output.trim()) return;
    const response = await fetch("/api/ai-contract-gemini/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: prompt || "AI Contract", content: output }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data?.error ?? "Unable to generate the PDF.");
      return;
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(prompt || "ai-contract").replace(/[^a-z0-9-_]/gi, "-")}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const actionButtons = (
    <div className="flex flex-wrap gap-3">
      <Button onClick={handleGenerate} className="flex-1 sm:flex-none" disabled={loading}>
        {loading ? "Drafting..." : "Generate with AI"}
      </Button>
      <Button variant="secondary" onClick={handleCopy} disabled={!somethingToRender}>
        Copy contract
      </Button>
      <Button variant="secondary" onClick={handleSave} disabled={!somethingToRender || saving}>
        {saving ? "Saving..." : "Save draft"}
      </Button>
      <Button variant="secondary" onClick={handlePdf} disabled={!somethingToRender}>
        Generate PDF
      </Button>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 pb-28 sm:px-6 lg:pb-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">AI Contract Generator</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Generate a Contract with AI</h1>
          <p className="mt-1 text-sm text-slate-600">Describe what you need and we&apos;ll draft the full agreement.</p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/contracts">Use a template instead</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-slate-900">Describe your contract</label>
            <Textarea
              placeholder="Rental agreement for a condo in Florida"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={8}
            />
            <p className="text-xs text-slate-500">
              Example prompts: “Freelancer contract for social media work”, “Room rental agreement with utilities included”.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-900">Refine this contract (optional)</label>
            <Textarea
              placeholder="Add a late payment clause, include Florida law"
              value={refineInput}
              onChange={(event) => setRefineInput(event.target.value)}
              rows={3}
            />
            <Button
              variant="secondary"
              className="self-start"
              onClick={handleRefine}
              disabled={!output || loading}
            >
              Improve with AI
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">AI preview</p>
            {versions.length > 0 && (
              <div className="text-xs text-slate-500">{versions.length} version{versions.length > 1 ? "s" : ""}</div>
            )}
          </div>
          <div className="mt-4 h-[520px] w-full overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-800">
            {loading ? (
              <div className="space-y-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                <p className="text-xs text-slate-500">Drafting your agreement with AI…</p>
              </div>
            ) : output ? (
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-900">{output}</pre>
            ) : (
              <p className="text-sm text-slate-500">Your contract will appear here after you generate it with AI.</p>
            )}
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <div className="mt-4 hidden flex-col gap-3 lg:flex">{actionButtons}</div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Session history</h2>
          {versions.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">Generate or refine a contract to see its timeline.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {versions.map((version) => (
                <li key={version.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{version.label}</span>
                    <button
                      type="button"
                      className="font-semibold text-blue-600"
                      onClick={() => setOutput(version.content)}
                    >
                      Restore
                    </button>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-700">{version.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Saved AI drafts</h2>
            <p className="text-xs text-slate-500">{history.length} total</p>
          </div>
          {history.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">Save a draft to build your AI library.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {history.map((draft) => (
                <li
                  key={draft.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-3 transition hover:border-blue-200"
                >
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => {
                      setPrompt(draft.prompt);
                      setOutput(draft.output);
                      addVersion(draft.output, `Loaded ${new Date(draft.createdAt).toLocaleString()}`);
                    }}
                  >
                    <p className="text-sm font-semibold text-slate-900 line-clamp-2">{draft.prompt}</p>
                    <p className="text-xs text-slate-500">
                      Saved {formatDistanceToNow(new Date(draft.createdAt), { addSuffix: true })}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur lg:hidden">
        {actionButtons}
      </div>
    </div>
  );
}
