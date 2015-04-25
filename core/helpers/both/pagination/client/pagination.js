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
    this.getPageCount();
    return this.items = this.collection.find(this.selector, {
      sort: this.sort
    });
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


    /**
    Define page count
    */

  InfinitePagination.prototype.getPageCount = function(cb) {
    var pagination;
    pagination = this;
    if (!this.pageCount) {
      return Meteor.call('pagination:pagesCount', this.collection._name, this.selector, function(err, total) {
        pagination.total = total;
        pagination.pageCount = Math.ceil(total / pagination.pageSize);
      });
    }
  };

  return InfinitePagination;
})();
