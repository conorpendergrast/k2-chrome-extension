'use strict';

/**
 * A component for tabs to show the selected tab and the corresponding content
 */

let React = require('react');
const _ = require('underscore');
const Contents = require('./contents');

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
      if (localStorage.activeTab === i.id) {
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
    localStorage.activeTab = id;
    this.setState({items: _(this.state.items).each(i => {
      i.selected = i.id === id ? 'selected' : '';
    })});
  },

  render: function() {
    let selectedItem = _(this.state.items).findWhere({selected: 'selected'});

    return (
      <div>
        <nav className="reponav js-repo-nav js-sidenav-container-pjax js-octicon-loaders" role="navigation" data-pjax="#js-repo-pjax-container">
          {_(this.state.items).map(i => (
            <a
              key={_.uniqueId()}
              data-key={i.apiMethod}
              className={`reponav-item ${i.selected}`}
              onClick={e => {
                e.preventDefault();
                this.setActive(i.id);
              }}
            >
              {' '}{i.title}{' '}<span className="counter">-</span>
            </a>
          ))}
        </nav>
        {selectedItem ? <Contents {...selectedItem} type={this.props.type} pollInterval={this.props.pollInterval} /> : null}
      </div>
    );
  }
});
