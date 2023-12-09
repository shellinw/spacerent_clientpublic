const data = [
    {
        id: 1,
        name: "Office Space",
    },
    {
        id: 2,
        name: "Coworking Space",
    },
    {
        id: 3,
        name: "Personal Space",
    },
];

const id = 3;

let choosen = [];
data.map((datum) => {
    if (datum.id == id) {
        choosen.push(datum);
    }
});
console.log(choosen);
