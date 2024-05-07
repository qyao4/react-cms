import './index.scss'
import Bar from '@/components/Bar'

function Home () {

  return (
    <div className="echart-layout">
      {/* 渲染Bar组件 */}
      <Bar
        title='satisfaction of mainstream frameworks-1'
        xData={['react', 'vue', 'angular']}
        yData={[70, 40, 60]}
        style={{ width: '400px', height: '600px' }}
      />
      <Bar title='satisfaction of mainstream frameworks-2'
        xData={['react', 'vue', 'angular']}
        yData={[80, 60, 50]}
        style={{ width: '400px', height: '600px' }}
      />
    </div>
  )
}

export default Home