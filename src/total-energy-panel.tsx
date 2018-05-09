import * as React from "react";
import {InfoPanelProps} from "./info-panel";

export class TotalEnergyPanel extends React.Component<InfoPanelProps> {
  public render() {
    let className = "stats-panel";

    if (this.props.active)
      className += " active";

    return (
        <div className={className}>
          <p>Total energy: {this.props.stats.totalEnergy} </p>
        </div>
    );
  }
}