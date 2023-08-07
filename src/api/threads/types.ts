
export type BirOffices = {
    officeId: number;
    officeName: string;
    officeSections: OfficeSections[];
}

export type OfficeSections = {
    sectionId: number;
    sectionName: string;
    admin: boolean;
    sectionOffice: BirOffices;
    officers: UserAccounts[];
}

export type DocumentTypes = {
    docId: number;
    docType: string;
    threadCount?: number;
}

export type DocumentStatus = {
    statusId: number;
    statusLabel: string;
    threadCount?: number;
}

export type Thread = {
    refId: string;
    subject: string;
    revision: number;
    author: UserAccounts;
    status: DocumentStatus;
    recipient: OfficeSections;
    docType: DocumentTypes;
    attachments: boolean;
    completed: boolean;
    dateCreated: Date;
    dateUpdated: Date;
    dateDue: Date;
    messages: Messages[]
}

export type Messages = {
    msgId: string;
    thread: Thread;
    sender: UserAccounts;
    message: string;
    dateSent: Date;
    files: MessageFiles[];
}

export type MessageFiles = {
    fileId?: string;
    msgId?: string;
    fileUrl: string;
    fileName: string;
    fileType: string;
}

export type UserAccounts = {
    accountId: string;
    firstName: string;
    lastName: string;
    position: string;
    officeSection: OfficeSections;
    resetCode: string | null;
}

export type Analytics = {
    status: DocumentStatus;
    docType: DocumentTypes;
    count: number;
}
