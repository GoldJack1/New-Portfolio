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

const JWPSearch1 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={props.className} {...props}>
    <path d="M15.716,14.336l-3.339-3.339c-.223-.223-.545-.323-.835-.256l-1.658-1.658c.779-.957,1.247-2.182,1.247-3.517,0-3.083-2.493-5.565-5.565-5.565S0,2.482,0,5.565s2.493,5.565,5.565,5.565c1.336,0,2.56-.467,3.517-1.269l1.647,1.647c-.056.301.033.623.267.868l3.339,3.339c.39.378,1.002.378,1.38,0,.378-.39.378-1.002,0-1.38ZM5.565,10.017c-2.46,0-4.452-1.992-4.452-4.452S3.105,1.113,5.565,1.113s4.452,1.992,4.452,4.452-1.992,4.452-4.452,4.452Z"/>
  </svg>
)

export const iconMap = {
  'minus': JWPMinus,
  'plus': JWPPlus,
  'search-variant-1': JWPSearch1,
} as const

export type IconName = keyof typeof iconMap

export const getIcon = (name: IconName) => {
  return iconMap[name]
}

export {
  JWPMinus,
  JWPPlus,
  JWPSearch1,
}
