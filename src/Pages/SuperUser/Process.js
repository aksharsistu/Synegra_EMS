import React, {useEffect, useState} from 'react'
import './process.css'
import axios from "axios";

const BASE_URL = 'http://localhost:8000'

export default function Process() {
    const [currentProcesses, setCurrentProcesses] = useState([])
    const [processName, setProcessName] = useState('')
    const [processId, setProcessId] = useState('')

    async function refresh() {
        const process_list = await axios.get(BASE_URL + '/list/process/get/').catch(e=>console.log(e))
        let currentProcesses = []
        for (let i = 0; i < process_list.data.length; i++) {
            currentProcesses.push(<tr>
                <td>{process_list.data[i].processName}</td>
                <td>{process_list.data[i].processId}</td>
                <td><button type="submit" value={i} onClick={handleDelete} className="delete-btn">Delete</button></td>
            </tr>)
        }
        setCurrentProcesses(currentProcesses)
    }
    async function handleDelete(e) {
        e.preventDefault()
        const process_list = await axios.get(BASE_URL + '/list/process/get/').catch(e=>console.log(e))
        const data = {
            processName: process_list.data[e.target.value].processName
        }
        axios.post(BASE_URL + '/list/process/delete/', data).then(async () => await refresh()).catch(e=>console.log(e))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            processName: processName,
            processId: processId.toUpperCase()
        }
        axios.post(BASE_URL + '/list/process/set/', data).then(async ()=> await refresh()).catch(e=>console.log(e))
        setProcessName('')
        setProcessId('')
    }
    useEffect(() => {
        const effect = async () => {
            await refresh()
        }
        effect()
    }, [])


    return <div className="process-container">
        <h2>Current Processes</h2>
        <table>
            <thead>
            <tr>
                <th>Process Name</th>
                <th>Process ID</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {currentProcesses}
            </tbody>
        </table>
        <button className="refresh-button" onClick={refresh}>Refresh Table</button>
        <h2>Add/Modify Processes</h2>
        <form onSubmit={handleSubmit}>
            <div className="process-form-group">
                <label htmlFor="processName">Process Name</label>
                <input type="text"
                       id="processName"
                       name="processName"
                       value={processName}
                       onChange={(e) => setProcessName(e.target.value)}
                       required/>
            </div>
            <div className="process-form-group">
                <label htmlFor="process-name">Process ID:</label>
                <input type="text"
                       id="processId"
                       name="processId"
                       value={processId.toUpperCase()}
                       onChange={(e) => setProcessId(e.target.value)}
                       required/>
            </div>
            <div className="process-form-group">
                <input type="submit" className="btn-submit" value="Submit"/>
            </div>
        </form>
    </div>
}
