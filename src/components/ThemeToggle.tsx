'use client'

import { Button } from 'antd'
import { useTheme } from 'next-themes'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button
      type="text"
      icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-4 right-4"
    />
  )
} 