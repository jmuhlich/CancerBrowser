import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Select from 'react-select';
import MultiSelectList from '../MultiSelectList';
const propTypes = {
  /* The list of items to render
    [
      { value: 'big6', label: 'Big 6', cellLines: [...] },
      { value: 'icbp43', label: 'ICBP43', cellLines: [...] }
    ]
  */
  items: React.PropTypes.array.isRequired,

  /* The toggled values, an array of 'value's, e.g.:
    ['big6', 'icbp43']
   */
  values: React.PropTypes.array,

  /*
   * Mapping from items 'value' to count to show on the right
   * e.g.
   {
      big6: 6,
      icbp43: 43
   }
   */
  counts: React.PropTypes.object,

  /*
   * Number used as maximum count for scaling the bars that go along with counts
   * If not provided, the max of the values provided is used
   */
  countMax: React.PropTypes.number,

  /*
   * Fired when the selected items change, typically by clicking an item
   */
  onChange: React.PropTypes.func,

  // if the number of items supplied is > this, the element is rendered as an autocompleter
  autocompleteThreshold: React.PropTypes.number
};

const defaultProps = {
  autocompleteThreshold: 10
};

/**
 * List component where you can click each item to toggle it on or off
 * Also includes visual encoding of number of results that are affected
 */
class MultiSelectFilter extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.handleAutocompleterChange = this.handleAutocompleterChange.bind(this);
  }

  handleAutocompleterChange(newValues) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(newValues.map(value => value.value));
    }
  }

  renderAutocompleter() {
    const { items, values } = this.props;
    return (
      <div>
        <Select multi={true} options={items} value={values} onChange={this.handleAutocompleterChange} />
      </div>
    );
  }

  renderList() {
    const { items, values, onChange, counts, countMax } = this.props;

    return (
      <MultiSelectList items={items} values={values} counts={counts} countMax={countMax} onChange={onChange} />
    );
  }

  render() {
    const { items, autocompleteThreshold } = this.props;

    return (
      <div className="MultiSelectFilter">
        {items.length > autocompleteThreshold ? this.renderAutocompleter() : this.renderList()}
      </div>
    );
  }
}

MultiSelectFilter.propTypes = propTypes;
MultiSelectFilter.defaultProps = defaultProps;

export default MultiSelectFilter;
