import React, { Component } from 'react';
import Announcement from 'react-announcement'
export class AddNewProduct extends Component {
    static displayName = AddNewProduct.name;

  constructor(props) {
    super(props);
    this.state = { name: '', quantityOnStorage: 0, price: 0};
    this.handleName=this.handleName.bind(this);
    this.handleQuantityOnStorage=this.handleQuantityOnStorage.bind(this);
    this.handlePrice=this.handlePrice.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }


  render() {
      return(
    <div>
      <p>Add new product to storage</p>
        <label>Product name</label>
        <input type="text" value={this.state.name} onChange={this.handleName}/><br></br>
        <label>Product quantity</label>
        <input type="number" value={this.state.quantityOnStorage} onChange={this.handleQuantityOnStorage}/><br></br>
        <label>Product price</label>
        <input type="text" value={this.state.price} onChange={this.handlePrice}/>
        <br></br>
        <button onClick={this.handleSubmit} className="btn btn-primary">Add new product</button>
        <Announcement
          title="Here is your component"
          subtitle="The best announcement component for React is finally here. Install it in all your projects."
          link="https://github.com/kristofferandreasen/react-announcement"
      />
    </div>
      )
  }

handleName(event){
    this.setState({name: event.target.value});
}

  handleQuantityOnStorage(event){
    if(isNaN(parseInt(event.target.value))==true){
        return;
    }
    this.setState({quantityOnStorage: parseInt(event.target.value)});
}

handlePrice(event){
    this.setState({price: event.target.value});
}

handleSubmit(event) {

    let newProduct ={
        "name": this.state.name,
        "countOnStorage": parseInt(this.state.quantityOnStorage),
        "price": parseFloat(this.state.price)
    };

fetch('api/Products', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newProduct)
})
                            


}

}