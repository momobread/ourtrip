import axios from "axios";
import { NextResponse } from "next/server";

const SUPABASE_URL =process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;


export async function POST(req : Request){
    const {product_num} = await req.json()
    
    const { data } = await axios.get(`${SUPABASE_URL}/rest/v1/PRODUCT_AMENITIES`,{
       headers:{
        apikey : SUPABASE_KEY,
        Authorization : `Bearer ${SUPABASE_KEY}`
        
       },
       params : {
        product_num :`eq.${product_num}`
       }
    },)
   if(!data)  throw new Error('어메너티가 비어있습니다')
    const amenities = data
    return NextResponse.json(amenities)
}