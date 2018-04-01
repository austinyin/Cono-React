export const CenterChooseType = {
    publish: 1,
    collect: 2
}

export const ChooseTypeValueToTweetKey = {
    [CenterChooseType.publish]: "tweetData",
    [CenterChooseType.collect]: "collectTweetData",
}

export const ChooseTypeValueToIsEmptyKey = {
    [CenterChooseType.publish]: "isTweetListEmpty",
    [CenterChooseType.collect]: "isCollectTweetListEmpty",
}


