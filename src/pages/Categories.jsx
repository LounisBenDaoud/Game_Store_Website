import React, { useState } from "react";
import "./categories.css";
import filterListData from "../data/filterListData";
import GameCard from "../components/GameCard";

const Categories = React.forwardRef(({ games }, ref) => {
    const [data, setData] = useState(games);
    const [filters, setFilters] = useState(filterListData);
    const [isAnimating, setIsAnimating] = useState(false);
    const [text, setText] = useState("");

    const handleFilterGames = category => {
        setFilters(
            filters.map(filter => {
                filter.active = false;
                if (filter.name === category) {
                    filter.active = true;
                }
                return filter;
            })
        );
        setIsAnimating(true);
        setTimeout(() => {
            if (category === "All") {
                setData(games);
            } else {
                setData(games.filter(game => game.category === category));
            }
            setIsAnimating(false);
        }, 400);
    };


    const handleSearchGames = (e) => {
        setIsAnimating(true);
        const value = e.target.value;
        setText(value);
        setTimeout(() => {
            setData(games.filter(game => game.title.toLowerCase().includes(value.toLowerCase())));
            setIsAnimating(false);
        }, 400);
    };

    return (
        <section id="categories" className="categories" ref={ref}>
            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-lg-8 d-flex align-items-center justify-content-start">
                        <ul className="filters">
                            {filters.map((filter) => (
                                <li key={filter.id}
                                    className={`filter-item ${filter.active ? 'active' : 'undefined'}`}
                                    onClick={() => handleFilterGames(filter.name)}>
                                    {filter.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-lg-4 d-flex align-items-center justify-content-end">
                        <div className="search">
                            <i className="bi bi-search"></i>
                            <input type="text"
                                name="search"
                                value={text}
                                placeholder="Search"
                                onChange={handleSearchGames} />
                        </div>
                    </div>
                </div>
                <div className={`row category-anim${isAnimating ? ' animating' : ''}`}>
                    {data.map(game => (
                        <GameCard key={game._id} game={game} />
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Categories;
