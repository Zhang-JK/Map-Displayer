import React, { useEffect } from 'react';
import '../china-map/js/map/china.js'

const echarts = require('echarts');

export function Map(d: any) {
    useEffect(() => {
        if (d.valueData.length === 0) {
            return
        }
        // @ts-ignore
        let myChart = echarts.init(document.getElementById('myMap'));
        let option = {
            tooltip: {
                formatter: function (e: any) {
                    var res = e.name + ` (${isNaN(e.value) ? 0 : e.value})<br/>`
                    for(let ind in d.mapData[e.name]) {
                        const person = d.mapData[e.name][ind]
                        res += person.name + (person.city==null ? '' : ` (${person.city})<br/>`)
                    }
                    return res
                }
            },
            visualMap: {
                min: 0,
                max: 20,
                right: 26,
                bottom: 40,
                showLabel: !0,
                pieces: [{
                    gt: 8,
                    label: "8人以上",
                    color: "#ED5351"
                }, {
                    gt: 5,
                    lte: 8,
                    label: "6~8人",
                    color: "#3B5A97"
                }, {
                    gt: 3,
                    lte: 5,
                    label: "4~5人",
                    color: "#59D9A5"
                }, {
                    gt: 1,
                    lte: 3,
                    label: "2~3人",
                    color: "#F6C021"
                }, {
                    gt: 0,
                    lte: 1,
                    label: "1人",
                    color: "#6DCAEC"
                }
                ],
                show: !0
            },
            geo: {
                map: "china",
                roam: !1,
                scaleLimit: {
                    min: 1,
                    max: 2
                },
                zoom: 1.13,
                layoutCenter: ['30%', '30%'],
                label: {
                    normal: {
                        show: !0,
                        fontSize: "14",
                        color: "rgba(0,0,0,0.7)"
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: "rgba(0, 0, 0, 0.2)"
                    },
                    emphasis: {
                        areaColor: "#F5DEB3",
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        borderWidth: 0
                    }
                }
            },
            series: [{
                type: "map",
                geoIndex: 0,
                data: d.valueData,
                areaColor: '#0FB8F0'
            }]
        };

        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    });

    return (
        <div className="map w-100 h-100">
            <div id="myMap" className='w-100 h-100'></div>
        </div>
    );
}
