import { parse } from 'postcss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  removeItem,
  addQuantity,
  subtractQty
} from './actions/CartAction';

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    total: state.total,
    tax: 0.1
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => { dispatch(removeItem(id)) },
    addQuantity: (id) => { dispatch(addQuantity(id)) },
    subtractQty: (id) => { dispatch(subtractQty(id)) },
    submitOrder: () => {}
  }
}

class CartPage extends Component {

  handleRemoveItem = (id) => {
    this.props.removeItem(id);
  }

  handleIncreaseQty = (id) => {
    this.props.addQuantity(id);
  }

  handleDecreaseQty = (id) => {
    this.props.subtractQty(id);
  }

  handleSubmit = () => {
    this.props.submitOrder();
  }

  render() {

    let total = this.props.total;

    let vatFormat = parseFloat(this.props.tax*100).toFixed(0) + "%";
    
    let grandTotal = total + (total * this.props.tax);

    let addedItems = this.props.items.length ? 
    (
      this.props.items.map(item => {
        return (<div className="max-w-sm rounded lg:max-w-full lg:flex sm:flex md:flex shadow-lg" key={item.id}>
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overlflow-hidden"
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>  
            <div className="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between">
              <div className="flex items-center w-full">
                <div className="w-24 text-gray-900 font-bold text-xl mb-2">{item.name}</div> 

                <p className="ml-8 mb-2 rounded px-3 py-3 font-bold">${item.price}</p>

                <p className="ml-10 mb-2 bg-gray-100 rounded px-3 py-3 font-bold">x&nbsp;{item.quantity}</p>


                <div className="ml-10 mb-2">
                  <Link to="/cart" onClick={() => {this.handleIncreaseQty(item.id)}} className="bg-indigo-500 px-3 py-1 text-sm font-bold text-white mr-2 hover:bg-indigo-700 rounded"> + </Link>
                  <Link to="/cart" onClick={() => {this.handleDecreaseQty(item.id)}} className="bg-red-400 px-3 py-1 text-sm font-bold text-white hover:bg-red-500 rounded"> - </Link>

                </div>

                <div className="ml-10 mb-2">
                  <button onClick={() => {this.handleRemoveItem(item.id)}} className='bg-red-600 px-3 py-1 text-sm font-bold text-white hover:bg-red-500 rounded'>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>

              </div>
            </div>      
          </div>
          
        )
      })
    ) :

    (
      <div className="flex items-center">
        <p className="py-2 px-2 text-gray text-2xl text-center">Cart is empty!</p>
      </div>
    )

    return (<div>
      <div className="bg-gray-100 h-96 flex flex-wrap content-center">
        <div className="container">
          <h1 className="text-4xl text-center font-bold text-gray">Shopping Cart</h1>
        </div>
      </div>
      <div className="container">
        <h4 className="font-bold text-2xl text-md mt-5 text-left">Review Purchase</h4>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1 sm:w-full gap-4">
          {addedItems}
        </div>
        
      </div>
      <div className="container">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="col-span-2">

          <h5 className="font-bold text-2xl text-md mt-5 text-left">Order Details</h5>

          <hr className="mb-6 md:w-1/2"/>

            {/* sub total */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/6">
                <label className="block text-gray-500 font-bold mb-3 pr-4">Sub Total</label>
              </div>
              <div className="md:w-1/3">
                <input type="text" value={total} className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly/>
              </div>
            </div>
            {/* vat */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/6">
                <label className="block text-gray-500 font-bold mb-3 pr-4">VAT</label>
              </div>
              <div className="md:w-1/3">
                <input type="text" value={vatFormat} className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly/>
              </div>
            </div>
            {/* grand total */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/6">
                <label className="block text-gray-500 font-bold mb-3 pr-4">Grand Total</label>
              </div>
              <div className="md:w-1/3">
                <input type="text" value={grandTotal} className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" readOnly/>
              </div>
            </div>
            {/* button */}
            <div className="md:flex md:items-center mb-6">
              <button className="bg-indigo-400 text-white rounded hover:bg-indigo-600 py-3 px-3 font-thin uppercase"
              onClick={this.handleSubmit()}
              >
                Continue Checkout&nbsp;<i className="fa fa-chevron-right" aria-hidden="true"></i>
              </button>
            </div>

          </div>
          <div></div>
        </div>
      </div>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);