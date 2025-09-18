import React from 'react'
import './Cards.css'

const teachers = [
    {
        name: "Dylan",
        avatar: "https://framerusercontent.com/images/jYZcWolHIxpvAZUaqmToDEsdeE.png",
        learn: "React, JavaScript",
        teach: "UX Research, Python",
        match: "86%",
    },
    {
        name: "Amina",
        avatar: "https://framerusercontent.com/images/J4V6NtvEzzdIaoMonDGsZQRNE.png",
        learn: "UX Research, Python",
        teach: "React, JavaScript",
        match: "86%",
    },
    {
        name: "Robert",
        avatar: "https://framerusercontent.com/images/0OsK7Zcytq4T6IfjT7WuCd63EI.png",
        learn: "Swift, Figma, UI Design",
        teach: "Product Management",
        match: "89%",
    },
    {
        name: "William",
        avatar: "https://framerusercontent.com/images/jYZcWolHIxpvAZUaqmToDEsdeE.png",
        learn: "React, JavaScript, Python",
        teach: "Public Speaking, Guitar",
        match: "100%",
    },
    {
        name: "Emma",
        avatar: "https://framerusercontent.com/images/J4V6NtvEzzdIaoMonDGsZQRNE.png",
        learn: "UX Research, Python",
        teach: "Notion",
        match: "86%",
    },
    {
        name: "len",
        avatar: "https://framerusercontent.com/images/0OsK7Zcytq4T6IfjT7WuCd63EI.png",
        learn: "cloud, docker",
        teach: ".net, C#, Azure",
        match: "92%",
    },  {
        name: "Dylan",
        avatar: "https://framerusercontent.com/images/jYZcWolHIxpvAZUaqmToDEsdeE.png",
        learn: "React, JavaScript",
        teach: "UX Research, Python",
        match: "86%",
    },
    {
        name: "Amina",
        avatar: "https://framerusercontent.com/images/J4V6NtvEzzdIaoMonDGsZQRNE.png",
        learn: "UX Research, Python",
        teach: "React, JavaScript",
        match: "86%",
    },
]
function SkillChips({ text }) {
    const items = text.split(',').map(s => s.trim())
    return (
        <div className="chips">
            {items.map((it, idx) => (
                <span key={idx} className="chip">{it}</span>
            ))}
        </div>
    )
}

function MatchBar({ value }) {
    // value like "86%"
    const pct = parseInt(value, 10) || 0
    return (
        <div className="match-wrap" aria-hidden>
            <div className="match-row">
                <span className="match-label">Match</span>
                <span className="match-value">{value}</span>
            </div>
            <div className="match-track">
                <div className="match-fill" style={{ width: `${pct}%` }} />
            </div>
        </div>
    )
}

function Cards() {
    return (
        <section className="cards-section">
            <div className="relative w-full">
                <div className="cards-panel">
                    <div className="panel-overlay" />
                    <div className="panel-inner">
                        <div className="container">
                            <div className="cards-header text-center">
                                <h2 className="gradient-title">Find a match. Learn or teach.</h2>
                                <p className="muted">Browse mentors and learners nearby — filtered for skills you want to swap.</p>
                            </div>

                            <div className="cards-grid mt-5">
                                {teachers.map((t, i) => (
                                    <article key={i} className="card" tabIndex={0}>
                                        <div className="card-top">
                                            <div className="avatar">
                                                <img src={t.avatar} alt={`${t.name} avatar`} />
                                            </div>
                                            <div className="card-title">
                                                <h3>{t.name}</h3>
                                                <div className="role">Skill swap partner</div>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <h4>Can teach</h4>
                                            <SkillChips text={t.teach} />

                                            <h4>Wants to learn</h4>
                                            <SkillChips text={t.learn} />

                                            <MatchBar value={t.match} />
                                        </div>

                                        <div className="card-actions">
                                            <button type="button" className="btn btn-outline-primary">Start chat</button>
                                            <button type="button" className="btn btn-outline-dark">View profile</button>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="extra-features">
                                <div className="feature">🔥 Streaks & Badges</div>
                                <div className="feature">📅 Calendar</div>
                                <div className="feature">💰 Wallet</div>
                                <div className="feature">🎯 Goals</div>
                                <div className="feature">🔔 Reminders</div>
                            </div>
                        </div>{/* .container */}
                    </div>{/* .panel-inner */}
                </div>{/* .cards-panel */}
            </div>{/* .relative wrapper */}
        </section>
    )
}

export default Cards
