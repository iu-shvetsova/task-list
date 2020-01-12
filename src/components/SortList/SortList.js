import React from "react";
import PropTypes from "prop-types";
import "./SortList.scss";
import { Select, Icon } from "antd";

const { Option } = Select;

const SortList = props => {
  const { className, sortItems, currentItem, onSortItemChange } = props;

  return (
    <Select
      onChange={onSortItemChange}
      value={currentItem}
      className={`${className} sort-list`}
    >
      {sortItems.map((item, index) => (
        <Select.OptGroup key={index} label={item.name}>
          <Option value={`${item.name}_asc`}>
            <Icon type="caret-up" className="sort-list__icon" />
            {item.value}
          </Option>
          <Option value={`${item.name}_desc`}>
            <Icon type="caret-down" className="sort-list__icon" />
            {item.value}
          </Option>
        </Select.OptGroup>
      ))}
    </Select>
  );
};

SortList.propTypes = {
  className: PropTypes.string,
  sortItems: PropTypes.array.isRequired,
  currentItem: PropTypes.string.isRequired,
  onSortItemChange: PropTypes.func.isRequired
};

export default SortList;
