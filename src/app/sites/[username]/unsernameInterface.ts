export interface UsernameDynamicPageInterface {
    params: Promise<{
        username: string;
        slug: string;
    }>;
}