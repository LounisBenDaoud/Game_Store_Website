import React from "react";
import "./bag.css";
import ShopBagItem from "../components/ShopBagItem";

const Bag = React.forwardRef(({ games }, ref) => {
    const total = React.useMemo(
        () => games
            .map(game => game.price * (1 - game.discount))
            .reduce((acc, curr) => acc + curr, 0)
            .toFixed(2),
        [games]
    );


    return (
        <section id="bag" className="bag" ref={ref}>
            <div className="container-fluid">
                <div className="row mb-3">
                    <h1>My Bag</h1>
                </div>
            </div>
            {
                games.length === 0 ? (
                    <h2>Your bag is empty</h2>
                ) : (
                    <>
                        <div className="row">
                            <div className="table-resposive">
                                <table className="shopBagTable table table-borderless align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">preview</th>
                                            <th scope="col">Game</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Discount</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {games.map((game, index) => (
                                            <ShopBagItem index={index} key={game._id} game={game} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-between mt-5">
                            <div className="col-lg-2 d-flex align-items-center">
                                <p className="itemCount"> Total Items: {games.length}</p>
                            </div>
                            <div className="col-lg-10 d-flex justify-content-end ">
                                <div className="payment">
                                    Total: {total}
                                    <a href="/" onClick={(event) => event.preventDefault()}>Check out <i className="bi bi-wallet-fill"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </section>
    );
});

export default Bag;
