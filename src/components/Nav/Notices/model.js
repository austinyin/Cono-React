import {pubTimeCalc} from "src/shared/js/commonUtil";

export const NoticeType = {
    comments: 'comments',
    commentSigns: 'commentSigns',
    tweetSigns: 'tweetSigns',
    tweetLikes: 'tweetLikes',
    personFollows: 'personFollows',
    tweetCollects: 'tweetCollects'
}

export function getNoticeDescByType(data) {
    const ret = {
        username: null,
        avatar: null,
        actionDesc: null,
        tweetThumbnail: null,
        relations: null,
        id: null,
        time: pubTimeCalc(new Date(data.obj.update_time))
    }
    /**
     * tweetRelations
     */
    if((data.type === NoticeType.tweetLikes)||(data.type === NoticeType.tweetCollects)){
        ret.username =data.obj.user.username
        ret.tweetThumbnail = `http://127.0.0.1:8000/api/tweet/${data.obj.tweet}/thumbnail`
        ret.avatar = data.obj.user.avatar

    }
    if(data.type === NoticeType.tweetLikes){
        ret.actionDesc = "赞了你的照片"
    }

    if(data.type === NoticeType.tweetCollects){
        ret.actionDesc = "收藏了你的推文"
    }

    /**
     * personRelations
     */
    if(data.type === NoticeType.personFollows){
        ret.username = data.obj.act_one.username
        ret.avatar = data.obj.act_one.avatar
        ret.relations = data.obj.act_one.relations
        ret.id = data.obj.act_one.id
        ret.actionDesc = "开始关注你"
    }

    /**
     * tweetComments
     */
    if(data.type === NoticeType.comments){
        ret.username =data.obj.user.username
        ret.avatar = data.obj.user.avatar
        ret.actionDesc = `评论了${data.obj.text}`
        ret.tweetThumbnail = `http://127.0.0.1:8000/api/tweet/${data.obj.tweet}/thumbnail`
    }
    return ret
}