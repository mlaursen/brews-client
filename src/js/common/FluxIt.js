module.exports = {
  /**
   * Fluxifies a given component by automatically setting up
   * the change listeners for all of the given stores and removes
   * the change listeners when the component will unmount.
   *
   * It also allows you to pass in api function calls to be initialized on
   * the component will mount function.
   *
   * It is able to handle 0->many stores and 0->many api functions
   *
   * Initial idea from: https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
   */
  init: function(Component, stateFunc, fluxStores, apiFuncs) {
    var FluxIt = React.createClass({

      /**
       * Call every api function that was passed in.
       */
      componentWillMount: function() {
        if(apiFuncs instanceof Function) {
          apiFuncs();
        } else if(apiFuncs instanceof Array) {
          for(var i = 0; i < apiFuncs.length; i++) {
            apiFuncs[i]();
          }
        }
      },

      getInitialState: function() {
        return stateFunc();
      },
      
      componentDidMount: function() {
        if(fluxStores instanceof Function) {
          fluxStores.addChangeListener(this.handleStoresChanged);
        } else if(fluxStores instanceof Array) {
          for(var i = 0; i < fluxStores.length; i++) {
            fluxStores[i].addChangeListener(this.handleStoresChanged);
          }
        }
      },
      
      componentWillUnmount: function() {
        if(fluxStores instanceof Function) {
          fluxStores.removeChangeListener(this.handleStoresChanged);
        } else if(fluxStores instanceof Array) {
          for(var i = 0; i < fluxStores.length; i++) {
            fluxStores[i].removeChangeListener(this.handleStoresChanged);
          }
        }
      },
      
      render: function() {
        return (
          <Component {...this.props} {...this.state} />
        );
      },

      handleStoresChanged: function() {
        if(this.isMounted()) {
          this.setState(stateFunc(this.props));
        }
      }
    });

    return FluxIt;
  }
};
