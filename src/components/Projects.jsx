export function Projects() {
  return (
    <section id="projects">
      <h2 className="section-title">Projects</h2>
      <div className="project-card">
        <div className="project-title">MBTA Transit Analysis</div>
        <div className="project-date">September 2026 - Present</div>
        <div className="project-desc">
        <ul>
            <li>
            Built a PostgreSQL database and Python pipeline to load MBTA data (~849M rows) spanning 2020–2026, 
            with varying schemas and a GTFS station lookup to map raw IDs to stop names
            </li>
        </ul>
          <a
            href="https://github.com/kyrariedel/MBTA_Analysisr"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View on GitHub
          </a>
        </div>
        <div className="badges">
          <span className="badge">Python</span>
          <span className="badge">PostgreSQL</span>
        </div>
      </div>
      <div className="project-card">
        <div className="project-title">Yelp Star Rating Prediction</div>
        <div className="project-date">July 2026 - August 2026</div>
        <div className="project-desc">
        <ul>
            <li>
            Built a Spark MLlib pipeline to predict Yelp star ratings from review text using TF-IDF features 
            (stopwords, unigrams + bigrams) and compared Decision Tree vs. Random Forest regressors on RMSE, MAE, and ±1-star accuracy
            </li>
            <li>Scaled training from 1k to 1M reviews locally and on AWS EMR (Hadoop), 
              with a Makefile-driven Maven build for local, HDFS, and cluster runs</li>
        </ul>
          <a
            href="https://github.com/kyrariedel/YelpStarPrediction"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View on GitHub
          </a>
        </div>
        <div className="badges">
          <span className="badge">Scala</span>
          <span className="badge">Apache Spark</span>
          <span className="badge">AWS EMR</span>
          <span className="badge">Hadoop</span>
          <span className="badge">Maven</span>
        </div>
      </div>
      <div className="project-card">
        <div className="project-title">Photo / Video Editor</div>
        <div className="project-date">January 2026 - April 2026</div>
        <div className="project-desc">
        <ul>
            <li>
              Built a photo/video editor that applies filters and transformations using computer vision techniques.
            </li>
            <li>Adding additional photo editing features and improving user interface</li>
        </ul>
          <a
            href="https://github.com/kyrariedel/RisographPhotoEditor"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View on GitHub
          </a>
        </div>
        <div className="badges">
          <span className="badge">C++</span>
          <span className="badge">OpenCV</span>
        </div>
      </div>
      <div className="project-card">
        <div className="project-title">Patient Portal App</div>
        <div className="project-date">October 2024 – January 2025</div>
        <div className="project-desc">
          <ul>
            <li>
            Developed a CLI pipeline that searches and ranks ink-layer combinations for a 6-ink risograph palette, 
            exporting spot plates and print-ready files via CMake-wired OpenCV/ONNX Runtime dependencies
            </li>
            <li>
              Implemented a real-time Firebase database with server-side caching to enable secure, HIPAA-compliant communication between users, 
              ensuring data privacy and integrity
            </li>
          </ul>
          <a
            href="https://github.com/kyrariedel/PatientPortalApp"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View on GitHub
          </a>
        </div>
        <div className="badges">
          <span className="badge">Java</span>
          <span className="badge">Android</span>
          <span className="badge">Firebase Authorization</span>
          <span className="badge">Realtime Database</span>
        </div>
      </div>

      <div className="project-card">
        <div className="project-title">Stack Overflow Adaptation</div>
        <div className="project-date">February – May 2024</div>
        <div className="project-desc">
          <ul>
            <li>
            Developed a question board REST API with MongoDB, modeling schemas for questions, answers, comments, tags, 
            and accounts, while supporting search, sorting, voting, and author-only answer acceptance
            </li>
            <li>Computed reputation from post votes on profile read, and covered the API routes with Jest and Supertest</li>
          </ul>
          <a
            href="https://github.com/kyrariedel/StackOverflowClone"
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View on GitHub
          </a>
        </div>
        <div className="badges">
          <span className="badge">JavaScript</span>
          <span className="badge">React</span>
          <span className="badge">Express</span>
          <span className="badge">MongoDB</span>
        </div>
      </div>
    </section>
  );
}
