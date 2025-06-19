import Navbar from "./components/ui/Navbar"
import Search from "./components/ui/Search"
import Table from "./components/charts/Table"
// import NewTable from "./components/charts/RenderTable"
// import NewTable from "./components/charts/RenderTable_v2"
// import NewTable from "./components/charts/RenderTable_v4"
// import NewTable from "./components/charts/RenderTable_v3"
import LLMStepsLoader from "./components/charts/LLMStepsLoader"
import LLMStepSlider from "./components/charts/LLMStepsLoader_v2"
import TransformApiData from "./components/charts/Transform"


function App() {

  return (
    <>
      <Navbar/>
      {/* <Search/> */}
      {/* <NewTable/> */}
      <LLMStepSlider/>
      {/* <LLMStepsLoader/> */}
      {/* <LLMStepsLoader/> */}
      {/* <Table/> */}
      {/* <NewTable/> */}
      <TransformApiData/>
    </>
  )
}

export default App
