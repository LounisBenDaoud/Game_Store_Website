import React from "react";
import "./bag.css";

const Bag = React.forwardRef(({ games }, ref) => (
    <section id="bag" className="bag" ref={ref}>
        <h1>My Bag</h1>
    </section>
));

export default Bag;
