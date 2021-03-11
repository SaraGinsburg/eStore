import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  //useSelector enables us to get the pieces of state we need:
  //loading, error and products
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listProducts()) //firing the action to get the list of products,
  }, [dispatch]) // send it through the reducer to the state

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
