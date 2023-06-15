import * as React from 'react'
import {ChakraProvider} from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Login from "./LoginPage/Login";
import CodeEmail from "./LoginPage/CodeEmail";
import HomePage from "./HomePage/HomePage";
import Register from "./LoginPage/Register";
import PersonalInfo from "./myInfo/personalInfo";
import HumenInfoData from "./humenInfo/humenInfoData";
import Recruitment from "./recruitmentManagement/recruitment";
import IndexRecruitment from "./recruitmentManagement/indexRecruitment";
import IndexInterviewInfomation from "./interviewInformation/IndexInterviewInfomation";
import ChangePassword from "./LoginPage/ChangePassword";

// 配置路由
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/CodeEmail" element={<CodeEmail/>}/>
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/homePage" element={<HomePage/>}/>
            <Route path="/personalInfo" element={<PersonalInfo/>}/>
            <Route path="/humenInfoData" element={<HumenInfoData/>}/>
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/indexreCruitment" element={<IndexRecruitment />}/>
            <Route path="/indexInterviewInfomation" element={<IndexInterviewInfomation />} />
        </Route>
    )
)

{/*将chakra UI引入项目当中*/}
const rootElement = ReactDOM.createRoot(document.getElementById("root") as Element);
rootElement.render(
    <React.StrictMode>
        <ChakraProvider>
            {/*将路由引入项目当中*/}
            <RouterProvider router={router}/>
        </ChakraProvider>
    </React.StrictMode>,
)