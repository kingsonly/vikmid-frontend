export interface LinkStats {
    id: string;
    linkId: string;
    stats: string;
    createdAt: string;
    updatedAt: string;
}

export interface SocialLink {
    id: string;
    socialNetworkName: string;
    bioProfileId: string;
    link: string;
    order: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    stats?: LinkStats[] | null;
}

export interface Link {
    id: string;
    title: string;
    link: string;
    image?: string | null;
    linkDesign?: string | null;
    order: number;
    pageSectionId: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    stats?: LinkStats[] | null;
}

export interface Section {
    id: string;
    title: string | null;
    pageId: string;
    status: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
    links?: Link[] | null;
}

export interface Page {
    id: string;
    name: string;
    bioProfileId: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    sections?: Section[] | null;
}

export interface LinkInBioState {
    id: string;
    hubId: number;
    template: number;
    displayName: string;
    profilePicture?: string | null;
    banner?: string | null;
    themeColors?: string | null;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    pages: Page[];
    socialLinks?: SocialLink[] | null;
}

export interface PlatformPercentageInterface {
    mobile: number;
    desktop: number;
}

export interface TopBrowserInterface {
    name: string;
    count: number;
    percentage: number;
}

export interface BusiestDayInterface {
    day: string;
    count: number;
    percentage: number;
}

