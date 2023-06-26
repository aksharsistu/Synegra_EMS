import React, {useEffect, useState} from 'react'
import './home.css'
import axios from 'axios'

const BASE_URL = 'http://localhost:8000'

export default function Home({username}) {
    const [barcode, setBarcode] = useState('')
    const [description, setDescription] = useState('')
    const [index, setIndex] = useState(0)
    const [stage, setStage] = useState('not defined')
    const [options, setOptions] = useState([<option value=""></option>])
    const [processIds, setProcessIds] = useState([''])
    const [processNames, setProcessNames] = useState([''])
    const [message, setMessage] = useState('')

    async function getStage() {
        const stg = await axios.get(BASE_URL + '/stage/get/')
        setStage(stg.data.toString())
    }

    async function getDetails() {
        const num = await axios.get(BASE_URL + '/list/product/get/number/')
        setOptions((await getOptions(num)))
        setProcessIds((await getProcessIds(num)))
        setProcessNames((await getProcessNames(num)))
    }
    async function getOptions(num) {
        let options = []
        for (let i = 0; i < parseInt(num.data); i++) {
            const res = await axios.get(BASE_URL + '/list/product/get/' + i.toString() + '/')
            options.push(<option value={i} key={i}>{res.data.name.toString()}</option>)
        }
        return options

    }
    async function getProcessNames(num) {
        let processNames = []
        for (let i = 0; i < parseInt(num.data); i++) {
            const res = await axios.get(BASE_URL + '/list/product/get/' + i.toString() + '/')
            processNames.push(res.data.processName.toString())
        }
        return processNames
    }
    async function getProcessIds(num) {
        let processIds = []
        for (let i = 0; i < parseInt(num.data); i++) {
            const res = await axios.get(BASE_URL + '/list/product/get/' + i.toString() + '/')
            processIds.push(res.data.processId.toString())
        }
        return processIds
    }

    function handleSelect(e) {
        setIndex(parseInt(e.target.value))
    }
    
    useEffect(() => {
        getStage()
        getDetails()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        const product = await axios.get(BASE_URL + '/list/product/get/' + index.toString() + '/')
        const data = {
            barcode: barcode,
            product: product.data.name.toString(),
            username: username,
            stage: stage,
            description: description,
        }
        axios.post(BASE_URL + '/barcode/', data)
            .then((r) => console.log(r))
            .catch((err) => {
                console.log(err)
                setMessage('Error:' + err)
            })
        setBarcode('')
        setDescription('')
        setMessage('')
    }

    return <div className="barcode-container">
    <h2>Product Barcode Form</h2>
    <span className="message">{message}</span>
    <form id="barcodeForm" onSubmit={handleSubmit}>
      <div className="barcode-form-group">
       <label htmlFor="product">Product:</label>
        <select
            name="product"
            id="product"
            value={index}
            onChange={handleSelect}
        >{options}</select>
      </div>
      <div className="barcode-form-group">
        <label htmlFor="stage">Stage:</label>
        <input type="text" id="stage" disabled value={stage}/>
      </div>
      <div className="barcode-form-group">
        <label htmlFor="processId">Process ID:</label>
        <input type="text" id="processId" disabled value={processIds[index]}/>
      </div>
      <div className="barcode-form-group">
        <label htmlFor="processName">Process Name:</label>
        <input type="text" id="processName" disabled value={processNames[index]}/>
      </div>
      <div className="barcode-form-group">
        <label htmlFor="barcode">Barcode:</label>
        <input
            type="number"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value.toString())}
            disabled={!(processIds[index].indexOf(stage) !== -1)}
            max="999999999999"
            required
            id="barcode"/>
        <label htmlFor="description">Description</label>
      </div>
      <div className="barcode-form-group">
        <input
            type="number"
            value={description}
            onChange={(e) => setDescription(e.target.value.toString())}
            max="999"
            disabled={!((processIds[index].indexOf(stage) !== -1) && (stage === 'RWRK' ||stage.includes('TS') || stage.includes('TU')))}
            id="description"/>
      </div>
      <div className="barcode-form-group">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
}