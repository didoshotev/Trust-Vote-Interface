export const AUTH_TYPES = {
    NONE: -1,
    BRONZE: 0,
    SILVER: 1,
    GOLD: 2,
}

export interface User {
    isAuthenticated: boolean
    planId: (typeof AUTH_TYPES)[keyof typeof AUTH_TYPES] | null
    activePollIds: number[]
}
