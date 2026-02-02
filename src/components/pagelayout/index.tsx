import React from "react";
import TopBar from "../topbar";
import SideBar from "../sidebar";


 const PageLayOut = ({children}: Readonly<{
  children: React.ReactNode;
}>)=>{

    return(
        <>
       
       <div className="flex h-screen ">
         <SideBar/>
      <main className="flex-1 p-6 overflow-auto">
         <TopBar>

        </TopBar>
        {children}
      </main>
      </div>
        </>
    )
 }
 export default PageLayOut;