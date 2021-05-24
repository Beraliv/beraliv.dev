import React, { FC } from "react"

interface ScrollUpProps {
  onClick: VoidFunction
}

export const ScrollUp: FC<ScrollUpProps> = ({ onClick }) => (
  <svg
    className="scroll-up"
    width="60"
    height="64"
    viewBox="0 0 60 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M58.5 31.6969C58.5 48.2484 45.6784 61.5517 30 61.5517C14.3216 61.5517 1.5 48.2484 1.5 31.6969C1.5 15.1454 14.3216 1.84204 30 1.84204C45.6784 1.84204 58.5 15.1454 58.5 31.6969Z"
      stroke="white"
      strokeWidth="3"
    />
    <path
      d="M31.0607 16.0039C30.4749 15.4181 29.5251 15.4181 28.9393 16.0039L19.3934 25.5499C18.8076 26.1356 18.8076 27.0854 19.3934 27.6712C19.9792 28.257 20.9289 28.257 21.5147 27.6712L30 19.1859L38.4853 27.6712C39.0711 28.257 40.0208 28.257 40.6066 27.6712C41.1924 27.0854 41.1924 26.1356 40.6066 25.5499L31.0607 16.0039ZM31.5 45.2839L31.5 17.0646L28.5 17.0646L28.5 45.2839L31.5 45.2839Z"
      fill="white"
    />
  </svg>
)
