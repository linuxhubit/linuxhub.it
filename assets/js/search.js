function getPosts() {
    var posts = [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://linuxhub.it/search.json", false);
    xhr.send();
    if (xhr.status == 200) {
        console.log("linux/hub posts fetched successfully");
        posts = JSON.parse(xhr.responseText);
    } else {
        console.error("linux/hub posts fetch failed");
    }
    return posts;
}

var posts = getPosts();

function search(term, maxResults) {
    var results = fetchSearchResults(term, maxResults);
    var resultsContainer = document.querySelector(".searchbox .results ul");
    resultsContainer.innerHTML = "";
    results.forEach(result => {
        var post = document.createElement("li");
        post.innerHTML = `
        <a href="${result["url"]}">
            <b>${result["title"]}</b>
        </a>
        `;
        resultsContainer.appendChild(post);
    });
}

function fetchSearchResults(term, maxResults) {
    var results = [];
    var terms = term.trim().split(" ");
    var regex_string = "";

    terms.forEach((t,i) => {
        if(t != " ") {
            regex_string += `\\b${t}\\b${i<terms.length-1?'|':''}`
        }
    });

    regex_string = new RegExp(regex_string,"i")

    for (var i=0 ; i < posts.length ; i++)
    {
        let matchesTitle = posts[i]["title"].match(regex_string);
		let matchesTags = posts[i]["title"].match(regex_string);
        let matchesExcerpt = posts[i]["title"].match(regex_string);
        let matchesUrl = posts[i]["title"].match(regex_string);
		
        if (matchesTitle ||
			matchesTags ||
			matchesExcerpt ||
			matchesUrl ) {
            results.push(posts[i]);
        }
    }

    return results;
}

function searchFieldHandler() {
    var searchField = document.querySelector(".searchbox input[type='search']");
    var searchResultsContainer = document.querySelector(".searchbox");
    var body = document.querySelector("body");
    var term = searchField.value.toLowerCase();
    var maxResults = 5;

    if(term.length < 3) {
        searchResultsContainer.classList.remove("show");
        body.style.overflow = "auto";
        return false;
    }

    search(term, maxResults);
    searchResultsContainer.classList.add("show");
    body.style.overflow = "hidden";
}

var searchField = document.querySelector(".searchbox input[type='search']");
searchField.addEventListener("keyup", searchFieldHandler);

window.addEventListener('mouseup', e => {
    if(e.target.tagName == "DIV") {
        searchResultsContainer.classList.remove("show"),
            searchResults.innerHTML = "",
            body.style.overflow = "auto",
            searchField.value = ""
    }
});

function listingResults() {
    var searchParams = new URLSearchParams(window.location.search);
    var term = searchParams.get("q");
    var results = fetchSearchResults(term, 0);
    var resultsContainer = document.querySelector(".listing-content");
    var articleFound = document.querySelector(".search-found");
    var articleQuery = document.querySelector(".search-query");
    resultsContainer.innerHTML = "";
    results.forEach(result => {
        var post = document.createElement("div");
        post.classList.add("result");
        post.innerHTML = `
        <a href="${result["url"]}">
            <h3>${result["title"]}</h3>
        </a>
        <p>${result["excerpt"]}</p>
        `;
        resultsContainer.appendChild(post);
    });
    articleFound.innerHTML = results.length;
    articleQuery.innerHTML = term;
}

if (window.location.href.indexOf("/results") > -1 && window.location.search.indexOf("q") > -1) {
    console.log("Listing results");
    listingResults();
}