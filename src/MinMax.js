import React from "react";

import Result from "./Result";
import { mean, median, mode, standardDeviation, rand } from "./api/math";

class MinMax extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      minValue: "",
      maxValue: "",
      mean: null,
      mode: null,
      median: null,
      standardDeviation: null,
      showResult: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.validation = this.validation.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleNotFocus = this.handleNotFocus.bind(this);
  }

  handleOnFocus = e => {
    e.target.style.backgroundColor = "#ff0";
  };

  handleNotFocus = e => {
    e.target.style.backgroundColor = "#fff";
  };

  handleChange = name => event => {
    this.setState({ [name]: +event.target.value });
  };

  validation(min, max) {
    if (min >= max) {
      this.setState({
        error: "The 'min' value must be less than the 'max'",
        showResult: false
      });
      return true;
    }

    this.setState({ error: null });
    return false;
  }

  calculate() {
    const { minValue, maxValue } = this.state;

    if (this.validation(minValue, maxValue)) {
      return null;
    }

    let arr = [];
    let range = rand(minValue, maxValue);

    for (let i = 0; i < range; i++) {
      arr.push(rand(minValue, maxValue));
    }

    let meanAndStdDeviationPromise = new Promise((res, rej) => {
      let meanRes = mean(arr);
      this.setState({ mean: meanRes });
      res(meanRes);
    });

    meanAndStdDeviationPromise.then(result => {
      this.setState({ standardDeviation: standardDeviation(result, arr) });
    });

    let ModePromise = new Promise(function(res, rej) {
      res(mode(arr));
    });

    let medianPromise = new Promise(function(res, rej) {
      res(median(arr));
    });

    Promise.all([ModePromise, medianPromise]).then(results => {
      this.setState({
        mode: results[0],
        median: results[1],
        showResult: true
      });
    });
  }

  render() {
    const { minValue, maxValue, showResult, error } = this.state;

    return (
      <div>
        <label htmlFor="min">Min:</label>
        <input
          placeholder="300"
          type="number"
          id="min"
          value={minValue}
          onChange={this.handleChange("minValue")}
          style={this.props.baseStyle}
          onMouseOver={this.props.handleOnHover}
          onMouseLeave={this.props.handleNotHover}
          onFocus={this.handleOnFocus}
          onBlur={this.handleNotFocus}
        />

        <label htmlFor="max">Max:</label>
        <input
          placeholder="1000"
          type="number"
          id="max"
          value={maxValue}
          onChange={this.handleChange("maxValue")}
          style={this.props.baseStyle}
          onMouseOver={this.props.handleOnHover}
          onMouseLeave={this.props.handleNotHover}
          onFocus={this.handleOnFocus}
          onBlur={this.handleNotFocus}
        />

        <button onClick={this.calculate}>Send</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {showResult && (
          <div>
            <br />
            <Result
              mean={this.state.mean}
              mode={this.state.mode}
              median={this.state.median}
              standardDeviation={this.state.standardDeviation}
            />
          </div>
        )}
      </div>
    );
  }
}

export default MinMax;
