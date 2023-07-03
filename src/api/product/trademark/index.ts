import request from '@/utils/request';
import { TradeMarkResponseData } from './type'

//接口
enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark/'
}

export const reqHosTrademark = (page: number, limit: number) => request.get<any,TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`);