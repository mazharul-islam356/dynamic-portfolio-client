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
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded flex items-center gap-2"
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