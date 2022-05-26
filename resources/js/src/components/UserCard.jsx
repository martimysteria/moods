import { useEffect, useState } from "react";

export default function UserCard({
    id,
    user,
    date,
    description,
    mood,
    newUserCard,
    handleNewUserCard,
    handleSaveCard,
    editMode,
    handleEditMode,
    isValid,
}) {
    const [userHasInfo, setUserHasInfo] = useState(false);

    useEffect(() => {
        if (user !== "" && description !== "" && mood !== "") {
            setUserHasInfo(true);
        } else {
            setUserHasInfo(false);
        }
    }, [user, description, mood]);

    return (
        <div className="card shadow-sm" style={{ minHeight: "350px" }}>
            <div className="card-body d-flex flex-column justify-content-between">
                <div className="mb-4">
                    {userHasInfo && !editMode ? (
                        <div className="d-flex justify-content-between">
                            <p className="card-title fw-bold m-0">{user}</p>
                            <button
                                onClick={() =>
                                    handleEditMode(
                                        id,
                                        user,
                                        date,
                                        description,
                                        mood
                                    )
                                }
                                className="border-0 bg-transparent"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        width: "1.5em",
                                        height: "1.5em",
                                    }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <input
                                onChange={handleNewUserCard}
                                defaultValue={user}
                                name="user"
                                type="text"
                                className={
                                    isValid.user === true
                                        ? "form-control"
                                        : "form-control border-danger"
                                }
                                placeholder="User"
                            />
                            {isValid.user === false ? (
                                <p className="text-danger m-0">
                                    This field is required
                                </p>
                            ) : null}
                        </div>
                    )}
                    <p className="m-0 text-muted">{date}</p>
                </div>
                <div className="mb-4">
                    <p className="m-0 fs-6 fw-bold">DESCRIPTION</p>
                    {userHasInfo && !editMode ? (
                        <div style={{ minHeight: "60px" }}>
                            <p className="m-0">{description}</p>
                        </div>
                    ) : (
                        <div>
                            <textarea
                                onChange={handleNewUserCard}
                                name="description"
                                className={
                                    isValid.description === true
                                        ? "form-control"
                                        : "form-control border-danger"
                                }
                                placeholder="Write how you feel today..."
                                defaultValue={description}
                            ></textarea>
                            {isValid.description === false ? (
                                <p className="text-danger">
                                    This field is required
                                </p>
                            ) : null}
                        </div>
                    )}
                </div>
                {userHasInfo && !editMode ? (
                    <div>
                        <p className="m-0 fs-6 fw-bold">MOOD</p>
                        <button
                            className={
                                mood === "happy"
                                    ? "btn btn-primary rounded-pill w-100 py-1 fw-bold mb-2"
                                    : "btn btn-outline-primary rounded-pill w-100 py-1 fw-bold mb-2"
                            }
                            value="happy"
                            type="button"
                        >
                            I'm happy
                        </button>
                        <button
                            className={
                                mood === "angry"
                                    ? "btn btn-primary rounded-pill w-100 py-1 fw-bold mb-2"
                                    : "btn btn-outline-primary rounded-pill w-100 py-1 fw-bold mb-2"
                            }
                            value="angry"
                            type="button"
                        >
                            I'm angry
                        </button>
                        <button
                            className={
                                mood === "sad"
                                    ? "btn btn-primary rounded-pill w-100 py-1 fw-bold mb-2"
                                    : "btn btn-outline-primary rounded-pill w-100 py-1 fw-bold mb-2"
                            }
                            value="sad"
                            type="button"
                        >
                            I'm sad
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="m-0 fs-6 fw-bold">MOOD</p>
                        <button
                            onClick={handleNewUserCard}
                            name="mood"
                            className={
                                newUserCard.mood === "happy"
                                    ? "btn btn-primary rounded-pill w-100 py-1 fw-bold mb-2"
                                    : "btn btn-outline-primary rounded-pill w-100 py-1 fw-bold mb-2"
                            }
                            value="happy"
                            type="button"
                        >
                            I'm happy
                        </button>
                        <button
                            onClick={handleNewUserCard}
                            name="mood"
                            className={
                                newUserCard.mood === "angry"
                                    ? "btn btn-primary rounded-pill w-100 py-1 fw-bold mb-2"
                                    : "btn btn-outline-primary rounded-pill w-100 py-1 fw-bold mb-2"
                            }
                            value="angry"
                            type="button"
                        >
                            I'm angry
                        </button>
                        <button
                            onClick={handleNewUserCard}
                            name="mood"
                            className={
                                newUserCard.mood === "sad"
                                    ? "btn btn-primary rounded-pill w-100 py-1 fw-bold mb-2"
                                    : "btn btn-outline-primary rounded-pill w-100 py-1 fw-bold mb-2"
                            }
                            value="sad"
                            type="button"
                        >
                            I'm sad
                        </button>
                        {isValid.mood === false ? (
                            <p className="text-danger">
                                This field is required
                            </p>
                        ) : null}
                    </div>
                )}
                {userHasInfo && !editMode ? (
                    <div></div>
                ) : (
                    <div className="text-end mt-4">
                        <button
                            onClick={() => handleSaveCard(editMode)}
                            type="submit"
                            className="border-0 bg-transparent text-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    width: "2em",
                                    height: "2em",
                                    rotate: "90deg",
                                }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
