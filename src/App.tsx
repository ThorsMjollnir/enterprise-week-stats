import * as React from 'react';
import './App.css';

import Intake24Client from "./intake24-client";
import Config from "./config";
import {getNutrientStats, NutrientStats} from "./stats";
import {TotalEnergyPanel} from "./total-energy-panel";

let config: Config = require('./config.json');

interface AppState {
  currentPanel: number;
  nutrientStats?: NutrientStats;
}

class App extends React.Component<{}, AppState> {

  intervalId?: number = undefined;
  client = new Intake24Client(config.apiBaseUrl, config.refreshToken);

  constructor(props: {}) {
    super(props);
    this.state = {
      currentPanel: -1,
      nutrientStats: undefined
    }
  }

  tick() {
    this.client.getSurveySubmissions("ew-test").then(surveys => this.setState({
      nutrientStats: getNutrientStats(surveys),
      currentPanel: (this.state.currentPanel + 1) % 4
    }));
  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick.bind(this), config.slideTimerSeconds * 1000);
    this.tick();
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  public render() {

    return (
        <div className="App">
          <div className="background"></div>
          {this.state.nutrientStats && <TotalEnergyPanel active={this.state.currentPanel == 0} stats={this.state.nutrientStats}/>}
          {this.state.nutrientStats && <TotalEnergyPanel active={this.state.currentPanel == 1} stats={this.state.nutrientStats}/>}
          {this.state.nutrientStats && <TotalEnergyPanel active={this.state.currentPanel == 2} stats={this.state.nutrientStats}/>}
          {this.state.nutrientStats && <TotalEnergyPanel active={this.state.currentPanel == 3} stats={this.state.nutrientStats}/>}
        </div>
    );
  }
}

export default App;
