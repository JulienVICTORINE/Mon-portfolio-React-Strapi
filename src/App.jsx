import React, { useEffect, useState } from "react";

function App() {
  const baseUrl = "http://localhost:1337";
  const [projects, setProjects] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  async function getProjects() {
    const request = await fetch(
      baseUrl + "/api/projects?populate=technologies&populate=cover"
    );
    const response = await request.json();
    setProjects(response.data);
  }

  useEffect(() => {
    getProjects();
  }, []);

  // Extraire toutes les technologies (name) depuis tous les projets
  const allTechnologies = projects
    .flatMap((project) => project.technologies || [])
    .map((tech) => tech.name);

  const technologies = [...new Set(allTechnologies)];

  // Filtrer les projets par technologie sélectionnée
  const filteredProjects = selectValue
    ? projects.filter((project) =>
        project.technologies?.some((tech) => tech.name === selectValue)
      )
    : projects;

  return (
    <div className="container">
      <h1>Mes projets</h1>

      <select onChange={(e) => setSelectValue(e.target.value)}>
        <option value="">Sélectionner une technologie</option>
        {technologies.map((technology, index) => (
          <option key={index} value={technology}>
            {technology}
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
        {filteredProjects.map((project) => {
          const { id, title, description, link, cover, technologies } = project;
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
              <div className="badges">
                {technologies.map((tech) => (
                  <span className="badge" key={tech.id}>
                    {tech.name}
                  </span>
                ))}
              </div>
              <h2 style={{ fontSize: "18px", marginTop: "10px" }}>{title}</h2>
              <p style={{ fontSize: "14px", color: "#fff" }}>{description}</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  color: "#007BFF",
                  textDecoration: "none",
                }}
              >
                Voir le projet
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
