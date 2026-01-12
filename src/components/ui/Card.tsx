import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  clickable?: boolean
  onClick?: () => void
  className?: string
}

const Card = ({
  children,
  header,
  footer,
  clickable = false,
  onClick,
  className = '',
}: CardProps) => {
  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`
        bg-gray-800 rounded-2xl overflow-hidden shadow-md
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {header && (
        <div className="px-6 py-4 bg-gray-600">
          {header}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-600">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card
