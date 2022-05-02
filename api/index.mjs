export default async ({body, query, cookies, headers}, {json}) => json({
    body,
    query,
    cookies,
    headers,
    versions: process.versions
})
