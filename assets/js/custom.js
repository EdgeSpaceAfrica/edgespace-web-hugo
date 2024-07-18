$(function () {
    var mediumPromise = new Promise(function (resolve) {
        var $content = $('#mediumContent');
        var data = {
            rss: 'https://medium.com/feed/edgespace'
        };
        
        $.get(' https://api.rss2json.com/v1/api.json?rss_url='+data.rss, data, function (response) {
            if (response.status == 'ok') {
                $("#logo").append(`<img src="${response.feed["image"]}" class="rounded mx-auto d-block">`)
                var display = '';
                $.each(response.items, function (k, item) {
                    // display += `<div class="card mb-3 mx-auto mr-5 " style="width: 20rem;">`;
                    display += `<div class="bg-body dark:bg-darkmode-body blog-card" >`;
                    var src = item["thumbnail"]; // use thumbnail url
                    if (!src) {
                        src = item['description'].toString().match(/<img[^>]+src="([^">]+)"/)[1]
                    }
                    console.log(k)
                    console.log(item['description'].toString())
                    
                    display += `<img src="${src}" class="mb-6 w-full rounded" alt="Cover image">`;
                    // display += `<div class="card-body">`;
                    //Add Post title
                    display += `<h4 class="mb-3"><a href="${item.link}">${item.title}</a></h4>`;
                    
                    var yourString = item.description.replace(/<img[^>]*>/g, ""); //replace with your string.
                    yourString = yourString.replace('h4', 'p');
                    yourString = yourString.replace('h3', 'p');
                    var maxLength = 200; // maximum number of characters to extract
                    //trim the string to the maximum length
                    var trimmedString = yourString.substr(0, maxLength);
                    //re-trim if we are in the middle of a word
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

                    //Add Post summary 
                    display += `<p class="mb-6">${trimmedString}...</p>`;

                    //Add "Read More" btn
                    display += `<a href="${item.link}" target="_blank" class="btn btn-outline-primary btn-sm" >Read More</a>`;
                    display += '</div>';//</div>';
                    // return k < 2;
                });

                resolve($content.html(display));
            }
        });
    });

    mediumPromise.then(function () {
        //Pagination
        pageSize = 4;
        numberOfArticles = $(".blog-card").length

        //if number of articles is not up to the maximum page size exist the pagination 
        //buttons creation 
        if (numberOfArticles <= pageSize) return;

        var pageCount = numberOfArticles / pageSize;

        for (var i = 0; i < pageCount; i++) {
            $("#pagin").append(`<li class="page-item"><a class="page-link" href="#">${(i + 1)}</a></li> `);
        }
        $("#pagin li:nth-child(1)").addClass("active");
        showPage = function (page) {
            $(".blog-card").hide();
            $(".blog-card").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        $("#pagin li").click(function () {
            $("#pagin li").removeClass("active");
            $(this).addClass("active");
            showPage(parseInt($(this).text()))
            return false;
        });
    });
});