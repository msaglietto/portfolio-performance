import React from 'react';
import {
  VictoryLine,
  VictoryAxis,
  VictoryChart,
  VictoryZoomContainer,
  VictoryBrushContainer,
} from 'victory';

import './Results.css';

// Right not the min percentage is 1 so they should not be more than 100
const colors = Array.from(new Array(100)).map(() => `#${((1<<24)*Math.random()|0).toString(16)}`);

class Results extends React.Component {
  constructor() {
    super();
    this.state = {
      zoomDomain: { x: [new Date(2012, 1, 1), new Date()] }
    };
  }

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    return (
      <div>
        <h2>Results</h2>
        <p>OH my dear look at those numbers!! As today you could have made:</p>

        {this.props.data.map((stock) =>
          <p key={stock.name}>
            {stock.name}: ${stock.performance[stock.performance.length - 1].value.toFixed(2)}
          </p>
          )}

        <p>For a grand total of: ${
          this.props.data
            .reduce((total, stock) => total + stock.performance[stock.performance.length -1].value, 0)
            .toFixed(2)
          }
        </p>

        <VictoryChart width={600} height={470} scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >

          {this.props.data.map((stock, i) => (
              <VictoryLine
                key={stock.name}
                labels={(datum) => datum.value.toFixed(2)}
                style={{
                  data: { stroke: colors[i] }
                }}
                data={stock.performance}
                x="date"
                y="value"
              />
          ))}

          </VictoryChart>

          <div className="Results-labels">
            {this.props.data.map((stock, i) => (
              <span key={stock.name} style={{ color: colors[i] }}>{stock.name}  </span>
            ))}
          </div>

          <VictoryChart
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={600} height={100} scale={{ x: "time" }}
            containerComponent={
              <VictoryBrushContainer
                brushDimension="x"
                brushDomain={this.state.zoomDomain}
                onBrushDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />

            {this.props.data.map((stock, i) => (
              <VictoryLine
                key={stock.name}
                style={{
                  data: { stroke: colors[i] }
                }}
                data={stock.performance}
                x="date"
                y="value"
              />
            ))}
          </VictoryChart>
      </div>
    );
  }
}

export default Results;