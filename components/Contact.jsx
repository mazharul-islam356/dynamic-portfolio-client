import React from 'react';

const Contact = () => {
    return (
        <div>
            <section className="w-full bg-black text-white py-16 px-6">
  <div className="max-w-6xl mx-auto">
 
    <h2 className="text-4xl font-bold mb-10">Let’s Get In Touch</h2>

 
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      <div className="flex items-start gap-4">
        <span className="text-xl">📞</span>
        <div>
          <p>+123 45 789 000</p>
          <p>+123 45 789 000</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <span className="text-xl">✉️</span>
        <div>
          <p>inquiry@ataraxis.ai</p>
          <p>help@ataraxis.ai</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <span className="text-xl">📍</span>
        <div>
          <p>221b Elementary Street</p>
          <p>New York, NY</p>
        </div>
      </div>
    </div>

    <hr className="border-gray-700 mb-14" />

    <p className="text-xl font-medium mb-8">Or fill out the form below</p>

   
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
      <div>
        <label className="text-sm mb-2 block">Inquiry Purpose*</label>
        <select className="w-full bg-gray-900 text-white border border-gray-700 p-3 rounded">
          <option>Choose one option...</option>
        </select>
      </div>

      <div>
        <label className="text-sm mb-2 block">Description that fits you*</label>
        <select className="w-full bg-gray-900 text-white border border-gray-700 p-3 rounded">
          <option>Choose one option...</option>
        </select>
      </div>

    
      <div>
        <label className="text-sm mb-2 block">Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name..."
          className="w-full bg-gray-900 text-white border border-gray-700 p-3 rounded"
        />
      </div>

    
      <div>
        <label className="text-sm mb-2 block">Inquiry Purpose</label>
        <input
          type="email"
          placeholder="Enter your email address..."
          className="w-full bg-gray-900 text-white border border-gray-700 p-3 rounded"
        />
      </div>

    
      <div>
        <label className="text-sm mb-2 block">Inquiry Purpose</label>
        <input
          type="text"
          placeholder="Enter your organization..."
          className="w-full bg-gray-900 text-white border border-gray-700 p-3 rounded"
        />
      </div>

     
      <div>
        <label className="text-sm mb-2 block">Phone Number</label>
        <input
          type="text"
          placeholder="Enter your phone number..."
          className="w-full bg-gray-900 text-white border border-gray-700 p-3 rounded"
        />
      </div>

      
      <div className="md:col-span-2">
        <label className="text-sm mb-2 block">Inquiry Purpose*</label>
        <textarea
          placeholder="Enter your message here..."
          rows="5"
          className="w-full bg-gray-900 text-white border border-gray-700 p-3 rounded"
        ></textarea>
      </div>

     
      <div className="md:col-span-2">
        <button
          className="bg-gray-100 w-full hover:bg-gray-200 text-center flex items-center justify-center text-black px-8 py-3 rounded  gap-2"
        >
          Submit Form →
        </button>
      </div>
    </form>
  </div>
</section>

        </div>
    );
};

export default Contact;

// import React, { useState } from 'react';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     inquiryPurpose: '',
//     description: '',
//     fullName: '',
//     email: '',
//     organization: '',
//     phone: '',
//     message: ''
//   });

//   const [focusedField, setFocusedField] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden relative">
//       {/* Animated background orbs */}
//       <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] animate-pulse delay-1000" />
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px]" />
      
//       {/* Grid pattern overlay */}
//       <div 
//         className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
//           backgroundSize: '50px 50px'
//         }}
//       />

//       <section className="relative z-10 w-full py-20 px-6">
//         <div className="max-w-6xl mx-auto">
//           {/* Header with glow effect */}
//           <div className="text-center mb-16">
//             <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm">
//               ✦ Contact Us
//             </span>
//             <h2 className="text-5xl md:text-6xl font-bold mb-6">
//               <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
//                 Let's Get In
//               </span>
//               <span className="relative ml-3">
//                 <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
//                   Touch
//                 </span>
//                 <span className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 blur-2xl opacity-30" />
//               </span>
//             </h2>
//             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//               Have a question or want to work together? We'd love to hear from you.
//             </p>
//           </div>

//           {/* Contact cards with glow */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
//             {[
//               { icon: '📞', title: 'Phone', lines: ['+123 45 789 000', '+123 45 789 000'], color: 'emerald' },
//               { icon: '✉️', title: 'Email', lines: ['inquiry@ataraxis.ai', 'help@ataraxis.ai'], color: 'cyan' },
//               { icon: '📍', title: 'Location', lines: ['221b Elementary Street', 'New York, NY'], color: 'violet' }
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
//               >
//                 {/* Card glow effect */}
//                 <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/0 to-${item.color}-500/0 group-hover:from-${item.color}-500/10 group-hover:to-transparent transition-all duration-500 rounded-2xl`} />
//                 <div className={`absolute -inset-1 bg-${item.color}-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
//                 <div className="relative flex items-start gap-4">
//                   <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-600/10 border border-${item.color}-500/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
//                     {item.icon}
//                   </div>
//                   <div>
//                     <h3 className="text-gray-400 text-sm font-medium mb-2">{item.title}</h3>
//                     {item.lines.map((line, i) => (
//                       <p key={i} className="text-white font-medium">{line}</p>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Divider with glow */}
//           <div className="relative mb-16">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-700/50" />
//             </div>
//             <div className="relative flex justify-center">
//               <div className="px-6 bg-black">
//                 <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse shadow-lg shadow-emerald-500/50" />
//               </div>
//             </div>
//           </div>

//           {/* Form section header */}
//           <div className="text-center mb-12">
//             <p className="text-2xl font-semibold text-white mb-2">
//               Or fill out the form below
//             </p>
//             <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto rounded-full shadow-lg shadow-emerald-500/50" />
//           </div>

