import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import constructorsRedux from '../redux/constructorsRedux';
import Search from '../components/Search';
import { getConstructorsSearchItems } from '../selectors';

class RootContainer extends Component {
  constructor(props) {
    super(props);

    props.getConstructors();
  }
  render() {
    return (
      // eslint-disable-next-line
      <div style={{ width: '50%', margin: '1rem auto' }}>
        <Search
          items={this.props.constructorsItems}
          onChange={(value) => {
            this.props.setSelectedConstructors(value.split(','));
          }}
        />
      </div>
    );
  }
}

RootContainer.propTypes = {
  getConstructors: PropTypes.func.isRequired,
  setSelectedConstructors: PropTypes.func.isRequired,
  constructorsItems: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = state => ({
  constructorsItems: getConstructorsSearchItems(state),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getConstructors: constructorsRedux.constructorsRequest,
    setSelectedConstructors: constructorsRedux.constructorsSetSelectedConstructors,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);

