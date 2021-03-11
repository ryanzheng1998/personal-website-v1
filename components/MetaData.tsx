import React from 'react'
import Head from 'next/head'

interface Props {
    title: string;
}

const MetaData: React.FC<Props> = ({title}: Props) => (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
)

export default MetaData