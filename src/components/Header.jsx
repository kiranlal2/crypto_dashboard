import React from 'react'

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white/5 rounded flex items-center justify-center text-sm font-bold">S</div>
        <div>
            <div className="text-sm font-semibold">Kiranlal</div>
            <div className="text-xs text-gray-400">Top Staking Assets</div>
        </div>
        </div>

        <div className="flex items-center gap-3">
        <button className="bg-white/5 px-3 py-2 rounded text-sm">Search</button>
        <button className="bg-violet-600/80 px-4 py-2 rounded text-sm font-medium">Deposit</button>
        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">RC</div>
        </div>
    </header>
  )
}
