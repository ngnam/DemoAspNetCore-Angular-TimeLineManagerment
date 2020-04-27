enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface Image {
  thumb: string; // url size 100x100
  original: string; // url fullsize
  width: number;
  height: number;
}

export interface Video {
  thumb: string;
  original: string;
  width: number;
  height: number;
  duration: number;
}

interface Sticker {
  id?: number;
  url: string;
}

interface Coupon {
  id?: number;
  startDate: number;
  endDate: number;
  status: Status;
  title: string;
  thumbnail: string;
}

interface Link {
  id?: number;
  url: string; // https://line.me
  title: string; // "LINE : Free Calls & Messages",
  desc: string; // "LINE is a new communication app which allows you to
  // make FREE voice calls and send FREE messages whenever and wherever you are, 24 hours a day!",
  thumbnail: string;
}

interface Survey {
  id?: number;
  startDate: number;
  endDate: number;
  status: Status;
  title: string;
  thumbnail: string;
}

export enum PostStatus {
  DRAFTED = 'DRAFTED',
  PUBLISHED = 'PUBLISHED',
}

export enum PostType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  STICKER = 'STICKER',
  COUPON = 'COUPON',
  LINK = 'LINK',
  SURVEY = 'SURVEY',
}

export interface PostParseJSON {
  id?: number; // column int
  type: string; // column string
  status: string; // column string
  scheduledTime?: number; // column double
  images?: string;  // column JSON_VALUE('thumb') image.thumb
  video?: string;  // column JSON_VALUE
  sticker?: string; // column JSON_VALUE
  coupon?: string;  // column JSON_VALUE
  link?: string;  // column JSON_VALUE
  survey?: string;  // column JSON_VALUE
  createdAt?: number; // column double
  updatedAt?: number; // column double
}

export interface Post {
  id: number; // column int
  type: PostType; // column string
  status: PostStatus; // column string
  scheduledTime?: number; // column double
  images?: Image[];  // column JSON_VALUE('thumb') image.thumb
  video?: Video;  // column JSON_VALUE
  sticker?: Sticker; // column JSON_VALUE
  coupon?: Coupon;  // column JSON_VALUE
  link?: Link;  // column JSON_VALUE
  survey?: Survey;  // column JSON_VALUE
  createdAt?: number; // column double
  updatedAt?: number; // column double
}

export interface PostDTOModel {
  id?: number;
  isPublishNow: number;
  postType: PostType;
  publishDate?: string;
  publishTime?: string;
  postStatus?: PostStatus;
  images?: Image[];
  video?: Video;
  sticker?: Sticker;
  coupon?: Coupon;
  link?: Link;
  survey?: Survey;
  createdAt?: number; // column double
  updatedAt?: number; // column double
}

export interface PostResponse {
  resultCode: number; // 1: success, 0: failed
  resultData: PostParseJSON;
  errorDisplay: boolean;
  errorMessage: string;
}

interface List {
  page: number;
  total: number; // total rows/records
  pageSize: number;
  list: PostParseJSON[];
}

export interface PostListResponse {
  resultCode: number; // 1: success, 0: failed
  resultData: List;
  errorDisplay: boolean;
  errorMessage: string;
}
