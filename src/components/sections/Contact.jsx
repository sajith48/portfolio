import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { FiMail, FiPhone, FiCheckCircle, FiSend } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FadeIn } from '../ui/FadeIn';
import { Magnetic } from '../ui/Magnetic';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    
    setIsSubmitting(true);
    const toastId = toast.loading('Sending message...');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
      );
      toast.success('Message Sent Successfully!', { id: toastId });
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      toast.error(err?.text || 'Failed to send message. Please check your config.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="space-y-12 scroll-mt-24 max-w-5xl mx-auto">
      <FadeIn>
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-text)]">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            Have a proposal or want to collaborate? Drop me a line!
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Contact Details Side */}
        <FadeIn delay={0.1} className="md:col-span-2 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[var(--color-text)]">Contact Info</h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              Feel free to send an email, dial the mobile link, or connect via LinkedIn and GitHub profiles. I look forward to connecting!
            </p>
          </div>

          <div className="space-y-4 pt-6">
            <a href="mailto:sajith482007@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-[var(--card-border)] hover:border-indigo-500/30 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                <FiMail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[var(--text-muted)] font-semibold">Email Address</div>
                <div className="text-sm font-bold text-[var(--color-text)]">sajith482007@gmail.com</div>
              </div>
            </a>

            <a href="tel:+918825822124" className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-[var(--card-border)] hover:border-indigo-500/30 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                <FiPhone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[var(--text-muted)] font-semibold">Phone Number</div>
                <div className="text-sm font-bold text-[var(--color-text)]">+91 88258 22124</div>
              </div>
            </a>
          </div>

          {/* Social handles */}
          <div className="flex gap-4 pt-6">
            <Magnetic>
              <a 
                href="https://github.com/sajith48" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-xl glass-panel border border-[var(--card-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--color-text)] hover:border-[var(--card-hover-border)] transition-all duration-300"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href="https://www.linkedin.com/in/%EA%9C%B1%E1%B4%80%E1%B4%8A%C9%AA%E1%B4%9B%CA%9C-%CA%80%E1%B4%80%E1%B4%8A%E1%B4%80-856a12327/" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-xl glass-panel border border-[var(--card-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--color-text)] hover:border-[var(--card-hover-border)] transition-all duration-300"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </Magnetic>
          </div>
        </FadeIn>

        {/* Contact Form with Floating Labels */}
        <FadeIn delay={0.2} className="md:col-span-3 glass-panel border-[var(--card-border)] rounded-3xl p-6 md:p-8 relative">
          <AnimatePresence>
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-color)]/95 backdrop-blur-md rounded-3xl p-6 z-20 text-center space-y-4"
              >
                <FiCheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
                <h3 className="text-2xl font-bold text-[var(--color-text)]">Message Sent Successfully!</h3>
                <p className="text-[var(--text-muted)] text-sm max-w-xs">
                  Thank you for writing. I will check your inquiry and follow up shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="relative">
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder=" " 
                  className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-[var(--color-text)]/5 border border-[var(--card-border)] text-[var(--color-text)] focus:outline-none focus:border-indigo-500 transition-all placeholder:opacity-0"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-4 top-4 -translate-y-1/2 text-[var(--text-muted)] text-xs transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:text-xs peer-focus:text-indigo-500 cursor-text"
                >
                  Your Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder=" " 
                  className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-[var(--color-text)]/5 border border-[var(--card-border)] text-[var(--color-text)] focus:outline-none focus:border-indigo-500 transition-all placeholder:opacity-0"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-4 top-4 -translate-y-1/2 text-[var(--text-muted)] text-xs transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:text-xs peer-focus:text-indigo-500 cursor-text"
                >
                  Email Address
                </label>
              </div>
            </div>

            {/* Message Input */}
            <div className="relative">
              <textarea 
                id="message" 
                required
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder=" " 
                className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-[var(--color-text)]/5 border border-[var(--card-border)] text-[var(--color-text)] focus:outline-none focus:border-indigo-500 transition-all placeholder:opacity-0 resize-none"
              />
              <label 
                htmlFor="message" 
                className="absolute left-4 top-6 -translate-y-1/2 text-[var(--text-muted)] text-xs transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-1/2 peer-focus:top-4 peer-focus:text-xs peer-focus:text-indigo-500 cursor-text"
              >
                Your Message
              </label>
            </div>

            <Magnetic>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Send Message <FiSend className="w-4 h-4" /></>
                )}
              </button>
            </Magnetic>
          </form>
        </FadeIn>
      </div>
    </section>
  );
};
