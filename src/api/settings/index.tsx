import { gql } from "@apollo/client";

// ========================= Queries =========================== //
export const GET_ALL_THREAD_TYPES = gql`
    query GetAllThreadTypes {
        getAllThreadTypes {
            docId
            docType
            threadCount
        }
    }
`
export const GET_ALL_THREAD_STATUS = gql`
    query GetAllThreadStatus {
        getAllThreadStatus {
            statusId
            statusLabel
            threadCount
        }
    }
`

// ====================== Mutations ============================ //
export const CREATE_DOCUMENT_TYPE = gql`
    mutation AddThreadType($label: String!) {
        addThreadType(label: $label) {
            docId
        }
    }
`

export const DELETE_DOCUMENT_TYPE = gql`
    mutation DeleteThreadType($typeId: Int!) {
        deleteThreadType(id: $typeId) {
            docId
        }
    }
`

export const CREATE_DOCUMENT_STATUS = gql`
    mutation AddThreadStatus($label: String!) {
        addThreadStatus(label: $label) {
            statusId
        }
    }
`

export const DELETE_DOCUMENT_STATUS = gql`
    mutation DeleteThreadStatus($statusId: Int!) {
        deleteThreadStatus(id: $statusId) {
            statusId
        }
    }
`