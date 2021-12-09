import {
  ADD_QUANTITY,
  ADD_TO_CART, REMOVE_ITEM, SUBTRACT_QUANTITY
} from '../actions/types/types';

import Item1 from '../../components/assets/img/item1.jpeg';
import Item2 from '../../components/assets/img/item2.jpeg';
import Item3 from '../../components/assets/img/item3.jpeg';
import Item4 from '../../components/assets/img/item4.jpeg';
import Item5 from '../../components/assets/img/item5.jpeg';
import Item6 from '../../components/assets/img/item6.jpeg';

const initState = {
  items: [
    {
      id: 1,
      sku: "001",
      name: "Red Tshirt",
      price: 10.0,
      description: "Red tshirt",
      img: Item1
    },
    {
      id: 2,
      sku: "002",
      name: "Blue Tshirt",
      price: 12.0,
      description: "Blue tshirt",
      img: Item2
    },
    {
      id: 3,
      sku: "003",
      name: "Green Tshirt",
      price: 11.5,
      description: "Green tshirt",
      img: Item3
    }, 
    {
      id: 4,
      sku: "004",
      name: "Purple Tshirt",
      price: 11.5,
      description: "Green tshirt",
      img: Item4
    },
    {
      id: 5,
      sku: "005",
      name: "Yellow Tshirt",
      price: 11.5,
      description: "Green tshirt",
      img: Item5
    }, 
    {
      id: 6,
      sku: "006",
      name: "Kemeja",
      price: 15.75,
      description: "Kemeja biru",
      img: Item6
    }
  ],
  addedItems: [],
  total: 0
}


const Cart = (state=initState, action) => {
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find(item => item.id === action.id)

    let existedItem = state.addedItems.find(item => action.id === item.id)

    if (existedItem) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price 
      }
    } else {
      addedItem.quantity = 1;
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal
      }
    }

  }

  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find(item => action.id === item.id)
    let newItems = state.addedItems.filter(item => action.id !== item.id)

    let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity);

    return {
      ...state,
      addedItems: newItems,
      total: newTotal
    }
  }

  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find(item => item.id === action.id)

    addedItem.quantity += 1;
    
    let newTotal = state.total + addedItem.price;

    return {
      ...state,
      total: newTotal
    }

  }

  if (action.type === SUBTRACT_QUANTITY) {
    let addedItem = state.items.find(item => item.id === action.id)

    if (addedItem.quantity === 1) {
      let newItems = state.addedItems.filter(item => item.id !== action.id)
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: newItems,
        total: newTotal
      }
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total- addedItem.price;
      return {
        ...state,
        total: newTotal
      }
    }
  }
  
  else {
    return state;
  }
}

export default Cart;