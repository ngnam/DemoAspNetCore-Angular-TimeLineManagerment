import { Mapper } from 'src/app/core/base/mapper';
import { Post, PostDTOModel, PostStatus, PostType } from '../../api-models/post-response';
import { toTimestampFromDate, toTimestamp, toDateFormat, fromTimestamp, toTimeFormat } from 'src/app/core/base/helpers';

export class PostRepositoryMapper extends Mapper<Post, PostDTOModel> {
  mapFrom(param: Post): PostDTOModel {
    const data: PostDTOModel = {
      id: param.id || 0,
      isPublishNow: 1,
      postStatus: param.status,
      postType: param.type,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt
    };
    const scheduledTime: Date = fromTimestamp(param.scheduledTime); // time scheduled post
    data.publishDate = toDateFormat(scheduledTime);
    data.publishTime = toTimeFormat(scheduledTime);

    switch (param.type) {
      case PostType.IMAGE:
        data.images = param.images;
        break;
      case PostType.COUPON:
        data.coupon = param.coupon;
        break;
      case PostType.LINK:
        data.link = param.link;
        break;
      case PostType.STICKER:
        data.sticker = param.sticker;
        break;
      case PostType.SURVEY:
        data.survey = param.survey;
        break;
      case PostType.VIDEO:
        data.video = param.video;
        break;
    }

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

    // createAt
    data.createdAt = toTimestampFromDate(new Date());
    // updatedAt
    data.updatedAt = toTimestampFromDate(new Date());

    // 1: publishNow, 2: publishSchedule
    if (param.isPublishNow === 1) {
      data.scheduledTime = data.createdAt;
    } else if (param.isPublishNow === 2 && param.publishDate && param.publishTime) {
      const dateTimeParse = `${param.publishDate}T${param.publishTime}`;
      data.scheduledTime = toTimestamp(dateTimeParse);
    }

    return data;
  }
}
