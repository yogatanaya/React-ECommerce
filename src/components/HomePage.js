import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from './actions/CartAction';

const mapStateToProps = (state) => {
  return {
   items: state.items 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => { dispatch(addToCart(id)) }
  }
}

class HomePage extends Component {

  handleClick = (id) => {
    this.props.addToCart(id);
  } 

  render() {

    let itemRows = this.props.items.map(item => {

      return (<div className="max-w-sm rounded lg:max-w-full lg:flex shadow-lg">
        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overlflow-hidden"
        style={{ backgroundImage: `url(${item.img})` }}
        ></div>

        <div className="rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between">
          <div className="mb-8">
            <div className="text-gray-800 font-bold text-xl mb-2">{item.name}</div>
            <p className="text-gray-600 text-base">{item.description}</p>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-gray-900 text-2xl py-4">$&nbsp;{item.price}</p>
              <button className="bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-black hover:text-white" 
              onClick={() => this.handleClick(item.id)}>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </button>
              <button className="bg-indigo-500 rounded px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:bg-indigo-700">
                <i className="fa fa-share-alt" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

      </div>)
    });

    return (
    <div>
      <div className="bg-gray-100 h-96 flex flex-wrap content-center">
        <div className="container">
          <h1 className="text-4xl text-center font-bold text-gray">Shop</h1>
          <p className="font-thin text-2xl text-center">Enjoy Shopping</p>
        </div>
      </div>
      <div className="container">
        <h4 className="font-semibold text-2xl text-md mt-5 mb-6 text-center">Featured Products</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-1 sm:w-full gap-4">
          {itemRows}
        </div>
      </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);