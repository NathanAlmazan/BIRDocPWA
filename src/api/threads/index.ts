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
export const GET_ALL_THREAD_PURPOSE = gql`
    query GetAllThreadPurpose {
        getAllThreadPurpose {
            purposeId
            purposeName
            actionable
        }
    }
`

export const GET_THREAD_BY_ID = gql`
    query GetThreadById($uid: String!) {
        getThreadById(uid: $uid) {
            refId
            refSlipNum
            revision
            subject
            author {
                accountId
                firstName
                lastName
                role {
                    roleId
                    roleName
                }
                officeSection {
                    sectionOffice {
                        officeName
                    }
                }
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
            purpose {
                purposeId
                purposeName
            }
            dateCreated
            dateUpdated
            dateDue
            attachments
            completed
            messages {
                msgId
                message
                sender {
                    accountId
                    firstName
                    lastName
                    role {
                        roleId
                        roleName
                    }
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

export const GET_THREAD_INBOX = gql`
    query GetThreadInbox($userId: String!, $completed: Boolean) {
        getThreadInbox(userId: $userId, completed: $completed) {
            refId
            refSlipNum
            subject
            author {
                firstName
                lastName
            }
            docType {
                docId
                docType
            }
            status {
                statusLabel
            }
            purpose {
                purposeId
                purposeName
            }
            dateDue
            dateCreated
            dateUpdated
            completed
        }
    }
`

export const GET_SENT_THREAD = gql`
    query GetSentThread($userId: String!) {
        getSentThread(userId: $userId) {
            refId
            refSlipNum
            subject
            author {
                firstName
                lastName
            }
            docType {
                docId
                docType
            }
            status {
                statusLabel
            }
            purpose {
                purposeId
                purposeName
            }
            dateDue
            dateCreated
            dateUpdated
            completed
        }
    }
`

export const GET_REGION_INBOX = gql`
    query GetAllThread {
        getAllThread {
            refId
            subject
            author {
                firstName
                lastName
            }
            docType {
                docId
                docType
            }
            status {
                statusLabel
            }
            recipient {
                sectionOffice {
                    officeName
                    officeId
                }
            }
            dateDue
            dateCreated
            dateUpdated
            completed
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

export const SET_MESSAGE_AS_READ = gql`
    mutation SetMessageAsRead($threadId: String!, $userId: String!) {
        setMessageAsRead(threadId: $threadId, userId: $userId) {
            msgId
        }
    }
`