import Lenovo from './Lenovo.png';
import Asus from './Asus.png';
import Dell from './Dell.png';
import ButtonAppBar from './ButtonAppBar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import React from "react";









class App extends React.Component {
  
  render() {
    
    return (
      <div className='my-app' >
        <ButtonAppBar/>
         <ItemsList/>
         
        
         
      </div>
    );
  }
}




class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {amount:0};
    this.buy = this.buy.bind(this);
    this.show = this.show.bind(this);
  }
  show() {
    this.props.handleShow(this.props.name);
  }

  buy() {
    this.setState({amount: this.state.amount + 1});
    alert('Are you sure you want to add this Item to Cart?');
    this.props.handleTotal(this.props.price);
  }

  render() {
    
    return (
      
      <div>
        

        
         <h4>{this.props.name}</h4>
          <p>{this.props.description}</p>
          <img src={this.props.image} alt="Lenovo" height={100} width={80}></img>
          <div><Button variant="contained" color="primary" onClick={this.buy}>Buy</Button></div>
          <Button variant="contained" color="primary" onClick={this.show} >Show</Button>
          <span> ${this.props.price}</span>
           (<IconButton color="primary" aria-label="add to shopping cart"> <AddShoppingCartIcon />
         : {this.state.amount}items)</IconButton>
  
      <hr/>
      </div>
  
      );
  }
}

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {total:0,
      
      items: [
             {image: require ('./Lenovo.png'),name:"Lenovo",description:"Core i5 - 4gb ram - 256gb SSD", price: 540},
             {image: require('./Dell.png'),name: "Dell",description: "Core i7 - 8gb ram - 1tb HDD",  price: 700},
             {image: require('./Asus.png'),name: "Asus",description: "Core i3 - 4gb ram - 512gb HDD",  price: 429}
              ]
            }
              this.calculate = this.calculate.bind(this);
              this.createItem = this.createItem.bind(this);
            }
          
  createItem(item) {
    this.setState({
      items: this.state.items.concat(item)
    });
  }
  calculate(price) {
    this.setState({total: this.state.total+price});
  }
    showDetails(name) {
    alert("This item "+name+" is available for free shipping");
    
  }
  render() {
    var theThis = this;
    var items = this.state.items.map(function(item)
     {
      return(
        
    
   
        <Item name={item.name} description={item.description} price={item.price} image={item.image}
        handleShow={theThis.showDetails}
        handleTotal={theThis.calculate}
         />
          
        );
    });

    return(
      <div>
        {items}
        <Total total={this.state.total}/>
        <ItemForm handleCreate={this.createItem}/>
      </div>
      );
  }
} 

class Total extends React.Component {
  render() {
    return (
      <div>
        <h3>Total: ${this.props.total}</h3>
      </div>
    )
  }
}

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    alert('Submitting '+this.refs.name.value);
    var item = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      price: parseInt(this.refs.price.value) || 0
    }
    this.props.handleCreate(item);

    this.refs.name.value = "";
    this.refs.description.value = "";
    this.refs.price.value = "";
 
  }

  

  render() {
    return (
      <Container maxWidth="sm">
      <form onSubmit = {this.submit}>
        <input type="text" placeholder="Item Name" ref="name" />
        <input type="text" placeholder="Item Description" ref="description" />
        <input type="text" placeholder="Item Price" ref="price" />
        <br/>
        <Button variant="contained" color="primary">Create</Button>
      </form>
      </Container>
      );
  }
}


export default App;