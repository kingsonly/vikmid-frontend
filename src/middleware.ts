// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// // This would come from your database in a real app
// const CUSTOM_DOMAIN_MAPPING: Record<string, string> = {
//     "kingsonly.lvh.me": "kingsonly",
//     "johndoe.com": "johndoe",
//     // Add more mappings as needed
// }

// export function middleware(request: NextRequest) {
//     const url = request.nextUrl
//     console.log("i am url", url)
//     const hostname = request.headers.get("host") || ""

//     // Check if we're on a custom domain
//     const customDomainUsername = CUSTOM_DOMAIN_MAPPING[hostname]

//     // Check if we're on a subdomain of vikmid.com
//     const isRootDomain = hostname === "vikmid.com" || hostname === "www.vikmid.com" || hostname.endsWith(".vercel.app")
//     const isAppSubdomain = hostname === "app.vikmid.com"

//     // If we're on the root domain or app subdomain, don't rewrite
//     if (isRootDomain || isAppSubdomain) {
//         return NextResponse.next()
//     }

//     // Extract the username from the subdomain if not a custom domain
//     let username = customDomainUsername
//     if (!username) {
//         // Extract subdomain (e.g., 'kingsonly' from 'kingsonly.vikmid.com')
//         const subdomain = hostname.split(".")[0]
//         if (hostname.includes("vikmid.com")) {
//             username = subdomain
//         }
//     }

//     // If we couldn't determine a username, proceed without rewriting
//     if (!username) {
//         return NextResponse.next()
//     }

//     // Handle different path patterns
//     const path = url.pathname

//     // Bio page (root path)
//     if (path === "/" || path === "") {
//         return NextResponse.rewrite(new URL(`/_sites/${username}`, request.url))
//     }

//     // Course listing page
//     if (path.startsWith("/course") && !path.split("/")[2]) {
//         return NextResponse.rewrite(new URL(`/_sites/${username}/course`, request.url))
//     }

//     // Specific course page
//     if (path.startsWith("/course/")) {
//         const courseSlug = path.split("/")[2]
//         return NextResponse.rewrite(new URL(`/_sites/${username}/course/${courseSlug}`, request.url))
//     }

//     // For any other paths, rewrite to the appropriate path under _sites
//     return NextResponse.rewrite(new URL(`/_sites/${username}${path}`, request.url))
// }

// export const config = {
//     // Match all paths except for api routes, static files, etc.
//     matcher: [
//         /*
//          * Match all paths except for:
//          * 1. /api routes
//          * 2. /_next (Next.js internals)
//          * 3. /_static (inside /public)
//          * 4. /_vercel (Vercel internals)
//          * 5. all root files inside /public (e.g. /favicon.ico)
//          */
//         "/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)",
//     ],
// }




import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"


export function middleware(request: NextRequest) {
    const url = request.nextUrl
    var hostname = request.headers.get("host")?.split(":")[0] || ""

    if (hostname.startsWith("www.")) {
        hostname = hostname.replace(/^www\./, "");

    }

    const isRootDomain = hostname === "vikmid.com" || hostname === "localhost" || hostname.endsWith(".vercel.app")
    const isAppSubdomain = hostname === "app.vikmid.com"

    // If we're on the root domain or app subdomain, don't rewrite
    if (isRootDomain || isAppSubdomain) {
        return NextResponse.next()
    }

    // Rewrite request
    const path = url.pathname
    // console.log(`Rewriting ${hostname}${path} → /sites/${username}${path}`) // Debugging

    // return NextResponse.rewrite(new URL(`/sites/${username}${path}`, request.url))


    if (path === "/" || path === "") {
        return NextResponse.rewrite(new URL(`/sites/${hostname}`, request.url))
    }

    // Course listing page
    if (path.startsWith("/course") && !path.split("/")[2]) {
        return NextResponse.rewrite(new URL(`/sites/${hostname}/course`, request.url))
    }

    // Specific course page
    if (path.startsWith("/course/")) {
        const courseSlug = path.split("/")[2]
        return NextResponse.rewrite(new URL(`/sites/${hostname}/course/${courseSlug}`, request.url))
    }

    // For any other paths, rewrite to the appropriate path under _sites
    return NextResponse.rewrite(new URL(`/sites/${hostname}${path}`, request.url))
}

export const config = {
    matcher: ["/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)"],
}

