export interface FormData {
    id?: number
    name: string
    email: string
    address: string
    phone: string
    preferences: string[],
    review: object,
}

export const steps = ['Personal Info', 'Contact Details', 'Preferences', 'Review'];
