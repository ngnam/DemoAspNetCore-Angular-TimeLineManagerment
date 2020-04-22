interface Link {
    url: string; // https://line.me
    title: string; // "LINE : Free Calls & Messages",
    desc: string; // "LINE is a new communication app which allows you to make FREE voice calls and send FREE messages whenever and wherever you are, 24 hours a day!",
    thumbnail: string;
}

export interface UrlInformationResponse {
    resultCode: number; // 1: success, 0: failed
    resultData: Link;
    errorDisplay: boolean;
    errorMessage: string;
}
