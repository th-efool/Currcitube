import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { quizQuestions } from "@/data";

export function QuizSection() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => setSubmitted(true);

  const score = quizQuestions.filter((q) => answers[q.id] === q.correctIndex).length;

  return (
    <div className="bg-card rounded-2xl border border-border p-5">
      <h3 className="text-sm font-semibold font-[var(--font-display)] mb-4">Quick Quiz</h3>
      <div className="space-y-5">
        {quizQuestions.map((q, qi) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qi * 0.1 }}
          >
            <p className="text-sm font-medium mb-2">
              {qi + 1}. {q.question}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {q.options.map((opt, oi) => {
                const isSelected = answers[q.id] === oi;
                const isCorrect = q.correctIndex === oi;
                let style = "border-border hover:border-primary/30";
                if (submitted && isCorrect) style = "border-success bg-success/5";
                else if (submitted && isSelected && !isCorrect) style = "border-destructive bg-destructive/5";
                else if (isSelected) style = "border-primary bg-primary/5";

                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(q.id, oi)}
                    className={`text-left px-3 py-2 rounded-xl border-2 text-sm transition-all ${style}`}
                  >
                    <span className="flex items-center justify-between">
                      {opt}
                      {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-success" />}
                      {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < quizQuestions.length}
          className="mt-4 w-full py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all"
        >
          Check Answers
        </button>
      ) : (
        <div className="mt-4 text-center text-sm font-medium">
          You got <span className="text-primary">{score}/{quizQuestions.length}</span> correct!
        </div>
      )}
    </div>
  );
}
