import React from 'react';
import classes from './Order.css';


const Order = (props) => {


  return (
    <div className={classes.Order}>
      <p>Ingredients: - - - </p>
      <p>Proce: <strong>USD 5:45</strong></p>
    </div>
  )
}

export default Order;
