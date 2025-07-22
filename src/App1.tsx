import { SwiftFlowChart } from './components/FlowChartDemo';


const App = () => {
    console.log('App1 component rendering...');
    return(
        <div  className='w-full h-[100vh] flex items-center justify-center'>
            <SwiftFlowChart />
        </div>
    )
  }

export default App;