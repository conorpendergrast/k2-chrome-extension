'use strict';

/**
 * A component for tabs to show the selected tab and the corresponding content
 */

let React = require('react');
const _ = require('underscore');

module.exports = React.createClass({
  getInitialState() {
    return {
      items: this.props.items
    };
  },

  componentDidMount() {
    let foundActiveTab = false;
    // Set the currently selected tab based on our hash
    _(this.state.items).each(i => {
      if (window.location.hash.search('#k2-' + i.id) > -1) {
        this.setActive(i.id);
        foundActiveTab = true;
      }
    });

    // Select the web tab by default, because I'm selfish
    if (!foundActiveTab) {
      this.setActive('web');
    }
  },

  /**
   * Set a tab to active
   * @param {String} id of the tab to activate
   */
  setActive(id) {
    const currentItems = this.state.items;
    _(currentItems).each(i => {
      i.selected = i.id === id ? 'selected' : '';
    });
    this.setState({items: currentItems});
  },

  render: function() {
    let content;

    _(this.state.items).each(i => {
      if (i.selected === 'selected') {
        content = i.content;
      }
    });

    return (
      <div>
        <nav className="reponav js-repo-nav js-sidenav-container-pjax js-octicon-loaders" role="navigation" data-pjax="#js-repo-pjax-container">
          {_(this.state.items).map(i => (
            <a key={i.id} href={`#k2-${i.id}`} className={`reponav-item ${i.selected}`} onClick={() => this.setActive(i.id)}>
              <span aria-hidden="true" className={`octicon ${i.icon}`}></span>
              {' '}{i.title}
            </a>
          ))}
        </nav>
        {content}
      </div>
    );
  }
});
