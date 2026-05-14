"use client";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    axios.get(
        "https://n8n-render-deployment-1.onrender.com/webhook/articles",     
      {
        timeout: 30000
      }
    )

  .then((response) => {

  console.log(response.data);

  setArticles(response.data);

  setLoading(false);

})

    .catch((error) => {

      console.log(error);

      setError(
        "Backend server is waking up. Please wait a few seconds and retry."
      );

      setLoading(false);

    });

  }, []);

  const filteredArticles = articles.filter((article) => {

    const matchesSearch =

      article.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())

      ||

      article.summary
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesSentiment =

            sentimentFilter === "All" ||

            article.sentiment
              ?.trim()
              .toLowerCase()

              ===

            sentimentFilter
              .trim()
              .toLowerCase();

   const matchesCategory =

            categoryFilter === "All" ||

            article.category
              ?.trim()
              .toLowerCase()

              ===

            categoryFilter
              .trim()
              .toLowerCase();

    return (
      matchesSearch &&
      matchesSentiment &&
      matchesCategory
    );

  });

  const getSentimentColor = (sentiment) => {

    if (!sentiment) {
      return "#ca8a04";
    }

    const lower = sentiment.toLowerCase();

    if (lower === "positive") {
      return "#16a34a";
    }

    if (lower === "negative") {
      return "#dc2626";
    }

    return "#ca8a04";
  };

  return (

    <div
      style={{
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
        fontFamily: "Arial",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #0B1120, #111827)",
        color: "white"
      }}
    >

      {/* Heading */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "clamp(28px, 5vw, 56px)",
          lineHeight: "1.3",
          fontWeight: "bold",
          letterSpacing: "1px",
          padding: "0 12px",
          color: "white"
        }}
      >
        AI Powered News Intelligence Platform
      </h1>

      {/* Loading */}

      {loading && (

        <h2
          style={{
            textAlign: "center",
            color: "white"
          }}
        >
          Loading articles...
          Backend server may take a few seconds to wake up.
        </h2>

      )}

      {/* Error */}

      {error && (

        <div
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >

          <h2
            style={{
              color: "red"
            }}
          >
            {error}
          </h2>

          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
              fontSize: "16px"
            }}
          >
            Retry
          </button>

        </div>

      )}

      {/* Dashboard */}

      {!loading && !error && (

        <>

          {/* Search */}

          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}

            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #374151",
              fontSize: "16px",
              backgroundColor: "#1f2937",
              color: "white"
            }}
          />

          {/* Filters */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "15px",
              marginBottom: "30px"
            }}
          >

            {/* Sentiment Filter */}

            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}

              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #374151",
                fontSize: "16px",
                backgroundColor: "#1f2937",
                color: "white"
              }}
            >

              <option value="All">All Sentiments</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>

            </select>

            {/* Category Filter */}

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}

              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #374151",
                fontSize: "16px",
                backgroundColor: "#1f2937",
                color: "white"
              }}
            >

              <option value="All">All Categories</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="science">Science</option>
              <option value="health">Health</option>
              <option value="sports">Sports</option>

            </select>

          </div>

          {/* Total Articles */}

          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
              marginTop: "10px"
            }}
          >
            <h2
              style={{
                fontSize: "21px",
                fontWeight: "bold",
                color: "white"
              }}
            >
              Total Articles: {filteredArticles.length}
            </h2>
          </div>

          {/* No Results */}

          {filteredArticles.length === 0 && (

            <h2
              style={{
                textAlign: "center",
                color: "white"
              }}
            >
              No articles found matching your filters.
            </h2>

          )}

          {/* Articles */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "20px"
            }}
          >

            {filteredArticles.map((article, index) => (

              <div
                key={index}

                style={{
                  border: "1px solid #374151",
                  padding: "25px",
                  borderRadius: "16px",
                  backgroundColor: "#111827",
                  color: "white",
                  transition: "0.3s",
                  cursor: "pointer",
                  minHeight: "700px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 0 15px rgba(59,130,246,0.15)"
                }}

                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}

                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >

                <div>

                  {/* Title */}

                  <h2
                    style={{
                      marginBottom: "20px",
                      textAlign: "center",
                      fontSize: "32px",
                      fontWeight: "bold",
                      lineHeight: "1.3"
                    }}
                  >
                    {article.title}
                  </h2>

                  {/* Source */}

                  <p>
                    <strong>Source:</strong> {article.source}
                  </p>

                  {/* Category */}

                  <p>
                    <strong>Category:</strong> {article.category}
                  </p>

                  {/* Published */}

                  <p>
                    <strong>Published:</strong> {new Date(article.published_date).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata"
                  })}
                  </p>

                  {/* Sentiment */}

                  <p style={{ marginTop: "10px" }}>

                    <strong>Sentiment:</strong>{" "}

                    <span
                      style={{
                        backgroundColor: getSentimentColor(article.sentiment),
                        padding: "6px 12px",
                        borderRadius: "20px",
                        color: "white",
                        fontWeight: "bold"
                      }}
                    >
                      {article.sentiment || "Neutral"}
                    </span>

                  </p>

                  {/* Summary */}

                  <p style={{ marginTop: "20px" }}>
                    <strong>Summary:</strong>
                  </p>

                  <p
                    style={{
                      lineHeight: "1.9",
                      fontSize: "16px",
                      color: "#d1d5db"
                    }}
                  >
                    {article.summary}
                  </p>

                  {/* Insights */}

                  <p
                    style={{
                      marginTop: "20px",
                      fontWeight: "bold",
                      fontSize: "24px",
                      textAlign: "center"
                    }}
                  >
                    Key Insights:
                  </p>

                  <div
                    style={{
                      backgroundColor: "#1f2937",
                      padding: "20px",
                      borderRadius: "12px",
                      marginTop: "15px",
                      lineHeight: "2",
                      fontSize: "15px",
                      color: "white",
                      textAlign: "center"
                    }}
                  >

                    {article.insights
                      ?.split("•")
                      .filter((insight) => insight.trim() !== "")
                      .map((insight, index) => (

                        <p
                          key={index}
                          style={{
                            marginBottom: "16px"
                          }}
                        >
                          - {insight.trim()}
                        </p>

                      ))}

                  </div>

                </div>

                {/* Button */}

                <a
                  href={article.link || article.article_url}
                  target="_blank"
                  rel="noreferrer"

                  style={{
                    display: "inline-block",
                    marginTop: "20px",
                    color: "#60a5fa",
                    textDecoration: "none",
                    fontWeight: "bold",
                    padding: "12px 16px",
                    border: "1px solid #2563eb",
                    borderRadius: "10px",
                    textAlign: "center"
                  }}
                >
                  Read Full Article
                </a>

              </div>

            ))}

          </div>

        </>

      )}

      {/* Footer */}

      <footer
        style={{
          textAlign: "center",
          marginTop: "60px",
          color: "#9ca3af",
          fontSize: "14px",
          paddingBottom: "20px"
        }}
      >
        AI Powered News Intelligence Platform • Built with React + Node.js + PostgreSQL + n8n + Groq AI
      </footer>

    </div>

  );

}

export default App;