import React from "react";
import { Col } from "react-bootstrap";
import "./pagination.scss";

const Paginations = ({ paginaionMeta, setPageNo, total_page }) => {
  const totalPages = [];

  for (let i = 1; i < total_page + 1; i++) {
    totalPages.push(i);
  }
  return (
    <>
      <Col lg={12}>
        <div className="pagiantion_node">
          <button
            className="pagi_butt disable_next_pag_"
            onClick={() => setPageNo(paginaionMeta?.current_page - 1)}
            disabled={paginaionMeta?.current_page === 1}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          {totalPages.map((number) => {
            if (
              (number >= paginaionMeta?.current_page &&
                number <= paginaionMeta?.current_page + 2) ||
              (paginaionMeta?.current_page == total_page && number === 1)
            ) {
              return (
                <button
                  key={number}
                  className={`pagi_butt ${
                    paginaionMeta?.current_page == number ? "PageActive" : ""
                  }`}
                  onClick={() => setPageNo(number)}
                >
                  {number}
                </button>
              );
            }
            if (total_page - (paginaionMeta?.current_page + 2) !== 0) {
              if (
                number ==
                paginaionMeta?.paginaionMeta?.total / paginaionMeta?.per_page -
                  1
              ) {
                return (
                  <b style={{ display: "flex", alignItems: "flex-end" }}>
                    ....
                  </b>
                );
              }
              if (number === paginaionMeta?.total_page) {
                return (
                  <button
                    key={number}
                    className={`pagi_butt ${
                      paginaionMeta?.current_page === number ? "PageActive" : ""
                    }`}
                    onClick={() => setPageNo(number)}
                  >
                    {number}
                  </button>
                );
              }
            }
          })}
          <button
            className="pagi_butt disable_next_pag_"
            onClick={() => setPageNo(paginaionMeta?.current_page + 1)}
            disabled={paginaionMeta?.current_page === total_page}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </Col>
    </>
  );
};

export default Paginations;
