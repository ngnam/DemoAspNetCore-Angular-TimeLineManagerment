interface Sticker {
  id?: number;
  url: string;
}

interface List {
  page: number;
  total: number; // total rows/records
  pageSize: number;
  list: Sticker[];
}

export interface ListStickerResponse {
  resultCode: number; // 1: success, 0: failed
  resultData: List;
  errorDisplay: boolean;
  errorMessage: string;
}
