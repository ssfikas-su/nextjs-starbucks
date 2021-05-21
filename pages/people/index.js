import Layout from '../../components/layout'
import Section from '../../components/section'
import Row from '../../components/row'
import Col from '../../components/col'
import Card from '../../components/card'

import { getPeople } from '../../lib/api'

export async function getStaticProps() {

    const people = await getPeople()
    
    return {
        props: { people }
    }
}

export default function People( { people }) {
    return (
        <Layout>
            <h1>People</h1>
                <Section>
                    <Row justifyContentCenter>
                        {people.edges.map((edge, index) => {
                            const { node } = edge;
                            return <Col sm={6} md={4} lg={3} key={index}>
                                <Card parentPath="people" node={node} />
                            </Col>
                        })}
                    </Row>
                </Section>
        </Layout>
    )
}