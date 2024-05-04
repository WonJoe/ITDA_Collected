import React from 'react';
import { IoDiamondOutline } from "react-icons/io5";

const Item = ({ item, index }) => {

    const {diamonds,price,basketDate} = item

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <span>{index + 1}</span>
            <span><IoDiamondOutline /> {diamonds}</span>
            <span>{basketDate}</span>
            <span>{price}원</span>
        </div>
    );
};

export default Item;