"use client";

import { useState, useEffect } from "react";

interface TimelineStep {
  daysOut: number;
  label: string;
  heading: string;
  tasks: string[];
  color: string;
  bgColor: string;
}

const timeline: TimelineStep[] = [
  {
    daysOut: 7,
    label: "7 days before",
    heading: "One week out",
    tasks: [
      "Pick up your prep solution from the pharmacy",
      "Stop taking iron supplements",
      "Arrange a ride home from your procedure",
      "Stock up on clear liquids (broth, Jello, apple juice, sports drinks)",
    ],
    color: "text-brand-700",
    bgColor: "bg-brand-50 border-brand-200",
  },
  {
    daysOut: 3,
    label: "3 days before",
    heading: "Three days out",
    tasks: [
      "Switch to low-residue foods (white bread, eggs, chicken, fish)",
      "Avoid high-fibre foods: raw vegetables, corn, nuts, seeds, popcorn",
      "Avoid red or purple liquids and Jello",
    ],
    color: "text-teal-700",
    bgColor: "bg-teal-50 border-teal-200",
  },
  {
    daysOut: 1,
    label: "Day before",
    heading: "Tomorrow is the day",
    tasks: [
      "Clear liquids only for the entire day",
      "Begin drinking your prep solution as directed (usually evening)",
      "Stay near a bathroom — the prep works quickly",
      "Keep drinking clear fluids to stay hydrated",
    ],
    color: "text-warning-700",
    bgColor: "bg-warning-50 border-warning-200",
  },
  {
    daysOut: 0,
    label: "Today",
    heading: "Procedure day",
    tasks: [
      "Complete the second half of your split-prep (usually early morning)",
      "Nothing to eat or drink after finishing your prep",
      "Take essential medications with a small sip of water",
      "Wear comfortable, loose-fitting clothing",
      "Bring your health card and medication list",
      "Your ride should be ready to take you home after",
    ],
    color: "text-success-700",
    bgColor: "bg-success-50 border-success-200",
  },
];

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function getCurrentStep(daysLeft: number): TimelineStep | null {
  if (daysLeft < 0) return null;
  for (const step of timeline) {
    if (daysLeft >= step.daysOut) return step;
  }
  return timeline[timeline.length - 1];
}

function getProgressPercent(daysLeft: number): number {
  if (daysLeft >= 7) return 5;
  if (daysLeft <= 0) return 100;
  return Math.round(((7 - daysLeft) / 7) * 100);
}

export default function CountdownTimer() {
  const [procedureDate, setProcedureDate] = useState("");
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("procedure-date");
    if (saved) {
      setProcedureDate(saved);
      setDaysLeft(getDaysUntil(saved));
    }
  }, []);

  useEffect(() => {
    if (!procedureDate) return;
    setDaysLeft(getDaysUntil(procedureDate));
    localStorage.setItem("procedure-date", procedureDate);
  }, [procedureDate]);

  useEffect(() => {
    if (!procedureDate) return;
    const interval = setInterval(() => {
      setDaysLeft(getDaysUntil(procedureDate));
    }, 60000);
    return () => clearInterval(interval);
  }, [procedureDate]);

  const currentStep = daysLeft !== null ? getCurrentStep(daysLeft) : null;
  const progress = daysLeft !== null ? getProgressPercent(daysLeft) : 0;
  const isPast = daysLeft !== null && daysLeft < 0;

  const clearDate = () => {
    setProcedureDate("");
    setDaysLeft(null);
    localStorage.removeItem("procedure-date");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <h2 className="font-heading text-lg font-semibold text-white">My Procedure Countdown</h2>
        </div>
        <p className="text-brand-200 text-sm">Enter your procedure date to get a personalized prep timeline</p>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <label htmlFor="procedure-date" className="block text-sm font-medium text-neutral-600 mb-1.5">
              Procedure date
            </label>
            <input
              id="procedure-date"
              type="date"
              value={procedureDate}
              min={today}
              onChange={(e) => setProcedureDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
            />
          </div>
          {procedureDate && (
            <button
              onClick={clearDate}
              className="self-end px-4 py-2.5 text-sm text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {daysLeft !== null && !isPast && (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex flex-col items-center bg-neutral-50 rounded-2xl px-8 py-5 border border-neutral-100">
                <span className="font-heading text-5xl sm:text-6xl font-bold text-brand-600">
                  {daysLeft}
                </span>
                <span className="text-neutral-500 font-medium text-sm mt-1">
                  {daysLeft === 1 ? "day" : "days"} until your procedure
                </span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-medium">
                <span>Booked</span>
                <span>Procedure day</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-brand-500 to-brand-600 h-3 rounded-full transition-all duration-700 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-3 border-brand-600 rounded-full shadow-sm" />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                {timeline.map((step) => {
                  const isActive = daysLeft <= step.daysOut;
                  return (
                    <div key={step.daysOut} className="flex flex-col items-center">
                      <span className={`w-2 h-2 rounded-full ${isActive ? "bg-brand-500" : "bg-neutral-300"}`} />
                      <span className={`text-xs mt-1 ${isActive ? "text-brand-600 font-medium" : "text-neutral-400"}`}>
                        {step.daysOut === 0 ? "Day" : `-${step.daysOut}d`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {currentStep && (
              <div className={`rounded-2xl border p-5 sm:p-6 ${currentStep.bgColor}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 ${currentStep.color}`}>
                    {daysLeft === 0 ? "Today" : daysLeft === 1 ? "Tomorrow" : `${daysLeft} days away`}
                  </span>
                </div>
                <h3 className={`font-heading font-semibold text-lg mb-3 ${currentStep.color}`}>
                  {currentStep.heading}
                </h3>
                <p className="text-sm text-neutral-600 mb-4 font-medium">Here&apos;s what to focus on right now:</p>
                <ul className="space-y-2.5">
                  {currentStep.tasks.map((task, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-neutral-700">
                      <span className={`flex-shrink-0 mt-0.5 ${currentStep.color}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <span className="leading-relaxed">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {daysLeft > 0 && (
              <div className="mt-5">
                <h4 className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wider">Coming up</h4>
                <div className="space-y-2">
                  {timeline
                    .filter((step) => step.daysOut < daysLeft)
                    .map((step) => {
                      const daysUntilStep = daysLeft - step.daysOut;
                      return (
                        <div key={step.daysOut} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                          <span className="w-8 h-8 bg-neutral-200 rounded-lg flex items-center justify-center text-xs font-semibold text-neutral-600">
                            {daysUntilStep === 0 ? "!" : `${daysUntilStep}d`}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-neutral-700">{step.heading}</p>
                            <p className="text-xs text-neutral-400">
                              {daysUntilStep === 1 ? "Tomorrow" : `In ${daysUntilStep} days`}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </>
        )}

        {isPast && (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-success-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-heading font-semibold text-neutral-800 text-lg mb-2">Procedure complete!</h3>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
              We hope everything went well. Remember to follow your doctor&apos;s post-procedure instructions and attend any follow-up appointments.
            </p>
          </div>
        )}

        {daysLeft === null && (
          <div className="text-center py-4">
            <p className="text-sm text-neutral-400">
              Enter your procedure date above to see your personalized prep timeline
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
