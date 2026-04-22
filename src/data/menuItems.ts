import { IMenuItem } from "@/types";

export const menuItems: IMenuItem[] = [
    {
        text: "Diensten",
        url: "#",
        children: [
            { text: "Chatbot voor Rijscholen", url: "/chatbot" },
            { text: "Voice AI voor Rijscholen", url: "/voice-ai" },
            { text: "SEO voor Rijscholen", url: "/seo" },
            { text: "Social Media voor Rijscholen", url: "/social-media" },
            { text: "Reviews voor Rijscholen", url: "/reviews" },
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
