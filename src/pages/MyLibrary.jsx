import React from "react";
import "./myLibrary.css";

const MyLibrary = React.forwardRef(({ games }, ref) => (
  <section id="library" className="library" ref={ref}>
    <h1>My Library</h1>
  </section>
));

export default MyLibrary;
