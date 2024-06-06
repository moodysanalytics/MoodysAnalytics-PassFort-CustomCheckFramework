export type FormattedUrls = {url: string, fullUrl: string}

export type AsyncAccessTokenType = {
    access_token: Promise<string>
}