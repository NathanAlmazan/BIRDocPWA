import { gql } from "@apollo/client";


// ======================= Queries =========================== //
export const GET_ALL_BIR_OFFICES = gql`
    query GetAllBirOffices {
        getAllBirOffices {
            officeId
            officeName
            officeSections {
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