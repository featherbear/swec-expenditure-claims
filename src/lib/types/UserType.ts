import type { UUID } from "./interop"

type UserType = {
    id: UUID
    firstName: string
    lastName: string
    email: string
    picture?: string
}

export type { UserType }