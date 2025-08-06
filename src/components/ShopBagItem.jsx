import React, { useContext } from 'react'
import './shopbagitem.css'
import { AppContext } from '../App';

function ShopBagItem({ index, game }) {

    const { bag, setBag } = useContext(AppContext);

    const handleRemoveFromBag = (game) => {
        setBag(bag.filter(item => item._id !== game._id));
    }

    return (
        <tr className="shopBagItem">
            <th scope='row'>{index + 1}</th>
            <td><img src={game.img} alt="" className='img-fluid' /></td>
            <td>{game.title}</td>
            <td>${game.price.toFixed(2)}</td>
            <td>{(game.discount * 100)}%</td>
            <td>${((1 - game.discount) * game.price).toFixed(2)}</td>
            <td>
                <a href="#" onClick={() => handleRemoveFromBag(game)}>
                    <i className="bi bi-trash3-fill"></i>
                </a>
            </td>
        </tr>
    );
}

export default ShopBagItem;