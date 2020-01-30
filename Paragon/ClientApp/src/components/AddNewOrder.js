import React, { Component } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import SweetAlert from 'sweetalert2-react'
export class AddNewOrder extends Component {
    static displayName = AddNewOrder.name;

  constructor(props) {
    super(props);
    this.state = {orderedProducts:[],products: [], showAlert: false};
    this.name="";
    this.clientName="";
    this.count = "";
    this.clientAdress="";
    this.clientPostCode="";
    this.discount=0;
    this.fetchProductsData=this.fetchProductsData.bind(this);
    this.productNameHandle=this.productNameHandle.bind(this);
    this.productCountHandle=this.productCountHandle.bind(this);
    this.addProduct=this.addProduct.bind(this);
    this.addOrder=this.addOrder.bind(this);
    this.handleDiscount=this.handleDiscount.bind(this)
    this.handleClientName=this.handleClientName.bind(this)
    this.handleClientAdress=this.handleClientAdress.bind(this)
    this.handleClientPostCode=this.handleClientPostCode.bind(this)
  }

  componentDidMount() {
    this.fetchProductsData();
  }


  render() {
    let table =AddNewOrder.renderOrderedProductsTable(this.state.orderedProducts)

      return(
    <div>
      <p>Create new order</p>
        {table}
        <Autocomplete
            id="combo-box-demo"
            options={this.state.products}
            getOptionLabel={option => option.name}
            onChange={this.productNameHandle}
            style={{ width: 300 }}
            renderInput={params => (
            <TextField {...params} label="Choose product" variant="outlined" fullWidth />
      )}
    />
    <br></br>
    <label>Count</label>
    <input type="number"  className="form-control" onChange={this.productCountHandle}/><br></br>
    <button type=".button" onClick={this.addProduct} className="btn btn-success">Add product</button>
    <br></br>
    <br></br>
    <label>Discount</label>
    <input type="number" style={{width: "100px"}} onChange={this.handleDiscount} className="form-control" />
    <label>Client name</label>
    <input type="text" style={{width: "500px"}} onChange={this.handleClientName} className="form-control" />
    <br></br>
    <label>Client Adress</label>
    <input type="text" style={{width: "500px"}} onChange={this.handleClientAdress} className="form-control" />
    <br></br>
    <label>Client PostCode</label>
    <input type="text" style={{width: "500px"}} onChange={this.handleClientPostCode} className="form-control" />
    <br></br>
    <button type="button" className="btn btn-primary" onClick={this.addOrder}>Add order</button>

    <SweetAlert
        show={this.state.showAlert}
        title="Information"
        text="Added new order!"
        onConfirm={() => this.setState({ showAlert: false })}
      />

    </div>
      )
  }

static renderOrderedProductsTable(orderedProducts){
    return(
        <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ProductName</th>
            <th>OrderedCount</th>
            <th>UnitPrice</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {orderedProducts.map(product =>
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>{product.orderedCount}</td>
              <td>{product.unitPrice}</td>
              <td>{product.unitTotal}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
}

productNameHandle(event){
    this.name=event.target.innerText
    console.log(event.target.innerText);
}

productCountHandle(event){
       this.count=event.target.value;
       console.log(event.target.value);
}

addProduct(){
    let orderedProductsPom = this.state.orderedProducts;
    let currentProductPrice;
    for(let i=0;i<this.state.products.length;i++){
        if(this.name.toLocaleUpperCase()==this.state.products[i].name.toLocaleUpperCase()){
            currentProductPrice=this.state.products[i].price;
            break;
        }
    }

    let currentProduct={
        "name": this.name,
        "orderedCount": this.count,
        "unitPrice": currentProductPrice,
        "unitTotal": this.count*currentProductPrice
    }
    console.log(currentProduct);
    orderedProductsPom.push(currentProduct);
    this.setState({orderedProducts: orderedProductsPom});
}

addOrder(){
    console.log(this.state.orderedProducts);
    console.log(this.clientName);
    console.log(this.clientAdress);
    console.log(this.clientPostCode);
    console.log(this.discount);
    let orderedProducts = [];

    for(let i=0;i<this.state.orderedProducts.length;i++){
        orderedProducts.push({"name": this.state.orderedProducts[i].name,
        "orderedCount":parseInt(this.state.orderedProducts[i].orderedCount),
        "price":parseFloat( this.state.orderedProducts[i].unitPrice)
    })
    }

    let order={
        "clientName": this.clientName,
        "clientAdress": this.clientAdress,
        "clientPostCode": this.clientPostCode,
        "orderedProducts": orderedProducts,
        "discount": parseFloat(this.discount)
    }

    fetch('api/Orders', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
      })
    this.setState({showAlert: true});
}

async fetchProductsData() {
    const response = await fetch('api/Products');
    const data =await response.json();
    this.setState({products: data})
  }

  handleClientName(e){
      this.clientName=e.target.value;
  }
  handleClientAdress(e){
    this.clientAdress=e.target.value;
}
handleClientPostCode(e){
    this.clientPostCode=e.target.value;
}

handleDiscount(e){
    this.discount=e.target.value;
}

}