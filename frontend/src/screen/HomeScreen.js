import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux';
import Product from '../components/Product';
import { Row, Col } from "react-bootstrap";
import {Link} from 'react-router-dom';
import {fetchAllProduct} from '../actions/index';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = ({match}) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber ||1;
  const dispatch = useDispatch();
  const productList = useSelector(state=> state.productList);
  const {loading,error,products,page,pages} = productList;
  useEffect(()=>{
    dispatch(fetchAllProduct(keyword,pageNumber));
  },[dispatch,keyword,pageNumber]);
  
  
  return (
    <div>
      <Meta/>
      {!keyword ? <ProductCarousel/> : <Link to="/" className="btn btn-light">Go Back</Link>}
      <h1>Latest Product</h1>
      {loading ? <Loader/> : error ? (<Message>{error.message}</Message>) :  <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
      }
     <Paginate pages={pages} page={page} keyword={keyword ? keyword :''}></Paginate>
    </div>
  );
};




export default HomeScreen;



