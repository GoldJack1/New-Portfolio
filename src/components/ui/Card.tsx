import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  hover?: boolean
  clickable?: boolean
  onClick?: () => void
  className?: string
}

const Card = ({
  children,
  header,
  footer,
  hover = false,
  clickable = false,
  onClick,
  className = '',
}: CardProps) => {
  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`
        bg-gray-200 rounded-2xl overflow-hidden
        ${hover ? 'transition-transform duration-200 hover:scale-105' : ''}
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {header && (
        <div className="px-6 py-4 bg-gray-300">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-300">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card
