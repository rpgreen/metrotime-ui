'use client'
import React from 'react';
import {BarChart, Rectangle, XAxis, Tooltip, Legend, ResponsiveContainer, Bar, CartesianGrid} from 'recharts';
import DataTable from 'react-data-table-component';

const routePerfCols = [
    {
        name: 'Route',
        selector: (row: any) => row.route,
    },
    {
        name: 'Min',
        selector: (row: any) => row.min,
    },
    {
        name: 'p5',
        selector: (row: any) => row.p5,
    },
    {
        name: 'p50',
        selector: (row: any) => row.p50,
    },
    {
        name: 'p95',
        selector: (row: any) => row.p95,
    },
    {
        name: 'Max',
        selector: (row: any) => row.max,
    },
];

export default async function MetroTable(props: any) {

    return (
        <div
            className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">

            <div style={{width: "800px", marginTop: "15px"}}>
            <h2>Route Stats (minutes)</h2>
            <DataTable
                columns={routePerfCols}
                data={props.data}
            />
            </div>
        </div>
    )
}
