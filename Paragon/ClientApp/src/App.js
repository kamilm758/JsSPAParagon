import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchProducts } from './components/FetchProducts';
import { Counter } from './components/Counter';
import {AddNewProduct } from './components/AddNewProduct'
import {FetchOrders} from './components/FetchOrders'
import OrderDetails from './components/OrderDetails'

import Modal from './components/Modal'
 
import {AddNewOrder} from './components/AddNewOrder'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
    })
  }
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    })
  }

  render () {
    const {isModalOpen} = this.state;
    return (
    <>
      <Layout openModalFn={this.openModal}>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/all-products' component={FetchProducts} />
        <Route path='/addNewProduct' component={AddNewProduct}/>
        <Route path='/addNewOrder' component={AddNewOrder}/>
        <Route path='/all-orders' component={FetchOrders}/>
        <Route path='/orderDetails' component={OrderDetails}/>
      </Layout>
      { isModalOpen && <Modal 
      closeModalFn={this.closeModal } /> }
    </>
    )
  }
}
