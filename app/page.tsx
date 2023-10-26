import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import ExpandingArrow from '@/components/expanding-arrow'
import RefreshButton from "@/components/refresh-button";

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
      </h1>
      <Suspense fallback={<TablePlaceholder />}>
        <Table />
      </Suspense>

        <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
                <p className="text-sm text-gray-500">Code by <a href="https://twitter.com/robotpatch"><strong>Ryan Green</strong></a></p>
            </div>
        </div>

    </main>
  )
}
