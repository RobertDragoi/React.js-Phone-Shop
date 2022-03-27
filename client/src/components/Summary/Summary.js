import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  clearOrderOperation,
  getOrderOperation,
} from "../../state/operations/orderOperations";
import { Link } from "react-router-dom";
import { Spinner } from "../Spinner";
import "./Summary.scss";

const Summary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderOperation(id));
  }, []);
  const { order, loading } = useSelector((state) => state.order);
  return (
    <>
      {loading ? (
        <Spinner/>
      ) : (
        <div>
          <div className="summary-title">
            <h1 className="summary-title-left">Comanda a fost plasată cu</h1>
            <h1 className="summary-title-right">succes!</h1>
          </div>
          {order?.products?.map((product, index) => (
            <div
              key={`summary_${index}`}
              className="row my-2 text-center text-capitalize"
            >
              <div className="col-10 mx-auto col-lg-2">
                <img
                  alt="img"
                  src={`${process.env.PUBLIC_URL}/${product.product.img}`}
                  style={{ width: "5rem", heigth: "5rem" }}
                  className="img-fluid"
                ></img>
              </div>
              <div className="col-10 mx-auto col-lg-2">
                {product.product.title}
              </div>

              <div className="col-10 mx-auto col-lg-2">
                <strong> Bucăți : {product.count} </strong>
              </div>

              <div className="col-10 mx-auto col-lg-2">
                <strong> Total produs : {product.total} Lei</strong>
              </div>
            </div>
          ))}

          <Link
            onClick={() =>
              setTimeout(() => dispatch(clearOrderOperation()), 100)
            }
            to={`/shop`}
            className="summary-title"
          >
            <h2 className="summary-title-left">Întoarce-te la</h2>
            <h2 className="summary-title-right">cumpărături!</h2>
          </Link>
        </div>
      )}
    </>
  );
};

export default Summary;
