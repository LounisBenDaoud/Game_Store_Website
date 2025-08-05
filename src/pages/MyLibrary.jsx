import React from "react";
import "./myLibrary.css";
import GameCard from "../components/GameCard";

const MyLibrary = React.forwardRef(({ games }, ref) => {

  return (
    <section id="library" className="library" ref={ref}>
      <div className="container-fluid">
        <div className="row mb-3">
          <h1>My Library</h1>
        </div>
        <div className="row">
          {
            games.length === 0 ? (
              <h2>Your Library is empty</h2>
            ) : (
              games.map(game => <GameCard key={game._id} game={game} />)
            )
          }
        </div>
      </div>
    </section>
  );


});

export default MyLibrary;
