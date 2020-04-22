enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

interface Survey {
    id: number;
    startDate: number;
    endDate: number;
    status: Status;
    title: string;
    thumbnail : string;
}

interface List {
    page: number;
    total: number; // total rows/records
    pageSize: number;
    list: Survey[];
}

export interface ListSurveyResponse {
    resultCode: number; // 1: success, 0: failed
    resultData: List;
    errorDisplay: boolean;
    errorMessage: string;
}
