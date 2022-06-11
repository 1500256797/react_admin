import React from 'react'
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import {useState,useEffect} from 'react'
import {reqWeather} from '../../api'
import { useLocation } from 'react-router-dom'
import menuConfig from '../../config/menuConfig'
import Wallet from '../wallet/wallet'
//头部组件
export default function Header() {
  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()))
  const [dayPicticturl, setDayPicticturl] = useState('')
  const [weather,setWeather] = useState('晴')
  
  //页面render()后执行一次，一般在此执行异步操作：发ajax请求/启动定时器
  useEffect(() => {
    //获取当前时间
    setInterval(() => {
      setCurrentTime(formateDate(Date.now()))
    }, 1000)//每隔一秒执行一次 获取当前时间
    //获取当前天气
    const getWeather = async () => {
      const {dayPictureUrl, weather} = await reqWeather('北京')
      setDayPicticturl(dayPictureUrl)
      setWeather(weather)
    }
    getWeather()
  },[]) //仅在挂载和卸载的时候执行   //【value】 value变化了 他会执行useEffect

  const loc = useLocation()

  //获取当前路径
  const getTitle = () => {
    const pathname = loc.pathname
    let title = '' 
    menuConfig.forEach(item => {
      if (item.key === pathname) {
        title =  item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === pathname)
        title =  cItem ? cItem.title : item.title
      }
    })
    return title
  }
  

  return (
    <div className='header'>
      <div className='header-top'>
        <span><Wallet/></span>
      </div>
      <div className='header-bottom'>
        <div className='header-bottom-left'>
          {getTitle()}
        </div>
        <div className='header-bottom-right'>
          <span>{currentTime}</span>
          <img src={dayPicticturl} alt="weather"/>
          <span>{weather}</span>
        </div>

      </div>
    </div>
  )
}
