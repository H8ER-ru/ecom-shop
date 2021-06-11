import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, Image, ListGroup, Button, Card, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listProductDetails} from "../actions/productActions";

function Product({match, history}) {

    const  [qty,setQty] = useState(1);

    const dispatch = useDispatch()
    let productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to={`/`} className="btn btn-primary my-3">Go Back</Link>
            {loading ?
                <Loader/>
                : error
                ? <Message variant='danger'>{error}</Message>
                    :(
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} fluid/>
                            </Col>

                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>
                                                        {product.price}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    <strong>
                                                        {product.countInStock > 0 ? 'in Stock' : 'Out of Stock'}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col xs="auto" className="my-1">
                                                        <Form.Control
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()].map(x => (
                                                                    <option style={{backgroundColor: "rgb(71, 76, 177)"}} value={x+ 1} key={ x+ 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <Button
                                                onClick={addCartHandler}
                                                className='btn-block'
                                                disabled={product.countInStock === 0}
                                                type='button'>Add to Card</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )
            }
        </div>
    );
}

export default Product;