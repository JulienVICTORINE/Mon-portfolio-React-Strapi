import React, { useEffect, useState } from "react";

function App() {
  const baseUrl = "http://localhost:1337";
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [selectValue, setSelectValue] = useState("0");
  const [originalData, setOriginalData] = useState([]);

  async function getProjects() {
    const request = await fetch(
      baseUrl + "/api/projects?populate=technologies&populate=cover"
    );
    const response = await request.json();
    setOriginalData(response.data);
    setProjects(response.data);
  }

  useEffect(() => {
    getProjects();
  }, []);

  async function getTechnologies() {
    const request = await fetch(baseUrl + "/api/technologies");
    const response = await request.json();
    setTechnologies(response.data);
  }

  useEffect(() => {
    getTechnologies();
  }, []);

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
                  display: "inline-block",
                  marginTop: "10px",
                  color: "#007BFF",
                  textDecoration: "none",
                  paddingInline: "40%",
                  width: "200px",
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
