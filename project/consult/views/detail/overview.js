function addDetail() {

    return [
        aDiv({
            styles: ["overviewContent"], childs: [
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

        aImg({ styles: ["OverviewImg"], src: "/project/consult/img/overview.png" })
    ];
}

