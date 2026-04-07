"use client";

import { useState } from "react";

interface KnowledgeCheckItem {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface KnowledgeCheckProps {
  heading?: string;
  items: KnowledgeCheckItem[];
}

export default function KnowledgeCheck({ heading, items }: KnowledgeCheckProps) {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const select = (questionIndex: number, optionIndex: number) => {
    if (revealed[questionIndex]) return;
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const reveal = (questionIndex: number) => {
    setRevealed((prev) => ({ ...prev, [questionIndex]: true }));
  };

  const answeredCount = Object.keys(revealed).length;
  const correctCount = Object.entries(revealed).filter(
    ([qi]) => answers[Number(qi)] === items[Number(qi)].correct
  ).length;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <span className="flex-shrink-0 w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </span>
        <div>
          <h3 className="font-heading font-semibold text-neutral-800 text-sm">
            {heading || "Check Your Understanding"}
          </h3>
          {answeredCount > 0 && (
            <p className="text-xs text-neutral-500">
              {correctCount}/{answeredCount} correct
            </p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {items.map((item, qi) => {
          const selected = answers[qi];
          const isRevealed = revealed[qi];
          const isCorrect = selected === item.correct;

          return (
            <div key={qi} className="border-t border-neutral-100 pt-5 first:border-t-0 first:pt-0">
              <p className="font-medium text-neutral-800 text-sm mb-3">
                {qi + 1}. {item.question}
              </p>

              <div className="space-y-2 mb-3">
                {item.options.map((option, oi) => {
                  let style = "border-neutral-200 hover:border-brand-300 hover:bg-brand-50";
                  if (selected === oi && !isRevealed) {
                    style = "border-brand-400 bg-brand-50 ring-1 ring-brand-400";
                  }
                  if (isRevealed && oi === item.correct) {
                    style = "border-success-400 bg-success-50";
                  }
                  if (isRevealed && selected === oi && oi !== item.correct) {
                    style = "border-restrict-300 bg-restrict-50";
                  }

                  return (
                    <button
                      key={oi}
                      onClick={() => select(qi, oi)}
                      disabled={isRevealed}
                      className={`w-full text-left text-sm px-4 py-3 rounded-xl border transition-all ${style} ${
                        isRevealed ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                          isRevealed && oi === item.correct
                            ? "border-success-500 bg-success-500 text-white"
                            : isRevealed && selected === oi && oi !== item.correct
                            ? "border-restrict-400 bg-restrict-400 text-white"
                            : selected === oi
                            ? "border-brand-500 bg-brand-500 text-white"
                            : "border-neutral-300"
                        }`}>
                          {isRevealed && oi === item.correct ? "✓" : isRevealed && selected === oi && oi !== item.correct ? "✗" : ""}
                        </span>
                        <span className={isRevealed && oi === item.correct ? "font-medium text-success-700" : "text-neutral-700"}>
                          {option}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {!isRevealed && selected !== null && selected !== undefined && (
                <button
                  onClick={() => reveal(qi)}
                  className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  Check answer →
                </button>
              )}

              {isRevealed && (
                <div className={`mt-3 p-3 rounded-xl text-sm leading-relaxed ${
                  isCorrect ? "bg-success-50 border border-success-200 text-success-800" : "bg-warning-50 border border-warning-200 text-warning-800"
                }`}>
                  <p className="font-semibold mb-1">
                    {isCorrect ? "Correct!" : "Not quite."}
                  </p>
                  <p>{item.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {answeredCount === items.length && answeredCount > 0 && (
        <div className={`mt-5 p-4 rounded-xl text-center ${
          correctCount === items.length
            ? "bg-success-50 border border-success-200"
            : "bg-brand-50 border border-brand-200"
        }`}>
          <p className="font-heading font-semibold text-sm">
            {correctCount === items.length
              ? "Perfect score! You've got a great understanding."
              : `You got ${correctCount} out of ${items.length}. Review the sections above for topics you missed.`}
          </p>
        </div>
      )}
    </div>
  );
}
