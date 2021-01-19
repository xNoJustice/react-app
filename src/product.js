import { React, Component } from "react";
import { Button, Grid } from '@material-ui/core';
import { AddShoppingCart, Delete } from '@material-ui/icons';

const products = [
    {
        name: 'Product1',
        price: 5
    },
    {
        name: 'Product2',
        price: 10
    },
    {
        name: 'Product3',
        price: 15
    },
    {
        name: 'Product4',
        price: 20
    },
]

export default class Product extends Component {

    state = {
        cart: []
    }

    add = (product) => {
        this.setState(state => ({
            cart: [...state.cart, product]
        }))
    }

    remove = (product) => {
        this.setState(state => {
          const cart = [...state.cart];
          const productIndex = cart.findIndex(p => p.name === product.name);
          if (productIndex < 0) return;
          cart.splice(productIndex, 1)
          return ({
            cart
          })
        })
    }

    currencyOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }

    getTotal = () => {
        const total = this.state.cart.reduce((totalCost, item) => totalCost + item.price, 0);
        return total.toLocaleString(undefined, this.currencyOptions);
    }

    render() {
        return(
            <Grid
            container
            direction="column"
            alignItems="center"
            justify="center">
                <h1>
                    Shopping Cart: {this.state.cart.length} total items.
                </h1>
                <h2>
                    Total {this.getTotal()}$
                </h2>
                <div>
                    {products.map(product => (
                        <div key={product.name}>
                            <div>
                                <img src="https://picsum.photos/100" alt="" /> <br />
                                <h3>{product.name} - Price {product.price}$</h3> <br />
                            </div>
                            <div>
                                <Button startIcon={<AddShoppingCart />} variant="contained" color="primary" onClick={() => this.add(product)}>Add</Button> 
                                <Button startIcon={<Delete />}variant="contained" color="secondary" onClick={() => this.remove(product)}>Remove</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Grid>
        )
    }

}