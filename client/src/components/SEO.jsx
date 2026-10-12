import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, imageAlt, url, type = 'website', robots = 'index, follow', themeColor = '#ffffff', language = 'en', children }) {
    const siteTitle = 'SafePDF';
    const siteDescription = 'SafePDF is a free online PDF toolkit and a privacy-focused alternative to iLovePDF. Merge, split, compress, convert, protect and edit PDF files directly in your browser with no uploads, no signup and no data collection.';
    const siteUrl = 'https://safepdfs.com';
    const defaultImage = `${siteUrl}/og-image.png`;
    const defaultImageAlt = 'SafePDF — Your PDFs, Your Privacy. 25+ Free Client-Side PDF Tools';

    // If title already includes SafePDF, don't append it again
    const metaTitle = title 
        ? (title.includes('SafePDF') ? title : `${title} | ${siteTitle}`) 
        : `Free Online PDF Tools | ${siteTitle}`;
        
    const metaDescription = description || siteDescription;
    const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
    const isDefaultImage = metaImage === defaultImage;
    const metaImageAlt = imageAlt || (isDefaultImage ? defaultImageAlt : metaTitle);
    const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet htmlAttributes={{ lang: language }}>
            {/* Standard metadata */}
            <title>{metaTitle}</title>
            <meta name='description' content={metaDescription} />
            <link rel="canonical" href={metaUrl} />
            <meta name="robots" content={robots} />
            <meta name="theme-color" content={themeColor} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* Facebook tags */}
            <meta property='og:type' content={type} />
            <meta property='og:locale' content='en_US' />
            <meta property='og:title' content={metaTitle} />
            <meta property='og:description' content={metaDescription} />
            <meta property='og:url' content={metaUrl} />
            <meta property='og:image' content={metaImage} />
            {isDefaultImage && <meta property='og:image:type' content='image/png' />}
            {isDefaultImage && <meta property='og:image:width' content='1200' />}
            {isDefaultImage && <meta property='og:image:height' content='630' />}
            <meta property='og:image:alt' content={metaImageAlt} />

            {/* Twitter - Uses 'name' attribute as required by spec */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={metaUrl} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
            <meta name="twitter:image:alt" content={metaImageAlt} />
            <meta name="twitter:creator" content="@Sujay1977" />
            {/* Additional tags */}
            {children}
        </Helmet>
    );
}
