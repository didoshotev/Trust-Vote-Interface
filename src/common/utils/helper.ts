export const convertToUnixTimestamp = (
    startDate: string,
    startTime: string
) => {
    const dateTimeString = `${startDate}T${startTime}:00Z`
    const unixTimestamp = Math.floor(new Date(dateTimeString).getTime() / 1000)
    return unixTimestamp
}

export const convertFromUnixTimestamp = (unixTimestamp: number) => {
    const dateTime = new Date(unixTimestamp * 1000)
    const date = dateTime.toISOString().split('T')[0]
    const time = dateTime.toISOString().split('T')[1].substring(0, 5)
    return { date, time }
}

export const formatDateToYYYYMMDD = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Add 1 to the month as it is zero-based
    const day = String(date.getDate()).padStart(2, '0')
    return year + '-' + month + '-' + day
}
