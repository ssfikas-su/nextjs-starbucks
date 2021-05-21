import Layout from '../../components/layout'
import Image from 'next/image'
import Link from 'next/link'
import Section from '../../components/section'
import Row from '../../components/row'
import Col from '../../components/col'
import Card from '../../components/card'

import { getAllLocationSlugs, getLocationBySlug } from '../../lib/api'

// getStaticPaths
export async function getStaticPaths() {

    const allSlugs = await getAllLocationSlugs()

    const paths = allSlugs.edges.map(edge => {
        const { slug } = edge.node
        return {
            params: {
                id: slug
            }
        }
    })

    return {
        paths,
        fallback: false
    }

}
// getStaticProps
export async function getStaticProps({ params }) {

    const locationData = await getLocationBySlug(params.id)
    
    return {
        props : {
            locationData

        }
    }

}

// initialize the component
export default function SingleLocation({ locationData }) {

    const { title, featuredImage, locationInformation, menuTypes, relatedPeople } = locationData;
    const { city,
        phoneNumber: phone,
        state,
        streetAddress,
        zipCode} = locationInformation;

    const { sourceUrl, mediaDetails, altText } = featuredImage.node;

    const { width, height } = mediaDetails;

    const { locationsEmployees } = relatedPeople;


    
    return (
        <Layout>
            <Row>
                <Col>
                    <Link href='/locations'>
                        <a> Back to Location </a>
                    </Link>
                </Col>
            </Row>
                <Image 
                    src={sourceUrl}
                    height= {height}
                    width={width}
                    alt ={altText}
                />
                <h1>{title}</h1>
                <p>{streetAddress} <br/> 
                    {city}, {state} {zipCode} <br/>
                    {phone}
                </p>
                {menuTypes.edges.map((edge, index) => {
                    const { name, items } = edge.node
                    return <Section title={name} key={index}>
                    <Row justifyContentCenter>
                        {items.edges.map((edge, index) => {
                            const { node } = edge;
                            return <Col sm={6} md={4} lg={3} key={index}>
                                <Card parentPath="menu" node={node} />
                            </Col>
                        })}
                    </Row>
                    </Section>
                } )}
        </Layout>
    )
}