import React, { useEffect} from 'react';
import {Row, Col} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function Home(props) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productsList)
    const {error, loading, products} = productList
    useEffect(() => {
        dispatch(listProducts())
    }, [])

    return (
        <div>
            <h1>latest Products</h1>

            {loading
                ? <Loader/>
                : error ? <Message variant="danger">{error}</Message>
                    :
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <ProductCard product={product}/>
                            </Col>
                        ))}
                    </Row>
            }
        </div>
    );
}

export default Home;