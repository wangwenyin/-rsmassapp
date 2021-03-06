import request from '@/utils/request'

// 查询楼栋列表信息
// params = { xmmc: '项目名称(必填)', ldmc: '楼栋名称(必填)', xzq: '行政区', yt1: '用途', zbdm: '组别代码', zddm: '宗地代码，即宗地号' }
export function buildings(params) {
  return request({
    url: '/data/buildings',
    method: 'get',
    params
  })
}

// 根据楼栋代码获取楼栋基本信息
// params = { lddm: '楼栋代码'}
export function buildingsInfo(lddm) {
  return request({
    url: `/data/buildings/${lddm}`,
    method: 'get'
  })
}
// 根据楼栋代码查询其内部所有户列表
// params = { lddm: '楼栋代码'}
export function buildingsUnits(params) {
  return request({
    url: '/data/building/units',
    method: 'get',
    params
  })
}
// 根据楼栋代码查询其影响因素量化信息
export function buildingsFactorsResidential(yt, lddm) {
  return request({
    url: `/data/building/factorQuantification/${yt}/${lddm}`,
    method: 'get'
  })
}
// 根据楼栋代码查询其住宅影响因素信息
export function buildingsFactorInfo(yt, lddm) {
  return request({
    url: `/data/building/factorInfo/${yt}/${lddm}`,
    method: 'get'
  })
}

// 根据楼栋代码查询其历次评估价格
// params = { lddm: '楼栋代码'}
export function buildingValue(params) {
  return request({
    url: 'data/building/value',
    method: 'get',
    params
  })
}

// 更新楼栋基本信息
export function UpdateBuildingInfo(lddm, data) {
  return request({
    url: `/data/buildings/${lddm}`,
    method: 'put',
    data
  })
}

// 更新楼栋住宅影响因素数据
export function UpdateBuildingFactorsResidential(yt, lddm, data) {
  return request({
    url: `/data/building/factorQuantification/${yt}/${lddm}`,
    method: 'put',
    data
  })
}
