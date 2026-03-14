import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, MessageSquarePlus, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (rating === 0) return;
    const feedbacks = JSON.parse(localStorage.getItem("aha_feedback") || "[]");
    feedbacks.push({ rating, comment, date: new Date().toISOString() });
    localStorage.setItem("aha_feedback", JSON.stringify(feedbacks));
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setRating(0);
      setComment("");
      setSubmitted(false);
    }, 1800);
  }

  function handleClose() {
    setOpen(false);
    setRating(0);
    setComment("");
    setSubmitted(false);
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        type="button"
        data-ocid="feedback.open_modal_button"
        onClick={() => setOpen(true)}
        className="fixed top-20 right-4 z-50 flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-3 py-2 rounded-full shadow-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Open feedback"
      >
        <Star className="w-4 h-4 fill-white" />
        <span>Feedback</span>
      </motion.button>

      {/* Overlay + Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              onClick={handleClose}
            />
            <motion.div
              key="modal"
              data-ocid="feedback.dialog"
              initial={{ opacity: 0, scale: 0.92, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -12 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="fixed top-16 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-amber-100 p-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquarePlus className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-gray-800 text-base">
                    Share Your Feedback
                  </h3>
                </div>
                <button
                  type="button"
                  data-ocid="feedback.close_button"
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
                  aria-label="Close feedback"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-2 py-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                    <p className="font-semibold text-gray-700">Thank you!</p>
                    <p className="text-sm text-gray-500 text-center">
                      Your feedback helps us improve.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-sm text-gray-600 mb-2">
                      How would you rate your experience?
                    </p>
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          data-ocid="feedback.toggle"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHovered(star)}
                          onMouseLeave={() => setHovered(0)}
                          className="transition-transform hover:scale-110 focus:outline-none"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star
                            className="w-8 h-8"
                            style={{
                              fill:
                                star <= (hovered || rating)
                                  ? "#f59e0b"
                                  : "none",
                              stroke:
                                star <= (hovered || rating)
                                  ? "#f59e0b"
                                  : "#d1d5db",
                            }}
                          />
                        </button>
                      ))}
                    </div>

                    <Textarea
                      data-ocid="feedback.textarea"
                      placeholder="Leave a comment (optional)..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="resize-none text-sm mb-4 border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                      rows={3}
                    />

                    <Button
                      data-ocid="feedback.submit_button"
                      onClick={handleSubmit}
                      disabled={rating === 0}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold disabled:opacity-40"
                    >
                      Submit Feedback
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
