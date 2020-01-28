import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchProducts } from './components/FetchProducts';
import { Counter } from './components/Counter';
import {AddNewProduct } from './components/AddNewProduct'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/all-products' component={FetchProducts} />
        <Route path='/addNewProduct' component={AddNewProduct}/>
      </Layout>
    );
  }
}
