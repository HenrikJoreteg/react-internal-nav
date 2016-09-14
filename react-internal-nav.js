var React = require('react')
var localLinks = require('local-links')
var PropTypes = React.PropTypes

module.exports = React.createClass({
  propTypes: {
    onInternalNav: PropTypes.func.isRequired,
    tagType: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array
    ])
  },

  getDefaultProps: function () {
    return {
      tagType: 'div'
    }
  },

  onPotentialNav: function (event) {
    var pathname = localLinks.getLocalPathname(event)

    if (pathname) {
      event.preventDefault()
      this.props.onInternalNav(pathname)
    }
  },

  render: function () {
    var props = {}
    var tagType = this.props.tagType;

    for (var key in this.props) {
      props[key] = this.props[key]
    }
    props.onClick = this.onPotentialNav;
    // Prevent unknown prop error:
    // https://github.com/facebook/react/pull/6800
    delete props.onInternalNav;
    delete props.tagType;

    return React.createElement(tagType, props, this.props.children)
  }
})
