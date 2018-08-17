import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.9,
  cheese: 1.2,
  meat: 2
};

class BurgerBuilder extends Component {
//  constructor(props) {
//    super(props);
//    this.state = {};


  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: !(this.state.purchasing) // this.state.purchasing ? false : true
    })
  }

  purchaseContinueHandler = () => {
    alert("Let's Continue!")
  }

  // purchaseCancelHandler = () => {
  //   this.setState({
  //     purchasing: false
  //   })
  // }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
    .map((ingKey) => ingredients[ingKey])
    .reduce((sum, el) => {
      return sum + el;
    }, 0)

    this.setState({
      purchaseable: sum
    })
  };

  addIngridientHandler = (type) => {
    let oldCount = this.state.ingredients[type];
    let newCount = oldCount + 1;
    let updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;
    let oldPrice = this.state.totalPrice;
    let newPrice = oldPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    })

    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
   let oldCount = this.state.ingredients[type];
   if (oldCount <= 0) return;
   let newCount = oldCount - 1;
   let updatedIngredients = {
     ...this.state.ingredients
   };
   updatedIngredients[type] = newCount;
   let oldPrice = this.state.totalPrice;
   let newPrice = oldPrice - INGREDIENT_PRICES[type];

   this.setState({
     ingredients: updatedIngredients,
     totalPrice: newPrice
   });

   this.updatePurchaseState(updatedIngredients);

  }

  render () {
    let disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    };

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded = {this.addIngridientHandler}
            ingredientRemoved = {this.removeIngredientHandler}
            disabled = {disabledInfo}
            price = {this.state.totalPrice}
            purchaseable = {this.state.purchaseable}
            ordered = {this.purchaseHandler}
           />
      </Aux>
    );
  }
}

export default BurgerBuilder;
