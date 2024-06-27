
import AppHeader from "./Navbar"
// import PageContent from "./PageContent"
import SideMenu from "./Sidebar"
import { Space } from 'antd';
import '../Dashcss/dashboard.css'
import { Outlet } from "react-router-dom";

const Homedashboard = () => {
  return (
    <div className='homedashbaord'>
      <AppHeader/>
      <Space className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        {/* <PageContent></PageContent> */}
        <Outlet/>
      </Space>
      
    </div>
  )
}

export default Homedashboard
