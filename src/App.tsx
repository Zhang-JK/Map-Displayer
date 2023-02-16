import React, {useState, useEffect} from 'react';

import './App.css';
import {Map} from "./components/Map";
import {SideBar} from "./components/SideBar";

function App() {
    const [mapData, setMapData] = useState<any>([]);
    const [valueData, setValueData] = useState<any>([]);
    const [displayState, setDisplayState] = useState<string>('M');

    useEffect(() => {
        if(valueData.length !== 0) {
            return
        }
        fetch('http://laojk.club:8000/all', {mode: 'cors', credentials: 'omit', method: 'GET'})
            .then(res => res.json())
            .then(res => {
                res = JSON.parse(res);
                var mapDataDict = [];
                for(let r of res){
                    if (mapDataDict[r['province']] === undefined) {
                        mapDataDict[r['province']] = [{
                            name: r['name'], city: r['city'], time: r['time']
                        }];
                    }
                    else {
                        mapDataDict[r['province']].push({
                            name: r['name'], city: r['city'], time: r['time']
                        });
                    }
                }

                var valueData = [];
                for(let key in mapDataDict) {
                    valueData.push({name: key, value: mapDataDict[key].length})
                }
                setMapData(mapDataDict);
                setValueData(valueData);
            });
    });

    return (
        <div className="App">
            <div className='w-100 h-100 d-flex flex-row'>
                <SideBar displayState={displayState} changeView={(v)=>{setDisplayState(v)}} reload={() => window.location.reload()} />
                {displayState==='M' && <Map valueData={valueData} mapData={mapData}/>}
                {displayState==='T' && <Map valueData={valueData} mapData={mapData}/>}
            </div>
        </div>
    );
}

export default App;
