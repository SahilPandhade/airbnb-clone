import axios from "axios";
import React, { ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
interface UserContextProps {
    user: UserProps | null;
    setUser: React.Dispatch<SetStateAction<UserProps | null>>
    ready:boolean;
}
interface UserProps {
    name: string;
    email: string;
    password: string;
}
const DEFAULT_USER: UserProps = {
    name: '',
    email: '',
    password: ''
}
export const UserContext = createContext<UserContextProps>({ user: DEFAULT_USER, setUser: () => { },ready:false })

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProps | null>(null)
    const [ready,setReady] = useState<boolean>(false)
    useEffect(() => {
            if (!user) {
                axios.get('/profile').then((response)=>{
                    setUser(response.data);
                    setReady(true)
                })
                .catch((err)=>console.log("Error fetching user profile",err))
            }
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser,ready }}>{children}</UserContext.Provider>
    )
}