
addComponents([
    'project/consult/views/component/head.js',
    'project/consult/views/component/title.js',
    'project/consult/views/component/foot.js'
], main);

function main() {
    aMain({
        styles: ["introduceMain"], childs: [
            aBanner({ img: "",title:"Samll Step , Big Idea",subtitle:"",style:"fixedBanner"})
        ]
    });
}