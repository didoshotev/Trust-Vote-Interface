import { createContext } from 'react'
import { User } from '../../utils/types/User.type'

type UserContextType = {
    user: User | null
}


const UserContext = createContext<UserContextType>({
    user: null,
})

export default UserContext
