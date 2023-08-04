
export type BirOffices = {
    officeId: number;
    officeName: string;
    officeSections: OfficeSections[];
}

export type OfficeSections = {
    sectionId: number;
    sectionName: string;
    sectionOffice: BirOffices;
}

export type DocumentTypes = {
    docId: number;
    docType: string;
}

export type DocumentStatus = {
    statusId: number;
    statusLabel: string;
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
    refId: string;
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
    officeId: number;
    password: string;
    resetCode: string | null;
}