import { Link } from "react-router-dom";
import { JSONObject } from "../types/jsonType";

export default function List({ data }: { data: Array<JSONObject> }) {
    return (
        <>
            {data.map(item => {
                return (<Link to={`/builder/${item["name"] as string}`}>{item["title"] as string}</Link>)
            })}
        </>
    );
}