import { Roles, UserAccounts } from "../threads/types";

export type Schedules = {
    schedId: string;
    subject: string;
    description: string;
    type: string;
    repeat: string;
    recipients: Roles[];
    dateStart: Date;
    dateDue: Date;
    reports: Reports[]
}

export type Reports = {
    reportId: string;
    author: UserAccounts;
    schedule: Schedules;
    reportDate: Date;
    message: string;
    files: ReportFiles[]
}

export type ReportFiles = {
    fileId: string;
    fileUrl: string;
    fileName: string;
    fileType: string;
}