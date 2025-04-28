import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Style/HeadlineSlider.css";

const HeadlineSlider = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await axios.get('http://localhost:5005/api/headlines');
        const visible = res.data.filter(h => h.status === 1);

        // Duplicate the full array enough times
        const repeatCount = 20; // Adjust for screen width
        const repeatedHeadlines = Array(repeatCount).fill(visible).flat();

        setHeadlines(repeatedHeadlines);
      } catch (err) {
        console.error('Error fetching headlines:', err);
      }
    };
    fetchHeadlines();
  }, []);

  if (headlines.length === 0) return null;

  return (
    <div className="headline-bar">
      <div className="headline-wrapper">
        <div className="headline-track">
          {headlines.map((h, i) => (
            <span key={i} className="headline-text">
              📰 {h.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeadlineSlider;
