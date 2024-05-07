import http from '@/utils/request'

// 药品教育列表
export function medicationEducationList( data ) {
  return http.request( {
    method : 'post',
    url : '/api/webapp/BedsideTerminal/1/MedicationEducation/GetList',
    data
  } )
}