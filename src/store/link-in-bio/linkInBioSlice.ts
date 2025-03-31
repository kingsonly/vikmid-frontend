import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LinkInBioState, Page, Section, Link, LinkStats, SocialLink } from './interface/linkInBioInterface';

// Interface definitions for the expected data structure
// Initial state
const initialState: LinkInBioState = {
    id: '',
    hubId: 0,
    template: 0,
    displayName: '',
    profilePicture: null,
    banner: '',
    themeColors: '',
    status: true,
    createdAt: '',
    updatedAt: '',
    pages: [],
    socialLinks: [],
};

// Redux slice
export const linkInBioSlice = createSlice({
    name: 'linkInBio',
    initialState,
    reducers: {
        setLinkInBioState: (state, action: PayloadAction<LinkInBioState>) => {
            return { ...state, ...action.payload };
        },
        updateDisplayName: (state, action: PayloadAction<string>) => {
            state.displayName = action.payload;
        },
        updateTemplate: (state, action: PayloadAction<number>) => {
            state.template = action.payload;
        },
        updateBanner: (state, action: PayloadAction<string>) => {
            state.banner = action.payload;
        },
        updateProfilePicture: (state, action: PayloadAction<string>) => {
            state.profilePicture = action.payload;
        },
        updateThemeColors: (state, action: PayloadAction<string>) => {
            state.themeColors = action.payload;
        },
        // addPage: (state, action: PayloadAction<Page>) => {
        //     state.pages.push(action.payload);
        // },
        addPage: (state, action: PayloadAction<Page>) => {
            state.pages.push({
                ...action.payload,
                sections: action.payload.sections || [], // Ensure sections array exists
            });
        },
        updatePage: (state, action: PayloadAction<Page>) => {
            const index = state.pages.findIndex(page => page.id === action.payload.id);
            if (index !== -1) {
                state.pages[index] = action.payload;
            }
        },
        removePage: (state, action: PayloadAction<string>) => {
            state.pages = state.pages.filter(page => page.id !== action.payload);
        },
        // addSection: (state, action: PayloadAction<{ pageId: string; section: Section }>) => {
        //     const page = state.pages.find(p => p.id === action.payload.pageId);
        //     if (page && page.sections) {
        //         page.sections.push(action.payload.section);
        //     }
        // },
        addSection: (state, action: PayloadAction<{ pageId: string; section: Section }>) => {
            const page = state.pages.find(p => p.id === action.payload.pageId);
            if (page && page.sections) {
                page.sections = [...page.sections, action.payload.section]; // Immutable update
            }
        },
        updateSection: (state, action: PayloadAction<{ pageId: string; section: Section }>) => {
            const page = state.pages.find(p => p.id === action.payload.pageId);
            if (page && page.sections) {
                const index = page.sections.findIndex(sec => sec.id === action.payload.section.id);
                if (index !== -1) {
                    page.sections[index] = action.payload.section;
                }
            }
        },
        removeSection: (state, action: PayloadAction<{ pageId: string; sectionId: string }>) => {
            const page = state.pages.find(p => p.id === action.payload.pageId);
            if (page && page.sections) {
                page.sections = page.sections.filter(sec => sec.id !== action.payload.sectionId);
            }
        },
        // addLink: (state, action: PayloadAction<{ sectionId: string; link: Link }>) => {
        //     state.pages.forEach(page => {
        //         if (page && page.sections) {
        //             console.log("i am 1")
        //             const section = page.sections.find(sec => sec.id === action.payload.sectionId);
        //             if (section && section.links) {
        //                 console.log("i am 2")
        //                 section.links.push(action.payload.link);
        //             }
        //         }

        //     });
        // },
        addLink: (state, action: PayloadAction<{ sectionId: string; link: Link }>) => {
            const section = state.pages
                .flatMap(page => page.sections || []) // Get all sections across pages
                .find(sec => sec.id === action.payload.sectionId);

            if (!section) {
                console.warn(`Section with ID ${action.payload.sectionId} not found.`);
                return;
            }

            section.links = section.links || []; // Ensure links array exists
            section.links.push(action.payload.link);
        },

        updateLink: (state, action: PayloadAction<{ sectionId: string; link: Link }>) => {
            state.pages.forEach(page => {
                if (page && page.sections) {
                    const section = page.sections.find(sec => sec.id === action.payload.sectionId);
                    if (section && section.links) {
                        const index = section.links.findIndex(link => link.id === action.payload.link.id);
                        if (index !== -1) {
                            section.links[index] = action.payload.link;
                        }
                    }
                }

            });
        },
        removeLink: (state, action: PayloadAction<{ sectionId: string; linkId: string }>) => {
            state.pages.forEach(page => {
                if (page && page.sections) {
                    const section = page.sections.find(sec => sec.id === action.payload.sectionId);
                    if (section && section.links) {
                        section.links = section.links.filter(link => link.id !== action.payload.linkId);
                    }
                }

            });
        },
        addSocialLink: (state, action: PayloadAction<SocialLink>) => {
            if (state.socialLinks) {
                state.socialLinks.push(action.payload);
            }

        },
        updateSocialLink: (state, action: PayloadAction<SocialLink>) => {
            if (state.socialLinks) {
                const index = state.socialLinks.findIndex(link => link.id === action.payload.id);
                if (index !== -1) {
                    state.socialLinks[index] = action.payload;
                }
            }

        },
        removeSocialLink: (state, action: PayloadAction<string>) => {
            if (state.socialLinks) {
                state.socialLinks = state.socialLinks.filter(link => link.id !== action.payload);
            }
        },
        reorderSocialLinks: (state, action: PayloadAction<string[]>) => {

            state.socialLinks = action.payload.map((id, index) => {
                if (state.socialLinks) {
                    const link = state.socialLinks.find(l => l.id === id);
                    return link ? { ...link, order: index + 1 } : link;
                }
            }).filter(Boolean) as SocialLink[];

        }
    },
});

// Export actions
export const {
    setLinkInBioState,
    updateDisplayName,
    updateTemplate,
    updateProfilePicture,
    updateBanner,
    updateThemeColors,
    addPage,
    updatePage,
    removePage,
    addSection,
    updateSection,
    removeSection,
    addLink,
    updateLink,
    removeLink,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
    reorderSocialLinks
} = linkInBioSlice.actions;

// Export reducer
export default linkInBioSlice.reducer;
