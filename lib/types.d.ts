export type Id = number

export interface NormalizedState<T, I = Id> {
	byId: {
		[id: I]: T
	}
	ids: I[]
}

export interface PaginationState<I = Id> {
	currentPage: number

	pages: {
		[page: number]: {
			ids: Id[]
			fetching: boolean
		}
	}
}
