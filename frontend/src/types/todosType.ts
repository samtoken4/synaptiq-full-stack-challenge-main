export type TodoItem = {
    id: number,
    name: string,
    completed: boolean,
}

export enum FilterStatus {
    ALL = 'all',
    ACTIVE = 'active',
    COMPLETE = 'complete'
}