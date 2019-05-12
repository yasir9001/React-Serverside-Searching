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

    rrFn = ()=>{
        let name = (<span></span>)
        return 
    }
    searchList(searchText) {
        let _data = [...this.props._data]
        // let arr = _data.filter((e, i) => e.name.toLowerCase().includes(searchText))
        let arr = []
        _data.forEach((e, i) => {
            if (e.name.toLowerCase().includes(searchText) || e.url.toLowerCase().includes(searchText)) {
                let index = e.name.toLowerCase().indexOf(searchText)
                let urlIndex = e.url.toLowerCase().indexOf(searchText)
                // let name = `${e.name.substr(0, index)}<span  className="colored">${e.name.substr(index, searchText.length)}</span> ${e.name.substr(index + searchText.length)}`
                let  name = (<span>{e.name.substr(0, index)}<span  className="colored">{e.name.substr(index, searchText.length)}</span> {e.name.substr(index + searchText.length)}</span>)
                let  url = (<span>{e.name.substr(0, urlIndex)}<span  className="colored">{e.name.substr(urlIndex, searchText.length)}</span> {e.name.substr(urlIndex + searchText.length)}</span>)

                arr.push(
                    {
                        url,
                        name
                    }
                )
            }
            // else {
            //     return
            // }
        })
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
                                        <p>URL:&nbsp;&nbsp;&nbsp;&nbsp;{e.url}</p>
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
                                        <p>URL:&nbsp;&nbsp;&nbsp;&nbsp;{e.url}</p>
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
