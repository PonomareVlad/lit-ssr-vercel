export let ip

export const fetchIP = async (url = 'https://api.ipify.org?format=json') =>
    ip || (ip = await fetch(url).then(r => r.json()).then(({ip}) => ip))
