import React, { Component } from 'react';
import { Image, Header, Dropdown, Button, Icon, Divider } from 'semantic-ui-react'
import cheeseBank from '../module/CheeseManager'
import Cheese from "../../images/cheese.png"
import "./create.css"


export default class EditPlate extends Component {

  state = {
    softOptions: [],
    midOptions: [],
    agedOptions: [],
    wildcardOptions: [],
    agedCheese: "",
    id: "",
    midCheese: "",
    people: "",
    softCheese: "",
    wildcard: ""
  }


  handleDropdownChange = (e, { id, value }) => {
    const stateToChange = {}
    stateToChange[id] = value
    this.setState(stateToChange)
  }


  componentDidMount() {
    const editPlate = this.props.plates.find(c => c.id === parseInt(this.props.match.params.platesId)
    )
    this.setState(editPlate)


    cheeseBank.getSoft("cheeses")
      .then(soft => {
        this.setState({ softOptions: soft })
      })

    cheeseBank.getMid("cheeses")
      .then(mid => {
        this.setState({ midOptions: mid })
      })

    cheeseBank.getOld("cheeses")
      .then(aged => {
        this.setState({ agedOptions: aged })
      })

    cheeseBank.getWild("cheeses")
      .then(wild => {
        this.setState({ wildcardOptions: wild })
      })
  }


  editPlate = evt => {
    evt.preventDefault()

    let people = Number(this.state.people);
    let soft = null
    let aged = null;
    let mid = null;
    let wildcard = null;
    if (this.state.soft !== null) {
      soft = Number(this.state.softCheese)
    }
    if (this.state.aged !== null) {
      aged = Number(this.state.agedCheese)
    }
    if (this.state.mid !== null) {
      mid = Number(this.state.midCheese)
    }
    if (this.state.wildcard !== null) {
      wildcard = Number(this.state.wildcard)
    }

    const editedPlate = {
      people: people,
      softCheese: soft,
      agedCheese: aged,
      midCheese: mid,
      wildcard: wildcard
    }
    this.props.editPlate(this.state.id, editedPlate)
      .then(() => {
        this.props.history.push("/dash")
      })
  }

  

render() {
  const numbers = [
    { key: 1, text: '1', value: 1 },
    { key: 2, text: '2', value: 2 },
    { key: 3, text: '3', value: 3 },
    { key: 4, text: '4', value: 4 },
    { key: 5, text: '5', value: 5 },
    { key: 6, text: '6', value: 6 },
    { key: 7, text: '7', value: 7 },
    { key: 8, text: '8', value: 8 },
    { key: 9, text: '9', value: 9 },
    { key: 10, text: '10', value: 10 },
  ]
  
  const softCheeseName = this.props.cheeses.find(p => p.id === this.state.softCheese) || {}
  const midCheeseName = this.props.cheeses.find(p => p.id === this.state.midCheese) || {}
  const agedCheeseName = this.props.cheeses.find(p => p.id === this.state.agedCheese) || {}
  const wildCheeseName = this.props.cheeses.find(p => p.id === this.state.wildcard) || {}

    return (
      <React.Fragment>
        <Header>
          <div>
            <Image centered src={Cheese} size="tiny" />
          </div>
        </Header>
          <div className="peopleDrop">
            <h3>First, how many people want cheese?</h3>
            <Dropdown placeholder="How many people?" 
              fluid 
              selection 
              item
              text={this.state.people}
              defaultValue={this.state.people}
              options={numbers}
              onChange={this.handleDropdownChange}
              id="people" />
          </div>

          <div className="cheeseDrop">
            <Divider />
          </div>

          <section className="cheeseDrop">
            <h3>Soft Cheese</h3>
            <Dropdown 
              fluid 
              search
              selection
              text={softCheeseName.name}
              defaultValue={this.state.softCheese}
              options={this.state.softOptions}
              onChange={this.handleDropdownChange}
              id="softCheese" />

            <h3>Middle ground</h3>
            <Dropdown 
              fluid 
              search 
              selection
              text={midCheeseName.name}
              defaultValue={this.state.midCheese}
              options={this.state.midOptions}
              onChange={this.handleDropdownChange}
              id="midCheese" />

            <h3>Aged Cheese</h3>
            <Dropdown 
              fluid 
              search 
              selection
              text={agedCheeseName.name}
              defaultValue={this.state.agedCheese}
              options={this.state.agedOptions}
              onChange={this.handleDropdownChange}
              id="agedCheese" />

            

            <h3>How about something unusual?</h3>
            <Dropdown 
              fluid 
              search 
              selection
              text={wildCheeseName.name}
              defaultValue={this.state.wildcard}
              options={this.state.wildcardOptions}
              onChange={this.handleDropdownChange}
              id="wildcard" />

            <br></br>
            <Button color="yellow" size="large" animated='vertical' className="createBtn"
              onClick={this.editPlate}>
              <Button.Content hidden>All Done!</Button.Content>
              <Button.Content visible><Icon name='check' /></Button.Content>
            </Button>
          </section>
      </React.Fragment>

    
    )
  }
}