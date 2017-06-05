(function (){

    $(init);

    function init()
    {
        $("#searchMovie").click(searchMovie);
        var movieTitle = $("#movieTitle");
        var tbody = $("#container"); //table.find("tbody");
        var template = $("#template").clone();

        var movieComp = $("#movieComp");

        $("#searchMovieByComp").click(searchMovieByCompany);

        //http://www.myapifilms.com/imdb/idCompany?company=disney&token=dc5ade4f-960b-43ea-a5cf-2e17b29e5c13&format=json&language=en-us&exactFilter=0&limit=1
        var url_comp = "http://www.myapifilms.com/imdb/idCompany?company=";
        var auth_comp = "&token=dc5ade4f-960b-43ea-a5cf-2e17b29e5c13&format=json&language=en-us&exactFilter=0&limit=1";

        tbody.empty();

        var db_search_url = "http://www.myapifilms.com/imdb/idIMDB?title=";
        var db_replace_text = "starwar&callback=test";
        var db_searhc_format ="&token=dc5ade4f-960b-43ea-a5cf-2e17b29e5c13&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0";

        function searchMovieByCompany()
        {
            var comp_name = movieComp.val();
            var search_url = url_comp+comp_name+auth_comp;

            $.ajax({
                url: search_url,
                dataType: "jsonp",
                //jsonpCallback: test,
                //success: renderMoviesWithTemplate
                success: renderMovies
            });

        }

        function searchMovie()
        {
            console.log("search movie...");

            var title = movieTitle.val();
            var search_url = db_search_url+title+db_searhc_format;

            console.log(search_url);

            $.ajax({
                url: search_url,
                dataType: "jsonp",
                success: renderMoviesWithTemplate
                //success: renderMovies
            });
        }

        function renderMoviesWithTemplate(response)
        {
            var movies = response.data.movies;
            console.log("renderMoviesWithTemplate");

            tbody.empty();

            for(var m in movies)
            {
                var movie = movies[m];
                var title = movie.title;
                var plot = movie.plot;
                var posterUrl = movie.urlPoster;
                var imdbUrl = movie.urlIMDB;

                var tr = template.clone();

                tr.find(".link")
                    .attr("href", imdbUrl)
                    .html(title);

                tr.find(".plot")
                    .html(plot);

                tr.find(".poster")
                    .attr("src", posterUrl);

                tbody.append(tr);
            }
        }

        function renderMovies(result)
        {
            console.log("renderMovies");

            var movies = result.data.movies;
            //var comps = result.data.companies;

            //for( var obj in comps)
            for(var obj in movies)
            {
                //var movie_comp = comps[obj].company;
                var movie_comp = movies[obj].company;
                for(var c in movie_comp)
                {
                    var movies = movie_comp[c].movies;

                    for(var m in movies)
                    {
                        var movie = movies[m];
                        var title = movie.movie.name;
                        var year = movie.year;
                        var remark = movie.remarks;

                        var tr = $("<tr>");
                        var titleTd  = $("<td>" + title + "</td>");
                        var yearTd  = $("<td>" + year + "</td>");
                        var remarkTd  = $("<td>" + remark + "</td>");

                        tr.append(titleTd);
                        tr.append(yearTd);
                        tr.append(remarkTd);

                        /*var plot = movie.simplePlot;
                         var posterUrl = movie.urlPoster;
                         var imdbUrl = movie.urlIMDB;*/

                        /* var tr = $("<tr>");
                         var titleLink = $("<a>").attr("href", imdbUrl).html(title);
                         var titleTd = $("<td>").append(titleLink);
                         var plotTd  = $("<td>" + plot + "</td>");
                         var img = $("<img>").attr("src",posterUrl);
                         var posterTd = $("<td>").append(img);*/

                        /*tr.append(titleTd);
                         tr.append(plotTd);
                         tr.append(posterTd)*/;

                        tbody.append(tr);
                    }

                }
            }
            //tbody.empty();


        }
    }

})();