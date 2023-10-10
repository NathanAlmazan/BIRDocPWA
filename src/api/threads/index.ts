import { gql } from "@apollo/client";

// =========================== Queries ================================= //
export const GET_BIR_OFFICES = gql`
    query GetAllOfficeSections {
        getAllOfficeSections {
            sectionId
            sectionName
            refNum
            sectionOffice {
                officeId
                officeName
                refNum
            }
        }
    }
`

export const GET_ALL_THREAD_TYPES = gql`
    query GetAllThreadTypes {
        getAllThreadTypes {
            docId
            docType
            actionable
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
        }
    }
`

export const GET_ALL_THREAD_TAGS = gql`
    query GetAllThreadTags {
        getAllThreadTags {
            tagId
            tagName
        }
    }
`

export const GET_TEMP_REF_NUM = gql`
    query GetRefNum($authorId: String!) {
        getThreadRefNum(authorId: $authorId)
    }
`

export const GET_THREAD_BY_ID = gql`
    query GetThreadById($uid: String!) {
        getThreadById(uid: $uid) {
            refId
            refSlipNum
            reqForm
            revision
            subject
            author {
                accountId
                firstName
                lastName
                signImage
                role {
                    roleId
                    roleName
                }
                officeSection {
                    sectionOffice {
                        officeName
                        refNum
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
                    refNum
                }
            }
            recipientList {
                sectionName
                sectionOffice {
                    officeName
                    refNum
                }
            }
            recipientUser {
                firstName
                lastName
                accountId
            }
            docType {
                docId
                docType
            }
            purpose {
                purposeId
                purposeName
            }
            purposeNotes
            dateCreated
            dateUpdated
            dateDue
            attachments
            completed
            active
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
                    fileType
                }
                dateSent
            }
            history {
                historyLabel
                dateCreated
                status {
                    statusLabel
                }
            }
            threadTag {
                tagId
                tagName
            }
        }
    }
`

export const GET_THREAD_INBOX = gql`
    query GetThreadInbox($userId: String!, $type: String!) {
        getThreadInbox(userId: $userId, type: $type) {
            refId
            refSlipNum
            subject
            author {
                accountId
                firstName
                lastName
            }
            docType {
                docId
                docType
                actionable
            }
            status {
                statusLabel
            }
            purpose {
                purposeId
                purposeName
            }
            threadTag {
                tagId
                tagName
            }
            dateDue
            active
            dateCreated
            dateUpdated
            completed
        }
    }
`

export const GET_SENT_THREAD = gql`
    query GetSentThread($userId: String!, $type: String!) {
        getSentThread(userId: $userId, type: $type) {
            refId
            refSlipNum
            subject
            author {
                accountId
                firstName
                lastName
            }
            docType {
                docId
                docType
                actionable
            }
            status {
                statusLabel
            }
            purpose {
                purposeId
                purposeName
            }
            threadTag {
                tagId
                tagName
            }
            dateDue
            active
            dateCreated
            dateUpdated
            completed
        }
    }
`

export const GET_REGION_INBOX = gql`
    query GetAllThread($memos: Boolean) {
        getAllThread(memos: $memos) {
            refId
            subject
            author {
                accountId
                firstName
                lastName
            }
            docType {
                docId
                docType
                actionable
            }
            status {
                statusLabel
            }
            purpose {
                purposeId
                purposeName
            }
            recipient {
                sectionOffice {
                    officeName
                    officeId
                }
            }
            threadTag {
                tagId
                tagName
            }
            dateDue
            active
            dateCreated
            dateUpdated
            completed
        }
    }
`

// ========================= Mutations =============================== //
export const CREATE_THREAD = gql`
    mutation CreateThread($data: ThreadCreateInput!) {
        createThread(data: $data) {
            refId
        }
    }
`

export const UPDATE_THREAD = gql`
    mutation UpdateThread($data: ThreadUpdateInput) {
        updateThread(data: $data) {
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

export const ARCHIVE_THREAD = gql`
    mutation ArchiveThread($threadId: String!) {
        archiveThread(threadId: $threadId) {
            refId
        }
    }
`

export const RESTORE_THREAD = gql`
    mutation RestoreThread($threadId: String!) {
        restoreThread(threadId: $threadId) {
            refId
        }
    }
`

// ================================= SUBSCRIPTIONS ================================= //

export const OFFICE_INBOX_SUBSCRIBE = gql`
    subscription OfficeInbox($officeId: Int!) {
        officeInbox(officeId: $officeId) {
            referenceNum
            eventType
            timestamp
        }
    }
`

export const THREAD_MESSAGES_SUBSCRIBE = gql`
    subscription LiveThread($threadId: String!) {
        liveThread(threadId: $threadId) {
            referenceNum
            eventType
            timestamp
        }
    }
`