// FILE: src/app/contact/page.tsx
export default function ContactPage() {
  return (
    <section className="pt-20 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        For inquiries, please use the form below or reach out to us directly at contact@iitbhilai.ac.in.
      </p>
      {/* Formik/Yup integration can be added later */}
      <form className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full border p-2 rounded" />
        <input type="email" placeholder="Your Email" className="w-full border p-2 rounded" />
        <textarea placeholder="Your Message" className="w-full border p-2 rounded h-32"></textarea>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Send Message</button>
      </form>
    </section>
  );
}
