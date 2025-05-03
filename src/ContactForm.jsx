import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const baseUrl = "http://localhost:1337";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const form = useRef();
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      data: {
        ...formData,
        datecreation: new Date().toISOString(),
      },
    });

    console.log(data);

    //Enregistrer dans Strapi
    await fetch(`${baseUrl}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });

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

    // Reset le formulaire + inputs
    const formElement = document.querySelector("form");
    formElement.reset();
    setFormData({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 600, margin: "auto" }}
      ref={form}
    >
      <h2>Contactez-moi</h2>

      <div>
        <label htmlFor="name">Nom : </label>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: "14px", width: "400px", margin: "10px" }}
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
          style={{ padding: "14px", width: "400px", margin: "10px" }}
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
          style={{ padding: "14px", width: "400px", margin: "10px" }}
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
          style={{ padding: "14px", width: "400px", margin: "10px" }}
        />
      </div>

      <button type="submit">Envoyer</button>
    </form>
  );
}
