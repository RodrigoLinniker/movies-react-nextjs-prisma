import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest){
    let session = req.cookies.get(`${process.env.SESSIONAUTH}`);
    let url = req.url;
    const nextURL = `${process.env.NEXTAUTH_URL}`;

    if(!session && url.includes('/dashboard')){
        return NextResponse.redirect(nextURL);
    }

    if (session && url === `${nextURL}/`) {
      return NextResponse.redirect(`${nextURL}/dashboard`);
    } 
 
}