/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:"wzsyfikztrtmbdaebxtf.supabase.co",
            },
            {
                protocol: "https",
                hostname:"eltl-media.s3.eu-west-2.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "static.test.maksekeskus.ee"
            }
        ],
    }
};

module.exports = nextConfig;
