import React, { Component } from 'react'
import { FormGroup, Input, Container, Card, CardBody } from 'reactstrap'

export class Forces extends Component {
    constructor() {
        super()
        this.state = {
            searchText: '',
            searchedData: []
        }
    }

    searchList(searchText) {
        let _data = [...this.props._data]
        let arr = _data.filter((e, i) => e.name.toLowerCase().includes(searchText))
        this.setState({ searchedData: arr, searchText })
    }

    render() {
        return (
            <Container>
                <FormGroup>
                    <Input onChange={(e) => this.searchList(e.target.value)} type="text" name="searchText" id="search" placeholder="search..." />
                </FormGroup>

                {
                    this.state.searchText ?
                        this.state.searchedData.map(e => {
                            return (
                                <Card>
                                    <CardBody>
                                        <p>Id:&nbsp;&nbsp;&nbsp;&nbsp;{e.id}</p>
                                        <p>Name:&nbsp;&nbsp;&nbsp;&nbsp;{e.name}</p>
                                    </CardBody>
                                </Card>
                            )
                        })
                        :
                        this.props._data.map(e => {
                            return (
                                <Card>
                                    <CardBody>
                                        <p>Id:&nbsp;&nbsp;&nbsp;&nbsp;{e.id}</p>
                                        <p>Name:&nbsp;&nbsp;&nbsp;&nbsp;{e.name}</p>
                                    </CardBody>
                                </Card>
                            )
                        })
                }

            </Container>
        )
    }
}

export default Forces
