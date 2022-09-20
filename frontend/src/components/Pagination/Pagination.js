import React from 'react';
import { useState } from 'react';
import './pagination.scss';

function Pagination({ itemsPerPage, currentPage, setCurrentPage, totalItems }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            {pageNumbers.length > 1 && <nav className="d-flex justify-content-center align-items-center">
                <ul className="pagination">
                    <li className={`pagination-item page-item ${currentPage === 1 && 'disabled'}`}>
                        <a className="page-link" onClick={() => { setCurrentPage(prevState => prevState - 1) }}>Previous</a>
                    </li>
                    {pageNumbers.map((number) => {
                        return <li key={number} className={`pagination-item mx-1 ${currentPage === number ? 'active' : null}`}><a className="page-link" onClick={() => { setCurrentPage(number) }}>
                            {number}
                        </a>
                        </li>
                    })}
                    <li className={`pagination-item page-item ${currentPage === pageNumbers.length && 'disabled'}`}>
                        <a className="page-link" onClick={() => { setCurrentPage(prevState => prevState + 1) }}>Next</a>
                    </li>
                </ul>
            </nav>}
        </>
    )
}

export default Pagination;
