
// import ListItem from "./ListItem";
// import styles from "./OrderDetails.module.scss";

import React, { Component } from 'react';
import { Hidden } from '@material-ui/core';

class OrderDetails extends Component {
    

    constructor(props) {
        super(props);
    this.state = { orderDetails: [], loading: true };
   
  }

  componentDidMount() {
    //const state = this.props.location.state;
   // console.log(this.props.location.state.response)
    this.fetchOrdersData(this);
    
  }

   async fetchOrdersData(t) {
    console.log("fetching....")
    console.log(this.props.location.state.response)
    const response = await fetch('api/OrderDetails/'+this.props.location.state.response);
    const data =await response.json();
    t.setState({ orderDetails: data, loading: false });
    //this.setState({originOrders: data});
  //  console.log(this.state.orderDetails);
  }


  static renderOrdersTable(orders,contextz) {
       var total=0;
       console.log(orders);
        return (
    <>
      {<h3> {orders[0].idOrderDetails}, {orders[0].clientName}, {orders[0].adress}, {orders[0].postCode},{orders[0].orderDate}</h3> }
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Product</th>
            <th>Count</th>
            <th>Unit price</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order =>
            <tr key={order.idOrderDetails}>
              <td>{order.productName}</td>
              <td>{order.count}</td>
              <td>{order.unitPrice}</td>
              <td>{order.discount}</td>
              <td>{order.unitPrice * order.count * (100-order.discount)/100 }</td>
              <td hidden>{total+=order.unitPrice * order.count * (100-order.discount)/100} </td>
            </tr>
            )}
            <tr>
                <td></td><td></td><td></td><td></td><td>{total}</td>
            </tr>
        </tbody>
      </table>
    </>
  );
  }
    render() {
    let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    : OrderDetails.renderOrdersTable(this.state.orderDetails,this);
      return(
            <div>
                {contents}
            </div>
      )
  } 

}

export default OrderDetails;
