import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Forces from './Forces'
import CrimeList from './CrimeList'
import { DashboardComponent } from './DashboardComponent';

export class MainScreen extends Component {
    constructor() {
        super()
        this.state = {
            activeTab: '1',
            forcesData: [],
            crimeCategories: []
        }
    }

    componentDidMount() {
        fetch('https://data.police.uk/api/forces')
            .then(response => response.json())
            .then(forcesData => this.setState({ forcesData }));

        fetch('https://data.police.uk/api/crime-categories')
            .then(response => response.json())
            .then(crimeCategories => this.setState({ crimeCategories }));

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Dashboard
                </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Forces
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Crime Categories
                        </NavLink>
                    </NavItem>

                </Nav>


                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <div style={{textAlign:"center", marginTop:'100px'}}>
                            <DashboardComponent />
                        </div>                        
                    </TabPane>

                    <TabPane tabId="2">
                        <Forces _data={this.state.forcesData}/>    
                    </TabPane>

                    <TabPane tabId="3">
                    <CrimeList _data={this.state.crimeCategories}/>    
                    </TabPane>

                </TabContent>
            </div>
        )
    }
}

export default MainScreen