import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import orderBy from "lodash/orderBy";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";

import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";
import Table from "./Table";

//injectTapEventPlugin();

const invertDirection = {
  asc: "desc",
  desc: "asc"
};

class App extends Component {
  state = {
    data: [
  {
    "tag": "ToblinStonehill",
      "name": "Toblin Stonehill",
      "occupation": "Innkeeper",
      "status": "alive",
      "information": "[RedbrandHangout]"
    
  },
  {
    "tag": "ElmarBarthen",
    
      "name": "Elmar Barthen",
      "occupation": "Owns trading post",
      "status": "alive",
      "information": "[RedbrandShakedown]"
    
  },
  {
    "tag": "DarenEdermath",
      "name": "Daren Edermath",
      "occupation": "Retired adventurer",
      "faction": "Order of the Gauntlet",
      "status": "alive",
      "information": "[RedbrandHideoutLocation, GetRidOfRedbrands, DiggingOldOwlWell]"
    
  },
  {
    "tag": "LineneGraywind",  
      "name": "Linene Graywind",
      "occupation": "Runs trading post",
      "status": "alive",
      "information": []
    
  }, 
  {
    "tag": "HaliaThornton",
      "name": "Halia Thorton",
      "occupation": "Runs Phandalin Miner's Exchange",
      "faction": "Zhentarim",
      "status": "alive",
      "information": "[GoblinCragmawCastle, KillRedbrandLeader]"
    
  },  
  {
    "tag": "QellineAlderleaf",
      "name": "Qelline Alderleaf",
      "occupation": "Halfling farmer",
      "status": "alive",
      "information": "[ReidothLocation]", 
      "familyOf": "Mother of Carp",
      "friendOf": "Reidoth"
    
  },  
  {
   "tag": "SisterGaraele",
      "name": "Sister Garaele",
      "occupation": "Elf cleric of Tymora",
      "faction": "Harper",
      "status": "alive",
      "information": "[AskAgathaAboutBook]"
    
  },  
  {
   "tag": "HarbinWester",
    "name": "Harbin Wester",
    "occupation": "Townmaster of Phandalin",
    "status": "alive",
    "information": "[OrcsTriboarTrail, TownmasterAndRedbrands]"
    
  },  
  {
   "tag": "SildarHallwinter",
    "name": "Sildar Hallwinter",
    "faction": "Lords' Alliance",
    "status": "alive",
    "information": "[MissingIarno]"
    
  }, 
  {
   "tag": "Narth",
    "name": "Narth",
    "occupation": "Farmer",
    "status": "alive",
    "information": "[SisterGaraeleExhausted]"
    
  },
  {
   "tag": "TheRedbrands",
    "name": "The Redbrands",
    "faction": "Redbrands",
    "status": "alive",
    "information": []
    
  },
  {
   "tag": "Elsa",
    "name": "Elsa",
    "status": "alive",
    "information": []
    
  },
  {
   "tag": "Lanar",
    "name": "Lanar",
    "status": "alive",
    "information": "[OrcsTriboarTrail]"
    
  },
  {
   "tag": "Trilena",
    "name": "Trilena",
    "status": "alive",
    "information": "[DendrarFamilyKidnapped]"
    
  },
  {
   "tag": "Pip",
    "name": "Pip",
    "status": "alive",
    "information": "[SecretTunnelKnowledge]", 
    "friendOf": "Carp"
    
  },
  {
   "tag": "Freda",
    "name": "Freda",
    "status": "alive",
    "information": "[RedbrandsAndHalia]"
    
  },
  {
   "tag": "Ander",
    "name": "Ander",
    "status": "alive",
    "information": []
    
  },
  {
   "tag": "Thistle",
    "name": "Thistle",
    "status": "alive",
    "information": []
    
  },
  {
   "tag": "Grista",
    "name": "Grista",
    "status": "alive",
    "information": []
    
  },
  {
   "tag": "Carp",
    "name": "Carp",
    "status": "alive",
    "information": "[RedbrandHideoutLocation, SecretTunnelLocation]",
    "familyOf": "Child of Qelline Alderleaf"
    
  },
  {
   "tag": "Agatha",
    "name": "Agatha the Banshee",
    "status": "alive",
    "information": "[AgathaInfo]"
    
  },
  {
   "tag": "Reidoth",
    "name": "Reidoth",
    "status": "alive",
    "information": "[GreenDragon]"
    
  },
  {
   "tag": "GundrenRockseeker",
    "name": "Gundren Rockseeker",
    "status": "alive",
    "information": "[WaveEchoCaveMap]"
    
  },
  {
   "tag": "Hamun",
    "name": "Hamun the Necromancer",
    "status": "alive",
    "information": "[HamunQuest, FinishHamunQuest]"
    
  },
  {
   "tag": "RedbrandMinions",
    "name": "Goblin Droop and Bugbears",
    "status": "alive",
    "information": "[RedbrandMinionInfo]"
    
  }
],
    editIdx: -1,
    columnToSort: "",
    sortDirection: "desc",
    query: "",
    columnToQuery: "tag"
  };

  handleRemove = i => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i)
    }));
  };

  startEditing = i => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleSave = (i, x) => {
    this.setState(state => ({
      data: state.data.map((row, j) => (j === i ? x : row))
    }));
    this.stopEditing();
  };

  handleSort = columnName => {
    this.setState(state => ({
      columnToSort: columnName,
      sortDirection:
        state.columnToSort === columnName
          ? invertDirection[state.sortDirection]
          : "asc"
    }));
  };

  render() {
    const lowerCaseQuery = this.state.query.toString().toLowerCase();
    return (
      <MuiThemeProvider>
        <div className="App">
          <Form
            onSubmit={submission =>
              this.setState({
                data: [...this.state.data, submission]
              })
            }
          />
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", margin: "auto" }}>
              <TextField
                hintText="Query"
                floatingLabelText="Query"
                value={this.state.query}
                onChange={e => this.setState({ query: e.target.value })}
                floatingLabelFixed
              />
              <SelectField
                style={{ marginLeft: "1em" }}
                floatingLabelText="Select a column"
                value={this.state.columnToQuery}
                onChange={(event, index, value) =>
                  this.setState({ columnToQuery: value })
                }
              >
                <MenuItem value="tag" primaryText="Tag" />
                <MenuItem value="name" primaryText="Name" />
                <MenuItem value="occupation" primaryText="Occupation" />
                <MenuItem value="status" primaryText="Status" />
                <MenuItem value="information" primaryText="Information" />
              </SelectField>
            </div>
          </div>
          <Table
            handleSort={this.handleSort}
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleSave={this.handleSave}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            data={orderBy(
              this.state.query
                ? this.state.data.filter(x =>
                    x[this.state.columnToQuery]
                      .toString()
                      .toLowerCase()
                      .includes(lowerCaseQuery)
                  )
                : this.state.data,
              this.state.columnToSort,
              this.state.sortDirection
            )}
            header={[
              {
                name: "Tag",
                prop: "tag"
              },
              {
                name: "Name",
                prop: "name"
              },
              {
                name: "Occupation",
                prop: "occupation"
              },
              {
                name: "Status",
                prop: "status"
              },
              {
                name: "Information",
                prop: "information"
              }
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
