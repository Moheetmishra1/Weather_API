import { memo } from "react"
import "./MoreDetail.css"

function MoreDetail( {data,dataType,category}){

   

    return <nav className="detailBox">
        <div className="element-center">
          
        <div>{Math.floor(data)} </div>
        <sub>{dataType}</sub>
          
        </div>
        <div className="detail-category">{category}</div>

    </nav>
}

export default memo(MoreDetail)