"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thanks for reaching out! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-2xl text-center">
        {/* Section Header */}
        <p className="text-green-400 font-medium text-sm mb-4 font-mono tracking-wider">What&apos;s Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Get In Touch
        </h2>
        <p className="text-slate-400 mb-12 max-w-lg mx-auto leading-relaxed">
          I&apos;m currently looking for new opportunities. Whether you have a question 
          or just want to say hi, my inbox is always open. I&apos;ll try my best to get 
          back to you!
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder-slate-600 transition-all duration-200"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white placeholder-slate-600 transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg resize-none text-white placeholder-slate-600 transition-all duration-200"
              placeholder="Hi John, I'd like to talk about..."
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <button type="submit" className="btn-primary px-12">
              Say Hello
            </button>
          </div>
        </form>

        {/* Or email directly */}
        <p className="mt-10 text-slate-500 text-sm">
          Or email me directly at{" "}
          <a href="mailto:hello@johndoe.com" className="text-green-400 hover:underline">
            hello@johndoe.com
          </a>
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-24 text-center">
        <p className="text-slate-600 text-sm">
          Designed & Built by John Doe
        </p>
        <p className="text-slate-700 text-xs mt-2">
          Built with Next.js & Tailwind CSS
        </p>
      </footer>
    </section>
  );
}
