import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

/**
 * ContactForm component that sends a message to a Strapi backend and an email via EmailJS.
 *
 * @component
 *  * @example
 * return (
 *   <ContactForm />
 * )
 *
 * @returns {JSX.Element} The rendered contact form
 */

/**
 * Handles the contact form logic including state and submission.
 */

export default function ContactForm() {
  const baseUrl = "http://localhost:1337";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  /** @type {React.MutableRefObject<HTMLFormElement>} */
  const form = useRef();

  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const [status, setStatus] = useState({
    success: null,
    error: null,
  });

  /**
   * HUpdates form state on input change.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - Input change event
   */

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  /**
   * Validates the form fields.
   *
   * @returns {boolean} True if all fields are filled, false otherwise
   */
  const isValidForm = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.subject.trim() &&
      formData.message.trim()
    );
  };

  /**
   * Handles form submission, validates fields, stores the message in Strapi,
   * and sends it using EmailJS.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidForm()) {
      setStatus({ error: "All fields are required.", success: null });
      return;
    }

    // const data = JSON.stringify({
    //   data: {
    //     ...formData,
    //     datecreation: new Date().toISOString(),
    //   },
    // });

    try {
      // Send to Strapi
      await fetch(`${baseUrl}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            ...formData,
            datecreation: new Date().toISOString(),
          },
        }),
      });

      console.log(data);

      // Send email via EmailJS
      await emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
          publicKey: PUBLIC_KEY,
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );

      setStatus({ success: "Message sent successfully!", error: null });
      // Reset le formulaire + inputs
      const formElement = document.querySelector("form");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      formElement.reset();
    } catch (error) {
      setStatus({ error: err.message || "An error occurred.", success: null });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 600, margin: "auto" }}
      ref={form}
    >
      <h2>Contactez-moi</h2>

      {status.error && <p style={{ color: "red" }}>{status.error}</p>}
      {status.success && <p style={{ color: "green" }}>{status.success}</p>}

      <div>
        <label htmlFor="name">Nom : </label>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: "14px", width: "100%", margin: "10px 0" }}
        />
      </div>

      <div>
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: "14px", width: "100%", margin: "10px 0" }}
        />
      </div>

      <div>
        <label htmlFor="subject">Objet : </label>
        <input
          type="text"
          name="subject"
          placeholder="Objet"
          value={formData.subject}
          onChange={handleChange}
          style={{ padding: "14px", width: "100%", margin: "10px 0" }}
        />
      </div>

      <div>
        <label htmlFor="message">Message : </label>
        <textarea
          name="message"
          rows="6"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          style={{ padding: "14px", width: "100%", margin: "10px 0" }}
        />
      </div>

      <button type="submit">Envoyer</button>
    </form>
  );
}
