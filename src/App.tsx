import React, {useState, useEffect} from 'react';

import './App.css';
import {Map} from "./components/Map";

function App() {
    const [mapData, setMapData] = useState<any>([]);
    const [valueData, setValueData] = useState<any>([]);
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
            <Map valueData={valueData} mapData={mapData} />
        </div>
    );
}

export default App;
