import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Row, Image, ListGroup, Form, Button, Card, Col} from "react-bootstrap"
import Message from "../components/Message";
import {addToCart, removeFromCard} from "../actions/cartActions";

function Cart({match, location, history}) {

    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);

    const removeFromCardHandler = (id) => {
        dispatch(removeFromCard(id))
    }

    const chechoutHandler = ()=> {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>shipping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your basket is empty! <Link to='/'>Go back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option style={{backgroundColor: "rgb(71, 76, 177)"}} value={x+ 1} key={ x+ 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type="button"
                                            onClick={() => removeFromCardHandler(item.product)}
                                            variant="primary">
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) =>  acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) =>  acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                        <button
                            type='button'
                            disabled={cartItems.length === 0}
                            onClick={chechoutHandler}
                            className='btn-primary'>
                            Proceed to Checkout
                        </button>
                    </ListGroup.Item>

                </Card>
            </Col>
        </Row>
    );
}

export default Cart;