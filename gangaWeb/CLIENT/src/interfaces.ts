import { UserRole } from "./generated"

export interface AuthUserObject {
    authUser?: {
        id?: string
        role?: UserRole
        email?: string
        name?: string
    } | null
    setAuthUser?: any | null
}
