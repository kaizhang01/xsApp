function addDetail() {

    return [
        aDiv({
            styles: ["OverviewContent"], childs: [
                aText({
                    styles: ["OverviewText"],
                    txt: "overview-p1",
                    translate: "content"
                }),
                aText({
                    styles: ["OverviewText"],
                    txt: "overview-p2",
                    translate: "content"
                }),
                aText({
                    styles: ["OverviewText"],
                    txt: "overview-p3",
                    translate: "content"
                }),
            ]
        }),
        aDiv({
            styles: ["OverviewImgBox"], childs: [
                aImg({ styles: ["OverviewImg"], src: "/project/consult/img/overview.png" })
            ]
        })

    ];
}

