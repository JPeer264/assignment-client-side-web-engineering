import PropTypes from 'prop-types';
import React from 'react';

const ListView = props => (
  <ul>
    {props.items.map(item => (
      <li key={props.uniqueKey(item)}>
        {props.writeListItem(item)}
      </li>
    ))}
  </ul>
);

ListView.propTypes = {
  // eslint-disable-next-line
  items: PropTypes.array,
  // eslint-disable-next-line
  uniqueKey: PropTypes.func.isRequired,
  writeListItem: PropTypes.func.isRequired,
};

ListView.defaultProps = {
  items: [],
};

export default ListView;
