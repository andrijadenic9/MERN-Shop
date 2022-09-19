import React, { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';
import { ToastContainer, toast } from 'react-toastify';

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
                    toast.success('Product has been successfully added')
                }
            })
            .catch(err => {
                console.log('greska', err);
                toast.error('Something went wrong, try again')
            })
            .finally(() => {
                e.target[0].value = '';
                e.target[1].value = '';
                e.target[2].value = 'Choose category';
                e.target[3].value = '';
                e.target[4].value = '';
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
            <div className="add-product-wrapper">
                <div className="add-product-heading">
                    <h1>Add Product</h1>
                </div>
                <div className="col-md-6 mx-auto add-product-body">
                    <form onSubmit={onSubmit}>
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
                                <option>Choose category</option>
                                {allCategories &&
                                    allCategories.map((category, index) => {
                                        return <option value={category.nameLower} key={index}>{category.categoryName}</option>
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
                            <label htmlFor="img" style={{ color: 'white' }}>Choose Image</label>
                            <input type="file" className="form-control" id="img" onChange={handleFile} />
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%' }}>Add Product</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default AddProducts;
