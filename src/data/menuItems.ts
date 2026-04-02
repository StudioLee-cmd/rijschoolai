import { IMenuItem } from "@/types";

export const menuItems: IMenuItem[] = [
    {
        text: "Diensten",
        url: "#",
        children: [
            { text: "Chatbot voor Rijscholen", url: "/chatbot-voor-rijscholen" },
            { text: "Voice AI voor Rijscholen", url: "/voice-ai-voor-rijscholen" },
            { text: "SEO voor Rijscholen", url: "/seo-voor-rijscholen" },
            { text: "Social Media voor Rijscholen", url: "/social-media-voor-rijscholen" },
            { text: "Reviews voor Rijscholen", url: "/reviews-voor-rijscholen" },
            { text: "Review Pakket", url: "/review-pakket" },
        ]
    },
    {
        text: "Tarieven",
        url: "/tarieven"
    },
    {
        text: "Gratis Scan",
        url: "/gratis-scan"
    },
    {
        text: "Gratis Website",
        url: "/gratis-website"
    },
    {
        text: "Blog",
        url: "/blog"
    }
];
