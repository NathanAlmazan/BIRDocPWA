import { gql } from "@apollo/client";


// ======================= Queries =========================== //
export const GET_ALL_BIR_OFFICES = gql`
    query GetAllBirOffices {
        getAllBirOffices {
            officeId
            officeName
            refNum
            officeSections {
                sectionId
                sectionName
            }
        }
    }
`

export const GET_ALL_ROLES = gql`
    query GetAllRoles {
        getAllRoles {
            roleId
            roleName
            superuser
        }
    }
`

export const GET_BIR_OFFICE_BY_ID = gql`
    query GetBirOfficeById($officeId: Int!) {
        getBirOfficeById(id: $officeId) {
            officeId
            officeName
            officeSections {
                sectionId
                sectionName
                sectionOffice {
                    officeId
                }
                officers {
                    accountId
                    firstName
                    lastName
                    role {
                        roleId
                        roleName
                        superuser
                    }
                    resetCode
                    registered
                }
            }
        }
    }
`

export const GET_USER_ACCOUNTS_BY_OFFICES = gql`
    query GetAccountsByOffice($officeIds: [Int]) {
        getAccountsByOffice(officeIds: $officeIds) {
            firstName
            lastName
            accountId
            officeSection {
                sectionId
            }
        }
    }   
`

// ====================== Analytics ========================== //

export const GET_DOCUMENT_TYPE_ANALYTICS = gql`
    query GetThreadTypeAnalytics($officeId: Int!, $startDate: String!, $endDate: String!, $superuser: Boolean) {
        getThreadTypeAnalytics(officeId: $officeId, startDate: $startDate, endDate: $endDate, superuser: $superuser) {
          docType {
            docId
            docType
          }
          status {
            statusId
            statusLabel
          }
          count
        }
    }
`

export const GET_DOCUMENT_PURPOSE_ANALYTICS = gql`
    query GetThreadPurposeAnalytics($officeId: Int!, $startDate: String!, $endDate: String!, $superuser: Boolean) {
        getThreadPurposeAnalytics(officeId: $officeId, startDate: $startDate, endDate: $endDate, superuser: $superuser) {
          purpose {
            purposeId
            purposeName
          }
          status {
            statusId
            statusLabel
          }
          count
        }
    }
`

export const GET_DOCUMENT_STATUS_ANALYTICS = gql`
    query GetStatusAnalytics($officeId: Int!, $completed: Boolean!, $superuser: Boolean) {
        getStatusAnalytics(officeId: $officeId, completed: $completed, superuser: $superuser) {
            docType {
                docId
                docType
            }
            count
        }
    }
`

export const GET_DOCUMENT_SUMMARY_ANALYTICS = gql`
    query GetThreadSummary($userId: String!, $dateCreated: String!) {
        getThreadSummary(userId: $userId, dateCreated: $dateCreated) {
            refId
            refSlipNum
            dateDue
            dateCreated
            status {
                statusId
                statusLabel
            }
            author {
                accountId
                firstName
                lastName
                officeSection {
                    sectionId
                    sectionName
                    sectionOffice {
                        officeId
                        officeName
                    }
                }
                role {
                    roleName
                }
            }
            recipient {
                sectionId
                sectionName
                sectionOffice {
                    officeId
                    officeName
                }
            }
            docType {
                docId
                docType
            }
            threadTag {
                tagId
                tagName
            }
            purpose {
                purposeId
                purposeName
            }
            completed
        }
    }
`

// ====================== Mutations ========================== //

export const ADD_BIR_OFFICE = gql`
    mutation AddBirOffice($data: OfficeInput!) {
        addBirOffice(data: $data) {
            officeId
        }
    }
`

export const UPDATE_BIR_OFFICE = gql`
    mutation UpdateBirOffice($officeId: Int!, $officeName: String!) {
        updateBirOffice(officeId: $officeId, officeName: $officeName) {
            officeId
        }
    }
`

export const DELETE_BIR_OFFICE = gql`
    mutation DeleteBirOffice($officeId: Int!) {
        deleteBirOffice(id: $officeId) {
            officeId
        }
    }
`

export const ADD_SECTION_OFFICE = gql`
    mutation AddOfficeSection($officeId: Int!, $sectionName: String!) {
        addOfficeSection(officeId: $officeId, sectionName: $sectionName) {
            sectionId
        }
    }
`

export const UPDATE_SECTION_OFFICE = gql`
    mutation UpdateSection($sectionId: Int!, $sectionName: String!) {
        updateSection(sectionId: $sectionId, sectionName: $sectionName) {
            sectionId
        }
    }
`

export const DELETE_SECTION_OFFICE = gql`
    mutation DeleteOfficeSection($sectionId: Int!) {
        deleteOfficeSection(sectionId: $sectionId) {
            sectionId
        }
    }
`

export const REGISTER_OFFICER = gql`
    mutation RegisterAccount($data: AccountRegisterInput!) {
        registerAccount(data: $data) {
            accountId
        }
    }
`

export const UPDATE_OFFICER = gql`
    mutation UpdateAccount($data: AccountUpdateInput!) {
        updateAccount(data: $data) {
            accountId
        }
    }
`

export const DELETE_OFFICER = gql`
    mutation SetAccountInactive($accountId: String!) {
        setAccountInactive(accountId: $accountId) {
            accountId
        }
    }
`

// ================================= USER ACCOUNTS ================================== //

export const USER_REGISTER = gql`
    mutation ChangePassword($data: UserChangePasswordInput!) {
        changePassword(data: $data) {
            accountId
            firstName
            lastName
            officeSection {
                sectionId
                sectionName
                sectionOffice {
                    officeId
                    officeName
                }
            }
            role {
                roleId
                roleName
                superuser
            }
            resetCode
        }
    }
`

export const USER_LOGIN = gql`
    mutation UserLogin($data: UserLoginInputInput!) {
        userLogin(data: $data) {
            accountId
            firstName
            lastName
            officeSection {
                sectionId
                sectionName
                sectionOffice {
                    officeId
                    officeName
                }
            }
            role {
                roleId
                roleName
                superuser
            }
            resetCode
        }
    }
`

export const GET_USER_NOTIFICATIONS = gql`
    query GetUserNotifications($userId: String!, $type: String!) {
        getUserNotifications(userId: $userId, type: $type) {
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
            }
            status {
                statusLabel
            }
            purpose {
                purposeId
                purposeName
                actionable
            }
            dateDue
            dateCreated
            dateUpdated
            completed
        }
    }
`

export const GET_USER_BY_ID = gql`
    query GetAccountByUid($uid: String!) {
        getAccountByUid(uid: $uid) {
            accountId
            firstName
            lastName
            role {
                roleId
            }
        }
    }
`

export const UPLOAD_SIGNATURE = gql`
    mutation UpdateSignature($userId: String!, $signImage: String) {
        uploadSignature(userId: $userId, signImage: $signImage) {
            accountId
        }
    } 
`