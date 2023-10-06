import { Link, useNavigate } from "react-router-dom";
const navigate = useNavigate();

export class UtilFuncs {
    static direct(path: string) {
         
        navigate(path);
    }
}