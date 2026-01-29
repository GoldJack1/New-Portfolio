import React from 'react'

const JWPMinus = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={props.className} {...props}>
    <path d="M.571,7.429h14.857c.316,0,.571.256.571.571s-.256.571-.571.571H.571c-.316,0-.571-.256-.571-.571s.256-.571.571-.571Z"/>
  </svg>
)

const JWPPlus = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={props.className} {...props}>
    <path d="M16,8c0,.309-.251.571-.571.571h-6.857v6.857c0,.309-.251.571-.571.571-.309,0-.571-.263-.571-.571v-6.857H.571c-.309,0-.571-.263-.571-.571,0-.32.263-.571.571-.571h6.857V.571c0-.32.263-.571.571-.571.32,0,.571.251.571.571v6.857h6.857c.32,0,.571.251.571.571Z"/>
  </svg>
)

export const iconMap = {
  'minus': JWPMinus,
  'plus': JWPPlus,
} as const

export type IconName = keyof typeof iconMap

export const getIcon = (name: IconName) => {
  return iconMap[name]
}

export {
  JWPMinus,
  JWPPlus,
}
