import React, {useEffect, useState} from "react";
import './product.css'
import axios from "axios";


export default function Product({BASE_URL}) {
    const [currentProducts, setCurrentProducts] = useState([])
    const [options, setOptions] = useState([])
    const [productName, setProductName] = useState('')
    const [processName, setProcessName] = useState('')
    const [fgCode, setFgCode] = useState('')
    const [productCode, setProductCode] = useState('')
    const [maxQuantity, setMaxQuantity] = useState(0)
    const [startSno, setStartSno] = useState(0)

    async function refresh() {
        const product_list = await axios.get(BASE_URL + '/list/product/get/').catch(e => console.log(e))
        let currentProducts = []
        for (let i = 0; i < product_list.data.length; i++) {
            currentProducts.push(<tr>
                <td>{product_list.data[i].productName}</td>
                <td>{product_list.data[i].processName}</td>
                <td>{product_list.data[i].fgCode}</td>
                <td>{product_list.data[i].productCode}</td>
                <td>
                    <button type="submit" value={i} onClick={handleDelete} className="delete-btn">Delete</button>
                </td>
            </tr>)
        }
        setCurrentProducts(currentProducts)
    }

    async function getOptions() {
        let option = []
        const process_list = await axios.get(BASE_URL + '/list/process/get/').catch(e => console.log(e))
        for (let i = 0; i < process_list.data.length; i++) {
            option.push(<option value={process_list.data[i].processName.toString()}
                                key={i}>{process_list.data[i].processName.toString()}</option>)
        }
        setOptions(option)
        setProcessName(process_list.data[0].processName.toString())
    }


    async function handleChange(e) {
        e.preventDefault()
        setMaxQuantity(parseInt(e.target.value))
        const data = {
            productName: productName,
            maxQuantity: maxQuantity
        }
        const sno = await axios.post(BASE_URL + '/barcode/generate/', data)
        setStartSno(parseInt(sno.data))
    }

    async function handleDelete(e) {
        e.preventDefault()
        const product_list = await axios.get(BASE_URL + '/list/product/get/').catch(e => console.log(e))
        const data = {
            productName: product_list.data[e.target.value].productName
        }
        axios.post(BASE_URL + '/list/product/delete/', data).then(async () => await refresh())
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            productName: productName,
            processName: processName,
            fgCode: fgCode,
            productCode: productCode,
            maxQuantity: maxQuantity,
            startSno: startSno,
            endSno: startSno + maxQuantity-1
        }
        axios.post(BASE_URL + '/list/product/set/', data).then(async () => await refresh())
        setProductName('')
        setProcessName('')
        setFgCode('')
        setProductCode('')
        setMaxQuantity(0)
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
        <div className="table">
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
        </div>
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
                <label htmlFor="processName">Process Name:</label>
                <select id="processName"
                        name="processName"
                        value={processName}
                        onChange={(e) => setProcessName(e.target.value)}
                        required>{options}</select>
            </div>
            <div className="group-club">
                <div className="code-group">
                    <label htmlFor="fgCode">FG Code:</label>
                    <input type="text"
                           id="fgCode"
                           name="fgCode"
                           value={fgCode}
                           onChange={(e) => setFgCode(e.target.value)}
                           required/>
                </div>
                <div className="code-group">
                    <label htmlFor="productCode">Product Code:</label>
                    <input type="text"
                           id="productCode"
                           name="productCode"
                           value={productCode}
                           onChange={(e) => setProductCode(e.target.value)}
                           required/>
                </div>
            </div>
            <div className="group-club">
                <div className="code-group">
                        <label htmlFor="maxQuantity">Max. Quantity:</label>
                        <input type="number"
                               id="maxQuantity"
                               name="maxQuantity"
                               value={maxQuantity}
                               onChange={handleChange}
                               required/>
                </div>
                <div className="barcode-group">
                    <label htmlFor="startSno">Start S.No.: </label>
                    <input type="text" id="startSno" name="startSno" value={startSno} onChange={e => setStartSno(parseInt(e.target.value))}/>
                    <label htmlFor="endSno">End S.No.: </label>
                    <input type="text" id="endSno" name="endSno" value={startSno + maxQuantity-1} disabled/>
                </div>
            </div>
            <div className="product-form-group">
                <input type="submit" className="btn-submit" value="Submit"/>
            </div>
        </form>
    </div>
}