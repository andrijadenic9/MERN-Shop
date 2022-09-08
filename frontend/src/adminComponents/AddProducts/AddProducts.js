import React, { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';
import './add-products.scss';

function AddProducts() {
    const [file, setFile] = useState(null);
    const [allCategories, setAllCategories] = useState('');
    const [product, setProduct] = useState({
        userID: JSON.parse(localStorage.user)._id,
        rating: 0
    });

    useEffect(() => {
        AdminService.getAllCategories()
            .then(res => {
                if (res.status === 200) {
                    setAllCategories(res.data);
                    // console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
        // console.log(product);
    }, [product])

    const onSubmit = (e) => {
        e.preventDefault();
        let newProduct = new FormData();
        newProduct.append('product', JSON.stringify(product));
        newProduct.append('file', file);
        // console.log(newProduct.get('file').name,'GET IT');
        // console.log(newProduct,'NEWPRODUCT')
        AdminService.addProduct(newProduct)
            .then(res => {
                if (res.status === 200) {
                    // console.log('USPESNO DODATO');
                }
            })
            .catch(err => {
                console.log('greska', err);
            })
    }

    const handleInputs = (e) => {
        let newProduct = { ...product }
        newProduct[e.target.id] = e.target.value;
        setProduct(newProduct);
    }

    const handleFile = e => {
        setFile(e.target.files[0])
        // console.log(e.target.files[0]);
    }


    return (
        <>
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
                            {/* <option value="technology">Technology</option>
                            <option value="art">Art</option>
                            <option value="cars">Cars</option> */}
                            {allCategories &&
                                allCategories.map((category) => {
                                    return <option value={category.nameLower}>{category.categoryName}</option>
                                })
                            }
                        </select>
                        <label htmlFor="category">Category</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="price" placeholder="Price" onInput={handleInputs} />
                        <label htmlFor="price">Price</label>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="img">Choose Image</label>
                        {/* <input type="file" className="form-control" id="img" onChange={handleInputs} /> */}
                        <input type="file" className="form-control" id="img" onChange={handleFile} />
                        {/* <label htmlFor="img">Image</label>
                        <input type="file" class="form-control-file" id="img" /> */}
                    </div>
                    <div className="btns-wrapper">
                        <button className="btn btn-warning">Clear all</button>
                        <button className="btn btn-primary" onClick={onSubmit}>Add Product</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddProducts;
