/*
 * All credits to the original author: https://github.com/radzserg/meteor_pagination
 */

Rise.InfinitePagination = (function() {
  function InfinitePagination(collection, selector, options) {
    var currentParams, pagination;

    this.collection = collection;
    this.selector = selector != null ? selector : {};
    options = options || {};
    this.subscriptionName = options.subscriptionName;

    if (!this.subscriptionName) {
      throw new Meteor.Error("wrong_options", "subscriptionName option must be specified");
    }

    this.filterDependency = new Tracker.Dependency;

    this.sort = options.sort || null;
    this.pageSize = options.pageSize || 10;
    this.bottomOffset = options.bottomOffset || 0;
    this.queryPageName = options.queryPageName || "page";

    this.templateName = "InfinitePagination";

    currentParams = Router.current().getParams();

    this.page = currentParams.query && parseInt(currentParams.query[this.queryPageName]) || 1;

    pagination = this;

    Template[this.templateName].offset = pagination.bottomOffset;
    Template[this.templateName].loadNextPage = function() {
      if (pagination.page + 1 <= pagination.pageCount) {
          pagination.page++;
        return Meteor.subscribe(pagination.subscriptionName, pagination.selector, pagination.getSubscriptionOptions());
        }
    };
  }

    /**
    Get pagination items
    */

  InfinitePagination.prototype.getItems = function() {
    this.filterDependency.depend();

    this.getPageCount();
    return this.items = this.collection.find(this.selector, {
      sort: this.sort
    });
  };

  InfinitePagination.prototype.setFilter = function(filter, value) {
    if (_.isNull(value)) {
      delete this.selector[filter];
    } else {
      this.selector[filter] = value;
    }

    this.filterDependency.changed();
    this.filtersChanged = true; // Weird, I know, but optimizes the getPageCount method
    this.onFilterChanged();
  };

    /**
    Get subscription options
    */

  InfinitePagination.prototype.getSubscriptionOptions = function() {
    return {
      sort: this.sort,
      limit: this.pageSize * this.page
    };
  };

  InfinitePagination.prototype.onFilterChanged = function() {
    this.getPageCount();
    this.filtersChanged = false;
    return Meteor.subscribe(this.subscriptionName, this.selector, this.getSubscriptionOptions());
  }

  /**
    Define page count
    */

  InfinitePagination.prototype.getPageCount = function(cb) {
    var pagination = this;

    if (!this.pageCount || this.filtersChanged) {
      return Meteor.call('pagination:pagesCount', this.collection._name, this.selector, function(err, total) {
        pagination.total = total;
        pagination.pageCount = Math.ceil(total / pagination.pageSize);
      });
    }
  };

  return InfinitePagination;
})();
