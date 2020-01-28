import React, { Component } from 'react';

export class FetchProducts extends Component {
    static displayName = FetchProducts.name;

  constructor(props) {
    super(props);
    this.state = { products: [], loading: true };
  }

  componentDidMount() {
    this.fetchProductsData();
  }

    static renderProductsTable(products) {
        console.log(products);
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Count in storage</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product =>
            <tr key={product.idProduct}>
              <td>{product.name}</td>
              <td>{product.countOnStorage}</td>
              <td>{product.price}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchProducts.renderProductsTable(this.state.products);

    return (
      <div>
        <h1 id="tabelLabel" >All products in storage</h1>
        <p>There you can see all products in storage</p>
        {contents}
      </div>
    );
  }

  async fetchProductsData() {
    const response = await fetch('api/Products');
    const data = await response.json();
    this.setState({ products: data, loading: false });
  }
}
