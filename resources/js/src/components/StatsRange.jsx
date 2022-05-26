export default function StatsRange({ range, text }) {
    return (
        <div
            className="progress bg-transparent bg-info mb-2"
            style={{
                height: "30px",
            }}
        >
            <div
                className="progress-bar rounded bg-info text-dark fw-bold text-start ps-2"
                role="progressbar"
                style={{
                    width: `${range}%`,
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
            >
                {range}% {text}
            </div>
        </div>
    );
}
