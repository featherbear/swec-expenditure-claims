import type ExpenseCategories from "$lib/values/ExpenseCategories";

type ExpenseType = {
    supplier: string;
    description: string;
    category: keyof typeof ExpenseCategories;
 
    cost: number;
    gst: number;
 
}

export type { ExpenseType }