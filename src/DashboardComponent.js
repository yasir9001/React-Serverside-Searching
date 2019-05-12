import React, { Component } from 'react'
import { Container, Row, Col, FormGroup, Label, Input, Button, Table, Spinner } from 'reactstrap'

export class DashboardComponent extends Component {

    constructor() {
        super()
        this.state = {
            forces: [],
            crimes: [],
            selectedCrime: '',
            selectedForce: '',
            searhResult: [],
            isSearching: false,
            isShowSpiner:false
        }
    }

    componentDidMount() {
        fetch('https://data.police.uk/api/forces')
            .then(res => res.json())
            .then(data => this.setState({ forces: data }))


        fetch('https://data.police.uk/api/crime-categories')
            .then(res => res.json())
            .then(data => this.setState({ crimes: data }))
    }


    search() {
        let { selectedCrime, selectedForce } = this.state;

        if (!selectedCrime || !selectedForce) {
            return
        }

        this.setState({isShowSpiner:true, searhResult:[], isSearching: false})

        let endPoint = `https://data.police.uk/api/crimes-no-location?category=${selectedCrime}&force=${selectedForce}`


        fetch(endPoint)
            .then(res => res.json())
            .then(data => {
                this.setState({ searhResult: data, isSearching: true, isShowSpiner:false })
            })
    }

    render() {
        let { forces, crimes, searhResult, isSearching, isShowSpiner} = this.state
        console.log(searhResult)
        return (
            <Container>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="forces">Select Force</Label>
                            <Input onChange={(e) => this.setState({ selectedForce: e.target.value })} type="select" name="select" id="forces">
                                <option value="">-----</option>
                                {
                                    forces.map((e, i) => {
                                        return (
                                            <option key={e.id} value={e.id}>{e.name}</option>
                                        )
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup>
                            <Label for="crimes">Select Cirme</Label>
                            <Input onChange={(e) => this.setState({ selectedCrime: e.target.value })} type="select" name="select" id="crimes">
                                <option value="">-----</option>
                                {
                                    crimes.map((e, i) => {
                                        return (
                                            <option key={e.url} value={e.url}>{e.name}</option>
                                        )
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <Col>
                    <Button color="primary" block onClick={() => this.search()} >
                        Search
                    </Button>
                </Col>

                <div>
                    {
                        isSearching ?
                            <Table>
                                <thead>
                                    <tr>
                                        <td>Id</td>
                                        <td>Status</td>
                                        <td>Date</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    { 
                                        searhResult.length ? 
                                        searhResult.map((e, i) => {
                                            return (
                                                <tr key={e.id}>
                                                    <td>{e.id}</td>
                                                    <td>{e.outcome_status.category}</td>
                                                    <td>{e.outcome_status.date}</td>
                                                </tr>
                                            )
                                        })
                                        : 
                                        <tr><td colSpan={3}>No result matched your search</td></tr>
                                    }
                                </tbody>

                            </Table> : null
                    }

                    {
                        isShowSpiner ?
                            <Spinner style={{ width: '6rem', height: '6rem', marginTop:'100px' }} type="grow" color="primary" />
                            : null
                    }

                </div>
            </Container>
        )
    }
}