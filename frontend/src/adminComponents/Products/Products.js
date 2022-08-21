<<<<<<< HEAD
import React from 'react';

function Products() {

    return (
        <>
            <h1>Products</h1>
=======
import React, { useState, useEffect } from 'react';
import './product.scss';

function Products() {

    const [product, setProduct] = useState({
        userID: JSON.parse(localStorage.user)._id,
        rating: 0
    });

    useEffect(() => {
        console.log(product);
    }, [product])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    }

    const handleInputs = (e) => {
        let newProduct = { ...product }
        newProduct[e.target.id] = e.target.value;
        setProduct(newProduct);
    }

    return (
        <>
            <h1>Products</h1>
            <h1>Add Product</h1>
            <div className="col-md-6 mx-auto">
                <form>
                    {/* <form> */}
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="title" placeholder="Title" onInput={handleInputs} />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="description" placeholder="Description" onInput={handleInputs} />
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select" id="category" aria-label="Category" onChange={handleInputs}>
                            <option value="technology">Technology</option>
                            <option value="art">Art</option>
                            <option value="cars">Cars</option>
                        </select>
                        <label htmlFor="category">Category</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="price" placeholder="Price" onInput={handleInputs} />
                        <label htmlFor="price">Price</label>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="img">Choose Image</label>
                        <input type="file" className="form-control" id="img" onChange={handleInputs} />
                        {/* <label htmlFor="img">Image</label>
                        <input type="file" class="form-control-file" id="img" /> */}
                    </div>
                    <div className="btns-wrapper">
                        <button className="btn btn-warning">Clear all</button>
                        <button className="btn btn-primary" onClick={onSubmit}>Add Product</button>
                    </div>
                </form>
            </div>
>>>>>>> 2a7aee10d0f2e3e12c538ad4d9e6352853b0a904
        </>
    )
}

export default Products;
