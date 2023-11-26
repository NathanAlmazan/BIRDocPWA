
import { gql } from "@apollo/client";

// ================================= MUTATIONS ====================================== //

export const CREATE_SCHEDULE = gql`
    mutation AddSchedule($data: CreateScheduleInput!) {
        addSchedule(data: $data) {
            schedId
        }
    }
`

export const UPDATE_SCHEDULE = gql`
    mutation UpdateSchedule($scheduleId: String!, $data: CreateScheduleInput!) {
        updateSchedule(scheduleId: $scheduleId, data: $data) {
            schedId
        }
    }
`

export const DELETE_SCHEDULE = gql`
    mutation DeleteSchedule($scheduleId: String!) {
        deleteSchedule(scheduleId: $scheduleId) {
            schedId
        }
    }
`

export const SUBMIT_REPORT = gql`
    mutation SendReport($data: ReportInput!) {
        sendReport(data: $data) {
            reportId
        }
    }
`

// ============================== QUERIES ====================================== //
export const GET_ALL_SCHEDULES = gql`
    query GetAllSchedules($userId: String!) {
        getAllSchedules(userId: $userId) {
            subject
            type
            schedId
            repeat
            recipients {
                roleId
                roleName
            }
            description
            dateStart
            dateDue
        }
    }
`

export const GET_ALL_REPORTS = gql`
    query GetAllReports($schedId: String!, $reportDate: String!) {
        getAllReports(schedId: $schedId, reportDate: $reportDate) {
            message
            author {
                accountId
                firstName
                lastName
                officeSection {
                    sectionName
                    sectionOffice {
                        officeName
                    }
                }
                role {
                    roleName
                }
            }
            schedule {
                subject
            }
            files {
                fileId
                fileName
                fileUrl
                fileType
            }
            reportDate
        }
    } 
`

export const GET_DUE_REPORTS = gql`
    query GetDueReports($userId: String!) {
        getDueReports(userId: $userId) {
            schedId
            subject
            description
            dateDue
        }
    }
`