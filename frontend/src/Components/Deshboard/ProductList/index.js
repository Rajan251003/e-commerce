import React, { useEffect } from 'react'
import "./style.css"
import { Link } from "react-router-dom";
import { clearErrors, deleteProduct, getAdminProducts } from "../../../Redux/action/productAction";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../Layouts/MetaData"
import Sidebar from "../Sidebar"
import { DataGrid } from '@mui/x-data-grid';
import { DELETE_PRODUCT_RESET } from '../../../Redux/constant/productConstant';
import Toast from "../../Layouts/Toast"
import ToastContainerBox from "../../Layouts/ToastContainerBox"

const ProductList = ({ history }) => {

    const dispatch = useDispatch();

    const { error, products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );  

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            sortable: false, 
            minWidth: 280, 
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 90, 
            sortable: false,
            flex: 2,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            sortable: false,
            minWidth: 100,
            flex: 2,
        },
        { 
            field: "price",
            headerName: "Price",
            type: "number",
            sortable: false,
            minWidth: 150,
            flex: 3,
        }, 
        {
            field: "actions",
            flex: 3.5,
            headerName: "Edit & Delete",
            minWidth: 200, 
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>  
                        <Link className="editLink" to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            Edit
                        </Link>
                        <Link to={"#"} className="deleteLink" onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
                            Delete
                        </Link>
                    </>
                ); 
            },
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });

    useEffect(() => {
        if (error) {
            Toast({
                msg: error
            });
            
            dispatch(clearErrors());
        }

        if (deleteError) {
            Toast({
                msg: deleteError
            });

            dispatch(clearErrors());
        }

        if (isDeleted) { 
            Toast({
                msg: "Product Deleted succesfully"
            });

            history.push("/admin/products");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProducts());

    }, [dispatch, error, deleteError, isDeleted, history]);

    return (
        <>
            <MetaData title={`All Products Admin`} />
            <ToastContainerBox />
            <div className='deshboardContent'>
                <div className='deshboard'>
                    <Sidebar />
                </div> 
                <div className="productsListContainer">
                    <h1>All Products</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        disableColumnMenu
                        className="productsListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default ProductList