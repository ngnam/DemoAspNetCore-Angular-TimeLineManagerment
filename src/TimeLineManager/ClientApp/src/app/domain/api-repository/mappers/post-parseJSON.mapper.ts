import { PostParseJSON, Post, PostType, PostStatus } from '../../api-models/post-response';
import { Mapper } from 'src/app/core/base/mapper';

export class PostParserJSONMapper extends Mapper<Post, PostParseJSON> {
  mapFrom(param: Post): PostParseJSON {
    const result: PostParseJSON = {
      id: param.id,
      status: param.status,
      type: param.type,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
      scheduledTime: param.scheduledTime
    };

    switch (param.type) {
      case PostType.IMAGE:
        result.images = param.images ? (JSON.stringify(param.images) || null) : null;
        break;
      case PostType.COUPON:
        result.coupon = param.coupon ? (JSON.stringify(param.coupon) || null) : null;
        break;
      case PostType.LINK:
        result.link = param.link ? (JSON.stringify(param.link) || null) : null;
        break;
      case PostType.STICKER:
        result.sticker = param.sticker ? (JSON.stringify(param.sticker) || null) : null;
        break;
      case PostType.SURVEY:
        result.survey = param.survey ? (JSON.stringify(param.survey) || null) : null;
        break;
      case PostType.VIDEO:
        result.video = param.video ? (JSON.stringify(param.video) || null) : null;
        break;
    }

    return result;
  }
  mapTo(param: PostParseJSON): Post {
    const result: Post = {
      id: param.id,
      status: param.status as PostStatus,
      type: param.type as PostType,
      createdAt: param.createdAt,
      updatedAt: param.updatedAt,
      scheduledTime: param.scheduledTime
    };

    switch (param.type as PostType) {
      case PostType.IMAGE:
        result.images = tryParseJSON(param.images) || null;
        break;
      case PostType.COUPON:
        result.coupon = tryParseJSON(param.coupon) || null;
        break;
      case PostType.LINK:
        result.link = tryParseJSON(param.link) || null;
        break;
      case PostType.STICKER:
        result.sticker = tryParseJSON(param.sticker) || null;
        break;
      case PostType.SURVEY:
        result.survey = tryParseJSON(param.survey) || null;
        break;
      case PostType.VIDEO:
        result.video = tryParseJSON(param.video) || null;
        break;
    }

    return result;
  }
}

function tryParseJSON(jsonString) {
  try {
    const o = JSON.parse(jsonString);
    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {}

  return false;
}
