/**
 * Created by Ankit on 09/05/16.
 */

(function(){

    var search = $('#search'),
        searchString,
        shortSearch = $('#shortSearch'),
        searchButton = $('#searchButton'),
        resultArea = $('#resultArea');

    function getSearchValue() {
        searchString = search.val();
        if (searchString.length >= 2) {
            if (shortSearch.hasClass('show')) {
                shortSearch.removeClass('show');
                shortSearch.addClass('hidden');
            }
            getResult(searchString);
        }
        else {
            if (shortSearch.hasClass('hidden')) {
                shortSearch.removeClass('hidden');
                shortSearch.addClass('show');
            }
        }
    }
        function getResult(searchString) {
            $.getJSON('http://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&prop=extracts&exlimit=20&explaintext&exintro&gsrsearch=' + searchString + '&callback=?', function (result) {
                if (result.hasOwnProperty("query")) {
                    showResult(result);
                }
            });
        }

    function showResult(result){
        $.each(result.query.pages , function(key,value){
            var divRow =$('<div></div>',{class:'row'});
            var divCol=$('<div></div>',{class:'col s6 offset-s2 z-depth-1 resultcol'});
            var h4 = $('<h4></h4>',{class:'pageTitle'});
            var a = $('<a></a>',{class:'pageLink', href:"http://en.wikipedia.org/?curid="+value.pageid, text:value.title});
            var p = $('<p></p>',{text:value.extract, class:'pageExtract'});
            var h4a = h4.append(a);
            divCol.append(h4a , p);
            divRow.append(divCol);
            resultArea.append(divRow);
        })
    }

    function clearResult(){
        resultArea.html('');
    }

    search.on('keypress', function (event) {
        if (event.which == 13) {
            clearResult();
            getSearchValue();
        }
    });

    searchButton.on('click', function () {
            clearResult();
            getSearchValue();
    });




})();


/*
*
*

 You can just use a URL like this:

 http://en.wikipedia.org/?curid=18630637

 This is the shortest form, others are also possible:

 http://en.wikipedia.org/wiki?curid=18630637


* */