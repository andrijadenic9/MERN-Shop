import React, { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';
import EditCategoryModal from './Modals/EditCategoryModal';
import DeleteCategoryModal from './Modals/DeleteCategoryModal';

function Categories() {
    const [categories, setCategories] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);

    useEffect(() => {
        getAllCategories();
    }, []);

    function getAllCategories() {
        AdminService.getAllCategories()
            .then(res => {
                if (res.status === 200) {
                    setCategories(res.data)
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    function displayCategoriesLayout() {
        return categories.map((category, index) => {
            return <tr key={index}>
                <th>{index + 1}</th>
                <td>{category.categoryName}</td>
                <td>{category.nameLower}</td>
                <td>PRODUCTS</td>
                <td>
                    <div className="btns-wrapper">
                        <button className="btn btn-warning" onClick={e => editCategory(category)}>Edit</button>
                        <button className="btn btn-danger" onClick={e => deleteCategory(category)}>Delete</button>
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
            <div className="table-container">
                <table className="table table-striped table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Category</th>
                            <th scope="col">Lower name</th>
                            <th scope="col">Products</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{categories && displayCategoriesLayout()}</tbody>
                </table>
            </div>
            {isModalEdit && <EditCategoryModal showModal={setIsModalEdit} currentCategory={currentCategory} renderView={getAllCategories} />}
            {isModalDelete && <DeleteCategoryModal showModal={setIsModalDelete} currentCategory={currentCategory} renderView={getAllCategories} />}
        </>
    )
}

export default Categories;
