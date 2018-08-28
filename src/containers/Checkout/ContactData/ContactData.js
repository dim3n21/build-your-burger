import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends React.Component {

  state = {
    name: 'Dmitry',
    email: 'test@gmail.com',
    address: {
      street: 'Los Angeles',
      zipCode: '90010',
      country: 'USA'
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Dmitry',
        address: {
          street: 'Los Angeles',
          zipCode: '90010',
          country: 'USA'
        },
        email: 'test@gmail.com'
      },
      deliveryMethod: 'fast'
    }
      axios.post('/orders.json', order)
        .then(response => {
          this.setState({ loading: false });
          this.props.history.push('/')
        })
        .catch(error => this.setState({ loading: false }))

  }

  render () {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name" />
        <input className={classes.Input} type="text" name="email" placeholder="Your email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="zip" placeholder="Zip code" />
        <Button clicked={this.orderHandler} btnType='Success'>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact info</h4>
        {form}
      </div>
    )

  }
}

export default ContactData;
