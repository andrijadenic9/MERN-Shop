import React from 'react';

function Pagination() {

    const arr = [1, 2, 3, 4, 5];

    return (
        <>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item">
                        <span className="page-link">Previous</span>
                    </li>
                    {arr.map((item, index) => {
                        return <li className="page-item"><a className="page-link" href="#">{index + 1}</a></li>
                    })}
                    {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active">
                        <span className="page-link">
                            2
                        </span>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li> */}

                    <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination;
