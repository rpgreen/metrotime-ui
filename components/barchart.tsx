'use client'
import React from 'react';
import {BarChart, Rectangle, XAxis, Tooltip, Legend, ResponsiveContainer, Bar, CartesianGrid} from 'recharts';

export default async function MetroBar(props: any) {

    return (
        <div
            className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
            <p>{props.title}</p>

            {/*<ResponsiveContainer minWidth="1024" width="1024" height="500">*/}
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
                    <XAxis xlinkTitle="foo"  id="bar" dataKey={props.xKey} />

                    <Tooltip />
                    <Legend />
                    <Bar dataKey={props.dataKey} fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            {/*</ResponsiveContainer>*/}
        </div>
    )
}
