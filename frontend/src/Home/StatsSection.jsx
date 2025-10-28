import React from "react";
import "./StatsSection.css";

const StatsSection = () => {
    return (
        <section className="stats-section pb-4" id="stats">
            <div className="container-fluid">
                <div className="stats-panel p-3 p-md-4">
                    <div className="text-center mb-4">
                        <h2 className="stats-title">Community stats</h2>
                        <p className="stats-subtitle">Growing every day across skills and cities</p>
                    </div>
                    <div className="row g-3 g-md-4">
                        <div className="col-6 col-md-3">
                            <div className="stat text-center">
                                <div className="stat-value">25k+</div>
                                <div className="stat-label">Users</div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="stat text-center">
                                <div className="stat-value">1.2k+</div>
                                <div className="stat-label">Skills</div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="stat text-center">
                                <div className="stat-value">18k+</div>
                                <div className="stat-label">Swaps</div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="stat text-center">
                                <div className="stat-value">140+</div>
                                <div className="stat-label">Cities</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
