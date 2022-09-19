import React, { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';
import EditCategoryModal from './Modals/EditCategoryModal';
import DeleteCategoryModal from './Modals/DeleteCategoryModal';
import './categories.scss';
import AddCategoryModal from './Modals/AddCategoryModal';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CategoryProductModal from './Modals/CategoryProductModal';
import { ToastContainer, toast } from 'react-toastify';


function Categories() {
    const [categories, setCategories] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
    const [allCategoryProducts, setAllCategoryProducts] = useState(null);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [isModalAdd, setIsModalAdd] = useState(false);
    const [isCategoryProductModal, setIsCategoryProductModal] = useState(false);

    useEffect(() => {
        getAllCategories();
    }, []);

    function getAllCategories() {
        AdminService.getAllCategories()
            .then(res => {
                if (res.status === 200) {
                    setCategories(res.data)
                    console.log(res.data, 'ovo je moj data');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const openCategoryProducts = (allProducts) => {
        setIsCategoryProductModal(true);
        setAllCategoryProducts(allProducts);
    }

    function displayCategoriesLayout() {
        return categories.map((category, index) => {
            return <tr key={index}>
                <th>{index + 1}</th>
                <td>{category.categoryName}</td>
                <td>{category.nameLower}</td>
                <td>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{category.allProducts.length}</span>
                        {
                            category.allProducts.length > 0 ?
                                <button className="btn btn-info" onClick={e => { openCategoryProducts(category.allProducts) }}><FaEye /></button> :
                                <button className="btn btn-danger" onClick={e => { toast.error('There is no product for this category!') }}><FaEyeSlash /></button>
                        }
                    </div>
                </td>
                <td>
                    <div className="btns-wrapper">
                        <button className="btn btn-warning" onClick={e => editCategory(category)}>Edit</button>
                        {
                            category.allProducts.length > 0 ?
                                <button className="btn btn-danger" onClick={e => toast.warning('Some products has this category so it can\'t be removed')}>Delete</button> :
                                <button className="btn btn-danger" onClick={e => deleteCategory(category)}>Delete</button>
                        }
                    </div>
                </td>
            </tr>
        });
    }

    const editCategory = (category) => {
        setIsModalEdit(true);
        setCurrentCategory(category);
    }

    const deleteCategory = (category) => {
        setIsModalDelete(true);
        setCurrentCategory(category);
    }

    return (
        <>
            <div className="add-category">
                <h1>Categories</h1>
                <button onClick={() => { setIsModalAdd(true) }}>Add new category</button>
            </div>
            <div className="table-categories-container">
                <table className="table table-striped table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Category</th>
                            <th scope="col">Lower name</th>
                            <th scope="col">Product number</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{categories ? displayCategoriesLayout() : null}</tbody>
                </table>
            </div>
            {isModalAdd && <AddCategoryModal showModal={setIsModalAdd} renderView={getAllCategories} />}
            {isModalEdit && <EditCategoryModal showModal={setIsModalEdit} currentCategory={currentCategory} renderView={getAllCategories} />}
            {isModalDelete && <DeleteCategoryModal showModal={setIsModalDelete} currentCategory={currentCategory} renderView={getAllCategories} />}
            {isCategoryProductModal && <CategoryProductModal showModal={setIsCategoryProductModal} allProducts={allCategoryProducts} />}

            <ToastContainer />
        </>
    )
}

export default Categories;