//           {/* Glowing form */}
//           <form className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/30 backdrop-blur-xl">
//             {/* Form glow background */}
//             <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" />
            
//             <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Inquiry Purpose Select */}
//               <div className="group">
//                 <label className="text-sm text-gray-400 mb-3 block font-medium flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
//                   Inquiry Purpose<span className="text-emerald-400">*</span>
//                 </label>
//                 <div className="relative">
//                   <select
//                     name="inquiryPurpose"
//                     value={formData.inquiryPurpose}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField('inquiryPurpose')}
//                     onBlur={() => setFocusedField(null)}
//                     className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 appearance-none cursor-pointer hover:border-gray-500"
//                   >
//                     <option value="">Choose one option...</option>
//                     <option value="general">General Inquiry</option>
//                     <option value="support">Technical Support</option>
//                     <option value="sales">Sales</option>
//                     <option value="partnership">Partnership</option>
//                   </select>
//                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                     ▼
//                   </div>
//                   {focusedField === 'inquiryPurpose' && (
//                     <div className="absolute -inset-1 bg-emerald-500/20 rounded-xl blur-lg -z-10 animate-pulse" />
//                   )}
//                 </div>
//               </div>

//               {/* Description Select */}
//               <div className="group">
//                 <label className="text-sm text-gray-400 mb-3 block font-medium flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
//                   Description that fits you<span className="text-emerald-400">*</span>
//                 </label>
//                 <div className="relative">
//                   <select
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField('description')}
//                     onBlur={() => setFocusedField(null)}
//                     className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 appearance-none cursor-pointer hover:border-gray-500"
//                   >
//                     <option value="">Choose one option...</option>
//                     <option value="individual">Individual</option>
//                     <option value="startup">Startup</option>
//                     <option value="enterprise">Enterprise</option>
//                     <option value="agency">Agency</option>
//                   </select>
//                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                     ▼
//                   </div>
//                   {focusedField === 'description' && (
//                     <div className="absolute -inset-1 bg-cyan-500/20 rounded-xl blur-lg -z-10 animate-pulse" />
//                   )}
//                 </div>
//               </div>

//               {/* Full Name Input */}
//               <div className="group">
//                 <label className="text-sm text-gray-400 mb-3 block font-medium flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField('fullName')}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="Enter your full name..."
//                     className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 placeholder:text-gray-500 hover:border-gray-500"
//                   />
//                   {focusedField === 'fullName' && (
//                     <div className="absolute -inset-1 bg-emerald-500/20 rounded-xl blur-lg -z-10 animate-pulse" />
//                   )}
//                 </div>
//               </div>

//               {/* Email Input */}
//               <div className="group">
//                 <label className="text-sm text-gray-400 mb-3 block font-medium flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField('email')}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="Enter your email address..."
//                     className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 placeholder:text-gray-500 hover:border-gray-500"
//                   />
//                   {focusedField === 'email' && (
//                     <div className="absolute -inset-1 bg-cyan-500/20 rounded-xl blur-lg -z-10 animate-pulse" />
//                   )}
//                 </div>
//               </div>

//               {/* Organization Input */}
//               <div className="group">
//                 <label className="text-sm text-gray-400 mb-3 block font-medium flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
//                   Organization
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="organization"
//                     value={formData.organization}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField('organization')}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="Enter your organization..."
//                     className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 placeholder:text-gray-500 hover:border-gray-500"
//                   />
//                   {focusedField === 'organization' && (
//                     <div className="absolute -inset-1 bg-violet-500/20 rounded-xl blur-lg -z-10 animate-pulse" />
//                   )}
//                 </div>
//               </div>

//               {/* Phone Input */}
//               <div className="group">
//                 <label className="text-sm text-gray-400 mb-3 block font-medium flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField('phone')}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="Enter your phone number..."
//                     className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 placeholder:text-gray-500 hover:border-gray-500"
//                   />
//                   {focusedField === 'phone' && (
//                     <div className="absolute -inset-1 bg-emerald-500/20 rounded-xl blur-lg -z-10 animate-pulse" />
//                   )}
//                 </div>
//               </div>

//               {/* Message Textarea */}
//               <div className="md:col-span-2 group">
//                 <label className="text-sm text-gray-400 mb-3 block font-medium flex items-center gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
//                   Your Message<span className="text-emerald-400">*</span>
//                 </label>
//                 <div className="relative">
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     onFocus={() => setFocusedField('message')}
//                     onBlur={() => setFocusedField(null)}
//                     placeholder="Enter your message here..."
//                     rows={6}
//                     className="w-full bg-gray-900/80 text-white border border-gray-600/50 p-4 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 placeholder:text-gray-500 resize-none hover:border-gray-500"
//                   />
//                   {focusedField === 'message' && (
//                     <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur-lg -z-10 animate-pulse" />
//                   )}
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="md:col-span-2 flex justify-center mt-4">
//                 <button
//                   type="submit"
//                   className="group relative px-12 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
//                 >
//                   {/* Button gradient background */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600 transition-all duration-300" />
                  
//                   {/* Button glow effect */}
//                   <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  
//                   {/* Button shine effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
//                   <span className="relative flex items-center gap-3 text-white">
//                     Submit Form
//                     <svg 
//                       className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
//                       fill="none" 
//                       stroke="currentColor" 
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                     </svg>
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </form>

//           {/* Bottom decoration */}
//           <div className="flex justify-center mt-16 gap-2">
//             {[...Array(5)].map((_, i) => (
//               <div
//                 key={i}
//                 className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse"
//                 style={{ animationDelay: `${i * 200}ms` }}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;