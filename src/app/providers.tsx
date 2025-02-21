'use client'

import '@ant-design/v5-patch-for-react-19'
import { ConfigProvider } from 'antd'
import { ThemeProvider, useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

function AntConfigProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          colorText: 'var(--foreground)',
          colorTextLabel: 'var(--foreground)',
          fontFamily: 'var(--font-roboto)',
          fontSize: 14,
          borderRadius: 6,
        },
        components: {
          Message: {
            zIndexPopup: 1000,
            contentPadding: 16,
            borderRadiusLG: 8,
            colorBgElevated: theme === 'dark' ? '#1f1f1f' : '#ffffff',
            colorText: theme === 'dark' ? '#ffffff' : '#000000',
            colorSuccess: theme === 'dark' ? '#49aa19' : '#52c41a',
          },
          Input: {
            colorBgContainer: '#ffffff',
            colorText: '#000000',
          },
          InputNumber: {
            colorBgContainer: '#ffffff',
            colorText: '#000000',
          },
          Button: {
            borderRadius: 6,
          },
          Switch: {
            handleShadow: 'none',
          },
          Form: {
            labelColor: 'var(--foreground)',
            labelFontSize: 14,
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class">
      <AntConfigProvider>
        {children}
      </AntConfigProvider>
    </ThemeProvider>
  )
} 