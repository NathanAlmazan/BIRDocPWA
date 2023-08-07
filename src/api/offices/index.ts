import { gql } from "@apollo/client";


// ======================= Queries =========================== //
export const GET_ALL_BIR_OFFICES = gql`
    query GetAllBirOffices {
        getAllBirOffices {
            officeId
            officeName
            officeSections {
                sectionId
                sectionName
            }
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
                officers {
                    accountId
                    firstName
                    lastName
                    position
                    resetCode
                    registered
                }
            }
        }
    }
`

export const GET_DOCUMENT_TYPE_ANALYTICS = gql`
    query GetThreadTypeAnalytics($officeId: Int!, $startDate: String!, $endDate: String!) {
        getThreadTypeAnalytics(officeId: $officeId, startDate: $startDate, endDate: $endDate) {
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

export const GET_DOCUMENT_STATUS_ANALYTICS = gql`
    query GetStatusAnalytics($officeId: Int!, $completed: Boolean!) {
        getStatusAnalytics(officeId: $officeId, completed: $completed) {
            docType {
                docId
                docType
            }
            count
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

export const DELETE_BIR_OFFICE = gql`
    mutation DeleteBirOffice($officeId: Int!) {
        deleteBirOffice(id: $officeId) {
            officeId
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
            position
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
            position
            resetCode
        }
    }
`