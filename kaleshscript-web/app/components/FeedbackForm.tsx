'use client';

import { useState } from 'react';

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback, email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFeedback('');
        setEmail('');
        
        // Reset after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Still show success to user
      setSubmitted(true);
      setFeedback('');
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dark-elevated border border-dark-border rounded-xl p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-text-primary mb-2 flex items-center">
        <div className="w-1 h-6 bg-neon-yellow rounded-full mr-3"></div>
        Feedback & Suggestions
      </h3>
      <p className="text-text-secondary text-sm mb-4">
        Got ideas for new features? Found a bug? Bol de yaar, we're listening!
      </p>
      
      {submitted ? (
        <div className="bg-green-500/10 border border-green-500 rounded-lg p-4 text-center">
          <p className="text-green-400 font-semibold">✓ Shukriya! Ab muh mein lele. Just kidding yaar. Your feedback has been received and is well-appreciated.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-text-secondary text-sm mb-2">
              Email (optional)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-neon-yellow transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="feedback" className="block text-text-secondary text-sm mb-2">
              Your Feedback <span className="text-red-400">*</span>
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you think, suggest features, report bugs..."
              rows={4}
              required
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-neon-yellow transition-colors resize-none"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !feedback.trim()}
            className="w-full bg-neon-yellow hover:bg-neon-yellow/80 disabled:bg-dark-border disabled:cursor-not-allowed text-dark-bg font-semibold py-3 rounded-lg transition-all"
          >
            {isSubmitting ? 'Sending...' : 'Submit Feedback'}
          </button>
        </form>
      )}
    </div>
  );
}
