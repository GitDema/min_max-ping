import React, { Component, Fragment } from "react";
import moment from "moment";

class Pinger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "https://google.com/",
      pingList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePing = this.handlePing.bind(this);
  }

  handleChange = e => this.setState({ address: e.target.value, pingList: [] });

  handlePing = () => {
    let pings = [...this.state.pingList];
    let startDate = moment();

    fetch(this.state.address, { mode: "no-cors" })
      .then(response => {
        if (response.status === 0) {
          pings.push(moment().diff(moment(startDate)));
          this.setState({ pingList: pings });
        }
      })
      .catch(err => {
        this.setState({ pingList: [] });
        alert(err);
      });
  };

  render() {
    const { address, pingList } = this.state;

    return (
      <div>
        <h1>Pinger:</h1>
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          placeholder="https://google.com/"
          type="text"
          value={address}
          onChange={this.handleChange}
          style={this.props.baseStyle}
          onMouseOver={this.props.handleOnHover}
          onMouseLeave={this.props.handleNotHover}
        />
        <button onClick={this.handlePing}>Ping</button>

        {pingList.length > 0 && (
          <Fragment>
            <h1>Results:</h1>
            {pingList.map((item, key) => (
              <p key={key}>
                Ping time was <b>{item} ms.</b>
              </p>
            ))}
          </Fragment>
        )}
      </div>
    );
  }
}

export default Pinger;
