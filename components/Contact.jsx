import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    inquiryPurpose: "",
    description: "",
    fullName: "",
    email: "",
    organization: "",
    phone: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated background orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5a0fd2]/15 rounded-full blur-[120px] animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-purple-600/10 rounded-full blur-[150px]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <section className="relative z-10 w-full py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with glow effect */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Let's Get In
              </span>
              <span className="relative ml-3">
                <span className="bg-linear-to-r from-purple-400 to-[#5a0fd2] bg-clip-text text-transparent">
                  Touch
                </span>
                <span className="absolute -inset-1 bg-linear-to-r from-purple-400 to-[#5a0fd2] blur-2xl opacity-30" />
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a question or want to work together? We'd love to hear from
              you.
            </p>
          </div>

          {/* Glowing form */}
          <form className="relative p-8 md:p-12 rounded-xl bg-linear-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/30 backdrop-blur-xl">
            {/* Form glow background */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-purple-500/5 via-transparent to-[#5a0fd2]/5" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name Input */}
              <div className="group">
                <label className="text-sm text-gray-400 mb-3 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your full name..."
                    className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 placeholder:text-gray-500 hover:border-gray-500"
                  />
                  {focusedField === "fullName" && (
                    <div className="absolute -inset-1 bg-purple-500/20 rounded-sm blur-lg -z-10 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div className="group">
                <label className="text-sm text-gray-400 mb-3 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email address..."
                    className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-sm focus:outline-none focus:border-[#5a0fd2] focus:ring-1 focus:ring-[#5a0fd2]/20 transition-all duration-300 placeholder:text-gray-500 hover:border-gray-500"
                  />
                  {focusedField === "email" && (
                    <div className="absolute -inset-1 bg-[#5a0fd2]/20 rounded-sm blur-lg -z-10 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Organization Input */}
              <div className="group">
                <label className="text-sm text-gray-400 mb-3 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  Organization
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("organization")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your organization..."
                    className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300 placeholder:text-gray-500 hover:border-gray-500"
                  />
                  {focusedField === "organization" && (
                    <div className="absolute -inset-1 bg-violet-500/20 rounded-sm blur-lg -z-10 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Phone Input */}
              <div className="group">
                <label className="text-sm text-gray-400 mb-3 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your phone number..."
                    className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 placeholder:text-gray-500 hover:border-gray-500"
                  />
                  {focusedField === "phone" && (
                    <div className="absolute -inset-1 bg-purple-500/20 rounded-sm blur-lg -z-10 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Message Textarea */}
              <div className="md:col-span-2 group">
                <label className="text-sm text-gray-400 mb-3  font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-purple-400 to-cyan-400" />
                  Your Message<span className="text-purple-400">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your message here..."
                    rows={6}
                    className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 placeholder:text-gray-500 resize-none hover:border-gray-500"
                  />
                  {focusedField === "message" && (
                    <div className="absolute -inset-1 bg-linear-to-r from-purple-500/20 to-[#5a0fd2]/20 rounded-sm blur-lg -z-10 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-center mt-4">
                <button
                  type="submit"
                  className="group relative px-12 py-3 w-full flex items-center justify-center cursor-pointer rounded-sm font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  {/* Button gradient background */}
                  <div className="absolute inset-0 bg-linear-to-r from-purple-700 to-[#5a0fd2] transition-all duration-300" />

                  {/* Button glow effect */}
                  <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-[#5a0fd2] rounded-sm blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full w-full group-hover:translate-x-full transition-transform duration-700" />

                  <span className="relative flex items-center gap-3 text-white">
                    Submit Form
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
