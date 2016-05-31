import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import DrugCard from '../DrugCard';

import './drug_cards.scss';

const propTypes = {
  /** An array of drugs to render as table rows */
  data: React.PropTypes.array,

  /** Key in the data by which to group the cards */
  groupBy: React.PropTypes.string
};

const defaultProps = {
  groupBy: 'class'
};

/**
 * Groups data by the groupBy key, expecting the value
 * to be  { value, label }.
 *
 * @param {Array} data The items to group
 * @param {String} groupBy The key to group by
 * @return {Object} The grouped items map
 */
function labelValueGroupBy(data, groupBy) {
  return data.reduce((grouped, d) => {
    const groupByValue = d[groupBy];
    let groupKey;
    if (groupByValue && groupByValue.value) {
      groupKey = groupByValue.value;
    } else {
      groupKey = 'unknown';
    }

    if (!grouped[groupKey]) {
      grouped[groupKey] = [d];
    } else {
      grouped[groupKey].push(d);
    }

    return grouped;
  }, {});
}

/**
 * Get the group header based on the label in an object in the group
 */
function groupHeader(group, groupBy) {
  return (group[0] && groupBy && group[0][groupBy] && group[0][groupBy].label) ||
    'Unknown';
}

/** Render all the filtered drugs as cards */
class DrugCards extends React.Component {
  constructor(props) {
    super(props);
    this.renderGroup = this.renderGroup.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  /**
   * Renders each group of drugs
   *
   * @param {Array} group An array of drugs
   * @param {Number} key React render key
   *
   * @return {React.Component}
   */
  renderGroup(group, key) {
    const { groupBy } = this.props;
    const header = groupHeader(group, groupBy);
    return (
      <div key={key} className='card-group'>
        <header>
          <h3>{header}</h3>
        </header>
        <div className='card-group-cards'>
          {group.map((drug, i) => {
            return <DrugCard key={i} data={drug} />;
          })}
        </div>
      </div>
    );
  }

  render() {
    const { data, groupBy } = this.props;

    const groups = labelValueGroupBy(data, groupBy);

    // sort the groups
    const orderedGroupKeys = Object.keys(groups).sort();

    return (
      <div className='DrugCards'>
        {orderedGroupKeys.map((key, index) => this.renderGroup(groups[key], index))}
      </div>
    );
  }
}

DrugCards.propTypes = propTypes;
DrugCards.defaultProps = defaultProps;

export default DrugCards;
