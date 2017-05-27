import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.state = {
      value: [],
    };
  }

  handleSelectChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    return (
      // eslint-disable-next-line
      <Select
        multi
        simpleValue
        value={this.state.value}
        placeholder={this.props.placeholder}
        options={this.props.items}
        onChange={this.handleSelectChange}
      />
    );
  }
}

Search.propTypes = {
  // eslint-disable-next-line
  items: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Search.defaultProps = {
  items: [],
  placeholder: 'Select something',
};

export default Search;
