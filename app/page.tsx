import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Main from '@/components/main'
import TablePlaceholder from '@/components/table-placeholder'
import ExpandingArrow from '@/components/expanding-arrow'
import RefreshButton from "@/components/refresh-button";

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1>
        Tracking Metrobus
      </h1>
      <Suspense fallback={<TablePlaceholder />}>
        <Main />
      </Suspense>

        <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
                <p style={{margin: "10px"}} className="text-sm text-gray-500">Code by <a href="https://ryang.ca"><strong>Ryan Green</strong></a></p>
            </div>
        </div>

    </main>
  )
}
