import { createContext } from 'react'
import { User } from '../../utils/types/User.type'

type UserContextType = {
    user: User | null
    updateUser: (user: User) => void
}

const UserContext = createContext<UserContextType>({
    user: null,
    updateUser: () => {},
})

export default UserContext
