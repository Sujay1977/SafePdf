import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, url, type = 'website', children }) {
    const siteTitle = 'SafePDF';
    const siteDescription = 'Free, secure, and client-side PDF tools. Merge, split, compress, and edit files in your browser. Your documents never leave your device for complete privacy.';
    const siteUrl = 'https://safepdf.site';
    const defaultImage = `${siteUrl}/og-image.png`;

    const metaTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Free Online PDF Tools`;
    const metaDescription = description || siteDescription;
    const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
    const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{metaTitle}</title>
            <meta name='description' content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Facebook tags */}
            <meta property='og:type' content={type} />
            <meta property='og:locale' content='en_US' />
            <meta property='og:title' content={metaTitle} />
            <meta property='og:description' content={metaDescription} />
            <meta property='og:url' content={metaUrl} />
            <meta property='og:image' content={metaImage} />

            {/* Twitter tags */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:creator' content='@Sujay1977' />
            <meta name='twitter:title' content={metaTitle} />
            <meta name='twitter:description' content={metaDescription} />
            <meta name='twitter:image' content={metaImage} />

            {/* Additional tags */}
            {children}
        </Helmet>
    );
}
