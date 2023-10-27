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
        <div style={{width: "800px", marginTop: "15px"}}>
        <h3>Route Stats (minutes)</h3>
        <DataTable
            columns={routePerfCols}
            data={props.data}
        />
        </div>
    )
}
