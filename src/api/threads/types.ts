
export type BirOffices = {
    officeId: number;
    officeName: string;
    refNum?: string;
    officeSections: OfficeSections[];
}

export type OfficeSections = {
    sectionId: number;
    sectionName: string;
    refNum?: string;
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

export type DocumentPurpose = {
    purposeId: number;
    purposeName: string;
    actionable: boolean;
} 

export type ThreadHistory = {
    historyId: string;
    historyLabel: string;
    dateCreated: string;
    status: DocumentStatus | null;
}

export type Thread = {
    refId: string;
    refSlipNum: string;
    reqForm?: string;
    subject: string;
    revision: number;
    author: UserAccounts;
    status: DocumentStatus;
    recipient: OfficeSections;
    docType: DocumentTypes;
    attachments: boolean;
    completed: boolean;
    purpose: DocumentPurpose;
    dateCreated: Date;
    dateUpdated: Date;
    dateDue: Date;
    messages: Messages[]
    history: ThreadHistory[]
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

export type Roles = {
    roleId: number;
    roleName: string;
    superuser: boolean;
}

export type UserAccounts = {
    accountId: string;
    firstName: string;
    lastName: string;
    role: Roles;
    officeSection: OfficeSections;
    resetCode: string | null;
    signImage?: string;
}

export type Analytics = {
    status: DocumentStatus;
    docType: DocumentTypes;
    purpose: DocumentPurpose;
    count: number;
}
