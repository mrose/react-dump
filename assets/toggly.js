var reactdump = ( function() {
  return {
    toggleRow: function(source) {
      var target = (document.all) ? source.parentElement.cells[1] : source.parentNode.lastChild;
      this.toggleTarget(target,this.toggleSource(source));
    } // end toggleRow

    ,toggleSource: function(source) {
      if (source.style.fontStyle == 'italic') {
        source.style.fontStyle='normal';
        source.title='" + TITLEEXPANDED + "';
        return 'open';
      } else {
        source.style.fontStyle='italic';
        source.title='" + TITLECOLLAPSED + "';
        return 'closed';
      }
    } // end toggleSource

    ,toggleTable: function(source) {
      var switchToState=this.toggleSource(source);
      if (document.all) {
        var table=source.parentElement.parentElement;
        for(var i=1;i<table.rows.length;i++) {
          var target=table.rows[i];
          this.toggleTarget(target,switchToState);
        }
      }
      else {
        var table=source.parentNode.parentNode;
        for (var i=1;i<table.childNodes.length;i++) {
          var target=table.childNodes[i];
          if( target.style) {
            this.toggleTarget(target,switchToState);
          }
        }
      }
    } // end toggleTable

    ,toggleTarget: function(target,switchToState){
      target.style.display = (switchToState == 'open') ? '' : 'none';
    } // end toggleTarget
  };

})();
