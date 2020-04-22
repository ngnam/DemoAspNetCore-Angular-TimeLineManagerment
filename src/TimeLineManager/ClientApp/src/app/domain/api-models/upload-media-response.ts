enum MediaType {
    PHOTO = 'PHOTO',
    VIDEO = 'VIDEO'
}

interface Media {
    type: MediaType,
    thumb: string;
    original: string;
    width : number;
    height : number;
    duration?: number;
}

export interface UploadMediaResponse {
    resultCode: number; // 1: success, 0: failed
    resultData: Media;
    errorDisplay: boolean;
    errorMessage: string;
}
