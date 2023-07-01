import React, {useEffect, useState} from 'react'
import './home.css'
import axios from 'axios'


export default function Home({username, superuser, BASE_URL}) {
    const [barcode, setBarcode] = useState('')
    const [description, setDescription] = useState('')
    const [index, setIndex] = useState(0)
    const [stage, setStage] = useState('not defined')
    const [place, setPlace] = useState('end')
    const [options, setOptions] = useState([<option value=""></option>])
    const [processIds, setProcessIds] = useState([''])
    const [processNames, setProcessNames] = useState([''])
    const [message, setMessage] = useState('')
    const [override, setOverride] = useState(false)

    async function getStage() {
        const stg = await axios.get(BASE_URL + '/stage/get/').catch(err => setMessage(err))
        setStage(stg.data.stage.toString())
        setPlace(stg.data.place.toString())
    }

    async function getDetails() {
        const arr = await axios.get(BASE_URL + '/list/product/get/').catch(err => setMessage(err))
        setOptions(getOptions(arr.data))
        setProcessIds(getProcessIds(arr.data))
        setProcessNames(getProcessNames(arr.data))
    }

    function getOptions(list) {
        let options = []
        for (let i = 0; i < list.length; i++) {
            options.push(<option value={i} key={i}>{list[i].productName.toString()}</option>)
        }
        return options

    }

    function getProcessNames(list) {
        let processNames = []
        for (let i = 0; i < list.length; i++) {
            processNames.push(list[i].processName.toString())
        }
        return processNames
    }

    function getProcessIds(list) {
        let processIds = []
        for (let i = 0; i < list.length; i++) {
            processIds.push(list[i].processId.toString())
        }
        return processIds
    }

    useEffect(() => {
        getStage().catch(e => setMessage(e))
        getDetails().catch(e => setMessage(e))
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        const products = await axios.get(BASE_URL + '/list/product/get/')
        const data = {
            barcode: barcode,
            product: products.data[index].productName.toString(),
            username: username,
            stage: stage,
            place: place,
            description: description,
            override: override
        }
        axios.post(BASE_URL + '/barcode/', data)
            .then((r) => {
                console.log(r)
                setMessage(r.data)
            })
            .catch((err) => {
                console.log(err)
                setMessage('Error:' + err)
            })
        setTimeout(() => {
            setBarcode('')
            setDescription('')
        }, 3000)
        setOverride(false)
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
                    onChange={(e) => setIndex(parseInt(e.target.value))}
                >{options}</select>
            </div>
            <div className="barcode-form-group">
                <label htmlFor="stage">Stage:</label>
                <input type="text" id="stage" disabled value={stage + '-' + place.toUpperCase()}/>
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
            </div>
            <div className="barcode-form-group">
                <label htmlFor="description">Description/Permanent Barcode:</label>
                <input
                    type="number"
                    value={description}
                    onChange={(e) => setDescription(e.target.value.toString())}
                    max="9999999999999"
                    required={((processIds[index].indexOf(stage) !== -1) && (stage.includes('PCK') || stage === 'RWRK' || stage.includes('TS') || stage.includes('TU')))}
                    disabled={!((processIds[index].indexOf(stage) !== -1) && (stage.includes('PCK') || stage === 'RWRK' || stage.includes('TS') || stage.includes('TU')))}
                    id="description"/>
            </div>
            <div className="barcode-form-group">
                <button type="submit">Submit</button>
            </div>
            <div className="barcode-form-group">
                <span>Override multiple scans(to modify/QA/Rework): </span>
                <input type="checkbox" value={override} onChange={(e) => setOverride(e.target.value)} id="override"
                       disabled={!(superuser || place === 'qa' || place === 'rework')}/>
            </div>
        </form>
    </div>
}