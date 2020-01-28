import React, { Component } from 'react';

export class FetchProducts extends Component {
    static displayName = FetchProducts.name;

  constructor(props) {
    super(props);
    this.state = { products: [], loading: true };
    this.sortParameter="name";
    this.addNewProduct=this.addNewProduct.bind(this);
    this.sortProducts=this.sortProducts.bind(this);
    this.selectParamSortHandle=this.selectParamSortHandle.bind(this);
    this.compare=this.compare.bind(this);
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
        <button className="btn btn-primary" onClick={this.addNewProduct}>Add new product</button><br></br>
        <button style={{marginTop="5px"}} className="btn btn-success" onClick={this.sortProducts}>Sort</button>
        <label>Sort by:</label>
        <select className="form-control" style={{width: "300px"}} onChange={this.selectParamSortHandle}>
          <option value="name">name</option>
          <option value="quantity">quantity in storage</option>
          <option value="price">price</option>
        </select>
        <h1 id="tabelLabel" >All products in storage</h1>
        <p>There you can see all products in storage</p>
        {contents}
      </div>
    );
  }

  selectParamSortHandle(event){
    this.sortParameter=event.target.value;
    console.log(this.sortParameter);
  }

  addNewProduct(){
    this.props.history.push("addNewProduct");
  }

  sortProducts(){
    console.log(this.sortParameter);
    let sortedProducts = this.state.products.sort(this.compare);
    this.setState({products: sortedProducts}) 
    console.log(this.state.products);
  }

compare( a, b ) {
    let aParam;
    let bParam;

    if(this.sortParameter=="name"){
        aParam=a.name;
        bParam=b.name;
    } else if(this.sortParameter=="quantity"){
      aParam=a.countOnStorage;
      bParam=b.countOnStorage;
    } else{
      aParam=a.price;
      bParam=b.price;
    }

    if ( aParam < bParam){
      return -1;
    }
    if ( aParam > bParam){
      return 1;
    }
    return 0;
  }

 async fetchProductsData() {
    const response = await fetch('api/Products');
    const data =await response.json();
    this.setState({ products: data, loading: false });
  }
}
