import React, {useEffect, useState} from 'react'
import './stage.css'
import axios from "axios";


export default function Stage({BASE_URL}) {
    const [currentStages, setCurrentStages] = useState([])
    const [ip, setIp] = useState('')
    const [stageId, setStageId] = useState('')
    const [place, setPlace] = useState('end')

    async function refresh() {
        const stage_list = await axios.get(BASE_URL + '/stage/stagedata/')
        console.log(stage_list.data[0])
        let currentStages = []
        for (let i = 0; i < stage_list.data.length; i++) {
            currentStages.push(<tr>
                <td>{stage_list.data[i].ip}</td>
                <td>{stage_list.data[i].stage}</td>
                <td>{stage_list.data[i].place.toUpperCase()}</td>
                <td>
                    <button type="submit" value={i} onClick={handleDelete} className="delete-btn">Delete</button>
                </td>
            </tr>)
        }
        setCurrentStages(currentStages)
    }

    async function handleDelete(e) {
        e.preventDefault()
        const stage_list = await axios.get(BASE_URL + '/stage/stagedata/')
        const data = {
            ip: stage_list.data[e.target.value].ip
        }
        axios.post(BASE_URL + '/stage/delete/', data).then(async () => await refresh()).catch(err => console.log(err))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            ip: ip,
            stage_id: stageId.toUpperCase(),
            place:place
        }
        axios.post(BASE_URL + '/stage/set/', data).then(async () => await refresh()).catch(err => console.log(err))
        setIp('')
        setStageId('')
        setPlace('end')
    }

    useEffect(() => {
        const effect = async () => {
            await refresh()
        }
        effect()
    }, [])

    return <div className="stage-container">
        <h2>Current Stages</h2>
        <div className="table">
            <table>
                <thead>
                <tr>
                    <th>IP Address</th>
                    <th>Stage Name</th>
                    <th>Place</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {currentStages}
                </tbody>
            </table>
        </div>
        <button className="refresh-button" onClick={refresh}>Refresh Table</button>
        <h2>Add/Modify Stages</h2>
        <form onSubmit={handleSubmit}>
            <div className="stage-form-group">
                <label htmlFor="ip-address">IP Address:</label>
                <input type="text"
                       id="ip"
                       name="ip-address"
                       value={ip}
                       onChange={(e) => setIp(e.target.value)}
                       required/>
            </div>
            <div className="stage-selection">
                <div className="stage-form-group2">
                    <label htmlFor="stage-name">Stage Name:</label>
                    <input type="text"
                       id="stage_id"
                       name="stage-name"
                       value={stageId.toUpperCase()}
                       onChange={(e) => setStageId(e.target.value)}
                       required/>
                </div>
                <div className="stage-form-group2">
                    <label htmlFor="place">Place:</label>
                    <select name="place" id="place" value={place} onChange={(e)=>setPlace(e.target.value)} defaultValue="end">
                        <option value="start">Start</option>
                        <option value="end">End</option>
                    </select>
                </div>
            </div>
            <div className="stage-form-group">
                <input type="submit" className="btn-submit" value="Submit"/>
            </div>
        </form>
    </div>
}