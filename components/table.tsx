// 'use client'
import prisma from '@/lib/prisma'
import RefreshButton from './refresh-button'
import React from 'react';
import TimeChart from "@/components/chart";
import MetroBar from "@/components/barchart";
import MetroTable from "@/components/metrotable";

export default async function Table() {
    const startTime = Date.now()
    const duration = Date.now() - startTime

    let [lateMinsByTime,
        lateBusesByTime,
        mostLateBuses,
        percentLateBuses,
        percent3MinsBehind,
        routePerf,
    ] = await Promise.all<any[]>([
        prisma.$queryRaw`select time, sum (diffmins * -1)
                                                         from snapshots
                                                         where status = 'Behind'
                                                         group by time
                                                         order by time`,
        prisma.$queryRaw`select time, count (*) as numBehind
                                                          from snapshots
                                                          where status = 'Behind'
                                                          group by time
                                                          order by time`,
        prisma.$queryRaw`select route, sum(diffmins * -1)
                         from snapshots
                         where status = 'Behind'
                         group by route
                         order by sum (diffmins)`,
        prisma.$queryRaw`select time, sum (case when status = 'Behind' then 1 else 0 end) * 100 / count (*)
                                                               as percentbehind
                                                           from snapshots
                                                           group by time
                                                           order by time`,
        prisma.$queryRaw`select time, sum (case when status = 'Behind' and diffmins <= -3 then 1 else 0 end) * 100 / count (*)
                                                               as percentbehind
                                                           from snapshots
                                                           group by time
                                                           order by time`,
        prisma.$queryRaw`select
          route,
          percentile_cont(0) within group (order by diffmins asc) as min,
          percentile_cont(0.05) within group (order by diffmins asc) as p5,
          percentile_cont(0.50) within group (order by diffmins asc) as p50,
          percentile_cont(0.95) within group (order by diffmins asc) as p95,
          percentile_cont(1) within group (order by diffmins asc) as max
        from snapshots group by route order by p50`
    ]);

    lateBusesByTime.forEach(function (part: any, index: number, theArray: any[]) {
        theArray[index].numbehind = Number(part.numbehind);
    });
    percentLateBuses.forEach(function (part: any, index: number, theArray: any[]) {
        theArray[index].percentbehind = Number(part.percentbehind);
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

    return (
        <div
            className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold"></h2>
                    <p className="text-sm text-gray-500">
                        Fetched in {duration}ms
                    </p>
                </div>
                <RefreshButton/>
            </div>

            <TimeChart title="Late Bus Count" dataKey="numbehind" xKey="time" data={lateBusesByTime}/>
            <TimeChart title="Percent Buses at least 1 Minute Behind" dataKey="percentbehind" xKey="time" data={percentLateBuses}/>
            <TimeChart title="Percent Buses at least 3 Minutes Behind" dataKey="percentbehind" xKey="time" data={percent3MinsBehind}/>
            {/*<TimeChart title="Total Buses by Time" dataKey="sum" data={numTotalBusesByTime}/>*/}
            <TimeChart title="Total Late Minutes by Time" dataKey="sum" xKey="time" data={lateMinsByTime}/>

            {/*<TimeChart title="Total Late Minutes by Route" dataKey="sum" xKey="route" data={mostLateBuses}/>*/}
            <MetroBar title="Total Late Minutes by Route" dataKey="sum" xKey="route" data={mostLateBuses}/>

            <MetroTable data={routePerf}/>
        </div>
    )
}
