import Layout from '../../components/layout'
import Section from '../../components/section'
import Row from '../../components/row'
import Col from '../../components/col'
import Card from '../../components/card'

import { getLocations } from '../../lib/api'

export async function getStaticProps() {

    const locations = await getLocations()
    
    return {
        props: { locations }
    }
}

export default function Locations( { locations }) {
    return (
        <Layout>
            <h1>Locations</h1>
                <Section>
                    <Row justifyContentCenter>
                        {locations.edges.map((edge, index) => {
                            const { node } = edge;
                            return <Col sm={6} md={4} lg={3} key={index}>
                                <Card parentPath="locations" node={node} />
                            </Col>
                        })}
                    </Row>
                </Section>
        </Layout>
    )
}