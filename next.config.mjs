/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    },
    async redirects() {
        return [
            { source: '/chatbot-voor-:suffix', destination: '/chatbot', permanent: true },
            { source: '/voice-ai-voor-:suffix', destination: '/voice-ai', permanent: true },
            { source: '/reviews-voor-:suffix', destination: '/reviews', permanent: true },
            { source: '/seo-voor-:suffix', destination: '/seo', permanent: true },
            { source: '/social-media-voor-:suffix', destination: '/social-media', permanent: true },
                    { source: '/blog/aanhanger-rijbewijs-e-caravan-boottrailer-rijschool-specialisme', destination: '/', permanent: true },
            { source: '/blog/2todrive-begeleider-traject-17-jarige-rijschool-specialisme', destination: '/', permanent: true },
            { source: '/blog/bnor-cursus-begeleid-rijden-17-jarige-rijschool-specialisme', destination: '/', permanent: true },
            { source: '/blog/examen-angst-coaching-rijschool', destination: '/', permanent: true },
            { source: '/blog/t-rijbewijs-trekker-rijschool-specialisme', destination: '/', permanent: true },
            { source: '/blog/rijbewijs-d-bus-touringcar-rijschool', destination: '/', permanent: true },
            { source: '/blog/vrachtwagen-rijbewijs-c-c1-rijschool-toevoegen', destination: '/', permanent: true },
            { source: '/blog/am-rijbewijs-rijschool-scooter-jongeren-segment', destination: '/', permanent: true },
            { source: '/blog/motorrijbewijs-toevoegen-rijschool-rendement-valkuilen', destination: '/', permanent: true },
            { source: '/blog/rijschool-specialiseren-breed-aanbod', destination: '/', permanent: true },
            { source: '/blog/rijschool-specialisatie-niche-omzet-vergelijking', destination: '/', permanent: true },
            { source: '/blog/zelfrijdende-autos-rijscholen', destination: '/', permanent: true },
        ];
    },
};

export default nextConfig;
