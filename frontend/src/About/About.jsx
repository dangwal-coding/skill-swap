import CustomNavbar from "../Components/Navbar.jsx";
import "./About.css";

const About = () => {
  return (
    <>
      <CustomNavbar />
      {/* Hero / Intro */}
      <div className="About-main">
        <div className="about-container text-center text-light">
          <header className="mb-4">
            <h1 className="headline display-2 fw-bold mb-3">
              About <span className="gradient-text">SkillSwap</span>
            </h1>
            <p className="lead intro-text">
              SkillSwap is a peer-to-peer learning community where anyone can teach, learn and
              collaborate. We remove barriers — no fees, no gatekeepers — only curious people
              sharing real skills.
            </p>
          </header>

          {/* Mission */}
          <section className="mission-section my-5">
            <h3 className="mb-3">Our Mission</h3>
            <p className="mb-4">
              We believe learning is best when it's social, practical, and shared. SkillSwap
              connects people who want to teach with those who want to learn — through short
              sessions, workshops, and ongoing mentorship.
            </p>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="feature-card h-100">
                  <i className="bi bi-lightbulb icon bounce" />
                  <h4>Learn Freely</h4>
                  <p>Discover topics from programming to pottery — for free.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card h-100">
                  <i className="bi bi-people icon pulse" />
                  <h4>Connect Globally</h4>
                  <p>Find peers and mentors across timezones and cultures.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-card h-100">
                  <i className="bi bi-star-fill icon rotate" />
                  <h4>Grow Together</h4>
                  <p>Gain experience, feedback, and reputation while helping others.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="how-it-works my-5 text-start">
            <h3 className="mb-3">How it works</h3>
            <ol className="lead">
              <li>Sign up and create a short profile highlighting what you can teach and what you want to learn.</li>
              <li>Browse sessions or post your own — micro-lessons, workshops, or one-on-one help.</li>
              <li>Book, join, and rate — reputation helps trustworthy teachers stand out.</li>
            </ol>
          </section>

          {/* Community stats */}
          <section className="stats my-5">
            <div className="row text-center">
              <div className="col-4">
                <h4 className="display-6">10k+</h4>
                <p>Members</p>
              </div>
              <div className="col-4">
                <h4 className="display-6">3k+</h4>
                <p>Active Sessions</p>
              </div>
              <div className="col-4">
                <h4 className="display-6">500+</h4>
                <p>Topics Covered</p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="values my-5 text-start">
            <h3 className="mb-3">Our values</h3>
            <ul className="lead">
              <li>Openness — learning should be accessible to all.</li>
              <li>Respect — we build a supportive, feedback-driven community.</li>
              <li>Practicality — we prioritize hands-on, helpful sessions.</li>
            </ul>
          </section>

          {/* Testimonials (placeholder) */}
          <section className="testimonials my-5">
            <h3 className="mb-3">Community voices</h3>
            <div className="row g-3">
              <div className="col-md-6">
                <blockquote className="feature-card">
                  “I learned React basics in a single 90-minute session and now I mentor others — amazing!”
                  <footer className="mt-2">— Priya, learner & mentor</footer>
                </blockquote>
              </div>
              <div className="col-md-6">
                <blockquote className="feature-card">
                  “Hosting micro-workshops helped me build confidence and net new students.”
                  <footer className="mt-2">— Ahmed, teacher</footer>
                </blockquote>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="mt-4 text-center">
            <a href="./#join" className="btn btn-glow btn-lg me-3">
              🚀 Join the Community
            </a>
            <a href="./#contact" className="btn btn-outline-light btn-lg hover-glow">
              📩 Talk to Us
            </a>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      {/* FAQ */}
      <section className="faq-section my-5" aria-labelledby="faq-heading">
        <div className="container about-container text-light">
          <h3 id="faq-heading" className="mb-4">Frequently Asked Questions</h3>

          <details className="mb-3 feature-card">
            <summary className="fw-bold">Is SkillSwap really free to use?</summary>
            <div className="mt-2">
              Yes — core features on SkillSwap are free. We believe in open access to learning. We may
              offer optional paid features in the future (for example, verified profiles or promoted
              workshop listings), but free peer-to-peer sessions remain central to our mission.
            </div>
          </details>

          <details className="mb-3 feature-card">
            <summary className="fw-bold">Who can teach on SkillSwap?</summary>
            <div className="mt-2">
              Anyone with knowledge to share can create a session. We encourage clear descriptions,
              short previews, and honest expectations so learners can pick the right session.
              Community ratings and feedback help identify trusted teachers.
            </div>
          </details>

          <details className="mb-3 feature-card">
            <summary className="fw-bold">How do sessions work?</summary>
            <div className="mt-2">
              Sessions can be synchronous (live video / calls) or asynchronous (shared materials, Q&amp;A).
              Hosts set the session type, duration, and attendee limits. After the session, participants
              may leave ratings and feedback.
            </div>
          </details>

          <details className="mb-3 feature-card">
            <summary className="fw-bold">Is there moderation and safety?</summary>
            <div className="mt-2">
              Yes — SkillSwap relies on a mix of community moderation and reporting tools. We expect
              respectful behavior and provide blocking and reporting features. Serious violations can
              lead to account suspension.
            </div>
          </details>

          <details className="mb-3 feature-card">
            <summary className="fw-bold">How do I get started teaching?</summary>
            <div className="mt-2">
              Create a profile, add a short bio, and click "Create Session". Start small (a 30- to 90-minute
              session) and collect feedback. As you build reputation, learners will find and book your
              sessions more easily.
            </div>
          </details>

          <details className="mb-3 feature-card">
            <summary className="fw-bold">Where can I get help or report bugs?</summary>
            <div className="mt-2">
              Use the Contact form (linked in the header/footer) or email support@skillswap.example (placeholder).
              We review bug reports and feature requests regularly.
            </div>
          </details>
        </div>
      </section>

      <section className="cta-banner text-center py-5">
        <div className="container">
          <h2 className="fw-bold mb-3 text-light">Ready to swap skills? Start for free.</h2>
          <a href="./#join" className="btn btn-glow btn-lg">
            Get Started Free
          </a>
        </div>
      </section>
    </>
  );
};

export default About;
