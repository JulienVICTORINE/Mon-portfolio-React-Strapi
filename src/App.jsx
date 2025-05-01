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

  // Extraire toutes les technologies (name) uniques depuis tous les projets
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
    <div>
      <h1>Mes projets</h1>

      <select onChange={(e) => setSelectValue(e.target.value)}>
        <option value="">Sélectionner une technologie</option>
        {technologies.map((technology, index) => (
          <option key={index} value={technology}>
            {technology}
          </option>
        ))}
      </select>

      <div>
        {filteredProjects.map((project) => {
          const { id, title, description, link, cover } = project;
          const imageUrl = cover?.url;

          return (
            <div key={id} style={{ margin: "20px" }}>
              <h2>{title}</h2>
              <p>{description}</p>
              {imageUrl && (
                <img
                  src={baseUrl + imageUrl}
                  alt={title}
                  style={{ width: "300px" }}
                />
              )}
              <p>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Voir le projet
                </a>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
