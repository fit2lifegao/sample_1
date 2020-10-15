import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { range } from 'underscore';
import { Dropdown } from 'office-ui-fabric-react';

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  value: null,
};

export class DropDownDatePicker extends Component {
  handleChange(changed) {
    const callback = this.props.onChange;
    if (callback) {
      callback(moment(changed).toDate());
    }
  }

  renderMonths = () => {
    const months = range(12);
    const monthOptions = months.map(v => ({
      key: v,
      text: moment.monthsShort()[v],
    }));
    return monthOptions;
  };
  renderDays = () => {
    const { value } = this.props;
    const date = moment(value || new Date());
    const days = range(1, date.daysInMonth() + 1);

    const dateOptions = days.map(d => ({
      key: d,
      text: d,
    }));
    return dateOptions;
  };

  renderYears = () => {
    const today = moment();
    const years = range(today.year() - 10, today.year() + 10);
    const yearOptions = years.map(y => ({
      key: y,
      text: y,
    }));
    return yearOptions;
  };

  render() {
    const { value } = this.props;
    const date = moment.utc(value || new Date());
    return (
      <div className="Dropdown-datepicker">
        <Dropdown
          className="months"
          selectedKey={date.month()}
          options={this.renderMonths()}
          onChanged={e =>
            this.handleChange({
              year: date.year(),
              month: e.key,
              date: date.date(),
            })
          }
        />
        <Dropdown
          className="days"
          selectedKey={date.date()}
          options={this.renderDays()}
          onChanged={e =>
            this.handleChange({
              year: date.year(),
              month: date.month(),
              date: e.key,
            })
          }
        />
        <Dropdown
          className="years"
          selectedKey={date.year()}
          options={this.renderYears()}
          onChanged={e =>
            this.handleChange({
              year: e.key,
              month: date.month(),
              date: date.date(),
            })
          }
        />
      </div>
    );
  }
}

DropDownDatePicker.propTypes = propTypes;
DropDownDatePicker.defaultProps = defaultProps;

export default DropDownDatePicker;
