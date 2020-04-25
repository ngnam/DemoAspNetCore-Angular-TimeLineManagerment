import { Mapper } from 'src/app/core/base/mapper';
import { Post, PostDTOModel, PostStatus, PostType } from '../../api-models/post-response';
import { toTimestampFromDate, toTimestamp, toDateFormat, fromTimestamp, toTimeFormat } from 'src/app/core/base/helpers';

export class PostRepositoryMapper extends Mapper<Post, PostDTOModel> {
  mapFrom(param: Post): PostDTOModel {
    const data: PostDTOModel = {
      id: param.id || 0,
      isPublishNow: 1,
      coupon: param.coupon || null,
      images: param.images || null,
      link: param.link || null,
      sticker: param.sticker || null,
      survey: param.survey || null,
      video: param.video || null,
      postStatus: param.status || null,
      postType: param.type || null,
    };
    const createAt: Date = fromTimestamp(param.scheduledTime); // time scheduled post
    data.publishDate = toDateFormat(createAt);
    data.publishTime = toTimeFormat(createAt);
    return data;
  }

  mapTo(param: PostDTOModel): Post {
    const data: Post = {
      id: param.id || 0,
      status: param.postStatus || PostStatus.DRAFTED,
      type: param.postType || PostType.IMAGE,
    };

    switch (param.postType) {
      case PostType.IMAGE:
        data.images = param.images || null;
        break;
      case PostType.COUPON:
        data.coupon = param.coupon || null;
        break;
      case PostType.LINK:
        data.link = param.link || null;
        break;
      case PostType.STICKER:
        data.sticker = param.sticker || null;
        break;
      case PostType.SURVEY:
        data.survey = param.survey || null;
        break;
      case PostType.VIDEO:
        data.video = param.video || null;
        break;
    }

    // create_at
    // 1: publishNow, 2: publishSchedule
    if (param.isPublishNow === 1) {
      data.createdAt = toTimestampFromDate(new Date());
      data.scheduledTime = data.createdAt;
    }

    if (param.isPublishNow === 2 && param.publishDate && param.publishTime) {
      const dateTimeParse = `${param.publishDate}T${param.publishTime}`;
      data.createdAt = toTimestamp(dateTimeParse);
      data.scheduledTime = data.createdAt;
    }

    // updatedAt
    data.updatedAt = data.createdAt;

    return data;
  }
}
