import { useEffect, useState } from "react";
import Statistic from "./components/Statistic";
import UserCard from "./components/UserCard";

export default function App() {
    const [getCardsStatus, setGetCardsStatus] = useState("IDLE");
    const [editUserCard, setEditUserCard] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [statistics, setStatistics] = useState({
        happy: { name: "happy", value: 0 },
        angry: { name: "angry", value: 0 },
        sad: { name: "sad", value: 0 },
    });
    const [cards, setCards] = useState([
        {
            id: 1,
            user: "John Doe",
            date: 1653296702015,
            description: "I feel good today",
            mood: "happy",
        },
    ]);

    const [newUserCard, setNewUserCard] = useState({
        id: null,
        user: "",
        date: "",
        description: "",
        mood: "",
    });

    const [isValid, setIsValid] = useState({
        user: true,
        description: true,
        mood: true,
    });

    function handleNewUserCard(e) {
        setNewUserCard((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSaveCard() {
        if (newUserCard.user === "") {
            setIsValid((prevState) => ({
                ...prevState,
                user: false,
            }));
        } else {
            setIsValid((prevState) => ({
                ...prevState,
                user: true,
            }));
        }

        if (newUserCard.description === "") {
            setIsValid((prevState) => ({
                ...prevState,
                description: false,
            }));
        } else {
            setIsValid((prevState) => ({
                ...prevState,
                description: true,
            }));
        }

        if (newUserCard.mood === "") {
            setIsValid((prevState) => ({
                ...prevState,
                mood: false,
            }));
        } else {
            setIsValid((prevState) => ({
                ...prevState,
                mood: true,
            }));
        }

        if (
            newUserCard.user !== "" &&
            newUserCard.description !== "" &&
            newUserCard.mood !== ""
        ) {
            const newCards = [...cards];
            newCards.forEach((card) => {
                if (card.id === newUserCard.id) {
                    card.id = newUserCard.id;
                    card.user = newUserCard.user;
                    card.date = newUserCard.date;
                    card.description = newUserCard.description;
                    card.mood = newUserCard.mood;
                }
            });

            if (selectedUserId !== null) {
                updateCard(newUserCard);
            } else {
                postCards(newUserCard);
            }

            setCards(newCards);
            setEditUserCard(false);
            setEditMode(false);

            setNewUserCard({
                id: null,
                user: "",
                date: null,
                description: "",
                mood: "",
            });
        }
    }

    async function postCards(card) {
        try {
            const response = await fetch("/api/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(card),
            });
            if (response.ok) {
                const data = await response.json();
            } else {
                console.log(response.statusText);
            }
        } catch (error) {}
    }

    async function updateCard(card) {
        try {
            const response = await fetch("/api/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(card),
            });
            if (response.ok) {
                const data = await response.json();
            } else {
                console.log(response.statusText);
            }
        } catch (error) {}
    }

    async function initFetchCards() {
        try {
            setGetCardsStatus("PENDING");
            const response = await fetch("/api/moods");
            if (response.ok) {
                const data = await response.json();
                setCards(data);
                setGetCardsStatus("SUCCESS");
            } else {
                setGetCardsStatus("ERROR");
                setError(response.statusText);
            }
        } catch (err) {
            setGetCardsStatus("ERROR");
        }
    }

    function handleEditMode(id, user, date, description, mood) {
        setEditMode(true);
        setSelectedUserId(id);
        setNewUserCard({
            id: id,
            user: user,
            date: date,
            description: description,
            mood: mood,
        });
    }

    function calculatePercentage(totalCards) {
        const happy = totalCards.filter((card) => card.mood === "happy").length;
        const angry = totalCards.filter((card) => card.mood === "angry").length;
        const sad = totalCards.filter((card) => card.mood === "sad").length;

        let happyPercent = (100 * happy) / totalCards.length;
        let angryPercent = (100 * angry) / totalCards.length;
        let sadPercent = (100 * sad) / totalCards.length;

        setStatistics({
            happy: { name: "happy", value: Math.floor(happyPercent) },
            angry: { name: "angry", value: Math.floor(angryPercent) },
            sad: { name: "sad", value: Math.floor(sadPercent) },
        });
    }

    function formatDate(current) {
        var options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        var today = new Date(current);

        return today.toLocaleDateString("de-DE", options);
    }

    function renderIfEmpty() {
        if (cards === null || cards.length <= 0) {
            setEditUserCard(true);
            if (editUserCard === false) {
                let lastId = cards.length;
                setCards((prevState) => [
                    ...prevState,
                    {
                        ...newUserCard,
                        id: lastId + 1,
                        date: formatDate(Date.now()),
                    },
                ]);
                setNewUserCard((prevState) => ({
                    ...prevState,
                    id: lastId + 1,
                    date: formatDate(Date.now()),
                }));
            }
        }
    }

    useEffect(() => {
        initFetchCards();
        calculatePercentage(cards);
    }, []);

    useEffect(() => {
        renderIfEmpty();
        calculatePercentage(cards);
    }, [cards]);

    const sortById = cards.sort((a, b) => b.id - a.id);

    const cardsList = sortById.map((card) => (
        <div key={card.id} className="col">
            {card.id === selectedUserId ? (
                <UserCard
                    id={card.id}
                    user={card.user}
                    date={card.date}
                    description={card.description}
                    mood={card.mood}
                    newUserCard={newUserCard}
                    handleNewUserCard={handleNewUserCard}
                    handleSaveCard={handleSaveCard}
                    editMode={editMode}
                    handleEditMode={handleEditMode}
                    isValid={isValid}
                />
            ) : (
                <UserCard
                    id={card.id}
                    user={card.user}
                    date={card.date}
                    description={card.description}
                    mood={card.mood}
                    newUserCard={newUserCard}
                    handleNewUserCard={handleNewUserCard}
                    handleSaveCard={handleSaveCard}
                    editMode={null}
                    handleEditMode={handleEditMode}
                    isValid={isValid}
                />
            )}
        </div>
    ));

    return (
        <div>
            {getCardsStatus === "IDLE" ? <p>Welcome</p> : null}
            {getCardsStatus === "PENDING" ? <p>Loading data...</p> : null}
            {getCardsStatus === "ERROR" ? <p>There was a problem</p> : null}
            {getCardsStatus === "SUCCESS" ? (
                <div className="position-relative">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 mx-4 my-1">
                        {cardsList}
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setEditUserCard(true);
                            if (editUserCard === false) {
                                let lastId = cards.length;
                                setCards((prevState) => [
                                    ...prevState,
                                    {
                                        ...newUserCard,
                                        id: lastId + 1,
                                        date: formatDate(Date.now()),
                                    },
                                ]);
                                setNewUserCard((prevState) => ({
                                    ...prevState,
                                    id: lastId + 1,
                                    date: formatDate(Date.now()),
                                }));
                            }
                        }}
                        className="btn btn-primary rounded-pill p-2 m-3 shadow"
                        style={{ position: "fixed", bottom: 80, right: 0 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ width: "3em", height: "3em" }}
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </button>
                    <Statistic
                        stats={statistics}
                        date={
                            cards === null || cards.length <= 0
                                ? formatDate(Date.now)
                                : cards[0].date
                        }
                    />
                </div>
            ) : null}
        </div>
    );
}
