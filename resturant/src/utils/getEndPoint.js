import { useLocation } from "react-router-dom";

export function GetEndpoint(){
    const location = useLocation();
    const endpoint = location.pathname.split("/")[2];
    return endpoint;
}