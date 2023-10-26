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

    // const lookbackDays = 100;
    // const lookbackStr = `'${lookbackDays} days'`
    //
    // const timeExp = `now() - interval '${lookbackStr}'`
    // console.log(lookbackStr)
    // console.log(timeExp)

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
                                                        order by sum (diffmins)`

    const percentLateBuses: any[] = await prisma.$queryRaw`select time, sum (case when status = 'Behind' then 1 else 0 end) * 100 / count (*)
                                                               as percentbehind
                                                           from snapshots
                                                           group by time
                                                           order by time`

    // console.log(snapshots)
    console.log(lateMinsByTime)
    console.log(lateBusesByTime)
    console.log(numTotalBusesByTime)
    console.log(mostLateBuses)

    lateBusesByTime.forEach(function (part, index, theArray) {
        theArray[index].numbehind = Number(part.numbehind);
    });
    percentLateBuses.forEach(function (part, index, theArray) {
        theArray[index].percentbehind = Number(part.percentbehind);
    });
    lateMinsByTime.forEach(function (part, index, theArray) {
        theArray[index].sum = Number(part.sum);
    });
    mostLateBuses.forEach(function (part, index, theArray) {
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
            <TimeChart title="Percent Late Buses" dataKey="percentbehind" xKey="time" data={percentLateBuses}/>
            {/*<TimeChart title="Total Buses by Time" dataKey="sum" data={numTotalBusesByTime}/>*/}
            <TimeChart title="Total Late Minutes by Time" dataKey="sum" xKey="time" data={lateMinsByTime}/>

            {/*<TimeChart title="Total Late Minutes by Route" dataKey="sum" xKey="route" data={mostLateBuses}/>*/}
            <MetroBar title="Total Late Minutes by Route" dataKey="sum" xKey="route" data={mostLateBuses}/>

        </div>
    )
}
