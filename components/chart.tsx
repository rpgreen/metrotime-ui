'use client'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

export default async function TimeChart(props: any) {

    return (
        <div
            className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">

            <p>{props.title}</p>
            <LineChart
                id="test"
                width={1024}
                height={500}
                data={props.data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid/>
                <XAxis dataKey={props.xKey}/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line
                    type="monotone"
                    dataKey={props.dataKey}
                    stroke="#8884d8"
                    fill="#ddd"
                    strokeWidth={2}
                    activeDot={{r: 8}}
                />
            </LineChart>

        </div>
    )
}
