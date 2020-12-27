export type Note = {
    id: number,
    title: string,
    content: string,
    selected: boolean
}

export interface IStates {
    notes: Note[]
}

const initialState: IStates = {
    notes: [
        {id: 0, title: "Your First Note", content: "Content here", selected: true},
        ]
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'updateNotes':
            return {
                ...state,
                notes: action.value
            };
        case 'addNote':
            return {
                ...state,
                notes: [
                    ...state.notes,
                    action.value
                ]
            }
        case 'removeNote':
            const notes = [...state.notes];
            const new_notes = notes.filter((el) => el.id !== action.value.id)
            return {
                ...state,
                notes: new_notes
            }

        default:
            return state;
    }
};

export {initialState, reducer};