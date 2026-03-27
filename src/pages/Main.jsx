import React, { useEffect, useState, useRef, useContext } from "react";
import { AppContext } from "../App";
import "./main.css";
import SideMenu from "../components/SideMenu";
import Header from "./Header";
import Home from "./Home";
import Categories from "./Categories";
import MyLibrary from "./MyLibrary";
import Bag from "./Bag";

function Main() {
  const { library, bag } = useContext(AppContext);
  const [active, setActive] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const homeRef = useRef();
  const categoriesRef = useRef();
  const libraryRef = useRef();
  const bagRef = useRef();

  const sections = [
    {
      name: "home",
      ref: homeRef,
      active: true,
    },
    {
      name: "categories",
      ref: categoriesRef,
      active: false,
    },
    {
      name: "library",
      ref: libraryRef,
      active: false,
    },
    {
      name: "bag",
      ref: bagRef,
      active: false,
    },
  ];

  const handleToggleActive = () => {
    setActive(!active);
  };

  const handleSectionActive = (target) => {
    sections.map((section) => {
      section.ref.current.classList.remove("active");
      if (section.ref.current.id === target) {
        section.ref.current.classList.add("active");
      }
      return section;
    });
  };

  const fetchData = () => {
    setLoading(true);
    setError("");

    fetch("/api/gamesData.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((e) => {
        setError("Could not load games data.");
        setLoading(false);
        console.log(e.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <SideMenu active={active} sectionActive={handleSectionActive} />
      <div className={`banner ${active ? "active" : undefined}`}>
        <Header toggleActive={handleToggleActive} sectionActive={handleSectionActive} />
        <div className="container-fluid">
          {loading && <p>Loading games...</p>}
          {!loading && error && <p>{error}</p>}
          {games && games.length > 0 && (
            <>
              <Home games={games} ref={homeRef} handleSectionActive={handleSectionActive} />
              <Categories games={games} ref={categoriesRef} />
              <MyLibrary games={library} ref={libraryRef} />
              <Bag games={bag} ref={bagRef} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
