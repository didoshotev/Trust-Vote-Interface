import { format } from 'date-fns'

export const calculateRemainingHours = (endTime: string): number => {
    const endDateTime = new Date(endTime)
    const currentTime = new Date()
    const timeDiff = endDateTime.getTime() - currentTime.getTime()
    const remainingHours = Math.ceil(timeDiff / (1000 * 60 * 60))
    return remainingHours
}

export const formatTime = (time: string): string => {
    const formattedTime = format(new Date(time), 'dd MMMM yyyy, HH:mm')
    return formattedTime
}
