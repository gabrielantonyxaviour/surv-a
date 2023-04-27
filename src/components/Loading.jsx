import loading from '../../public/surva.json'
import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

const FullScreenLottie = ({ animationData }) => {
  const containerRef = useRef()

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice', // Add this line
      },
    })

    return () => {
      animation.destroy()
    }
  }, [animationData])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
      }}
    ></div>
  )
}

const Loading = () => {
  return <FullScreenLottie animationData={loading} />
}

export default Loading
