/*
juery.rowrow.js by Ville Vanninen
http://foolproof.me

Usage:
$(element).prevRow();
$(element).nextRow();
*/


;(function($) {
  $.fn.prevRow = function (filter) {

    var prevRows = $();

    /*
    1. is it the last element of the previous element?
    2. is it the previous element?
    3. is it the parent?
    */

    this.each(function(index) {
      var $this = $(this);
      var deepPrev = $this.prev().find(':last');
      var prev = $this.prev();
      var parent = $this.parent();
      var prevRow;

      if (deepPrev.length > 0) {
        prevRows = prevRows.add(deepPrev);
      }
      else if (prev.length > 0) {
        prevRows = prevRows.add(prev);
      }
      else if (parent.length > 0) {
        prevRows = prevRows.add(parent);
      }
      else {
        //if we're at the first row, add nothing
      }
    });

    if (filter) {
      return prevRows.filter(filter);
    }
    else {
      return prevRows;
    };

  };
}) (jQuery);

(function($) {
  $.fn.nextRow = function (filter) {

    var nextRows = $();

		/*
		1. is it the first child?
		2. is it the next element?
		3. is it the nearest parent with a next sibling?
		*/

    this.each(function(index) {
      var $this = $(this);
      var child = $this.children(':first');
      var next = $this.next();
      var parentSibling = function ($this) {
        //console.log('next line is a sibling of some parent, iterate parents until a next sibling is found');
        var parent = $this.parent();
        var next = parent.next();
        if (next.length > 0) {
          return next;
        }
        else if (parent.length > 0) {
          return parentSibling(parent);
        }
        else {
          //if we are at the last element of the document, add nothing to the collection
          return;
        }
      };
      var nextRow;
      if (child.length > 0) {
        nextRows = nextRows.add(child);
      }
      else if (next.length > 0 ) {
        nextRows = nextRows.add(next);
      }
      else {
        nextRows = nextRows.add(parentSibling($this));
      }

    });

    if (filter) {
      return nextRows.filter(filter);
    }
    else {
      return nextRows;
    };
	};
}) (jQuery);
