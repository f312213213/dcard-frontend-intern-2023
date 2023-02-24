import { StyledMain } from '@/components/Layout/styles'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useIsMobile from '@/hooks/useIsMobile'

interface ICustomMeta {
  title?: string
  description?: string
  type?: string
  image?: string
  author?: string
  date?: string
  keyword?: string
}

interface IPageProps {
  customMeta?: ICustomMeta
  children: any
}

const Layout = ({ children, customMeta }: IPageProps) => {
  const router = useRouter()
  const isMobile = useIsMobile()

  const meta = {
    title: 'Homepage - Github Task Tracker',
    description: 'Github Task Tracker - 2023 Dcard frontend intern homework.',
    image: '',
    type: 'website',
    ...customMeta,
  } as ICustomMeta

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name={'robots'} content={'follow, index'} />
        <meta content={meta.description} name={'description'} />
        <meta name={'url'} itemProp={'url'} content={`https://dcard.chiendavid.com/${router.asPath}`} />
        <meta
          property={'og:url'}
          content={`https://dcard.chiendavid.com/${router.asPath}`}
        />
        <link
          rel={'canonical'}
          href={`https://dcard.chiendavid.com/${router.asPath}`}
        />
        <meta property={'og:type'} content={meta.type} />
        <meta property={'og:site_name'} content={meta.title} />
        <meta property={'og:description'} content={meta.description} />
        <meta property={'og:title'} content={meta.title} />
        <meta property={'og:image'} content={meta.image} />
        <meta name={'twitter:card'} content={'summary_large_image'} />
        <meta name={'twitter:title'} content={meta.title} />
        <meta name={'twitter:description'} content={meta.description} />
        <meta name={'twitter:image'} content={meta.image} />
        <meta charSet={'utf-8'} />
        {
          meta.author && <meta property={'article:author'} content={meta.author} />
        }
        {
          meta.date && <meta property={'article:published_time'} content={meta.date} />
        }
        {
          meta.keyword && <meta name={'keywords'} content={meta.keyword} />
        }
      </Head>
      <StyledMain isMobile={isMobile}>
        {children}
      </StyledMain>
    </>
  )
}

export default Layout
