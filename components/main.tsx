// 'use client'
import RefreshButton from './refresh-button'
import React from 'react';
import MetroTable from "@/components/metrotable";
import LatenessMap from "@/components/map";
import {PrismaClient} from "@prisma/client";
import TimeChart from "@/components/time-chart";
import MetroBar from "@/components/bar-chart";

const startTime = Date.now();
const prisma = new PrismaClient();
const duration = Date.now() - startTime;
console.log(`prisma client init: ${duration}ms`)

export default async function Main() {
    const startTime = Date.now()

    let [lateMinsByTime,
        lateBusesByTime,
        mostLateBuses,
        percent3MinsBehind,
        routePerf,
        lateGeos
    ] = await Promise.all<any[]>([
        prisma.$queryRaw`select time, sum (diffmins * -1)
                         from snapshots
                         where status = 'Behind'
                           and time
                             > now() - interval '1 week'
                         group by time
                         order by time`,
        prisma.$queryRaw`select time, count (*) as numBehind
                         from snapshots
                         where status = 'Behind'
                           and time > now() - interval '1 week'

                         group by time
                         order by time`,
        prisma.$queryRaw`select route, sum(diffmins * -1)
                         from snapshots
                         where status = 'Behind'
                           and time > now() - interval '1 week'
                         group by route
                         order by sum (diffmins)`,
        prisma.$queryRaw`select time, sum (case when status = 'Behind' and diffmins <= -3 then 1 else 0 end) * 100 / count (*)
                             as percentbehind
                         from snapshots
                         where time > now() - interval '1 week'
                         group by time
                         order by time`,
        prisma.$queryRaw`select
                             route,
                             percentile_cont(0) within group (order by diffmins asc) as min,
          percentile_cont(0.05) within group (order by diffmins asc) as p5,
                             percentile_cont(0.50) within group (order by diffmins asc) as p50,
                             percentile_cont(0.95) within group (order by diffmins asc) as p95,
                             percentile_cont(1) within group (order by diffmins asc) as max
                         from snapshots
                         where time > now() - interval '1 week'
                         group by route order by p50`,
        prisma.$queryRaw`select lat, lon, route, diffmins from snapshots where diffmins < -3 and time > now() - interval '1 week'`
    ]);

    lateBusesByTime.forEach(function (part: any, index: number, theArray: any[]) {
        theArray[index].numbehind = Number(part.numbehind);
    });
    percent3MinsBehind.forEach(function (part: any, index: number, theArray: any[]) {
        theArray[index].percentbehind = Number(part.percentbehind);
    });
    lateMinsByTime.forEach(function (part: any, index: number, theArray: any[]) {
        theArray[index].sum = Number(part.sum);
    });
    mostLateBuses.forEach(function (part: any, index: number, theArray: any[]) {
        theArray[index].sum = Number(part.sum);
    });

    let maxBehind: any[] = [];
    routePerf.forEach(function (part: any, index: number, theArray: any[]) {
        maxBehind[index] = {};
        maxBehind[index].route = part.route
        maxBehind[index].max = Number(part.min * -1);
    });
    maxBehind.sort((a, b) => (a.max < b.max ? 1 : -1));

    const duration = Date.now() - startTime
    console.log(`query duration: ${duration}ms`);

    console.log(maxBehind)

    return (
        <div
            className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold"></h2>
                    <p className="text-sm text-gray-500">
                        Fetched in {duration}ms
                    </p>
                    <p className="text-sm text-gray-500">
                        Time Range: 1 week
                    </p>
                </div>
                <RefreshButton/>
            </div>

            <TimeChart
                title="Late Bus Count"
                desc="The number of buses reporting as 'behind' for a given time period."
                dataKey="numbehind"
                xKey="time"
                data={lateBusesByTime}/>
            {/*<TimeChart title="Percent Buses at least 1 Minute Behind" dataKey="percentbehind" xKey="time" data={percentLateBuses}/>*/}
            <TimeChart
                title="Percent Buses at least 3 Minutes Behind"
                desc="The percentage of buses reporting as at least 3 minutes behind for a given time period."
                dataKey="percentbehind"
                xKey="time"
                data={percent3MinsBehind}/>
            {/*<TimeChart title="Total Buses by Time" dataKey="sum" data={numTotalBusesByTime}/>*/}
            <TimeChart
                title="Total Late Minutes by Time"
                desc="The total number of minutes behind for all buses in the given time period."
                dataKey="sum"
                xKey="time"
                data={lateMinsByTime}/>

            <MetroBar
                title="Total Late Minutes by Route"
                desc="The total number of minutes behind for each route across all time periods."
                dataKey="sum"
                xKey="route"
                data={mostLateBuses}/>

            <MetroBar
                title="Max Late Minutes by Route"
                desc="The maximum number of minutes behind for each route across all time periods."
                dataKey="max"
                xKey="route"
                data={maxBehind}/>

            <MetroTable data={routePerf}/>

            <LatenessMap data={lateGeos} />

        </div>
    )
}
