// 应用的根组件  
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'
import Home from './pages/home/index.jsx';



const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              {/* 默认初始化入口/home*/}
              <Route path="/*" element={<Admin/>} />
              {/* home模块路由 */}
              <Route path="login" element={<Login />} />
          </Routes>
      </BrowserRouter>
  );
};

export default App;
