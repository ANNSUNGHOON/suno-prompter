import { useState } from 'react'
import StylePrompter from './StylePrompter'
import LyricsPrompter from './LyricsPrompter'

export default function App() {
  const [tab, setTab] = useState('style')

  return (
    <div style={{ minHeight: '100vh', background: '#08080d' }}>
      {/* Tab Bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid #151520', padding: '0 16px' }}>
        <button onClick={() => setTab('style')} style={{
          padding: '12px 24px', fontSize: 12, fontWeight: tab === 'style' ? 700 : 400,
          color: tab === 'style' ? '#a78bfa' : '#555', background: 'transparent',
          border: 'none', borderBottom: tab === 'style' ? '2px solid #a78bfa' : '2px solid transparent',
          cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 0.5
        }}>STYLE PROMPTER</button>
        <button onClick={() => setTab('lyrics')} style={{
          padding: '12px 24px', fontSize: 12, fontWeight: tab === 'lyrics' ? 700 : 400,
          color: tab === 'lyrics' ? '#f472b6' : '#555', background: 'transparent',
          border: 'none', borderBottom: tab === 'lyrics' ? '2px solid #f472b6' : '2px solid transparent',
          cursor: 'pointer', fontFamily: 'inherit', letterSpacing: 0.5
        }}>LYRICS PROMPTER</button>
      </div>

      {/* Content */}
      <div style={{ display: tab === 'style' ? 'block' : 'none' }}><StylePrompter /></div>
      <div style={{ display: tab === 'lyrics' ? 'block' : 'none' }}><LyricsPrompter /></div>
    </div>
  )
}
