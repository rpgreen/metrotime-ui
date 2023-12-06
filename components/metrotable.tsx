'use client'
import React from 'react';
import DataTable from 'react-data-table-component';

const routePerfCols = [
    {
        name: 'Route',
        selector: (row: any) => row.route,
        sortable: true,
    },
    {
        name: 'Min',
        selector: (row: any) => row.min,
        sortable: true,
    },
    {
        name: 'p5',
        selector: (row: any) => row.p5,
        sortable: true,
    },
    {
        name: 'p50',
        selector: (row: any) => row.p50,
        sortable: true,
    },
    {
        name: 'p95',
        selector: (row: any) => row.p95,
        sortable: true,
    },
    {
        name: 'Max',
        selector: (row: any) => row.max,
        sortable: true,
    },
];

export default async function MetroTable(props: any) {

    return (
        <div
            className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">

            <div style={{width: "800px", marginTop: "15px"}}>
            <h2>Route Stats</h2>

            <p className="chart-desc">
                Percentiles of number of minutes ahead/behind for each route.
            </p>

            <DataTable
                columns={routePerfCols}
                data={props.data}
            />
            </div>
        </div>
    )
}
