import {gql} from "@apollo/client";

const ALL_NOTES = gql`
    query GetAllNotes {
        allNotes {
            title
            content
        }
    }
`;

export {ALL_NOTES}