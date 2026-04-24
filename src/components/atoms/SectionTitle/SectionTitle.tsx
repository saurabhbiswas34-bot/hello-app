import type { ReactNode } from 'react'
import './SectionTitle.css'

interface SectionTitleProps {
  children: ReactNode
}

function SectionTitle({ children }: SectionTitleProps) {
  return <h1 className="section-title">{children}</h1>
}

export default SectionTitle
