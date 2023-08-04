import { gql } from "@apollo/client";

// =========================== Queries ================================= //
export const GET_BIR_OFFICES = gql`
    query GetAllOfficeSections {
        getAllOfficeSections {
            sectionId
            sectionName
            sectionOffice {
                officeName
            }
        }
    }
`

export const GET_ALL_THREAD_TYPES = gql`
    query GetAllThreadTypes {
        getAllThreadTypes {
            docId
            docType
        }
    }
`

export const GET_ALL_THREAD_STATUS = gql`
    query GetAllThreadStatus {
        getAllThreadStatus {
            statusId
            statusLabel
        }
    }
`

export const GET_THREAD_BY_ID = gql`
    query GetThreadById($uid: String!) {
        getThreadById(uid: $uid) {
            refId
            revision
            subject
            author {
                accountId
                firstName
                lastName
            }
            status {
                statusId
                statusLabel
            }
            recipient {
                sectionName
                sectionOffice {
                    officeName
                }
            }
            docType {
                docId
                docType
            }
            dateCreated
            attachments
            completed
            messages {
                msgId
                message
                sender {
                    accountId
                    firstName
                    lastName
                    position
                }
                files {
                    fileId
                    fileName
                    fileUrl
                }
                dateSent
            }
        }
    }
`

// ========================= Mutations =============================== //
export const CREATE_THREAD = gql`
    mutation CreateThread($data: ThreadInput!) {
        createThread(data: $data) {
            refId
        }
    }
`

export const SEND_THREAD_MESSAGE = gql`
    mutation SendMessage($data: MessageInput!) {
        sendMessage(data: $data) {
            msgId
        }
    }
`
export const UPDATE_THREAD_STATUS = gql`
    mutation UpdateThreadStatus($uid: String!, $statusId: Int!, $attachments: Boolean!) {
        updateThreadStatus(uid: $uid, statusId: $statusId, attachments: $attachments) {
            refId
        }
    }
`