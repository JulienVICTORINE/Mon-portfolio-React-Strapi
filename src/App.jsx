/**
 * Main application component. Displays a list of projects with a filter by technology and a contact form.
 *
 * @component
 * @returns {JSX.Element} App root component
 */

import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

function App() {
  const baseUrl = "http://localhost:1337";

  /**
   * List of all fetched projects from Strapi.
   * @type {Array}
   */
  const [projects, setProjects] = useState([]);

  /**
   * List of all technologies from Strapi.
   * @type {Array}
   */
  const [technologies, setTechnologies] = useState([]);

  /**
   * Selected technology filter value (id as string).
   */
  const [selectValue, setSelectValue] = useState("0");

  /**
   * Stores the unfiltered list of projects.
   * @type {Array}
   */
  const [originalData, setOriginalData] = useState([]);

  /**
   * Fetches all projects with related technologies and cover images from the Strapi API.
   * Updates both `originalData` and `projects` state.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */

  // Récupère tous les projets
  async function getProjects() {
    const request = await fetch(
      baseUrl + "/api/projects?populate=technologies&populate=cover"
    );
    const response = await request.json();
    setOriginalData(response.data);
    setProjects(response.data);
  }

  /**
   * useEffect that triggers on mount to fetch projects from Strapi.
   */

  useEffect(() => {
    getProjects();
  }, []);

  /**
   * Fetches all technologies from the Strapi API.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */

  // Récupère toutes les technologies
  async function getTechnologies() {
    const request = await fetch(baseUrl + "/api/technologies");
    const response = await request.json();
    setTechnologies(response.data);
  }

  /**
   * On component mount, fetch the technologies.
   */

  useEffect(() => {
    getTechnologies();
  }, []);

  /**
   * Filters the projects by selected technology whenever `selectValue` changes.
   * If "0" is selected, shows all projects.
   */

  // Filtrer les projets en fonction de la technologie choisie
  useEffect(() => {
    var data = [...originalData];
    if (selectValue == "0") {
      setProjects(data);
    } else {
      data = data.filter((project) =>
        project.technologies.some((technology) => technology.id == selectValue)
      );
      setProjects(data);
    }
  }, [selectValue]);

  return (
    <div className="container">
      <h1>Mes projets</h1>

      <select onChange={(e) => setSelectValue(e.target.value)}>
        <option value="0">Sélectionner une technologie</option>
        {technologies.map((technology) => (
          <option key={technology.id} value={technology.id}>
            {technology.name}
          </option>
        ))}
      </select>

      <div
        className="card-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {projects.map((project) => {
          const { id, title, description, link, cover } = project;
          const imageUrl = cover?.url;

          return (
            <div
              className="card"
              key={id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {imageUrl && (
                <img
                  src={baseUrl + imageUrl}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
              <div className="badges" style={{ textAlign: "center" }}>
                {project.technologies.map((technology) => (
                  <span className="badge" key={technology.id}>
                    {technology.name}
                  </span>
                ))}
              </div>
              <h2
                style={{
                  fontSize: "18px",
                  marginTop: "10px",
                }}
              >
                {title}
              </h2>
              <p style={{ fontSize: "14px", color: "#fff" }}>{description}</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  margin: "10px auto 0", // top 10px, horizontal auto = centré
                  color: "#007BFF",
                  textDecoration: "none",
                  textAlign: "center",
                  width: "150px",
                  padding: "8px 16px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "6px",
                }}
              >
                Voir le projet
              </a>
            </div>
          );
        })}
      </div>

      <ContactForm />
    </div>
  );
}

export default App;
