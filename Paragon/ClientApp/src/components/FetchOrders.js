import React, { Component } from 'react';

export class FetchOrders extends Component {
    static displayName = FetchOrders.name;

  constructor(props) {
    super(props);
    this.state = { orders: [], originOrders: [], loading: true };
    this.sortParameter="name";
    this.addNewOrder=this.addNewOrder.bind(this);
    this.sortOrders=this.sortOrders.bind(this);
    this.selectParamSortHandle=this.selectParamSortHandle.bind(this);
    this.compare=this.compare.bind(this);
    this.searchOrderByName=this.searchOrderByName.bind(this);
  }

  componentDidMount() {
    console.log("aloha")
    this.fetchOrdersData();
  }

    static renderOrdersTable(orders) {
        console.log(orders);
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
          {orders.map(order =>
            <tr key={order.idOrder}>
              <td>{order.name}</td>
              <td>{order.countOnStorage}</td>
              <td>{order.price}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchOrders.renderOrdersTable(this.state.orders);

    return (
      <div>
        <button className="btn btn-primary" onClick={this.addNewOrder}>Add new order</button><br></br>
        <button style={{marginTop: "5px"}} className="btn btn-success" onClick={this.sortOrders}>Sort</button>
        <label>Sort by:</label>
        <select className="form-control" style={{width: "300px"}} onChange={this.selectParamSortHandle}>
          <option value="name">name</option>
          <option value="quantity">quantity in storage</option>
          <option value="price">price</option>
        </select>
        <label>Search by name:</label>
        <input className="form-control" style={{width: "300px"}} type="text" placeholder="enter order name" onChange={this.searchOrderByName}/>
        <h1 id="tabelLabel" >All orders in storage</h1>
        <p>There you can see all orders in storage</p>
        {contents}
      </div>
    );
  }

  selectParamSortHandle(event){
    this.sortParameter=event.target.value;
    console.log(this.sortParameter);
  }

  addNewOrder(){
    this.props.history.push("addNewOrder");
  }

  sortOrders(){
    console.log(this.sortParameter);
    let sortedOrders = this.state.orders.sort(this.compare);
    this.setState({orders: sortedOrders}) 
    console.log(this.state.orders);
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

  searchOrderByName(event){
    let prodNameIncludesSearchPhase =[];
    for (let i = 0; i < this.state.originOrders.length; i++) {
        if(this.state.originOrders[i].name.toUpperCase().includes(event.target.value.toUpperCase())){
          prodNameIncludesSearchPhase.push(this.state.originOrders[i]);
        }
    }

    this.setState({orders: prodNameIncludesSearchPhase});
  }

 async fetchOrdersData() {
    const response = await fetch('api/Orders');
    const data =await response.json();
    this.setState({ orders: data, loading: false });
    this.setState({originOrders: data});
  }
}
