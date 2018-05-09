import {NutrientStats} from "./stats";
import * as React from "react";

export interface InfoPanelProps {
  active: boolean,
  stats: NutrientStats
}

export class InfoPanel extends React.Component<InfoPanelProps> {
};