import { GetStaticPaths, GetStaticProps } from "next";
import { Params } from "next/dist/server/router";
import Image from "next/image";
import React from "react";
import api from "../../api";

interface Props {
    country: string
    locale: string
    dictionary: any
}

export const getStaticPaths: GetStaticPaths = async () => {
    // We don't want to specify all possible countries as we get those from the headers
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, Params> = async ({
    params: { country, locale },
}: any) => {
    // Get dictionary
    const dictionary = await api.dictionaries.fetch(locale)

    return {
        props: {
            country,
            dictionary,
            locale,
        },
        revalidate: false,
    }
}


export default function Country({ country, locale, dictionary }: Props) {
    return <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", paddingBottom: "12px" }}>
            {dictionary.title}
        </div>
        <div style={{ fontSize: "18px", fontWeight: "bold", paddingBottom: "12px" }}>
            {dictionary.subtitle}
        </div>
        <div>
            <Image
                src={`/flags/${country}.svg`}
                width={128}
                height={96}
                alt={`country:${country}`}
            />
        </div>
        <div style={{ fontSize: "21px", fontWeight: "bold", paddingTop: "12px" }}>
            {dictionary.subtitle}
        </div>
    </div>
}