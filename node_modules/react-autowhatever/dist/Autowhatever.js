'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sectionIterator = require('section-iterator');

var _sectionIterator2 = _interopRequireDefault(_sectionIterator);

var _reactThemeable = require('react-themeable');

var _reactThemeable2 = _interopRequireDefault(_reactThemeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

var Autowhatever = function (_Component) {
  _inherits(Autowhatever, _Component);

  function Autowhatever(props) {
    _classCallCheck(this, Autowhatever);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Autowhatever).call(this, props));

    _this.onKeyDown = _this.onKeyDown.bind(_this);
    return _this;
  } // Styles. See: https://github.com/markdalgleish/react-themeable


  _createClass(Autowhatever, [{
    key: 'getItemId',
    value: function getItemId(sectionIndex, itemIndex) {
      if (itemIndex === null) {
        return null;
      }

      var id = this.props.id;

      var section = sectionIndex === null ? '' : 'section-' + sectionIndex;

      return 'react-autowhatever-' + id + '-' + section + '-item-' + itemIndex;
    }
  }, {
    key: 'getItemsContainerId',
    value: function getItemsContainerId() {
      var id = this.props.id;


      return 'react-whatever-' + id;
    }
  }, {
    key: 'renderItemsList',
    value: function renderItemsList(theme, items, sectionIndex) {
      var _this2 = this;

      var _props = this.props;
      var renderItem = _props.renderItem;
      var focusedSectionIndex = _props.focusedSectionIndex;
      var focusedItemIndex = _props.focusedItemIndex;

      var isItemPropsFunction = typeof this.props.itemProps === 'function';

      return items.map(function (item, itemIndex) {
        var itemPropsObj = isItemPropsFunction ? _this2.props.itemProps({ sectionIndex: sectionIndex, itemIndex: itemIndex }) : _this2.props.itemProps;
        var onMouseEnter = itemPropsObj.onMouseEnter;
        var onMouseLeave = itemPropsObj.onMouseLeave;
        var onMouseDown = itemPropsObj.onMouseDown;
        var onClick = itemPropsObj.onClick;


        var onMouseEnterFn = onMouseEnter ? function (event) {
          return onMouseEnter(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
        } : noop;
        var onMouseLeaveFn = onMouseLeave ? function (event) {
          return onMouseLeave(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
        } : noop;
        var onMouseDownFn = onMouseDown ? function (event) {
          return onMouseDown(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
        } : noop;
        var onClickFn = onClick ? function (event) {
          return onClick(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
        } : noop;
        var itemProps = _extends({
          id: _this2.getItemId(sectionIndex, itemIndex),
          role: 'option'
        }, theme(itemIndex, 'item', sectionIndex === focusedSectionIndex && itemIndex === focusedItemIndex && 'itemFocused'), itemPropsObj, {
          onMouseEnter: onMouseEnterFn,
          onMouseLeave: onMouseLeaveFn,
          onMouseDown: onMouseDownFn,
          onClick: onClickFn
        });

        return _react2.default.createElement(
          'li',
          itemProps,
          renderItem(item)
        );
      });
    }
  }, {
    key: 'renderSections',
    value: function renderSections(theme) {
      var _this3 = this;

      var _props2 = this.props;
      var items = _props2.items;
      var getSectionItems = _props2.getSectionItems;

      var sectionItemsArray = items.map(function (section) {
        return getSectionItems(section);
      });
      var noItemsExist = sectionItemsArray.every(function (sectionItems) {
        return sectionItems.length === 0;
      });

      if (noItemsExist) {
        return null;
      }

      var _props3 = this.props;
      var shouldRenderSection = _props3.shouldRenderSection;
      var renderSectionTitle = _props3.renderSectionTitle;


      return _react2.default.createElement(
        'div',
        _extends({ id: this.getItemsContainerId(),
          role: 'listbox'
        }, theme('itemsContainer', 'itemsContainer')),
        items.map(function (section, sectionIndex) {
          if (!shouldRenderSection(section)) {
            return null;
          }

          var sectionTitle = renderSectionTitle(section);

          return _react2.default.createElement(
            'div',
            _extends({ key: sectionIndex
            }, theme(sectionIndex, 'sectionContainer')),
            sectionTitle && _react2.default.createElement(
              'div',
              theme('sectionTitle', 'sectionTitle'),
              sectionTitle
            ),
            _react2.default.createElement(
              'ul',
              theme('sectionItemsContainer', 'sectionItemsContainer'),
              _this3.renderItemsList(theme, sectionItemsArray[sectionIndex], sectionIndex)
            )
          );
        })
      );
    }
  }, {
    key: 'renderItems',
    value: function renderItems(theme) {
      var items = this.props.items;


      if (items.length === 0) {
        return null;
      }

      return _react2.default.createElement(
        'ul',
        _extends({ id: this.getItemsContainerId(),
          role: 'listbox'
        }, theme('itemsContainer', 'itemsContainer')),
        this.renderItemsList(theme, items, null)
      );
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      var _props4 = this.props;
      var inputProps = _props4.inputProps;
      var focusedSectionIndex = _props4.focusedSectionIndex;
      var focusedItemIndex = _props4.focusedItemIndex;
      var onKeyDownFn = inputProps.onKeyDown; // Babel is throwing:
      //   "onKeyDown" is read-only
      // on:
      //   const { onKeyDown } = inputProps;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          var _props5 = this.props;
          var multiSection = _props5.multiSection;
          var items = _props5.items;
          var getSectionItems = _props5.getSectionItems;

          var sectionIterator = (0, _sectionIterator2.default)({
            multiSection: multiSection,
            data: multiSection ? items.map(function (section) {
              return getSectionItems(section).length;
            }) : items.length
          });
          var nextPrev = event.key === 'ArrowDown' ? 'next' : 'prev';

          var _sectionIterator$next = sectionIterator[nextPrev]([focusedSectionIndex, focusedItemIndex]);

          var _sectionIterator$next2 = _slicedToArray(_sectionIterator$next, 2);

          var newFocusedSectionIndex = _sectionIterator$next2[0];
          var newFocusedItemIndex = _sectionIterator$next2[1];


          onKeyDownFn(event, { newFocusedSectionIndex: newFocusedSectionIndex, newFocusedItemIndex: newFocusedItemIndex });
          break;

        default:
          onKeyDownFn(event, { focusedSectionIndex: focusedSectionIndex, focusedItemIndex: focusedItemIndex });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props;
      var multiSection = _props6.multiSection;
      var focusedSectionIndex = _props6.focusedSectionIndex;
      var focusedItemIndex = _props6.focusedItemIndex;

      var theme = (0, _reactThemeable2.default)(this.props.theme);
      var renderedItems = multiSection ? this.renderSections(theme) : this.renderItems(theme);
      var isOpen = renderedItems !== null;
      var ariaActivedescendant = this.getItemId(focusedSectionIndex, focusedItemIndex);
      var inputProps = _extends({
        type: 'text',
        value: '',
        autoComplete: 'off',
        role: 'combobox',
        ref: 'input',
        'aria-autocomplete': 'list',
        'aria-owns': this.getItemsContainerId(),
        'aria-expanded': isOpen,
        'aria-activedescendant': ariaActivedescendant
      }, theme('input', 'input'), this.props.inputProps, {
        onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown
      });

      return _react2.default.createElement(
        'div',
        theme('container', 'container', isOpen && 'containerOpen'),
        _react2.default.createElement('input', inputProps),
        renderedItems
      );
    }
  }]);

  return Autowhatever;
}(_react.Component);

Autowhatever.propTypes = {
  id: _react.PropTypes.string, // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
  multiSection: _react.PropTypes.bool, // Indicates whether a multi section layout should be rendered.
  items: _react.PropTypes.array.isRequired, // Array of items or sections to render.
  renderItem: _react.PropTypes.func, // This function renders a single item.
  shouldRenderSection: _react.PropTypes.func, // This function gets a section and returns whether it should be rendered, or not.
  renderSectionTitle: _react.PropTypes.func, // This function gets a section and renders its title.
  getSectionItems: _react.PropTypes.func, // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
  inputProps: _react.PropTypes.object, // Arbitrary input props
  itemProps: _react.PropTypes.oneOfType([// Arbitrary item props
  _react.PropTypes.object, _react.PropTypes.func]),
  focusedSectionIndex: _react.PropTypes.number, // Section index of the focused item
  focusedItemIndex: _react.PropTypes.number, // Focused item index (within a section)
  theme: _react.PropTypes.object };
Autowhatever.defaultProps = {
  id: '1',
  multiSection: false,
  shouldRenderSection: function shouldRenderSection() {
    return true;
  },
  renderItem: function renderItem() {
    throw new Error('`renderItem` must be provided');
  },
  renderSectionTitle: function renderSectionTitle() {
    throw new Error('`renderSectionTitle` must be provided');
  },
  getSectionItems: function getSectionItems() {
    throw new Error('`getSectionItems` must be provided');
  },
  inputProps: {},
  itemProps: {},
  focusedSectionIndex: null,
  focusedItemIndex: null,
  theme: {
    container: 'react-autowhatever__container',
    containerOpen: 'react-autowhatever__container--open',
    input: 'react-autowhatever__input',
    itemsContainer: 'react-autowhatever__items-container',
    item: 'react-autowhatever__item',
    itemFocused: 'react-autowhatever__item--focused',
    sectionContainer: 'react-autowhatever__section-container',
    sectionTitle: 'react-autowhatever__section-title',
    sectionItemsContainer: 'react-autowhatever__section-items-container'
  }
};
exports.default = Autowhatever;
