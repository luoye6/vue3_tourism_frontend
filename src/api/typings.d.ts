declare namespace API {
  type Barrage = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    isSelected?: number;
    message?: string;
    updateTime?: string;
    userAvatar?: string;
    userId?: number;
  };

  type BarrageAddRequest = {
    message?: string;
    userAvatar?: string;
  };

  type BarrageQueryRequest = {
    createTime?: string;
    current?: number;
    id?: number;
    isSelected?: number;
    message?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userAvatar?: string;
    userId?: number;
  };

  type BarrageUpdateRequest = {
    id?: number;
    isSelected?: number;
    message?: string;
    userAvatar?: string;
    userId?: number;
  };

  type BarrageVO = {
    id?: number;
    isSelected?: number;
    message?: string;
    userAvatar?: string;
    userId?: number;
  };

  type BaseResponse = {
    code?: number;
    data?: Record<string, any>;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseBarrageVO_ = {
    code?: number;
    data?: BarrageVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseCommentVO_ = {
    code?: number;
    data?: CommentVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseListCommentVO_ = {
    code?: number;
    data?: CommentVO[];
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseListMapStringObject_ = {
    code?: number;
    data?: MapStringObject_[];
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseListMyCommentVO_ = {
    code?: number;
    data?: MyCommentVO[];
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseListSpot_ = {
    code?: number;
    data?: Spot[];
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseNoticeVO_ = {
    code?: number;
    data?: NoticeVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageBarrage_ = {
    code?: number;
    data?: PageBarrage_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageBarrageVO_ = {
    code?: number;
    data?: PageBarrageVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageComment_ = {
    code?: number;
    data?: PageComment_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageCommentVO_ = {
    code?: number;
    data?: PageCommentVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageNotice_ = {
    code?: number;
    data?: PageNotice_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageNoticeVO_ = {
    code?: number;
    data?: PageNoticeVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePagePost_ = {
    code?: number;
    data?: PagePost_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageSpot_ = {
    code?: number;
    data?: PageSpot_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageSpotFee_ = {
    code?: number;
    data?: PageSpotFee_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageSpotFeeVO_ = {
    code?: number;
    data?: PageSpotFeeVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageSpotOrder_ = {
    code?: number;
    data?: PageSpotOrder_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageSpotOrderVO_ = {
    code?: number;
    data?: PageSpotOrderVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageSpotRoute_ = {
    code?: number;
    data?: PageSpotRoute_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageSpotRouteVO_ = {
    code?: number;
    data?: PageSpotRouteVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageSpotScore_ = {
    code?: number;
    data?: PageSpotScore_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageSpotScoreVO_ = {
    code?: number;
    data?: PageSpotScoreVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageSpotVO_ = {
    code?: number;
    data?: PageSpotVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageUserAiMessage_ = {
    code?: number;
    data?: PageUserAiMessage_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageUserAiMessageVO_ = {
    code?: number;
    data?: PageUserAiMessageVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageUserSpotFavorites_ = {
    code?: number;
    data?: PageUserSpotFavorites_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageUserSpotFavoritesVO_ = {
    code?: number;
    data?: PageUserSpotFavoritesVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseSpotFeeVO_ = {
    code?: number;
    data?: SpotFeeVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseSpotOrderVO_ = {
    code?: number;
    data?: SpotOrderVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseSpotRouteVO_ = {
    code?: number;
    data?: SpotRouteVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseSpotScoreVO_ = {
    code?: number;
    data?: SpotScoreVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseSpotVO_ = {
    code?: number;
    data?: SpotVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseUserAiMessage_ = {
    code?: number;
    data?: UserAiMessage;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseUserAiMessageVO_ = {
    code?: number;
    data?: UserAiMessageVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseUserSpotFavoritesVO_ = {
    code?: number;
    data?: UserSpotFavoritesVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    hashMap?: Record<string, any>;
    message?: string;
  };

  type BuySpotFeeRequest = {
    payStatus?: number;
    paymentAmount?: number;
    spotFeeId?: number;
    spotFeeQuantity?: number;
    userName?: string;
    userPhone?: string;
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type Comment = {
    ancestorId?: number;
    content?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    parentId?: number;
    postId?: number;
    updateTime?: string;
    userId?: number;
  };

  type CommentAddRequest = {
    content?: string;
    parentId?: number;
    postId?: number;
  };

  type CommentEditRequest = {
    content?: string;
    id?: number;
  };

  type CommentQueryRequest = {
    ancestorId?: number;
    content?: string;
    current?: number;
    id?: number;
    pageSize?: number;
    parentId?: number;
    postId?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type CommentUpdateRequest = {
    content?: string;
    id?: number;
    parentId?: number;
    postId?: number;
    userId?: number;
  };

  type CommentVO = {
    ancestorId?: number;
    content?: string;
    createTime?: string;
    id?: number;
    parentId?: number;
    postId?: number;
    repliedUser?: UserVO;
    replies?: CommentVO[];
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getAverageScoreUsingGETParams = {
    /** spotId */
    spotId: number;
  };

  type getBarrageVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getCommentByPostIdUsingGETParams = {
    /** postId */
    postId?: number;
  };

  type getCommentVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getNoticeVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getSpotFeeVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getSpotOrderVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getSpotRouteVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getSpotScoreVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getSpotVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getTravelDataUsingGETParams = {
    /** payStatus */
    payStatus: number;
    /** userId */
    userId: number;
  };

  type getUserAiMessageVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserSpotFavoritesVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    balance?: number;
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type MapStringObject_ = true;

  type MyCommentVO = {
    content?: string;
    id?: number;
    postContent?: string;
    postId?: number;
    postTitle?: string;
    updateTime?: string;
  };

  type Notice = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    noticeAdminId?: number;
    noticeContent?: string;
    noticeTitle?: string;
    updateTime?: string;
  };

  type NoticeAddRequest = {
    noticeAdminId?: number;
    noticeContent?: string;
    noticeTitle?: string;
  };

  type NoticeQueryRequest = {
    current?: number;
    id?: number;
    noticeAdminId?: number;
    noticeContent?: string;
    noticeTitle?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type NoticeUpdateRequest = {
    id?: number;
    noticeAdminId?: number;
    noticeContent?: string;
    noticeTitle?: string;
  };

  type NoticeVO = {
    createTime?: string;
    id?: number;
    noticeAdminId?: number;
    noticeContent?: string;
    noticeTitle?: string;
    updateTime?: string;
    user?: UserVO;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageBarrage_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Barrage[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageBarrageVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: BarrageVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageComment_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Comment[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageCommentVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: CommentVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageNotice_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Notice[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageNoticeVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: NoticeVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePost_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Post[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSpot_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Spot[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSpotFee_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SpotFee[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSpotFeeVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SpotFeeVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSpotOrder_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SpotOrder[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSpotOrderVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SpotOrderVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSpotRoute_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SpotRoute[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSpotRouteVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SpotRouteVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSpotScore_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SpotScore[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSpotScoreVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SpotScoreVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageSpotVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: SpotVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserAiMessage_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserAiMessage[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserAiMessageVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserAiMessageVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserSpotFavorites_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserSpotFavorites[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserSpotFavoritesVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserSpotFavoritesVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Post = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type Spot = {
    adminId?: number;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    spotAvatar?: string;
    spotDescription?: string;
    spotLocation?: string;
    spotName?: string;
    spotStatus?: number;
    spotTags?: string;
    updateTime?: string;
    viewNum?: number;
  };

  type SpotAddRequest = {
    adminId?: number;
    spotAvatar?: string;
    spotDescription?: string;
    spotLocation?: string;
    spotName?: string;
    spotTagList?: string[];
  };

  type SpotEditRequest = {
    adminId?: number;
    favourNum?: number;
    id?: number;
    spotAvatar?: string;
    spotDescription?: string;
    spotLocation?: string;
    spotName?: string;
    spotStatus?: number;
    spotTagList?: string[];
    viewNum?: number;
  };

  type SpotFee = {
    adminId?: number;
    createTime?: string;
    id?: number;
    isDelete?: number;
    spotFeeDescription?: string;
    spotFeeNumber?: number;
    spotFeePrice?: number;
    spotFeeStatus?: number;
    spotId?: number;
    updateTime?: string;
  };

  type SpotFeeAddRequest = {
    adminId?: number;
    spotFeeDescription?: string;
    spotFeeNumber?: number;
    spotFeePrice?: number;
    spotFeeStatus?: number;
    spotId?: number;
  };

  type SpotFeeEditRequest = {
    adminId?: number;
    id?: number;
    spotFeeDescription?: string;
    spotFeeNumber?: number;
    spotFeePrice?: number;
    spotFeeStatus?: number;
    spotId?: number;
  };

  type SpotFeeQueryRequest = {
    adminId?: number;
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    spotFeeDescription?: string;
    spotFeeNumber?: number;
    spotFeePrice?: number;
    spotFeeStatus?: number;
    spotId?: number;
  };

  type SpotFeeUpdateRequest = {
    adminId?: number;
    id?: number;
    spotFeeDescription?: string;
    spotFeeNumber?: number;
    spotFeePrice?: number;
    spotFeeStatus?: number;
    spotId?: number;
  };

  type SpotFeeVO = {
    adminId?: number;
    createTime?: string;
    id?: number;
    spotFeeDescription?: string;
    spotFeeNumber?: number;
    spotFeePrice?: number;
    spotFeeStatus?: number;
    spotId?: number;
    spotName?: string;
    updateTime?: string;
  };

  type SpotOrder = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    payStatus?: number;
    paymentAmount?: number;
    spotFeeId?: number;
    updateTime?: string;
    userId?: number;
    userName?: string;
    userPhone?: string;
  };

  type SpotOrderAddRequest = {
    payStatus?: number;
    paymentAmount?: number;
    spotFeeId?: number;
    userId?: number;
    userName?: string;
    userPhone?: string;
  };

  type SpotOrderEditRequest = {
    createTime?: string;
    id?: number;
    payStatus?: number;
    paymentAmount?: number;
    spotFeeId?: number;
    updateTime?: string;
    userId?: number;
    userName?: string;
    userPhone?: string;
  };

  type SpotOrderQueryRequest = {
    createTime?: string;
    current?: number;
    id?: number;
    pageSize?: number;
    payStatus?: number;
    paymentAmount?: number;
    sortField?: string;
    sortOrder?: string;
    spotFeeId?: number;
    updateTime?: string;
    userId?: number;
    userName?: string;
    userPhone?: string;
  };

  type SpotOrderUpdateRequest = {
    createTime?: string;
    id?: number;
    payStatus?: number;
    paymentAmount?: number;
    spotFeeId?: number;
    updateTime?: string;
    userId?: number;
    userName?: string;
    userPhone?: string;
  };

  type SpotOrderVO = {
    createTime?: string;
    id?: number;
    payStatus?: number;
    paymentAmount?: number;
    spotFeeId?: number;
    spotName?: string;
    updateTime?: string;
    userId?: number;
    userName?: string;
    userPhone?: string;
  };

  type SpotQueryRequest = {
    adminId?: number;
    createTime?: string;
    current?: number;
    favourNum?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    spotAvatar?: string;
    spotDescription?: string;
    spotLocation?: string;
    spotName?: string;
    spotStatus?: number;
    spotTagList?: string[];
    updateTime?: string;
    viewNum?: number;
  };

  type SpotRoute = {
    adminId?: number;
    createTime?: string;
    id?: number;
    isDelete?: number;
    spotIds?: string;
    spotRouteAvatar?: string;
    spotRouteDescription?: string;
    updateTime?: string;
  };

  type SpotRouteAddRequest = {
    adminId?: number;
    spotIdList?: string[];
    spotRouteAvatar?: string;
    spotRouteDescription?: string;
  };

  type SpotRouteQueryRequest = {
    adminId?: number;
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    spotIdList?: string[];
    spotRouteAvatar?: string;
    spotRouteDescription?: string;
  };

  type SpotRouteUpdateRequest = {
    adminId?: number;
    id?: number;
    spotIdList?: string[];
    spotRouteAvatar?: string;
    spotRouteDescription?: string;
  };

  type SpotRouteVO = {
    adminId?: number;
    createTime?: string;
    id?: number;
    isDelete?: number;
    spotDistanceList?: number[];
    spotIdList?: string[];
    spotNameList?: string[];
    spotRouteAvatar?: string;
    spotRouteDescription?: string;
    updateTime?: string;
  };

  type SpotScore = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    score?: number;
    spotId?: number;
    updateTime?: string;
    userId?: number;
  };

  type SpotScoreAddRequest = {
    score?: number;
    spotId?: number;
    userId?: number;
  };

  type SpotScoreEditRequest = {
    id?: number;
    score?: number;
    spotId?: number;
    userId?: number;
  };

  type SpotScoreQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    score?: number;
    sortField?: string;
    sortOrder?: string;
    spotId?: number;
    userId?: number;
  };

  type SpotScoreUpdateRequest = {
    id?: number;
    score?: number;
    spotId?: number;
    userId?: number;
  };

  type SpotScoreVO = {
    createTime?: string;
    id?: number;
    score?: number;
    spotId?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
  };

  type SpotUpdateRequest = {
    adminId?: number;
    favourNum?: number;
    id?: number;
    spotAvatar?: string;
    spotDescription?: string;
    spotLocation?: string;
    spotName?: string;
    spotStatus?: number;
    spotTagList?: string[];
    viewNum?: number;
  };

  type SpotVO = {
    adminId?: number;
    createTime?: string;
    favourNum?: number;
    id?: number;
    spotAvatar?: string;
    spotDescription?: string;
    spotLocation?: string;
    spotName?: string;
    spotStatus?: number;
    spotTagList?: string[];
    updateTime?: string;
    viewNum?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    aiRemainNumber?: number;
    balance?: number;
    createTime?: string;
    editTime?: string;
    id?: number;
    isDelete?: number;
    mpOpenId?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    userRole?: string;
  };

  type UserAiMessage = {
    aiGenerateText?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userId?: number;
    userInputText?: string;
  };

  type UserAiMessageAddRequest = {
    aiGenerateText?: string;
    userId?: number;
    userInputText?: string;
  };

  type UserAiMessageEditRequest = {
    aiGenerateText?: string;
    createTime?: string;
    id?: number;
    updateTime?: string;
    userId?: number;
    userInputText?: string;
  };

  type UserAiMessageQueryRequest = {
    aiGenerateText?: string;
    createTime?: string;
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    updateTime?: string;
    userId?: number;
    userInputText?: string;
  };

  type UserAiMessageUpdateRequest = {
    aiGenerateText?: string;
    createTime?: string;
    id?: number;
    updateTime?: string;
    userId?: number;
    userInputText?: string;
  };

  type UserAiMessageVO = {
    aiGenerateText?: string;
    createTime?: string;
    id?: number;
    updateTime?: string;
    userId?: number;
    userInputText?: string;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    aiRemainNumber?: number;
    balance?: number;
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserSpotFavorites = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    remark?: string;
    spotId?: number;
    status?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserSpotFavoritesAddRequest = {
    remark?: string;
    spotId?: number;
    status?: number;
    userId?: number;
  };

  type UserSpotFavoritesEditRequest = {
    id?: number;
    remark?: string;
    spotId?: number;
    status?: number;
    userId?: number;
  };

  type UserSpotFavoritesQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    remark?: string;
    sortField?: string;
    sortOrder?: string;
    spotId?: number;
    status?: number;
    userId?: number;
  };

  type UserSpotFavoritesUpdateRequest = {
    id?: number;
    remark?: string;
    spotId?: number;
    status?: number;
    userId?: number;
  };

  type UserSpotFavoritesVO = {
    createTime?: string;
    favourNum?: number;
    id?: number;
    remark?: string;
    spotAvatar?: string;
    spotId?: number;
    spotLocation?: string;
    spotName?: string;
    status?: number;
    updateTime?: string;
    userId?: number;
    viewNum?: number;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    aiRemainNumber?: number;
    balance?: number;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    aiRemainNumber?: number;
    balance?: number;
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };
}
