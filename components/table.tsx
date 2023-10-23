// 'use client'
import prisma from '@/lib/prisma'
import RefreshButton from './refresh-button'
import React from 'react';
import TimeChart from "@/components/chart";
import BarChart from "@/components/barchart";
import Bar from "@/components/barchart";
import MetroBar from "@/components/barchart";

export default async function Table() {
    const startTime = Date.now()
    // const users = await prisma.users.findMany()
    const duration = Date.now() - startTime

    // const snapshots = await prisma.snapshots.findMany()

    const lateMinsByTime: any[] = await prisma.$queryRaw`select time, sum (diffmins * -1)
                                                  from snapshots
                                                  where status = 'Behind'
                                                  group by time
                                                  order by time`
    const lateBusesByTime: any[] = await prisma.$queryRaw`select time, count (*) as numBehind
                                                   from snapshots
                                                   where status = 'Behind'
                                                   group by time
                                                   order by time`
    const numTotalBusesByTime: any[] = await prisma.$queryRaw`select time, count (*) as numBehind
                                                       from snapshots
                                                       group by time
                                                       order by time`
    const mostLateBuses: any[] = await prisma.$queryRaw`select route, sum(diffmins * -1)
                                                 from snapshots
                                                 where status = 'Behind'
                                                 group by route
                                                 order by sum(diffmins)`

    // console.log(snapshots)
    // console.log(lateMinsByTime)
    // console.log(lateBusesByTime)
    // console.log(numTotalBusesByTime)
    // console.log(mostLateBuses)

    lateBusesByTime.forEach(function(part, index, theArray) {
        theArray[index].numbehind = Number(part.numbehind);
    });
    lateMinsByTime.forEach(function(part, index, theArray) {
        theArray[index].sum = Number(part.sum);
    });
    mostLateBuses.forEach(function(part, index, theArray) {
        theArray[index].sum = Number(part.sum);
    });

    // console.log(mostLateBuses)

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

            <TimeChart title="Late Buses by Time" dataKey="numbehind" xKey="time" data={lateBusesByTime}/>
            {/*<TimeChart title="Total Buses by Time" dataKey="sum" data={numTotalBusesByTime}/>*/}
            <TimeChart title="Total Late Minutes by Time" dataKey="sum" xKey="time" data={lateMinsByTime}/>

            {/*<TimeChart title="Total Late Minutes by Route" dataKey="sum" xKey="route" data={mostLateBuses}/>*/}
            <MetroBar title="Total Late Minutes by Route" dataKey="sum" xKey="route" data={mostLateBuses}/>

        </div>
    )
}
