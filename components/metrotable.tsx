'use client'
import React from 'react';
import {BarChart, Rectangle, XAxis, Tooltip, Legend, ResponsiveContainer, Bar, CartesianGrid} from 'recharts';
import DataTable from 'react-data-table-component';
const routePerfCols = [
    {
        name: 'Route',
        selector: row => row.route,
    },
    {
        name: 'Min',
        selector: row => row.min,
    },
    {
        name: 'p50',
        selector: row => row.p50,
    },
    {
        name: 'p95',
        selector: row => row.p95,
    },
    {
        name: 'Max',
        selector: row => row.max,
    },
];

export default async function MetroTable(props: any) {

    return (
        <div style={{width: "800px", marginTop: "15px"}}>
        <h3>Route Stats</h3>
        <DataTable
            columns={routePerfCols}
            data={props.data}
        />
        </div>
    )
}
