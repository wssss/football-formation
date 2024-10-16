'use client'

import React, { useState, useRef } from 'react'
import { motion, PanInfo } from 'framer-motion'
import bg from "./assets/bg.png"
type Player = {
  id: number
  x: number
  y: number
  color: string
}

export default function FormationBoard() {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, x: 60, y: 300, color: 'yellow' },    // Goalkeeper
    { id: 2, x: 200, y: 120, color: 'blue' },     // Defenders
    { id: 3, x: 200, y: 280, color: 'blue' },
    { id: 4, x: 200, y: 440, color: 'blue' },
    { id: 5, x: 200, y: 600, color: 'blue' },
    { id: 6, x: 400, y: 200, color: 'green' },    // Midfielders
    { id: 7, x: 400, y: 360, color: 'green' },
    { id: 8, x: 400, y: 520, color: 'green' },
    { id: 9, x: 640, y: 200, color: 'red' },      // Forwards
    { id: 10, x: 640, y: 360, color: 'red' },
    { id: 11, x: 640, y: 520, color: 'red' },
  ])

  const boardRef = useRef<HTMLDivElement>(null)

  const handleDrag = (id: number, dragInfo: PanInfo) => {
    setPlayers(players.map(player =>
      player.id === id
        ? { ...player, x: player.x + dragInfo.delta.x, y: player.y + dragInfo.delta.y }
        : player
    ))
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">足球阵型板 (4-3-3)</h1>
      <div 
        ref={boardRef}
        className="w-[900px] h-[600px] relative overflow-hidden"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {players.map((player) => (
          <motion.div
            key={player.id}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={boardRef}
            onDragEnd={(e, info) => handleDrag(player.id, info)}
            initial={{ x: player.x - 20, y: player.y - 20 }}
            animate={{ x: player.x - 20, y: player.y - 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: player.color,
              cursor: 'move',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              boxShadow: '0 0 0 4px white, 0 0 10px rgba(0,0,0,0.3)',
            }}
          >
            {player.id}
          </motion.div>
        ))}
      </div>
      <p className="mt-8 text-xl text-gray-600">拖动球员图标来调整阵型</p>
    </div>
  )
}