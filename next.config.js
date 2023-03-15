/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/apiCall',
                destination: 'http://localhost:3001/api/apiCall',
            },
        ]
    },
}

module.exports = nextConfig
