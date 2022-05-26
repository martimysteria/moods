import React from "react";
import StatsRange from "./StatsRange";

export default function Statistic({ stats, date }) {
    return (
        <React.Fragment>
            <button
                className="btn btn-primary rounded-pill p-2 m-3 shadow"
                data-bs-toggle="modal"
                data-bs-target="#statsModal"
                style={{ position: "fixed", bottom: 0, right: 0 }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "3em", height: "3em" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                </svg>
            </button>
            <div
                className="modal fade"
                id="statsModal"
                tabIndex="-1"
                aria-labelledby="statsModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0 align-items-start">
                            <div>
                                <p className="fw-bold fs-6 m-0">
                                    My Mood Statistic
                                </p>
                                <p className="m-0 text-muted">{date}</p>
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <StatsRange
                                range={stats.happy.value}
                                text={stats.happy.name}
                            />
                            <StatsRange
                                range={stats.angry.value}
                                text={stats.angry.name}
                            />
                            <StatsRange
                                range={stats.sad.value}
                                text={stats.sad.name}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
