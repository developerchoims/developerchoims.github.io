import { useParams } from "react-router-dom";
import KakaoMsg from "../common/KaKaoMsg";

export const ShopMyCouponImg = () =>{
    const {id} = useParams();
    const couponOkey = id;

    return(
        <>
            <div
            style={{width:'50%', border:'3px solid #CB9DE7', borderRadius:'0.5vw', 
                    padding:'1vw', textAlign:'center'}}>
                저장해서 사용하세요~<br/>
                <img
                style={{width:'100%'}} 
                src={`http://bwipjs-api.metafloor.com/?bcid=code128&text=${couponOkey}&scale=3&includetext&backgroundcolor=ffffff`}/>
                
            </div>
        </>
    )
}