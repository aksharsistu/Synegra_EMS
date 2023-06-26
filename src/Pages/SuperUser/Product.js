import React, {useEffect, useState} from "react";
import './product.css'
import axios from "axios";

const BASE_URL = 'http://localhost:8000'

export default function Product() {
    const [currentProducts, setCurrentProducts] = useState([])
    const [options, setOptions] = useState([])
    const [productName, setProductName] = useState('')
    const [processName, setProcessName] = useState('')
    const [fgCode, setFgCode] = useState('')
    const [productCode, setProductCode] = useState('')

    async function refresh() {
        const product_list = await axios.get(BASE_URL + '/list/product/get/').catch(e=>console.log(e))
        let currentProducts = []
        for(let i = 0; i < product_list.data.length; i++) {
            currentProducts.push(<tr>
                <td>{product_list.data[i].productName}</td>
                <td>{product_list.data[i].processName}</td>
                <td>{product_list.data[i].fgCode}</td>
                <td>{product_list.data[i].productCode}</td>
                <td><button type="submit" value={i} onClick={handleDelete} className="delete-btn">Delete</button></td>
            </tr>)
        }
        setCurrentProducts(currentProducts)
    }
    async function getOptions() {
        let option = []
        const process_list = await axios.get(BASE_URL + '/list/process/get/').catch(e=>console.log(e))
        for(let i = 0; i < process_list.data.length; i++) {
            option.push(<option value={process_list.data[i].processName} key={i}>{process_list.data[i].processName}</option> )
        }
        setOptions(option)
    }

    async function handleDelete(e) {
        e.preventDefault()
        const product_list = await axios.get(BASE_URL + '/list/product/get/').catch(e=>console.log(e))
        const data = {
            productName: product_list.data[e.target.value].productName
        }
        axios.post(BASE_URL + '/list/product/delete/', data).then(async ()=> await refresh())
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            productName: productName,
            processName: processName,
            fgCode: fgCode,
            productCode: productCode
        }
        axios.post(BASE_URL + '/list/product/set/', data).then(async () => await refresh())
        setProductName('')
        setProcessName('')
    }
    useEffect(() => {
        const effect = async () => {
            await refresh()
            await getOptions()
        }
        effect()
    }, [])

    return <div className="product-container">
        <h2>Current Products</h2>
        <table>
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Process</th>
                <th>FG Code</th>
                <th>Prod. Code</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {currentProducts}
            </tbody>
        </table>
        <button className="refresh-button" onClick={refresh}>Refresh Table</button>
        <h2>Add/Modify Products</h2>
        <form onSubmit={handleSubmit}>
            <div className="product-form-group">
                <label htmlFor="productName">Product Name:</label>
                <input type="text"
                       id="productName"
                       name="productName"
                       value={productName}
                       onChange={(e) => setProductName(e.target.value)}
                       required/>
            </div>
            <div className="product-form-group">
                <label htmlFor="processName">Stage Name:</label>
                <select id="processName"
                        name="processName"
                        value={processName}
                        onChange={(e) => setProcessName(e.target.value)}
                        required>{options}</select>
            </div>
            <div className="product-form-group">
                <label htmlFor="fgCode">FG Code:</label>
                <input type="text"
                       id="fgCode"
                       name="fgCode"
                       value={fgCode}
                       onChange={(e) => setFgCode(e.target.value)}
                       required/>
            </div>
            <div className="product-form-group">
                <label htmlFor="productCode">Product Code:</label>
                <input type="text"
                       id="productCode"
                       name="productCode"
                       value={productCode}
                       onChange={(e) => setProductCode(e.target.value)}
                       required/>
            </div>
            <div className="product-form-group">
                <input type="submit" className="btn-submit" value="Submit"/>
            </div>
        </form>
    </div>
}