/* eslint-disable @next/next/google-font-preconnect */
/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head'
import React from 'react'
import PropType from "prop-types";

export default function SeoMetaData(pageProps) {

//   const scripts= {
//     "@context": "http://schema.org",
//     "@type": "Organization",
//     "name": pageProps?.REACT_APP_DOMAIN_NAME,
//     "description": pageProps?.description,
//     "url": "https://ct.appristine.in/",
//     "mainEntityOfPage": {
//         "@type": "WebPage",
//         "@id": "https://ct.appristine.in/"
//     },
//     "sameAs": [
//         "",
//     ],
//     "logo": "https://ct.appristine.in//assets/logo512x512.png",
//     "email": "myaccademy@gmail.com",
//     "contactPoint": [
//         {
//             "@type": "ContactPoint",
//             "telephone": "+917498074963",
//             "contactType": "Customer Service",
//             "email": "myaccademy@gmail.com"
//         }
//     ]
//   }
  return (
    <Head>
        <title>{pageProps?.title}</title>
        <meta name="title" content={pageProps?.title} />
        <meta name="description" content={pageProps?.title} />

        {/* <meta property="article:publisher" content=""  />
        <meta property="article:modified_time" content="2023-02-24T10:11:35+00:00"  /> */}
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8"/>
        <meta property="og:title" content={pageProps?.title}  />
        <meta property="og:description" content={pageProps?.description}  />
        <meta property="og:url" content={pageProps?.url}  />
        <meta property="og:site_name" content={pageProps.REACT_APP_DOMAIN_NAME} />
        <meta property="og:image"  content={pageProps?.image} />
        <meta name="twitter:description" content={pageProps?.description} />
        <meta name="twitter:title" content={pageProps?.title} />
        <meta name="twitter:image" content={pageProps?.image} />
        <meta property="twitter:url" content={pageProps?.url} />
        <meta property="al:ios:app_name" content={pageProps?.title} />
        <meta property="al:android:url" content={pageProps?.android_url}  />
        <meta property="al:ios:url" content={pageProps?.ios_url}  />
        <meta name="keywords" content={pageProps?.keywords} />
        <link rel="canonical" href={pageProps?.canonical} />
        <meta itemProp="name" content={pageProps?.title}  />
        <meta itemProp="description" content={pageProps?.description} />
        <meta itemProp="image" content={pageProps?.image} />

        <link rel="icon" href={pageProps.REACT_APP_FAVICON} />
        <link rel="manifest" href={pageProps?.REACT_APP_MANIFEST_JSON} />
        <link rel="apple-touch-icon" href={pageProps?.REACT_APP_LOGO} />

        <link rel="preload" href={pageProps?.REACT_APP_LOGO_NAME} type="image/webp" as="image"/>
        {pageProps?.preloadImage &&(
          pageProps?.preloadImage?.map((item, key)=>(
          <link rel="preload" href={item} key={key?.toString()} type="image/webp" as="image"/>
          ))
        )}
        {/* {imgArray?.map((item, key)=>(
          <link rel="preload" href={item?.src} key={key?.toString()} type="image/svg" as="image"/>
        ))} */}
        <meta property="og:locale" content="en_US"  />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#3498db"/>
        <meta name="twitter:app:country" content="IN"  />
        <meta name="twitter:card" content="summary"  />
        <meta name="twitter:site" content={pageProps?.REACT_USERNAME_TWITTER}  />
        <meta name="twitter:creator" content={pageProps?.REACT_USERNAME_TWITTER} />
        <meta property="twitter:domain" content={pageProps?.REACT_APP_DOMAIN_NAME} />
        <meta property="al:ios:app_store_id" content={pageProps?.REACT_APP_STORE_ID} />
        <meta property="al:android:package" content={pageProps?.REACT_ANDROID_PACKAGE}  />
        <meta property="al:android:app_name" content={pageProps?.REACT_APP_NAME}  />
        <link rel="dns-prefetch" href="https://www.google-analytics.com"/>
        <link rel="dns-prefetch" href="https://connect.facebook.net"/>
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="true"/>
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="true"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <meta name="facebook-domain-verification" content="" />
        <meta name="p:domain_verify" content="" />
        <meta name='robots' content='index, follow' />
        <meta name="google-site-verification" content="" />
        <meta property="fb:app_id" content="" />
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <script src="https://www.gstatic.com/charts/loader.js" defer  async=""></script>
    </Head>
  )
}
SeoMetaData.propType={
  image: PropType.any,
  url: PropType.any,
  android_url: PropType.any,
  ios_url: PropType.any,
  canonical: PropType.any,
  domain: PropType.any,
  keywords: PropType.any,
  title: PropType.any,
  description: PropType.any,
}
SeoMetaData.defaultProps = {
  image:"",
  url: "",
  android_url: "",
  ios_url: "",
  canonical: "",
  domain: "",
  keywords: "",
  preloadImage:[],
  title:"Page Title",
  description: "Page description",
}