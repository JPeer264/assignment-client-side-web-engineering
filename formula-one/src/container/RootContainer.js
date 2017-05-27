import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import constructorsRedux from '../redux/constructorsRedux';
import driversRedux from '../redux/driversRedux';
import { getConstructorsSearchItems } from '../selectors';

// components
import Search from '../components/Search';
import ListView from '../components/ListView';

class RootContainer extends Component {
  constructor(props) {
    super(props);

    props.getConstructors();
    props.getDriversByConstructorId(props.selectedConstructor);
  }

  render() {
    return (
      // eslint-disable-next-line
      <div style={{ width: '50%', margin: '1rem auto' }}>
        <Search
          items={this.props.constructorsItems}
          onChange={(value) => {
            this.props.setSelectedConstructor(value);
            this.props.getDriversByConstructorId(value);
          }}
        />
        <ListView
          items={this.props.drivers}
          writeListItem={driver => driver.familyName}
          uniqueKey={driver => driver.driverId}
        />
      </div>
    );
  }
}

RootContainer.propTypes = {
  getConstructors: PropTypes.func.isRequired,
  setSelectedConstructor: PropTypes.func.isRequired,
  getDriversByConstructorId: PropTypes.func.isRequired,
  selectedConstructor: PropTypes.string.isRequired,
  constructorsItems: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  drivers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  constructorsItems: getConstructorsSearchItems(state),
  selectedConstructor: state.constructorsStore.selectedConstructor,
  drivers: state.driversStore.drivers,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getConstructors: constructorsRedux.constructorsRequest,
    setSelectedConstructor: constructorsRedux.constructorsSetSelectedConstructor,
    getDriversByConstructorId: constructorId => driversRedux.driversRequest(constructorId),
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);

