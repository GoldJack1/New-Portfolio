import React from 'react'

const JWPCheckmarkCircleFilled = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={props.className} {...props}>
    <path d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8,8-3.582,8-8S12.418,0,8,0ZM11.662,4.549l-2.784,6.033c-.481,1.043-1.832,1.326-2.693.566l-1.706-1.508c-.237-.209-.258-.569-.05-.806.209-.236.57-.259.807-.05l1.706,1.508c.287.253.737.159.897-.189l2.785-6.035c.133-.286.472-.411.759-.279.286.132.411.473.279.759Z"/>
  </svg>
)

const JWPCrossCircleFilled = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={props.className} {...props}>
    <path d="M8,0C3.589,0,0,3.577,0,8s3.589,8,8,8,8-3.589,8-8S12.423,0,8,0ZM11.554,10.731l.069.091c.149.217.126.526-.069.72-.194.194-.503.217-.72.069l-.091-.069-2.731-2.731-2.743,2.731-.091.069c-.217.149-.526.126-.72-.069-.194-.194-.217-.503-.069-.72l.069-.091,2.743-2.731-2.743-2.743c-.217-.229-.217-.583,0-.811.229-.217.583-.217.811,0l2.743,2.743,2.731-2.743c.229-.217.583-.217.811,0,.217.229.217.583,0,.811l-2.731,2.743,2.731,2.731Z"/>
  </svg>
)

const JWPInfoCircleFilled2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={props.className} {...props}>
    <path d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8,8-3.582,8-8S12.418,0,8,0ZM7.424,3.433h1.143v1.143h-1.143v-1.143ZM9.71,12.576h-3.429v-1.143h1.143v-4.571h-1.143v-1.143h2.286v5.714h1.143v1.143Z"/>
  </svg>
)

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
  'checkmark-circle-filled': JWPCheckmarkCircleFilled,
  'cross-circle-filled': JWPCrossCircleFilled,
  'info-circle-filled-variant-2': JWPInfoCircleFilled2,
  'minus': JWPMinus,
  'plus': JWPPlus,
  'search-variant-1': JWPSearch1,
} as const

export type IconName = keyof typeof iconMap

export const getIcon = (name: IconName) => {
  return iconMap[name]
}

export {
  JWPCheckmarkCircleFilled,
  JWPCrossCircleFilled,
  JWPInfoCircleFilled2,
  JWPMinus,
  JWPPlus,
  JWPSearch1,
}
