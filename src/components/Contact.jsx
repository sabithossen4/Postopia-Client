// src/pages/Contact.jsx
const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6">
        Have questions or feedback? Feel free to reach out to us! 📩
      </p>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-3 rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border p-3 rounded-md"
          required
        />
        <textarea
          placeholder="Your Message"
          className="border p-3 rounded-md"
          rows="5"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
