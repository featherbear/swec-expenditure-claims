type ExpenseType = {
    description: string
    note?: string
}

const ExpenseCategories = {
    KAM: { description: "Advertising & marketing (incl website)" },
    KCH: { description: "Church camp" },
    KCC: { description: "Community care" },
    KCT: { description: "Conference & training" },
    KEN: { description: "English service/events" },
    KNE: { description: "Equipment, repairs & maintenance" },
    KHO: { description: "Honorariums payment" },
    KKI: { description: "Kitchen, cleaning & general expenses" },
    KMN: { description: "Mandarin service/events" },
    KMU: { description: "Music band equipment" },
    KMC: { description: "Music copyright" },
    KCR: { description: "Playgroup" },
    KPS: { description: "Printing, stationery & supplies" },
    KSB: { description: "Subscriptions", note: "including Elvanto & Ministry grip" },
    KSS: { description: "Sunday School" },
    KWI: { description: "Wifi, AV, PC equipment" },
    KYG: { description: "Youth group", note: "including KYCK Conference" },
} as const satisfies {
    [key: string]: ExpenseType
}

export default ExpenseCategories
