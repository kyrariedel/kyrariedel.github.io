export function Experience() {
  return (
    <section id="experience">
      <h2 className="section-title">Experience</h2>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-role">Equities Technologies Intern</div>
          <div className="timeline-meta">June – August 2025</div>
          <div className="timeline-place">Millennium Management</div>
          <div className="timeline-desc">
            <ul>
              <li>
                Designed a mobile dashboard interface with over 30 graphs and highlighted
                data summaries, allowing all PMs to view metrics on-the-go
              </li>
            </ul>
          </div>
          <div className="badges">
            <span className="badge">JavaScript</span>
            <span className="badge">React</span>
            <span className="badge">TypeScript</span>
            <span className="badge">Node.js</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-role">Bioinformatics Analyst – Intern</div>
          <div className="timeline-meta">July – January 2023</div>
          <div className="timeline-place">New York Genome Center</div>
          <div className="timeline-desc">
            <ul>
              <li>
                Implemented robust matrix denoising (PCA) in R to analyze genomic copy
                number data, optimizing signal-to-noise ratio in genetic variation
                detection
              </li>
              <li>
                Tested the algorithm against competitors using R and identified key issues
                in the pipeline and design process
              </li>
              <li>
                Produced data visualizations using ggplot2 to show algorithm performance
                metrics compared to competing algorithms and presented the findings at
                NY Genomics and Human Genetics Symposium, January 2024
              </li>
            </ul>
          </div>
          <div className="badges">
            <span className="badge">R</span>
            <span className="badge">Python</span>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-role">Teaching Assistant for Algorithms and Data Structures</div>
          <div className="timeline-meta">January 2022 – July 2024</div>
          <div className="timeline-place">Northeastern University</div>
          <div className="timeline-desc">
            <ul>
              <li>Led weekly recitations for 20 students and one-on-one office hours for 100 students</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="resume-cta">
        <a
          href="resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Full Resume
        </a>
      </div>
    </section>
  );
}
