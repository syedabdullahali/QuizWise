"use client";
import { useState } from "react";
import ProgressDots from "./ProgressDots";
import { toast } from "react-toastify";

const quiz_questions = [
    { key: "goal", label: "Your primary goal?", options: ["Learn JS", "Get a job", "Improve DS/Algo", "Build a project"] },
    { key: "experience", label: "Experience level?", options: ["Beginner", "Intermediate", "Advanced"] },
    { key: "time", label: "Weekly time commitment?", options: ["<3 hrs", "3-6 hrs", "6-10 hrs", "10+ hrs"] },
    { key: "style", label: "Preferred learning style?", options: ["Video", "Reading", "Hands-on", "Mentorship"] },
    { key: "focus", label: "Focus area?", options: ["Frontend", "Backend", "Full-Stack", "Mobile"] }
] as const;

type QuizKey = (typeof quiz_questions)[number]["key"];
type Answers = Record<QuizKey, string> & { email: string; name: string };

export default function MultiStepForm() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Partial<Answers>>({});
    const [submitting, setSubmitting] = useState(false);
    const totalSteps = quiz_questions.length + 1;

    const onSelect = (key: QuizKey, value: string) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
        setStep(s => Math.min(s + 1, quiz_questions.length));
    };

    const canSubmit = Boolean(
        answers.email &&
        answers.name &&
        quiz_questions.every(q => answers[q.key])
    );

    const onSubmit = async () => {
        if (!canSubmit) return;
        setSubmitting(true);
        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(answers)
            });

            if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                alert(j?.error || "Something went wrong.");
            } else {
                toast.success("Request submitted successfully")
            }
        } catch {
            alert("Network error.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="rounded-xl bg-blue-300  p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <ProgressDots current={step} total={totalSteps - 1} />
                <span className="text-xs text-gray-500">
                    Step {Math.min(step + 1, totalSteps)} / {totalSteps}
                </span>
            </div>

            {step < quiz_questions.length ? (
                <div className="space-y-3">
                    <h2 className="text-lg font-medium">{quiz_questions[step].label}</h2>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {quiz_questions[step].options.map(opt => (
                            <button
                                key={opt}
                                onClick={() => onSelect(quiz_questions[step].key, opt)}
                                className="rounded-md bg-white shadow px-3 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                    {step > 0 && (
                        <button
                            onClick={() => setStep(s => Math.max(0, s - 1))}
                            className="mt-2 text-xs text-gray-500 underline"
                        >
                            Back
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-lg font-medium">Where can we send your plan?</h2>
                    <div className="grid gap-3">
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full rounded-md bg-white border  px-3 py-2 text-sm"
                            value={answers.name || ""}
                            onChange={e => setAnswers(p => ({ ...p, name: e.target.value }))}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full rounded-md bg-white border  px-3 py-2 text-sm"
                            value={answers.email || ""}
                            onChange={e => setAnswers(p => ({ ...p, email: e.target.value }))}
                            required
                        />
                    </div>
                    <button
                        disabled={!canSubmit || submitting}
                        onClick={onSubmit}
                        className="rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50 cursor-pointer"
                    >
                        {submitting ? "Submitting…" : "Get my recommendation"}
                    </button>
                    <button
                        onClick={() => setStep(quiz_questions.length - 1)}
                        className="block text-xs text-gray-500 underline cursor-pointer"
                    >
                        Back
                    </button>
                </div>
            )}
        </div>
    );
}
