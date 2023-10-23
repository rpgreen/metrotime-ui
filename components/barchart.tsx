'use client'
import React from 'react';
import { BarChart, Rectangle, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default async function Bar(props) {

    console.log(props)
    const data = [
        {
            route: "1",
            sum: "2"
        }
    ]
    return (
        <div
            className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
            <p>{props.title}</p>

            <ResponsiveContainer minWidth="1024" width="1024" height="500">
                <BarChart
                    width={1024}
                    height={500}
                    data={props.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={props.xKey} />

                    <Tooltip />
                    <Legend />
                    <Bar dataKey={props.dataKey} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
