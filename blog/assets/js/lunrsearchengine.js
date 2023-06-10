
var documents = [{
    "id": 0,
    "url": "https://chrisjogos.com/blog/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "https://chrisjogos.com/blog/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 2,
    "url": "https://chrisjogos.com/blog/",
    "title": "Home",
    "body": "                                                                                                   Localization - How my game is translated to 14+ languages with almost no cost              :       Intro I love to make my games accessible to the most people possible, but accessibility features take time to implement so I am pretty sure that’s the reason most companies. . . :                                                                               Chris                04 Mar 2023                                            "
    }, {
    "id": 3,
    "url": "https://chrisjogos.com/blog/robots.txt",
    "title": "",
    "body": "      Sitemap: {{ “sitemap. xml”   absolute_url }}   "
    }, {
    "id": 4,
    "url": "https://chrisjogos.com/blog/localization-how-my-game-is-translated/",
    "title": "Localization - How my game is translated to 14+ languages with almost no cost",
    "body": "2023/03/04 - Intro: I love to make my games accessible to the most people possible, but accessibility features take time to implement so I am pretty sure that’s the reason most companies simply don’t do them, time equals money so… With that in mind, I had to find a quick and easy solution to make all possible texts support translation in my game, and an even simpler way to translate all of them when new text was added or changed. How and wow: Programming one from scratch is a possibility but since this is a common issue, I had to look for free or open source solutions first. After looking through some git repositories and paid Unity Assets, I ended up finding what I think was the best option: Unity Localization Package. This package is developed and supported by Unity, that’s awesome because I always prefer to use Unity official assets while looking for third party solutions, because I am sure that they will keep it updated and supporting the latest versions of the engine.  The neat part of this package is that it can export all the game text in one or more Google Sheets, meaning that I can use Google Translate inside it to translate all texts automatically! I know Google Translate can lead to some wrong translations but remember that I am a solo-developer working in the game in my free time. This solution is quick and pretty reliable, and I have the support of the community to fix some things that could be better, in the game Discord Server I already have been reached by a Turkish person that helped fix a lot of things! Conclusion: Making the game available in multiple languages made it appear on foreign websites with that information highlighting it. I believe this is a very good thing, I always get excited when I play a game in my main language (Brazilian Portuguese), and I remember seeing a person with a positive reaction when they saw the game opened automatically already with their language selected! About the game: Resultarias is a surrealist adventure narrated through dream exploration, even though it does not have dialogs or collectable with pages of texts to read, this makes possible the largest amount of people able to read all the interface texts, which is a good thing! And I pretty sure this could be used to translate games with longer texts and a small budget too. The game is in Early Access and it is available on Steam, a Free version is available to test: resultarias on Steam"
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});