import GuestBioPage from "@/components/link-in-bio/guest-bio-page"
import NotFound from "@/components/link-in-bio/not-found";
import axios from "axios"
//import { useApiCall } from "@/utils/useApiCall"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

let loader = true;
async function getBioProfile(username: string) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/link-in-bio/links/${username}`;
    console.log("Fetching profile from:", apiUrl);
    try {
        let response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/link-in-bio/links/${username}`)
        if (response) {
            return response.data;
        }


    } catch (error) {
        console.error("Error updating page name:", error)
    } finally {
        //setIsLoading(false)
    }
    return null

}
// Generate metadata for the page
// export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
//     const profile = await getBioProfile(params.username)

//     if (!profile) {
//         return {
//             title: "Profile Not Found",
//             description: "The requested profile could not be found.",
//         }
//     }

//     return {
//         title: `${profile.displayName} | VIKMID Bio`,
//         description: `Check out ${profile.displayName}'s links and content`,
//         openGraph: {
//             title: `${profile.displayName} | VIKMID Bio`,
//             description: `Check out ${profile.displayName}'s links and content`,
//             images: [profile.profilePicture],
//         },
//         twitter: {
//             card: "summary_large_image",
//             title: `${profile.displayName} | VIKMID Bio`,
//             description: `Check out ${profile.displayName}'s links and content`,
//             images: [profile.profilePicture],
//         },
//     }
// }

// export default async function UserBioPage({ params }: { params: { username: string } }) {
//     const profile = await getBioProfile(params.username)

//     if (!profile) {
//         notFound()
//     }

//     return <GuestBioPage profile={profile} />
// }

// export default async function UserBioPage({ params }: { params: { username: string } }) {

//     return <GuestBioPage username={params.username} />;
// }

export default async function UserBioPage() {
    return <div>f</div>
}
