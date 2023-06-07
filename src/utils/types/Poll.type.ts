export interface Poll {
    admin: string
    id: string | number
    name: string
    startTime: string
    endTime: string
    description: string
    options?: Option[]
    votes?: { [address: string]: boolean }
}

export interface Option {
    id: string
    count: string | number
    name: string
}
