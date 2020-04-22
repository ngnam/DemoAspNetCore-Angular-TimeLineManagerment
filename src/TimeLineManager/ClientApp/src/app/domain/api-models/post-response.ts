enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

interface Image {
    thumb: string;
    original: string;
    width : number;
    height : number;
}

interface Video {
    thumb: string;
    original: string;
    width : number;
    height : number;
    duration : number;
}

interface Sticker {
    id: number;
    url: string;
}

interface Coupon {
    id: number;
    startDate: number;
    endDate: number;
    status: Status;
    title: string;
    thumbnail : string;
}

interface Link {
    url: string; // https://line.me
    title: string; // "LINE : Free Calls & Messages",
    desc: string; // "LINE is a new communication app which allows you to make FREE voice calls and send FREE messages whenever and wherever you are, 24 hours a day!",
    thumbnail: string;
}

interface Survey {
    id: number;
    startDate: number;
    endDate: number;
    status: Status;
    title: string;
    thumbnail : string;
}

enum PostStatus {
    DRAFTED = 'DRAFTED',
    PUBLISHED = 'PUBLISHED',
}

enum PostType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    STICKER = 'STICKER',
    COUPON = 'COUPON',
    LINK = 'LINK',
    SURVEY = 'SURVEY',
}

interface Post {
    id: number;
    type: PostType;
    status: PostStatus;
    scheduledTime?: number;
    images?: Image[];
    video?: Video;
    sticker?: Sticker;
    coupon?: Coupon;
    link?: Link;
    survey?: Survey;
    createdAt: number;
    updatedAt: number;
}

export interface PostResponse {
    resultCode: number; // 1: success, 0: failed
    resultData: Post;
    errorDisplay: boolean;
    errorMessage: string;
}
