export default function timeDifference(timestamp) {
  const currentTime = new Date()
  const inputTime = new Date(timestamp)
  const secondsDiff = Math.floor((currentTime - inputTime) / 1000)

  const years = Math.floor(secondsDiff / (60 * 60 * 24 * 365))
  if (years > 0) {
    return years + (years === 1 ? ' year ago' : ' years ago')
  }

  const months = Math.floor(
    (secondsDiff % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30)
  )
  if (months > 0) {
    return months + (months === 1 ? ' month ago' : ' months ago')
  }

  const days = Math.floor((secondsDiff % (60 * 60 * 24 * 30)) / (60 * 60 * 24))
  if (days > 0) {
    return days + (days === 1 ? ' day ago' : ' days ago')
  }

  const hours = Math.floor((secondsDiff % (60 * 60 * 24)) / (60 * 60))
  if (hours > 0) {
    return hours + (hours === 1 ? ' hour ago' : ' hours ago')
  }

  const minutes = Math.floor((secondsDiff % (60 * 60)) / 60)
  if (minutes > 0) {
    return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago')
  }

  const seconds = secondsDiff % 60
  return seconds + (seconds === 1 ? ' second ago' : ' seconds ago')
}
