// 封装图表bar组件
/* 思路
1. 看官方文档，把echarts加入项目 
  如何在react获取dom- useRef
  时机 useEffect  
2. 不愁里定制化的参数 先把最小化的demo跑起来
3. 按照需求，哪些参数需要自定义，抽象出来
*/
import * as echarts from 'echarts'
import { useEffect, useRef, useCallback } from 'react'

function Bar ({ title, xData, yData, style }) {
  const domRef = useRef()
  const charInit = useCallback(() => {
    // Create the echarts instance
    const myChart = echarts.init(domRef.current)

    // Draw the chart
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'bar',
          data: yData
        }
      ]
    })
  }, [title, xData, yData])
  // 执行初始化函数
  useEffect(() => {
    charInit()
  }, [charInit])
  return (
    <div>
      <div ref={domRef} style={style}></div>
    </div>
  )
}

export default Bar