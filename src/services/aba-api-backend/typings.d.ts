declare namespace API {
  type DeleteDTO = {
    id: number;
  };

  type DictData = {
    code?: string;
    createTime?: string;
    dictTypeId?: number;
    id?: number;
    isDefault?: number;
    isDelete?: number;
    name?: string;
    status?: number;
    style?: string;
    updateTime?: string;
    value?: string;
  };

  type DictType = {
    createTime?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    status?: number;
    updateTime?: string;
    userId?: number;
  };

  type DictTypeAddRequest = {
    description?: string;
    name: string;
  };

  type DictTypeUpdateRequest = {
    description?: string;
    id: number;
    name?: string;
  };

  type ErrorCode = {
    description?: string;
    name: string;
  };

  type getDictDataByTypeUsingGETParams = {
    /** typeId */
    typeId: number;
  };

  type getDictTypeByIdUsingGETParams = {
    /** typeId */
    typeId: number;
  };

  type getInterfaceChargingByInterfaceIdUsingGETParams = {
    /** interfaceId */
    interfaceId: number;
  };

  type getInterfaceInfoByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getInterfaceInfoPagesUsingGETParams = {
    createTime?: string;
    current?: number;
    description?: string;
    id?: number;
    method?: number;
    name?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type getShowingInterfaceInfoUsingGETParams = {
    createTime?: string;
    current?: number;
    description?: string;
    id?: number;
    method?: number;
    name?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type getUserByAccessKeyUsingGETParams = {
    /** accessKey */
    accessKey: string;
  };

  type getUserByUserAccountUsingGETParams = {
    /** userAccount */
    userAccount: string;
  };

  type getUserInterfaceInfoByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getUserPageUsingGETParams = {
    createTime?: string;
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userName?: string;
    userRole?: string;
  };

  type InterfaceCharging = {
    createTime?: string;
    freeCount?: number;
    id?: number;
    interfaceInfoId?: number;
    isCharge?: number;
    isDelete?: number;
    price?: number;
    updateTime?: string;
  };

  type InterfaceChargingRequest = {
    freeCount?: number;
    interfaceInfoId: number;
    isCharge?: number;
    price?: number;
  };

  type InterfaceInfo = {
    contentType?: number;
    createTime?: string;
    dataId?: string;
    description?: string;
    id?: number;
    isDelete?: number;
    method?: number;
    name?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type InterfaceInfoAddRequest = {
    contentType: number;
    description?: string;
    errorCode?: ErrorCode[];
    method: number;
    name: string;
    requestHeaders?: RequestHeader[];
    requestParams?: RequestParam[];
    responseParams?: ResponseParam[];
    url: string;
  };

  type InterfaceInfoInvokeDTO = {
    bodyParams?: string;
    headerParams?: Record<string, any>;
    id: number;
    pathParams?: Record<string, any>;
    queryParams?: Record<string, any>;
  };

  type InterfaceInfoUpdateDTO = {
    description?: string;
    id: number;
    method?: string;
    name?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInfoVO = {
    contentType?: number;
    createTime?: string;
    dataId?: string;
    description?: string;
    errorCode?: InterfaceParam[];
    hasFree?: number;
    id?: number;
    interfaceCharging?: InterfaceCharging;
    isDelete?: number;
    method?: number;
    name?: string;
    requestHeaders?: InterfaceParam[];
    requestParams?: InterfaceParam[];
    responseParams?: InterfaceParam[];
    status?: number;
    totalInvokeCount?: number;
    updateTime?: string;
    url?: string;
    userAccount?: string;
    userId?: number;
  };

  type InterfaceInvokeVO = {
    responseBody?: string;
    responseHeaders?: Record<string, any>;
  };

  type InterfaceParam = {
    createTime?: string;
    description?: string;
    id?: number;
    interfaceInfoId?: number;
    isDelete?: number;
    isRequired?: number;
    maxLength?: number;
    name?: string;
    parentId?: number;
    style?: number;
    type?: number;
    updateTime?: string;
  };

  type listInterfaceInfoUsingGETParams = {
    createTime?: string;
    current?: number;
    description?: string;
    id?: number;
    method?: number;
    name?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type listUserInterfaceInfoByPageUsingGETParams = {
    current?: number;
    id?: number;
    interfaceInfoId?: number;
    leftNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    totalNum?: number;
    userId?: number;
  };

  type listUserInterfaceInfoUsingGETParams = {
    current?: number;
    id?: number;
    interfaceInfoId?: number;
    leftNum?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    totalNum?: number;
    userId?: number;
  };

  type offlineInterfaceInfoUsingPOSTParams = {
    /** id */
    id: number;
  };

  type onlineInterfaceInfoUsingPOSTParams = {
    /** id */
    id: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageInterfaceInfoVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: InterfaceInfoVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserInterfaceInfo = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserInterfaceInfo[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO = {
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

  type RequestHeader = {
    description?: string;
    isRequired?: boolean;
    name: string;
  };

  type RequestParam = {
    description?: string;
    isRequired?: boolean;
    maxLength?: number;
    name: string;
    style?: number;
    type?: number;
  };

  type ResponseParam = {
    description?: string;
    name: string;
    type?: number;
  };

  type ResponseResultboolean = {
    code?: string;
    data?: boolean;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultDictType = {
    code?: string;
    data?: DictType;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultInterfaceCharging = {
    code?: string;
    data?: InterfaceCharging;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultInterfaceInfoVO = {
    code?: string;
    data?: InterfaceInfoVO;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultInterfaceInvokeVO = {
    code?: string;
    data?: InterfaceInvokeVO;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultListDictData = {
    code?: string;
    data?: DictData[];
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultListDictType = {
    code?: string;
    data?: DictType[];
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultListInterfaceInfo = {
    code?: string;
    data?: InterfaceInfo[];
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultListUserInterfaceInfo = {
    code?: string;
    data?: UserInterfaceInfo[];
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultlong = {
    code?: string;
    data?: number;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultPageInterfaceInfoVO = {
    code?: string;
    data?: PageInterfaceInfoVO;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultPageUserInterfaceInfo = {
    code?: string;
    data?: PageUserInterfaceInfo;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultPageUserVO = {
    code?: string;
    data?: PageUserVO;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultSimpleUser = {
    code?: string;
    data?: SimpleUser;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultstring = {
    code?: string;
    data?: string;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultUser = {
    code?: string;
    data?: User;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultUserInterfaceInfo = {
    code?: string;
    data?: UserInterfaceInfo;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type ResponseResultVoid = {
    code?: string;
    message?: string;
    success?: boolean;
    timestamp?: number;
  };

  type SimpleUser = {
    accessKey?: string;
    gender?: number;
    id?: number;
    permissions?: string[];
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type User = {
    accessKey?: string;
    createTime?: string;
    gender?: number;
    id?: number;
    isDelete?: number;
    secretKey?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserAddDTO = {
    gender?: number;
    userAccount: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserInterfaceInfo = {
    createTime?: string;
    hasFree?: number;
    id?: number;
    interfaceInfoId?: number;
    isDelete?: number;
    leftNum?: number;
    status?: number;
    totalNum?: number;
    updateTime?: string;
    userId?: number;
  };

  type UserInterfaceInfoAddDTO = {
    interfaceInfoId: number;
    leftNum: number;
    totalNum: number;
    userId: number;
  };

  type UserInterfaceInfoUpdateDTO = {
    id: number;
    leftNum?: number;
    status?: number;
    totalNum?: number;
  };

  type UserLoginDTO = {
    autoLogin?: boolean;
    userAccount: string;
    userPassword: string;
  };

  type UserRegisterDTO = {
    repeatPassword: string;
    userAccount: string;
    userPassword: string;
  };

  type UserUpdateDTO = {
    id: number;
    userAvatar?: string;
    userName?: string;
  };

  type UserUpdatePasswordRequest = {
    id: number;
    newPassword: string;
    oldPassword: string;
    repeatPassword: string;
  };

  type UserVO = {
    createTime?: string;
    gender?: number;
    id?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };
}
