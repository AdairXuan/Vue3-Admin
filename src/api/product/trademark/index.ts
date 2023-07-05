import request from '@/utils/request'
import { TradeMarkResponseData } from './type'

//接口
enum API {
  //获取品牌
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
}

export const reqHosTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

//新增、修改品牌接口
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  //判断是否修改
  if(data.id){
    return request.put<any,any>(API.ADDTRADEMARK_URL,data);
  }
  else
  {
    return request.put<any,any>(API.UPDATETRADEMARK_URL,data);
  }

}
